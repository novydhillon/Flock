import assert from 'node:assert/strict';
import test from 'node:test';
import { defaultProfile } from '../src/progression/profile.js';
import { adoptKennelDog, assignKennelDog, buyKennelSlot } from '../src/progression/kennel.js';
import { buyDogTraining } from '../src/progression/dog-training.js';
import { prepareMeadowLineup } from '../src/progression/meadow-lineup.js';
import { stepSimulation } from '../src/simulation/simulation.js';
import { createLevel } from '../src/world/world.js';

function enter(profile) {
  const level = createLevel(0);
  prepareMeadowLineup(level, level.dog, profile);
  return level;
}
const point = ({ x, z }) => ({ x, z });
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

test('a four-dog meadow-one replay runs the selected lead and three distinct CPU partners', () => {
  const profile = { ...defaultProfile(), points: 20000, highestLevel: 59 };
  for (const slot of [2, 3, 4]) assert.ok(buyKennelSlot(profile, slot).ok);
  const lead = adoptKennelDog(profile, 'dog-10', 'Fern').dog;
  const first = adoptKennelDog(profile, 'dog-3', 'Moss').dog;
  const second = adoptKennelDog(profile, 'dog-3', 'Moss').dog;
  for (const [slot, id] of [
    [1, lead.id],
    [2, 'buddy'],
    [3, first.id],
    [4, second.id],
  ])
    assert.ok(assignKennelDog(profile, slot, id).ok);
  assert.ok(buyDogTraining(profile, lead.id, 'speed').ok);
  assert.ok(buyDogTraining(profile, first.id, 'influence').ok);
  const level = enter(profile);
  const actors = [level.dog, ...level.helpers];
  assert.deepEqual(
    actors.map((actor) => actor.id),
    [lead.id, 'buddy', first.id, second.id],
  );
  assert.equal(level.dog.model, 'buddy');
  assert.ok(level.dog.trainingEffects.maxSpeed > level.helpers[0].trainingEffects.maxSpeed);
  assert.ok(level.helpers[1].trainingEffects.signalBoost > level.helpers[2].trainingEffects.signalBoost);
  const starts = actors.map(point);
  assert.ok(starts.every((p, i) => starts.slice(i + 1).every((other) => distance(p, other) > 1.5)));

  for (let i = 0; i < 180; i++) stepSimulation(level, level.dog, { z: 1 }, 1 / 60);
  assert.ok(level.dog.z > starts[0].z + 10);
  assert.ok(level.helpers.every((helper, index) => distance(helper, starts[index + 1]) > 0.5));
  assert.ok(level.helpers.some((helper) => helper.clusterIds.length));
  const subjects = level.helpers.flatMap((helper) => helper.clusterIds);
  assert.equal(new Set(subjects).size, subjects.length);
  assert.equal(new Set(level.helpers.map((helper) => helper.barkState)).size, 3);

  assert.ok(assignKennelDog(profile, 3, null).ok);
  const replay = enter(profile);
  assert.deepEqual(
    level.helpers.map((helper) => helper.slot),
    [2, 3, 4],
  );
  assert.deepEqual(
    replay.helpers.map((helper) => helper.slot),
    [2, 4],
  );
  assert.equal(replay.helpers[0].barkState, undefined);
});

test('an unassigned CPU position stays empty even with legacy helper purchases', () => {
  const level = enter(defaultProfile());
  stepSimulation(level, level.dog, {}, 1 / 60, { helper: 3, drone: 1 });
  assert.equal(level.dog.id, 'buddy');
  assert.deepEqual(level.helpers, []);
});
