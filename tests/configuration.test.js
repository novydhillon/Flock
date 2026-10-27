import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolveConfig } from '../src/config/resolve.js';
import { CONFIG_CONTRACTS } from '../src/config/contracts.js';

const documentFor = area => JSON.parse(readFileSync(new URL(`../src/config/${area}.json`, import.meta.url), 'utf8'));
const resolve = (document, area = 'gameplay') => resolveConfig(document, area, CONFIG_CONTRACTS[area]);

// Load the actual ES module with one JSON import replaced, retaining genuine
// resolver, domain helpers and native JSON import-attribute behavior.
function configuredModuleURL(file, document, area = 'gameplay', dependencies = {}) {
  const url = new URL(`../src/${file}.js`, import.meta.url);
  const json = 'data:application/json,' + encodeURIComponent(JSON.stringify(document)).replaceAll("'", '%27');
  const source = readFileSync(url, 'utf8').replace(/from (['"])(\.\.?\/[^'"]+)\1/g,
    (_match, quote, relative) => `from ${quote}${dependencies[relative] || (relative === './config/' + area + '.json' ? json : new URL(relative, url).href)}${quote}`);
  return 'data:text/javascript,' + encodeURIComponent(source).replaceAll("'", '%27');
}
const configuredModule = (...args) => import(configuredModuleURL(...args));

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

test('configured bark pressure reaches the real simulation at every owned tier', async () => {
  const progression = documentFor('progression');
  progression.effects.bark.baseMultiplier.value = 2;
  progression.effects.bark.tierOneBoost.value = .5;
  progression.effects.bark.advancedMultiplier.value = 1.5;
  const api = await configuredModule('simulation', documentFor('gameplay'), 'gameplay', {
    './progression.js': configuredModuleURL('progression', progression, 'progression'),
  });
  const gameplay = resolve(documentFor('gameplay'));
  const radius = gameplay.simulation.signalRadius + gameplay.simulation.barkRadiusBoost;
  const falloff = (1 - 3 / radius) ** gameplay.simulation.pressureExponent;
  for (const [tier, multiplier] of [2, 2.5, 3.75, 3.75].entries()) {
    const level = {index: 16, seed: 48, time: 0, bounds: {minX:-100,maxX:100,minZ:-100,maxZ:100},
      spawn:{x:0,z:0},target:{x:40,z:40,radius:8,heading:0},helpers:[],routes:[],
      obstacles:[],rivers:[],gates:[],fenceSegments:[],
      animals:[{id:0,type:'sheep',x:3,z:0,vx:0,vz:0,saved:false}]};
    api.stepSimulation(level, {x:0,z:0}, {bark:true}, 1/60, {bark:tier});
    assert.equal(level.animals[0].alert, falloff * multiplier, `owned bark tier ${tier}`);
  }
});

test('configured progression charge capacity reaches the real bark state', async () => {
  const progression = documentFor('progression');
  progression.effects.bark.charges.value = [2, 2, 1, 2];
  const policy = await configuredModule('progression', progression, 'progression');
  const bark = await import('../src/bark.js');
  for (const tier of [0, 1, 2, 3]) {
    const effects = policy.upgradeEffects({bark:tier}, 100);
    const state = bark.createBarkState(effects.barkCharges);
    assert.equal(state.capacity, progression.effects.bark.charges.value[tier]);
    assert.equal(bark.triggerBark(state), true);
    assert.equal(bark.triggerBark(state), effects.barkCharges === 2);
  }
  progression.effects.bark.charges.value[3] = 3;
  await assert.rejects(configuredModule('progression', progression, 'progression'), /charges\[3\].*exceeds max 2/);
});

test('crowded saved animals obey edited speed cap during overlap recovery', async () => {
  const document = documentFor('gameplay'); document.saved.maximumSpeed.value = .1;
  const roaming = await configuredModule('saved-roaming', document);
  const level = {time:1,seed:48,bounds:{minX:-30,maxX:30,minZ:-30,maxZ:30},
    target:{x:0,z:0,radius:8,heading:0},obstacles:[],rivers:[],gates:[],fenceSegments:[],
    animals:Array.from({length:5},(_,id)=>({id,type:'sheep',saved:true,x:1+(id%2)*.01,z:1+Math.floor(id/2)*.01,vx:0,vz:0}))};
  const before = level.animals.map(animal=>({x:animal.x,z:animal.z}));
  roaming.roamSavedAnimals(level,.1,1);
  assert.ok(level.animals.some((animal,id)=>Math.hypot(animal.x-before[id].x,animal.z-before[id].z)>0), 'crowding recovers through physical motion');
  for (const [id,animal] of level.animals.entries()) {
    assert.ok(Math.hypot(animal.x-before[id].x,animal.z-before[id].z)<=.1*.1+1e-12, `saved animal ${id} exceeded configured speed`);
  }
});
