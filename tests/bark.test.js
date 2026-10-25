import test from 'node:test';
import assert from 'node:assert/strict';
import { createBarkState, stepBark, triggerBark, BARK_COOLDOWN } from '../src/bark.js';
import { upgradeEffects, UPGRADE_CATALOG } from '../src/progression.js';

test('level-two strength is exactly 33 percent above level one and respects meadow gates', () => {
  const first = upgradeEffects({bark:1}, 100), second = upgradeEffects({bark:2}, 100), third = upgradeEffects({bark:3}, 100);
  assert.equal(second.barkMultiplier, first.barkMultiplier * 1.33);
  assert.equal(1.65 + second.barkBoost, second.barkMultiplier);
  assert.equal(third.barkMultiplier, second.barkMultiplier);
  assert.equal(third.barkCharges, 2);
  assert.equal(upgradeEffects({bark:3}, 8).barkCharges, 1);
  assert.equal(upgradeEffects({bark:3}, 4).barkMultiplier, first.barkMultiplier);
  assert.ok(UPGRADE_CATALOG.find(item=>item.id==='bark').tierDescriptions[1].includes('+33%'));
});

test('two barks are available before cooldown and both recover only at its end', () => {
  const state = createBarkState(2);
  assert.equal(triggerBark(state), true);
  assert.equal(state.charges, 1);
  assert.equal(state.remaining, 0);
  stepBark(state, .7);
  assert.equal(triggerBark(state), true);
  assert.equal(state.charges, 0);
  assert.equal(state.remaining, BARK_COOLDOWN);
  assert.equal(triggerBark(state), false);
  stepBark(state, BARK_COOLDOWN - .01);
  assert.equal(triggerBark(state), false);
  stepBark(state, .01);
  assert.equal(state.charges, 2);
  assert.equal(triggerBark(state), true);
});

test('single bark, pause, restart and independent player state preserve ownership', () => {
  const first = createBarkState(), other = createBarkState();
  assert.equal(triggerBark(first), true);
  assert.equal(triggerBark(first), false);
  assert.equal(triggerBark(other), true);
  const snapshot = {...first};
  stepBark(first, 0);
  assert.deepEqual(first, snapshot);
  stepBark(first, .2);
  assert.ok(Math.abs(first.remaining - 1.9) < 1e-8);
  assert.equal(createBarkState(2).charges, 2);
});
