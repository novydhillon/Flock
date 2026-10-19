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
const issueIds=[...issue.matchAll(/^### (F-\d{3})/gm)].map(m=>m[1]);
if(new Set(issueIds).size!==issueIds.length)errors.push('Duplicate issue IDs in tracker headings.');
for(const id of issueIds)if(!req.includes(id))errors.push(`Missing requirement traceability: ${id}`);
// Keep the active/closed lifecycle consistent, including scoped planning IDs.
const closedIssue=readFileSync(resolve(root,'docs/ISSUES_CLOSED.md'),'utf8');
const overviewRows=text=>[...text.matchAll(/^\| ((?:~~)?F-(?:[A-Z]+-)?\d{3}(?:~~)?) \|(.+)$/gm)]
  .map(m=>({id:m[1].replaceAll('~~',''),cells:[m[1],...m[2].split('|').slice(0,-1)].map(c=>c.trim())}));
const overviewSection=(text,heading)=>text.split(heading+'\n')[1]?.split(/^## /m)[0]||'';
const activeRows=overviewRows(overviewSection(issue,'## Work overview'));
const closedRows=overviewRows(overviewSection(closedIssue,'## Closed work overview'));
for(const [label,rows] of [['active',activeRows],['closed',closedRows]]){
  const ids=rows.map(r=>r.id);
  if(new Set(ids).size!==ids.length)errors.push(`Duplicate overview IDs in ${label} tracker.`);
  for(const row of rows){
    const status=row.cells[4]?.replaceAll('~~','').toLowerCase();
    if(label==='active'&&['done','closed'].includes(status))errors.push(`${row.id}: move closed work to ISSUES_CLOSED.md.`);
    if(label==='closed'&&!['done','closed'].includes(status))errors.push(`${row.id}: active work belongs in ISSUES.md.`);
    if(label==='closed'&&row.cells.some(c=>!/^~~.+~~$/.test(c)))errors.push(`${row.id}: strike through every closed overview cell.`);
  }
}
const closedIds=new Set(closedRows.map(r=>r.id));
for(const row of activeRows)if(closedIds.has(row.id))errors.push(`${row.id}: duplicated across active and closed overviews.`);
const activeDetailIds=[...issue.matchAll(/^### (F-(?:[A-Z]+-)?\d{3})\b/gm)].map(m=>m[1]);
for(const row of activeRows)if(activeDetailIds.filter(id=>id===row.id).length!==1)errors.push(`${row.id}: expected one active detail section.`);
for(const id of activeDetailIds)if(!activeRows.some(r=>r.id===id))errors.push(`${id}: active detail missing overview row.`);
const tracedIds=new Set([...req.matchAll(/F-(?:[A-Z]+-)?\d{3}/g)].map(m=>m[0]));
for(const range of req.matchAll(/(F-(?:[A-Z]+-)?)(\d{3})[–-](?:(?:F-(?:[A-Z]+-)?))?(\d{3})/g)){
  const start=Number(range[2]),end=Number(range[3]);
  if(end>=start&&end-start<1000)for(let n=start;n<=end;n++)tracedIds.add(range[1]+String(n).padStart(3,'0'));
}
for(const id of activeDetailIds)if(!tracedIds.has(id))errors.push(`Missing requirement traceability: ${id}`);
const closedDetailIds=[...closedIssue.matchAll(/^#{2,3} (?:~~)?(F-(?:[A-Z]+-)?\d{3})\b/gm)].map(m=>m[1]);
for(const row of closedRows)if(!closedDetailIds.includes(row.id))errors.push(`${row.id}: archived overview missing detail section.`);
for(const id of activeDetailIds)if(closedIds.has(id))errors.push(`${id}: closed detail remains in active tracker.`);
for(const match of closedIssue.matchAll(/^#{2,3} (?:~~)?(F-(?:[A-Z]+-)?\d{3})(?:~~)? (?:[-—] )?(.+)$/gm)){
  if(closedIds.has(match[1])&&!/^~~.+~~$/.test(match[2]))errors.push(`${match[1]}: strike through archived issue title.`);
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`Documentation checks passed: ${pages.length} pages, ${checkedLinks} local links/anchors, ${diagrams} diagrams; deterministic, current and offline assets.`);
