import test from 'node:test';
import assert from 'node:assert/strict';
import { suiteFiles } from '../scripts/test-suite.mjs';
import { checkedGameBuild } from '../scripts/build-checked.mjs';

test('test selectors partition the actual regression suite without omissions', () => {
  const all = suiteFiles('all'),
    game = suiteFiles('game'),
    tracker = suiteFiles('tracker');
  assert.ok(game.length > 0 && tracker.length > 0);
  assert.deepEqual([...game, ...tracker].sort(), all);
  assert.ok(tracker.every((file) => file.startsWith('tests/tracker-')));
  assert.ok(game.every((file) => !file.startsWith('tests/tracker-')));
  assert.throws(() => suiteFiles('unknown'));
});

test('checked game builds run game tests and validate release plus QA for both development destinations', () => {
  for (const environment of ['dev', 'dev_performance', 'production']) {
    const calls = [];
    checkedGameBuild(environment, (command, args) => calls.push(args), undefined);
    const format = calls.find((args) => args.includes('format:check'));
    assert.ok(format);
    assert.deepEqual(format.slice(-2), ['--', 'game']);
    assert.ok(calls.some((args) => args.includes('test:game')));
    assert.ok(calls.every((args) => !args.includes('test:tracker') && !args.includes('build:tracker')));
    assert.deepEqual(
      calls.filter((args) => args[0] === 'scripts/check-build-mode.mjs').map((args) => args[1]),
      environment === 'production' ? ['release'] : ['release', 'development'],
    );
    assert.equal(
      calls.some((args) => args.includes('build:dev')),
      environment !== 'production',
    );
  }
  const calls = [];
  assert.throws(() => checkedGameBuild('tracker', (...args) => calls.push(args)));
  assert.throws(() => checkedGameBuild('typo', (...args) => calls.push(args)));
  assert.equal(calls.length, 0);
});
