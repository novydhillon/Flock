import { readFileSync, readdirSync, existsSync, statSync, mkdtempSync, rmSync } from 'node:fs';
import { resolve, dirname, relative } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { build, pages, root } from './build.mjs';

const out=resolve(root,'docs/html'),errors=[];
function files(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(resolve(dir,e.name)):[resolve(dir,e.name)]);}
const hash=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
const temp=mkdtempSync(resolve(tmpdir(),'flock-docs-check-'));
try{
  build(temp);
  const expected=files(temp).map(p=>relative(temp,p)).sort();
  const actual=existsSync(out)?files(out).map(p=>relative(out,p)).sort():[];
  if(JSON.stringify(expected)!==JSON.stringify(actual))errors.push('Generated file inventory is stale. Run npm run docs:build.');
  for(const file of expected)if(!existsSync(resolve(out,file))||hash(resolve(out,file))!==hash(resolve(temp,file)))errors.push(`Generated file is stale: ${file}`);
}finally{rmSync(temp,{recursive:true,force:true});}
let checkedLinks=0,diagrams=0;
for(const page of pages){
  const file=resolve(out,page.file);if(!existsSync(file))continue;
  const html=readFileSync(file,'utf8'),ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  if(new Set(ids).size!==ids.length)errors.push(`${page.file}: duplicate heading/element ID`);
  for(const match of html.matchAll(/\b(?:href|src)="([^"]*)"/g)){
    const url=match[1].replace(/&amp;/g,'&');if(/^(?:[a-z]+:|\/\/)/i.test(url))continue;
    const [path,fragment]=url.split('#'),target=resolve(dirname(file),decodeURIComponent(path||page.file));
    checkedLinks++;
    if(!existsSync(target)){errors.push(`${page.file}: broken local link ${url}`);continue;}
    if(fragment&&target.endsWith('.html')){
      const targetHtml=readFileSync(target,'utf8');
      if(![...targetHtml.matchAll(/\bid="([^"]+)"/g)].some(m=>m[1]===fragment))errors.push(`${page.file}: missing anchor ${url}`);
    }
  }
  for(const src of [...html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="([^"]+)"/g)].map(m=>m[1]))if(/^(?:https?:)?\/\//.test(src))errors.push(`${page.file}: external runtime asset ${src}`);
  diagrams+=(html.match(/class="mermaid"/g)||[]).length;
  for(const marker of ['<main id="content"','Skip to content','aria-current="page"','id="search-dialog"','Markdown source'])if(!html.includes(marker))errors.push(`${page.file}: missing structural/accessibility marker ${marker}`);
}
if(diagrams<5)errors.push('Expected meaningful system diagrams in documentation.');
const issue=readFileSync(resolve(root,'docs/ISSUES.md'),'utf8'),req=readFileSync(resolve(root,'docs/REQUIREMENTS.md'),'utf8');
for(let i=1;i<=25;i++){const id=`F-${String(i).padStart(3,'0')}`;if(!issue.includes(id)||!req.includes(id))errors.push(`Missing requirement traceability: ${id}`);}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`Documentation checks passed: ${pages.length} pages, ${checkedLinks} local links/anchors, ${diagrams} diagrams; deterministic, current and offline assets.`);
