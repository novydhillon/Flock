import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { checkDeployTarget } = require('../scripts/check-deploy-target.cjs');
const { waitForPages } = require('../scripts/wait-for-pages.cjs');

const valid = {
  environment: 'dev',
  ref: 'refs/heads/feature/test',
  publishToken: 'test-placeholder',
};

test('preflight permits canonical targets and rejects invalid destinations or missing authorization inputs', () => {
  assert.doesNotThrow(() => checkDeployTarget(valid));
  assert.doesNotThrow(() => checkDeployTarget({
    ...valid, environment: 'production', ref: 'refs/heads/main', confirmation: 'deploy-production',
  }));
  for (const change of [
    { environment: 'other' },
    { ref: 'refs/tags/release' },
    { ref: 'refs/heads/main' },
    { environment: 'production' },
    { environment: 'production', ref: 'refs/heads/main' },
    { publishToken: '' },
  ]) assert.throws(() => checkDeployTarget({ ...valid, ...change }));
});

const sha = 'a'.repeat(40);
function polling(states, overrides = {}) {
  let calls = 0;
  let sleeps = 0;
  let verifications = 0;
  const options = {
    github: { rest: { repos: { listPagesBuilds: async () => ({
      data: states[Math.min(calls++, states.length - 1)],
    }) } } },
    context: { repo: { owner: 'fixture', repo: 'fixture' } },
    core: { info() {} },
    pagesSha: sha,
    attempts: 3,
    intervalMs: 0,
    sleep: async () => { sleeps++; },
    verify: async () => { verifications++; },
    ...overrides,
  };
  return { options, counts: () => ({ calls, sleeps, verifications }) };
}

test('polling ignores unrelated completed builds and waits for the exact Pages SHA', async () => {
  const f = polling([
    [{ commit: 'b'.repeat(40), status: 'built' }],
    [{ commit: sha, status: 'building' }],
    [{ commit: sha, status: 'built' }],
  ]);
  await waitForPages(f.options);
  assert.deepEqual(f.counts(), { calls: 3, sleeps: 2, verifications: 1 });
});

test('built Pages retries stale CDN hashes and succeeds only after verification', async () => {
  let checked = 0;
  const f = polling([[{ commit: sha, status: 'built' }]], {
    verify: async () => { if (++checked < 2) throw Error('Live hash mismatch'); },
  });
  await waitForPages(f.options);
  assert.equal(checked, 2);
  assert.equal(f.counts().sleeps, 1);
});

test('native error, pending timeout and persistent CDN mismatch fail closed', async () => {
  const failed = polling([[{ commit: sha, status: 'errored' }]]);
  await assert.rejects(waitForPages(failed.options), /Native Pages build failed/);
  assert.deepEqual(failed.counts(), { calls: 1, sleeps: 0, verifications: 0 });
  const pending = polling([[]]);
  await assert.rejects(waitForPages(pending.options), /Timed out/);
  assert.equal(pending.counts().calls, 3);
  assert.equal(pending.counts().sleeps, 2);
  const stale = polling([[{ commit: sha, status: 'built' }]], {
    verify: async () => { throw Error('Live hash mismatch'); },
  });
  await assert.rejects(waitForPages(stale.options), /Live hash mismatch/);
  assert.equal(stale.counts().calls, 3);
});

test('invalid polling input and API failure cannot report deployment success', async () => {
  const invalid = polling([[]], { pagesSha: '' });
  await assert.rejects(waitForPages(invalid.options), /immutable Pages SHA/);
  assert.equal(invalid.counts().calls, 0);
  await assert.rejects(waitForPages(polling([[]], { attempts: 0 }).options), /polling limits/);
  const apiFailure = polling([[]], {
    github: { rest: { repos: { listPagesBuilds: async () => { throw Error('API unavailable'); } } } },
  });
  await assert.rejects(waitForPages(apiFailure.options), /API unavailable/);
});
