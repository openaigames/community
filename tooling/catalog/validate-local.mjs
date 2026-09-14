import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeCatalog, normalizeGame } from './schema.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const legacy=JSON.parse(await readFile(resolve(root,'catalog/legacy.json'),'utf8'));
const projects=[...normalizeCatalog(legacy).projects];
for(const entry of await readdir(resolve(root,'demos'),{withFileTypes:true})){
  if(!entry.isDirectory() || !/^[a-z0-9][a-z0-9-]{0,63}$/.test(entry.name))continue;
  const folder=resolve(root,'demos',entry.name),file=resolve(folder,'game.json');
  let raw;try{raw=await readFile(file,'utf8');}catch(error){if(error.code==='ENOENT')continue;throw error;}
  const input=JSON.parse(raw);if(input.id!==entry.name)throw Error('Game id must match folder');
  for(const field of ['cover_url','gameplay_url'])if(input[field]&&!input[field].startsWith('https://')){
    if(!/^[a-zA-Z0-9_-]+\.(png|jpg|jpeg|webp|gif)$/.test(input[field]))throw Error(`Invalid ${field}`);
    const asset=await stat(resolve(folder,input[field]));if(!asset.isFile()||asset.size>5000000)throw Error('Invalid image');
    input[field]='https://raw.githubusercontent.com/openaigames/community/main/demos/'+entry.name+'/'+basename(input[field]);
  }
  projects.push(normalizeGame(input));
}
console.log(`Valid catalog: ${normalizeCatalog({projects}).projects.map(p=>p.id).join(', ')}`);
