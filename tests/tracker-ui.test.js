import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { createTracker } from '../tracker/app.js';

const html = readFileSync(new URL('../tracker/index.html',import.meta.url),'utf8');
const sha = 'a'.repeat(40);
const fixture = (rows,details='') => `## Work overview\n\n| ID | Priority | Type | Item | Status | Depends on |\n|---|---|---|---|---|---|\n${rows}\n\n## Details\n${details}`;
const active = fixture('| F-001 | P2 | UI | <img src=x onerror=alert(1)> | In progress | — |\n| F-002 | P0 | Core | Fix correctness | Review | — |\n| F-003 | P1 | Art | Cloud pause | Deferred | — |','### F-001 — Example\n\nBranch: `feature/example`\n\nDetails with <script>alert(1)</script>.');
const closed = '## Closed work overview\n\n| ID | Priority | Type | Item | Status | Depends on |\n|---|---|---|---|---|---|\n| ~~F-004~~ | ~~P4~~ | ~~Art~~ | ~~Completed~~ | ~~Done~~ | ~~—~~ |\n\n### F-004 — ~~Completed~~\n\nBranch: `feature/complete`';
function setup(fetcher) {
  const dom = new JSDOM(html,{url:'https://novydhillon.github.io/Flock/tracker/'});
  const dialog=dom.window.document.querySelector('dialog');
  dialog.showModal=()=>{dialog.open=true;};
  dialog.close=()=>{dialog.open=false;dialog.dispatchEvent(new dom.window.Event('close'));};
  return {dom,doc:dom.window.document,app:createTracker(dom.window.document,fetcher)};
}
const response = (value,json=false) => ({ok:true,status:200,...(json?{json:async()=>value}:{text:async()=>value})});
test('loads a consistent main snapshot; cards filter, open safely and restore focus',async()=>{
  const requests=[];
  const {app,doc,dom}=setup(async(url,opts)=>{
    requests.push(url);assert.equal(opts.credentials,'omit');
    return url.endsWith('/commits/main') ? response({sha},true) : response(url.endsWith('ISSUES_CLOSED.md')?closed:active);
  });
  await app.refresh();
  assert.equal(requests.length,3);assert.ok(requests.slice(1).every(url=>url.includes(sha)));
  assert.equal(doc.querySelectorAll('.task').length,4);
  assert.equal(doc.querySelector('.open .task').dataset.id,'F-003');
  assert.equal(doc.querySelector('.review .task').dataset.id,'F-002');
  assert.match(doc.querySelector('.open .task').textContent,/Deferred/);
  const card=doc.querySelector('.progress .task');card.click();
  assert.equal(doc.querySelector('dialog').open,true);
  assert.match(doc.getElementById('ticket-title').textContent,/<img/);
  assert.equal(doc.querySelectorAll('#ticket-title img, #ticket-details script').length,0);
  assert.match(doc.querySelector('.branch').href,/feature%2Fexample$/);
  assert.match(doc.getElementById('ticket-source').href,new RegExp(`/blob/${sha}/docs/ISSUES.md$`));
  doc.getElementById('close-dialog').click();assert.equal(doc.activeElement.dataset.id,'F-001');
  const search=doc.getElementById('search');search.value='feature/complete';search.dispatchEvent(new dom.window.Event('input'));
  assert.equal(doc.querySelectorAll('.task').length,1);
  search.value='';search.dispatchEvent(new dom.window.Event('input'));
  const priority=doc.getElementById('priority');priority.value='P0';priority.dispatchEvent(new dom.window.Event('change'));
  assert.equal(doc.querySelectorAll('.task').length,1);
  assert.equal(doc.querySelector('.task').dataset.id,'F-002');
});
test('failure never presents a partial board; later refresh recovers and preserves good snapshot on failure',async()=>{
  let failing=true;
  const {doc,app}=setup(async url=>{
    if(url.endsWith('/commits/main'))return response({sha},true);
    if(failing&&url.endsWith('ISSUES_CLOSED.md'))return {ok:false,status:503};
    return response(url.endsWith('ISSUES_CLOSED.md')?closed:active);
  });
  await app.refresh();assert.equal(doc.querySelectorAll('.task').length,0);assert.match(doc.getElementById('notice').textContent,/no partial board/);
  assert.equal(doc.getElementById('refresh').disabled,false);
  failing=false;await app.refresh();assert.equal(doc.querySelectorAll('.task').length,4);
  failing=true;await app.refresh();assert.equal(doc.querySelectorAll('.task').length,4);assert.match(doc.getElementById('notice').textContent,/last loaded snapshot/);
});
test('duplicate refreshes are coalesced and missing historical branch is explicit',async()=>{
  let resolveHead,calls=0;
  const {doc,app}=setup(async url=>{
    calls++;
    if(url.endsWith('/commits/main'))return new Promise(resolve=>{resolveHead=()=>resolve(response({sha},true));});
    return response(url.endsWith('ISSUES_CLOSED.md')?closed:active);
  });
  const first=app.refresh();await app.refresh();assert.equal(calls,1);resolveHead();await first;
  doc.querySelector('[data-id="F-002"]').click();assert.match(doc.getElementById('ticket-meta').textContent,/Not recorded/);
  assert.equal(doc.querySelector('[draggable="true"]'),null);
});
test('a successful HTTP response with a malformed archive is rejected as a partial snapshot',async()=>{
  const {doc,app}=setup(async url=> url.endsWith('/commits/main') ? response({sha},true) : response(url.endsWith('ISSUES_CLOSED.md')?'<!doctype html>upstream error':active));
  await app.refresh();
  assert.equal(doc.querySelectorAll('.task').length,0);
  assert.match(doc.getElementById('notice').textContent,/missing or malformed/);
});
