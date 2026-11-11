import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { deploymentPlan } from '../scripts/deploy-pages.mjs';

test('tracker planner publishes an independent dependency-complete artifact only under tracker/', (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'flock-tracker-plan-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  mkdirSync(join(dir, 'assets'));
  writeFileSync(
    join(dir, 'index.html'),
    '<a href="../">Game</a><script src="./assets/tracker.js"></script><link rel="stylesheet" href="./assets/tracker.css">',
  );
  writeFileSync(join(dir, 'assets/tracker.js'), 'export const tracker = true;');
  writeFileSync(join(dir, 'assets/tracker.css'), 'body{color:green}');
  const options = { environment: 'tracker', branch: 'main', sourceSha: 'a'.repeat(40), directory: dir };
  const plan = deploymentPlan(options);
  assert.equal(plan.url, 'https://novydhillon.github.io/Flock/tracker/');
  assert.ok(plan.files.every((file) => file.path.startsWith('tracker/')));
  assert.throws(() => deploymentPlan({ ...options, branch: 'feature/tracker' }));
  rmSync(join(dir, 'assets/tracker.css'));
  assert.throws(() => deploymentPlan(options), /Missing or unsafe build asset/);
});
