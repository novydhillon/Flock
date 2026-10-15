import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateWanderOpportunity, wanderCohortSize, WANDER_OPPORTUNITY_SECONDS } from '../src/wandering.js';
import { createLevel, stepSimulation, canOccupy } from '../src/simulation.js';

const flock = count => Array.from({ length: count }, (_, id) => ({ id, x: id * 1.5, z: 0, saved: false }));
const center = { x: 0, z: 0 };

test('wandering is level gated, seeded, and suppressed while Pip actively herds', () => {
  const animals = flock(40), subject = animals[0];
  for (const index of [0, 6]) assert.equal(evaluateWanderOpportunity({ index, seed: 12, animals, time: 10 }, subject, 2, center), null);
  assert.equal(evaluateWanderOpportunity({ index: 7, seed: 12, animals, time: 10 }, subject, 2, center, true), null);
  const level = { index: 7, seed: 12, animals, time: 10 };
  assert.deepEqual(evaluateWanderOpportunity(level, subject, 2, center), evaluateWanderOpportunity(level, subject, 2, center), 'same seed and opportunity repeat exactly');
});

test('cohort rounding never exceeds 15 percent and the cadence is fixed-time', () => {
  assert.equal(wanderCohortSize(5), 0);
  assert.equal(wanderCohortSize(9), 1);
  assert.equal(wanderCohortSize(65), 9);
  assert.equal(WANDER_OPPORTUNITY_SECONDS, 5);
});

test('wandering and conditional bolts obey gates and bounded durations', () => {
  const animals = flock(60), subject = animals[0];
  let wander = null, bolt = null;
  for (let seed = 0; seed < 2000 && (!wander || !bolt); seed++) {
    for (let opportunity = 0; opportunity < 10; opportunity++) {
      const level = { index: 15, seed, animals, time: 20 };
      wander ||= evaluateWanderOpportunity(level, subject, opportunity, center);
      const candidate = evaluateWanderOpportunity({ ...level, index: 16 }, subject, opportunity, center);
      if (candidate?.bolting) bolt ||= candidate;
    }
  }
  assert.ok(wander, 'the deterministic fixture includes a successful 33% wander roll');
  assert.equal(wander.bolting, false, 'level 16 is public level 16, still no bolts');
  assert.ok(bolt?.bolting, 'a seeded level-17+ conditional bolt fixture exists');
  assert.ok(bolt.until - 20 >= 1 && bolt.until - 20 <= 3, 'bolt duration stays within 1–3 seconds');
});

test('fixed seeded opportunities stay within the intended wander and conditional-bolt bands', () => {
  let eligible = 0, wandered = 0, bolted = 0;
  for (let seed = 1; seed <= 500; seed++) {
    const animals = flock(60), level = { index: 16, seed, animals, time: 20 };
    for (const animal of animals) {
      const result = evaluateWanderOpportunity(level, animal, 3, center);
      if (level.wanderCohort.has(animal.id)) eligible++;
      if (result) { wandered++; if (result.bolting) bolted++; }
    }
  }
  assert.equal(eligible, 4500, 'exactly floor(15% × 60) animals are selected per seed');
  assert.ok(wandered / eligible > 0.29 && wandered / eligible < 0.37, `33% wander band observed ${wandered}/${eligible}`);
  assert.ok(bolted / wandered > 0.06 && bolted / wandered < 0.14, `10% conditional bolt band observed ${bolted}/${wandered}`);
});

test('simulation applies seeded wander goals through normal body collision and excludes saved animals', () => {
  const level = createLevel(7, 1);
  level.animals.forEach(animal => { animal.saved = animal.id !== 8; });
  level.dog = { x: level.bounds.minX + 2, z: level.bounds.minZ + 2 };
  const saved = level.animals.filter(animal => animal.saved);
  for (let frame = 0; frame < 51; frame++) stepSimulation(level, level.dog, {}, 0.1);
  const wanderer = level.animals.find(animal => animal.wander);
  assert.equal(wanderer?.id, 8, 'the seeded five-second opportunity starts the expected unsaved animal');
  assert.equal(saved.some(animal => animal.wander), false, 'saved animals never receive straggler state');
  assert.ok(canOccupy(level, wanderer.x, wanderer.z, 0.55), 'wander movement retains solid collision clearance');
});

test('seeded bolt remains active for its full rolled duration unless herding or delivery cancels it', () => {
  const level = createLevel(16, 6), animal = level.animals.find(candidate => candidate.id === 45);
  level.dog = { x: level.bounds.minX + 2, z: level.bounds.minZ + 2 };
  for (let frame = 0; frame < 50; frame++) stepSimulation(level, level.dog, {}, 0.1);
  const bolt = animal.wander;
  assert.equal(bolt?.bolting, true, 'seed 6 assigns the reported animal a level-17 bolt at the first opportunity');
  const remaining = bolt.until - level.time;
  assert.ok(remaining >= 1 && remaining <= 3);
  for (let frame = 0; level.time + 0.1 < bolt.until; frame++) {
    stepSimulation(level, level.dog, {}, 0.1);
    assert.equal(animal.wander, bolt, `bolt state remains active before its deadline (frame ${frame})`);
  }
  assert.ok(Math.hypot(animal.x - bolt.x, animal.z - bolt.z) > 0.35, 'the distant target cannot truncate the timed bolt');
  stepSimulation(level, level.dog, {}, 0.1);
  assert.equal(animal.wander, undefined, 'the simulation clock ends the bolt at its deadline');

  const herded = createLevel(16, 6), herdedAnimal = herded.animals.find(candidate => candidate.id === 45);
  herded.dog = { x: herded.bounds.minX + 2, z: herded.bounds.minZ + 2 };
  for (let frame = 0; frame < 50; frame++) stepSimulation(herded, herded.dog, {}, 0.1);
  assert.equal(herdedAnimal.wander?.bolting, true);
  Object.assign(herded.dog, { x: herdedAnimal.x, z: herdedAnimal.z });
  stepSimulation(herded, herded.dog, {}, 0.1);
  assert.equal(herdedAnimal.wander, undefined, 'clear active Pip pressure cancels a current bolt');

  const delivered = createLevel(16, 6), deliveredAnimal = delivered.animals.find(candidate => candidate.id === 45);
  Object.assign(deliveredAnimal, { x: delivered.target.x, z: delivered.target.z,
    wander: { x: delivered.target.x + 24, z: delivered.target.z, until: 3, bolting: true } });
  delivered.dog = { x: delivered.target.x, z: delivered.target.z };
  stepSimulation(delivered, delivered.dog, {}, 0.1);
  assert.equal(deliveredAnimal.saved, true);
  assert.equal(deliveredAnimal.wander, undefined, 'delivery clears straggler state before saved-animal roaming');
});

