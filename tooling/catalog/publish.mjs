// Executed only from the repository's trusted default branch. PRs supply JSON data.
import { readFile, writeFile } from 'node:fs/promises';
import { normalizeCatalog, normalizeGame } from './schema.mjs';

const repo = 'openaigames/community';
if (process.env.GITHUB_REPOSITORY !== repo) throw Error('Unexpected repository');
const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, 'utf8'));
const token = process.env.GITHUB_TOKEN;
const endpoint = process.env.CATALOG_PUBLISH_URL;
const previewOrigin = new URL(endpoint).origin;
const sequence = Number(process.env.GITHUB_RUN_ID) * 100 + Number(process.env.GITHUB_RUN_ATTEMPT);
if (!Number.isSafeInteger(sequence) || sequence < 1) throw Error('Invalid run sequence');
const marker = '<!-- openaigames-catalog-preview -->';
const runUrl = `https://github.com/${repo}/actions/runs/${process.env.GITHUB_RUN_ID}`;
async function api(path, options = {}) {
  const response = await fetch('https://api.github.com/repos/' + repo + path, { ...options, headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', ...(options.headers || {}) }, signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw Error(`GitHub request failed (${response.status})`);
  return response.status === 204 ? null : response.json();
}
const post = (path, body, method = 'POST') => api(path,{ method,body:JSON.stringify(body) });
async function send(snapshot) {
  const response = await fetch(endpoint, { method:'POST',headers:{Authorization:`Bearer ${process.env.CATALOG_PUBLISH_SECRET}`,'Content-Type':'application/json'},body:JSON.stringify({...snapshot,sequence}),signal:AbortSignal.timeout(20000) });
  if (!response.ok) throw Error(`Catalog publication failed (${response.status})`);
}
async function compile(commit) {
  const tree = await api(`/git/trees/${commit}?recursive=1`);
  if (tree.truncated) throw Error('Repository tree is too large');
  const entries = tree.tree.filter(e => e.type === 'blob');
  const files = entries.filter(e => e.path === 'catalog/legacy.json' || /^demos\/[a-z0-9][a-z0-9-]{0,63}\/game\.json$/.test(e.path));
  if (files.length > 201) throw Error('Too many game manifests');
  const projects = [];
  for (const file of files) {
    if (file.mode !== '100644' || file.size > (file.path === 'catalog/legacy.json' ? 200000 : 20000)) throw Error(`Invalid manifest: ${file.path}`);
    const blob = await api(`/git/blobs/${file.sha}`);
    if (blob.encoding !== 'base64') throw Error('Unsupported file encoding');
    const input = JSON.parse(Buffer.from(blob.content,'base64').toString('utf8'));
    if (file.path === 'catalog/legacy.json') { projects.push(...normalizeCatalog(input).projects); continue; }
    const folder = file.path.slice(0,-'game.json'.length), id = folder.split('/')[1];
    if (input.id !== id) throw Error(`Game id must match folder: ${id}`);
    for (const field of ['cover_url','gameplay_url']) {
      if (input[field] && !input[field].startsWith('https://')) {
        if (!/^[a-zA-Z0-9_-]+\.(png|jpg|jpeg|webp|gif)$/.test(input[field])) throw Error(`Invalid ${field} path`);
        const asset = entries.find(e => e.path === folder + input[field]);
        if (!asset || asset.mode !== '100644' || asset.size > 5000000) throw Error(`Missing or oversized ${field}`);
        input[field] = `https://raw.githubusercontent.com/${repo}/${commit}/${folder}${input[field]}`;
      }
    }
    projects.push(normalizeGame(input));
  }
  return normalizeCatalog({ projects });
}
let pr, revision, channel;
async function comment(body) {
  const comments = await api(`/issues/${pr.number}/comments?per_page=100`);
  const previous = comments.find(c => c.user?.login === 'github-actions[bot]' && c.body?.startsWith(marker));
  if (previous) await post(`/issues/comments/${previous.id}`,{body:marker+'\n'+body},'PATCH');
  else await post(`/issues/${pr.number}/comments`,{body:marker+'\n'+body});
}
async function status(state, description, target_url = runUrl) {
  await post(`/statuses/${revision}`,{state,context:'Game catalog / Preview',description,target_url});
}
try {
  if (event.pull_request) {
    pr = await api(`/pulls/${event.pull_request.number}`);
    if (pr.base.ref !== 'main') throw Error('Catalog PRs must target main');
    if (pr.head.sha !== event.pull_request.head.sha) { console.log('A newer PR commit superseded this run.'); process.exit(0); }
    revision = pr.head.sha; channel = `pr-${pr.number}`;
    await status('pending','Checking game metadata and preparing preview');
    let source = pr.merge_commit_sha;
    if (pr.state === 'open') {
      for(let attempt=0; !source && attempt<4; attempt++) { await new Promise(r=>setTimeout(r,2000)); pr=await api(`/pulls/${pr.number}`); if(pr.head.sha!==revision)process.exit(0); source=pr.merge_commit_sha; }
      if (pr.mergeable === false || !source) throw Error('Resolve the merge conflict before previewing');
    }
    source ||= revision;
    const catalog = await compile(source);
    const latest = await api(`/pulls/${pr.number}`);
    if (latest.head.sha !== revision || latest.state !== pr.state) { console.log('PR changed during validation; skipping stale publication.'); process.exit(0); }
    const state = pr.merged ? 'merged' : pr.state === 'closed' ? 'closed' : 'ready';
    await send({channel,revision,status:state,catalog});
    const preview = `${previewOrigin}/community/pr/${pr.number}`;
    const names = catalog.projects.map(p => p.id).join(', ');
    const label = state === 'merged' ? '已合并 · 正式目录将由主分支发布' : state === 'closed' ? '已关闭 · 未上架' : '投稿预览已就绪';
    await comment(`### ${label}\n\n[打开预览](${preview}#/games) · [固定本次版本](${preview}?revision=${revision}#/games) · [检查结果](${runUrl})\n\n提交：\`${revision.slice(0,7)}\` · ${catalog.projects.length} 款游戏：\`${names}\`\n\n继续 push 会更新这条评论与预览。预览中的游戏使用投稿提供的试玩地址；反馈请留在此 PR，预览不接收正式留言。`);
    await status('success','Game catalog validated; preview ready',preview+'#/games');
    await writeFile(process.env.GITHUB_STEP_SUMMARY,`Preview: ${preview}#/games\nRevision: ${revision}\nGames: ${names}\n`);
  } else {
    const main = await api('/git/ref/heads/main'); revision=main.object.sha; channel='production';
    const catalog = await compile(revision);
    if ((await api('/git/ref/heads/main')).object.sha !== revision) { console.log('Newer main commit superseded this run.'); process.exit(0); }
    await send({channel,revision,status:'ready',catalog});
    await writeFile(process.env.GITHUB_STEP_SUMMARY,`Published ${catalog.projects.length} games from ${revision}.\n`);
    console.log(`Published ${catalog.projects.length} games.`);
  }
} catch (error) {
  console.error(error.message);
  if (pr && revision && channel) {
    const latest = await api(`/pulls/${pr.number}`);
    if (latest.head.sha === revision) {
      await send({channel,revision,status:'invalid',catalog:{projects:[]}}).catch(()=>{});
      const message = String(error.message).replace(/[`<>@]/g,'').slice(0,300);
      await comment(`### 投稿检查未通过\n\n${message}\n\n提交：\`${revision.slice(0,7)}\` · [查看检查结果](${runUrl})\n\n修正后继续 push，会自动重新检查并更新预览。`);
      await status('failure','Game catalog validation or publication failed');
    }
  }
  process.exitCode=1;
}
