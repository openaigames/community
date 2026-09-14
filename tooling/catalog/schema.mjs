const forbiddenHosts = new Set(['localhost', 'openaigames.lens-frontier.workers.dev', 'openaigames-preview.lens-frontier.workers.dev', 'openaigames-demo.leonliuzx.chatgpt.site']);
function text(value, name, max = 1000, optional = false) {
  if (optional && (value === undefined || value === '')) return '';
  if (typeof value !== 'string' || !value.trim() || value.length > max || /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(value)) throw Error(`Invalid ${name}`);
  return value.trim();
}
function url(value, name, local = false, optional = false) {
  if (optional && !value) return '';
  value = text(value, name, 2048);
  if (/[\s<>"'\\()]/.test(value)) throw Error(`Invalid ${name}`);
  if (local && /^\/static\/games\/[a-z0-9/_-]+\.(png|jpg|jpeg|webp|gif)$/i.test(value) && !value.includes('..')) return value;
  let parsed; try { parsed = new URL(value); } catch { throw Error(`Invalid ${name}`); }
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.port || forbiddenHosts.has(parsed.hostname) || !parsed.hostname.includes('.') || /^\d+(\.\d+){3}$/.test(parsed.hostname) || parsed.hostname.includes(':') || parsed.hostname.endsWith('.local') || parsed.hostname.endsWith('.localhost') || parsed.hostname.endsWith('.internal')) throw Error(`Invalid ${name}`);
  return parsed.href;
}
export function normalizeGame(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || !/^[a-z0-9][a-z0-9-]{0,63}$/.test(input.id || '')) throw Error('Invalid game id');
  if (input.featured !== undefined && typeof input.featured !== 'boolean') throw Error('Invalid featured flag');
  const p = { id: input.id, featured: input.featured === true };
  for (const [name,max] of [['title',100],['description',1000],['category',50],['creator',100],['version_label',100],['controls',500],['instructions',2000],['credits',2000]]) p[name] = text(input[name], name, max);
  p.attribution = text(input.attribution, 'attribution', 2000, true);
  for (const name of ['creator_url','source_url','submission_url','preview_url']) p[name] = url(input[name], name);
  p.cover_url = url(input.cover_url, 'cover_url', true);
  p.gameplay_url = url(input.gameplay_url, 'gameplay_url', true, true);
  p.image_caption = text(input.image_caption, 'image_caption', 200, true) || '由创作者提供';
  if (!Array.isArray(input.feedback_questions) || input.feedback_questions.length < 1 || input.feedback_questions.length > 8) throw Error('Provide 1–8 feedback questions');
  p.feedback_questions = input.feedback_questions.map(x => text(x, 'feedback question', 300));
  p.owner = p.creator; p.cover = p.id; p.external = true; p.demo = false; p.mine = false;
  p.current_version = p.id + '-current';
  p.versions = [{ id: p.current_version, number: p.version_label, preview_url: p.preview_url }];
  return p;
}
export function normalizeCatalog(data) {
  if (!data || !Array.isArray(data.projects) || data.projects.length > 200) throw Error('Invalid game catalog');
  const projects = data.projects.map(normalizeGame);
  if (new Set(projects.map(p => p.id)).size !== projects.length) throw Error('Duplicate game id');
  return { projects };
}
