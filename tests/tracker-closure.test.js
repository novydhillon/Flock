import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

const active = '# Active\n\n| ID | Priority | Type | Item | Status | Depends on |\n|---|---|---|---|---|---|\n| F-TEST-001 | P2 | Test | Accepted work | Review | — |\n\n### F-TEST-001 — Accepted work\n\n**Status:** Review.\n\n**Accept when:** Preserve this criterion.\n\n### F-TEST-002 — Other work\n\nKeep this active.\n';
const archive = '# Archive\n\n| ID | Priority | Type | Item | Status | Depends on |\n|---|---|---|---|---|---|\n';
function fixture(t) {
  const root=mkdtempSync(join(tmpdir(),'flock-archive-'));
  mkdirSync(join(root,'docs'));
  writeFileSync(join(root,'docs/ISSUES.md'),active);
  writeFileSync(join(root,'docs/ISSUES_CLOSED.md'),archive);
  t.after(()=>rmSync(root,{recursive:true,force:true}));
  const run=(...options)=>spawnSync('python3',[resolve('scripts/close-tracker-items.py'),'F-TEST-001','--root',root,'--date','6 November 2026','--reason','Explicitly accepted',...options],{encoding:'utf8'});
  return {root,run};
}
test('tracker archive dry-run leaves both files unchanged',t=>{
  const {root,run}=fixture(t);assert.equal(run().status,0);
  assert.equal(readFileSync(join(root,'docs/ISSUES.md'),'utf8'),active);
  assert.equal(readFileSync(join(root,'docs/ISSUES_CLOSED.md'),'utf8'),archive);
});
test('tracker archive applies full detail/row with acceptance and rejects duplicate closure',t=>{
  const {root,run}=fixture(t);assert.equal(run('--apply').status,0);
  const a=readFileSync(join(root,'docs/ISSUES.md'),'utf8'),b=readFileSync(join(root,'docs/ISSUES_CLOSED.md'),'utf8');
  assert.doesNotMatch(a,/F-TEST-001/);assert.match(a,/F-TEST-002/);
  assert.match(b,/\| ~~F-TEST-001~~ \|/);assert.match(b,/### F-TEST-001 — ~~Accepted work~~/);
  assert.match(b,/Preserve this criterion/);assert.match(b,/6 November 2026\. Explicitly accepted/);
  assert.notEqual(run('--apply').status,0);assert.equal(readFileSync(join(root,'docs/ISSUES_CLOSED.md'),'utf8'),b);
});
