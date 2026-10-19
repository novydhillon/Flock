import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from 'node:fs';
import { resolve, dirname, relative, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const pages = [
  ['docs/README.md','index.html','Start here','Overview'],
  ['docs/REQUIREMENTS.md','requirements.html','Requirements','Product'],
  ['docs/ARCHITECTURE.md','architecture.html','Architecture','Systems'],
  ['docs/systems/GAMEPLAY.md','gameplay.html','Gameplay & progression','Systems'],
  ['docs/systems/WORLD.md','world.html','World & navigation','Systems'],
  ['docs/systems/PRESENTATION.md','presentation.html','Rendering, nature & audio','Systems'],
  ['docs/DEVELOPMENT.md','development.html','Development & release','Delivery'],
  ['docs/validation/P0-P1.md','p0-p1-validation.html','P0 / P1 validation','Delivery'],
  ['docs/ISSUES.md','issues.html','Issue tracker','Delivery'],
  ['docs/ISSUES_CLOSED.md','issues-closed.html','Closed issues','Delivery'],
  ['docs/QUALITY.md','quality.html','Quality record','Delivery'],
  ['docs/REVIEW.md','review.html','Documentation reviews','Delivery'],
  ['README.md','project.html','Project README','Reference'],
].map(([source,file,title,group])=>({source,file,title,group}));
export const escape = s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain = s=>s.replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/&[^;]+;/g,'').replace(/[*`_]/g,'');
const baseSlug = s=>plain(s).normalize('NFKD').toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s/g,'-');
const out=resolve(root,'docs/html');
const sourceMap=new Map(pages.map(p=>[resolve(root,p.source),p.file]));
function hrefFor(href,page){
  if(/^(?:[a-z]+:|#|\/\/)/i.test(href))return href;
  const [path,hash]=href.split('#');
  const target=resolve(root,dirname(page.source),path);
  return (sourceMap.get(target)||relative(out,target).split('\\').join('/'))+(hash?'#'+hash:'');
}
function render(page){
  const md=readFileSync(resolve(root,page.source),'utf8'),toc=[],seen=new Map();
  const renderer=new marked.Renderer();
  renderer.code=({text,lang})=>{
    if(lang==='mermaid')return `<figure class="diagram"><figcaption>System diagram</figcaption><pre class="mermaid">${escape(text)}</pre><details><summary>Diagram source / text alternative</summary><pre><code>${escape(text)}</code></pre></details></figure>`;
    return `<div class="code-block"><div class="code-tools"><span>${escape(lang||'text')}</span><button class="copy-code" type="button">Copy code</button></div><pre><code class="language-${escape(lang||'text')}">${escape(text)}</code></pre></div>`;
  };
  let html=marked.parse(md,{renderer,gfm:true});
  html=html.replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g,(_,level,content)=>{
    const base=baseSlug(content)||'section',n=seen.get(base)||0;seen.set(base,n+1);const id=base+(n?'-'+n:'');
    if(+level===2||+level===3)toc.push({level:+level,id,text:plain(content)});
    return `<h${level} id="${id}">${content}<a class="heading-link" href="#${id}" aria-label="Link to ${escape(plain(content))}">#</a></h${level}>`;
  }).replace(/href="([^"]*)"/g,(_,h)=>`href="${escape(hrefFor(h.replace(/&amp;/g,'&'),page))}"`)
    .replace(/<table>/g,'<div class="table-scroll" tabindex="0" role="region" aria-label="Scrollable reference table"><table>')
    .replace(/<\/table>/g,'</table></div>');
  return {html,toc,md};
}
function nav(current){let previous='';return pages.map(p=>{const heading=p.group!==previous?`<span class="nav-group">${p.group}</span>`:'';previous=p.group;return heading+`<a href="${p.file}" ${p.file===current?'aria-current="page"':''}>${escape(p.title)}</a>`;}).join('');}
export function build(output=out){
  rmSync(output,{recursive:true,force:true});mkdirSync(resolve(output,'assets'),{recursive:true});
  for(const file of ['docs.css','docs.js'])cpSync(resolve(root,'scripts/docs',file),resolve(output,'assets',file));
  cpSync(resolve(root,'node_modules/mermaid/dist/mermaid.min.js'),resolve(output,'assets/mermaid.min.js'));
  cpSync(resolve(root,'node_modules/mermaid/LICENSE'),resolve(output,'assets/MERMAID-LICENSE.txt'));
  writeFileSync(resolve(output,'assets/THIRD-PARTY.txt'),'Mermaid 11.12.1 — MIT license; see MERMAID-LICENSE.txt. Bundled diagram dependencies retain their license comments in mermaid.min.js. Marked 17.0.1 (MIT) is used at build time only.\n');
  const search=[];
  for(const page of pages){
    const {html,toc,md}=render(page);search.push({title:page.title,url:page.file,text:md.replace(/```mermaid[\s\S]*?```/g,'').replace(/[#*`|]/g,'').replace(/\s+/g,' ').trim()});
    writeFileSync(resolve(output,page.file),`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><meta name="description" content="FLOCK development documentation: ${escape(page.title)}"><title>${escape(page.title)} · FLOCK docs</title><link rel="stylesheet" href="assets/docs.css"><script defer src="assets/search-index.js"></script><script defer src="assets/mermaid.min.js"></script><script defer src="assets/docs.js"></script></head>
<body><a class="skip-link" href="#content">Skip to content</a><header class="top"><a class="wordmark" href="index.html">FLOCK <span>FIELD GUIDE</span></a><div class="header-actions"><button id="open-search" type="button">Search docs <kbd>/</kbd></button><button id="theme-toggle" type="button" aria-label="Toggle dark appearance">Appearance</button></div></header>
<div class="layout"><aside class="sidebar"><nav aria-label="Documentation">${nav(page.file)}</nav><p class="sidebar-note">Markdown is the source.<br>HTML is generated locally.</p></aside><div class="reading"><details class="mobile-navigation"><summary>Browse documentation</summary><nav aria-label="Mobile documentation">${nav(page.file)}</nav></details><div class="page-meta">${escape(page.group)} <span>Documentation · 14 October 2026</span></div><main id="content" tabindex="-1">${html}</main><footer><a href="${escape(relative(out,resolve(root,page.source)).split('\\').join('/'))}">Markdown source</a><a href="index.html">Documentation home</a><a href="#content">Back to top ↑</a></footer></div><aside class="toc"><nav aria-label="On this page"><h2>On this page</h2>${toc.map(t=>`<a class="toc-level-${t.level}" href="#${t.id}">${escape(t.text)}</a>`).join('')}</nav></aside></div>
<dialog id="search-dialog" aria-labelledby="search-title"><form method="dialog" class="search-top"><h2 id="search-title">Search documentation</h2><button aria-label="Close search">×</button></form><label for="search-input">Find a system, requirement, issue ID or code symbol</label><input id="search-input" type="search" placeholder="Try bridge, F-025, or saveProfile" autocomplete="off"><p id="search-count" role="status">Type to search all documents.</p><ul id="search-results"></ul></dialog><div id="copy-status" role="status" class="sr-only"></div><noscript><p class="no-script">JavaScript is off: navigation, text and code still work. Use your browser’s Find for this page; diagram source is available beneath each diagram.</p></noscript></body></html>\n`);
  }
  writeFileSync(resolve(output,'assets/search-index.js'),'window.FLOCK_DOC_SEARCH = '+JSON.stringify(search).replace(/</g,'\\u003c')+';\n');
  console.log(`Built ${pages.length} offline documentation pages in docs/html.`);
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))build();
