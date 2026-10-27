import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolveConfig } from '../src/config/resolve.js';
import { CONFIG_CONTRACTS } from '../src/config/contracts.js';

const documentFor = area => JSON.parse(readFileSync(new URL(`../src/config/${area}.json`, import.meta.url), 'utf8'));
const resolve = (document, area = 'gameplay') => resolveConfig(document, area, CONFIG_CONTRACTS[area]);

// Load the actual ES module with one JSON import replaced, retaining genuine
// resolver, domain helpers and native JSON import-attribute behavior.
async function configuredModule(file, document, area = 'gameplay') {
  const url = new URL(`../src/${file}.js`, import.meta.url);
  const json = 'data:application/json,' + encodeURIComponent(JSON.stringify(document));
  const source = readFileSync(url, 'utf8').replace(/from (['"])(\.\.?\/[^'"]+)\1/g,
    (_match, quote, relative) => `from ${quote}${relative === './config/' + area + '.json' ? json : new URL(relative, url).href}${quote}`);
  return import('data:text/javascript,' + encodeURIComponent(source));
}

test('every area resolves its documented defaults into deeply frozen values', () => {
  function frozen(value) {
    if (!value || typeof value !== 'object') return;
    assert.ok(Object.isFrozen(value));
    for (const child of Object.values(value)) frozen(child);
  }
  for (const area of Object.keys(CONFIG_CONTRACTS)) frozen(resolve(documentFor(area), area));
});

test('configuration errors identify missing keys, wrong types and unsafe counts', () => {
  const missing = documentFor('gameplay'); delete missing.simulation.dogSpeed;
  assert.throws(() => resolve(missing), /gameplay.simulation.dogSpeed: required setting is missing/);
  const type = documentFor('gameplay'); type.simulation.dogSpeed.value = '7.8';
  assert.throws(() => resolve(type), /gameplay.simulation.dogSpeed: expected number/);
  const budget = documentFor('presentation'); budget.effects.celebrationParticles.value = 3.5;
  assert.throws(() => resolve(budget, 'presentation'), /expected integer/);
  const tuple = documentFor('progression'); tuple.upgrades.speed.costs.value.pop();
  assert.throws(() => resolve(tuple, 'progression'), /array of length 3/);
  const extra = documentFor('gameplay'); extra.simulation.dgoSpeed = extra.simulation.dogSpeed;
  assert.throws(() => resolve(extra), /unknown setting/);
});

test('descriptors reject absent comments, unknown metadata, nonfinite values and invalid bounds', () => {
  const leaf = (value, extra = {}) => ({ value, _comment: 'Test setting.', ...extra });
  for (const descriptor of [
    { value: 1 }, leaf(1, { _comment: ' ' }), leaf(1, { comment: 'Typo.' }),
    leaf(NaN), leaf(Infinity), leaf(1, { min: Infinity }),
    leaf(1, { min: 3, max: 2 }), leaf(-1, { min: 0 }), leaf(2, { max: 1 }),
    leaf([1, 3], { max: 2 }), leaf('1', { min: 0 }), leaf(null),
  ]) assert.throws(() => resolveConfig({ sample: descriptor }, 'fixture'), /fixture.sample/);
  assert.throws(() => resolveConfig({ sample: { _comment: 'Missing value.' } }, 'fixture'), /missing value/);
});

test('genuine bark module consumes edited cooldown and burst settings', async () => {
  const document = documentFor('gameplay');
  document.bark.cooldownSeconds.value = 3.25; document.bark.durationSeconds.value = .9;
  const bark = await configuredModule('bark', document), state = bark.createBarkState();
  assert.equal(bark.triggerBark(state), true);
  assert.equal(state.remaining, 3.25); assert.equal(state.burstRemaining, .9);
  bark.stepBark(state, 3.24); assert.equal(bark.triggerBark(state), false);
  bark.stepBark(state, .01); assert.equal(bark.triggerBark(state), true);
});

test('genuine wandering module consumes cohort and independent interval settings', async () => {
  const document = documentFor('gameplay');
  document.wander.cohortFraction.value = .5; document.wander.checkRange.value = [2, 4];
  const wander = await configuredModule('wandering', document);
  const level = { index: 10, seed: 48, time: 0, animals: Array.from({length: 10}, (_, id) => ({id, saved:false})) };
  assert.equal(wander.prepareWanderCohort(level).size, 5);
  const animal = level.animals[0];
  assert.equal(wander.nextWanderOpportunity(level, animal, .1), null);
  assert.ok(animal.nextWanderCheck >= 1.9 && animal.nextWanderCheck < 3.9);
  level.time = animal.nextWanderCheck;
  assert.equal(wander.nextWanderOpportunity(level, animal, .1), 0);
  assert.ok(animal.nextWanderCheck > level.time);
});

test('genuine body module consumes documented clearance radii', async () => {
  const document = documentFor('gameplay');
  document.body.sheepRadius.value = .65; document.body.cowRadius.value = .9;
  const sizes = await configuredModule('animal-size', document);
  assert.equal(sizes.animalRadius({type:'sheep'}), .65);
  assert.equal(sizes.animalRadius({type:'cow',scale:1.25}), .9 * 1.25);
});

test('native module import fails before gameplay for missing consumed settings', async () => {
  const document = documentFor('gameplay'); delete document.bark.durationSeconds;
  await assert.rejects(configuredModule('bark', document), /gameplay.bark.durationSeconds/);
});

test('wander relationship validation rejects reversed ranges at module import', async () => {
  const document = documentFor('gameplay'); document.wander.checkRange.value = [8, 5];
  await assert.rejects(configuredModule('wandering', document), /minimum exceeds maximum/);
});

test('weather cumulative probability and tier unlock ordering fail clearly', async () => {
  const weather = documentFor('weather'); weather.selection.stormCutoffs.value = [.5, .3, .6, .8];
  await assert.rejects(configuredModule('weather', weather, 'weather'), /cumulative cutoffs must be ordered/);
  const progression = documentFor('progression'); progression.upgrades.speed.unlockLevels.value = [6, 2, 11];
  await assert.rejects(configuredModule('progression', progression, 'progression'), /tier unlock levels must be ordered/);
});
