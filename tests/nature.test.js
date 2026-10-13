import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { MeadowNature, weatherForLevel, safeWildlifePosition, stepWildlife } from '../src/nature.js';

function meadow(index = 0) {
  return { index, seed: 42 + index, bounds: { minX: -40, maxX: 60, minZ: -60, maxZ: 60 },
    dog: { x: -20, z: 0 }, spawn: { x: -20, z: 0 }, animals: [{ x: -15, z: 0 }],
    roads: [{ points: [{ x: -25, z: 0 }, { x: 40, z: 0 }], width: 4 }], rivers: [], obstacles: [], fenceSegments: [] };
}

test('weather is bounded, deterministic, and snow is unavailable during first eight levels', () => {
  const types = new Set();
  for (let index = 0; index < 100; index++) {
    const config = weatherForLevel(meadow(index)); types.add(config.type);
    assert.deepEqual(config, weatherForLevel(meadow(index)));
    assert.ok(config.particles <= 128); assert.ok(config.birds + config.squirrels + config.butterflies <= 16);
    if (index < 8) assert.notEqual(config.type, 'snow');
  }
  assert.equal(types.size, 4);
  assert.equal(weatherForLevel({ index: 7, weather: 'snow' }).type, 'sun');
  assert.equal(weatherForLevel({ index: 8, weather: { type: 'snow' } }).type, 'snow');
});

test('wildlife spawns off routes on traversable ground and clear of the flock', () => {
  const level = meadow(), threats = [level.dog, ...level.animals];
  assert.equal(safeWildlifePosition(level, { x: 0, z: 0 }, threats), false);
  assert.equal(safeWildlifePosition(level, { x: -20, z: 7 }, threats), false);
  assert.equal(safeWildlifePosition(level, { x: 0, z: 20 }, threats), true);
  const nature = new MeadowNature(new THREE.Scene()); nature.setLevel(level);
  assert.ok(nature.wildlife.every(a => a.visible && safeWildlifePosition(level, a, threats)));
  nature.dispose();
});

test('wildlife flees actual nearby animals and ground critters obey occupancy', () => {
  const level = meadow(), bird = { kind: 'bird', x: 0, z: 10, homeX: 0, homeZ: 10, phase: 0 };
  stepWildlife(level, bird, .1, [{ x: 0, z: 9 }]);
  assert.ok(bird.z > 10); assert.equal(bird.fleeing, true);
  const squirrel = { kind: 'squirrel', x: 0, z: 10, homeX: 0, homeZ: 10, phase: 0 };
  const before = { ...squirrel }; let calls = 0;
  stepWildlife(level, squirrel, .1, [{ x: 0, z: 9 }], 0, () => { calls++; return false; });
  assert.equal(squirrel.x, before.x); assert.equal(squirrel.z, before.z); assert.ok(calls >= 1);
});

test('wildlife continues to avoid delivered robots inside their destination', () => {
  const nature = new MeadowNature(new THREE.Scene()), level = meadow(); nature.setLevel(level);
  const bird = nature.wildlife.find(a => a.kind === 'bird');
  Object.assign(bird, { x: 0, z: 20, homeX: 0, homeZ: 20, visible: true });
  nature.update(.1, { dog: level.dog, animals: [{ x: 0, z: 19, saved: true }] });
  assert.equal(bird.fleeing, true);
  assert.ok(bird.z > 20);
  nature.dispose();
});

test('wildlife also avoids nearby robotic companions', () => {
  const nature = new MeadowNature(new THREE.Scene()), level = meadow(); nature.setLevel(level);
  const bird = nature.wildlife.find(a => a.kind === 'bird');
  for (const type of ['helper', 'drone']) {
    Object.assign(bird, { x: 0, z: 20, homeX: 0, homeZ: 20, visible: true });
    level.helpers = [{ type, x: 0, z: 19 }];
    nature.update(.1, { dog: level.dog, animals: [] });
    assert.equal(bird.fleeing, true);
    assert.ok(bird.z > 20);
  }
  nature.dispose();
});

test('clouds cross the playfield with matched soft shadows; pause freezes all ambience', () => {
  const nature = new MeadowNature(new THREE.Scene()), level = meadow(10); nature.setLevel(level);
  const cloud = nature.clouds[0], before = cloud.x;
  nature.update(.1, { dog: level.dog, animals: level.animals }); assert.ok(cloud.x > before);
  const matrix = new THREE.Matrix4(); nature.batches.shadow.getMatrixAt(0, matrix);
  const shadow = new THREE.Vector3().setFromMatrixPosition(matrix);
  assert.ok(Math.abs(shadow.x - cloud.x - 1.5) < .001);
  assert.equal(nature.batches.shadow.material.depthWrite, false);
  assert.ok(nature.batches.shadow.material.map.image.data.some((value, i) => i % 4 === 3 && value > 0 && value < 255));
  const state = JSON.stringify({ time: nature.time, clouds: nature.clouds, animals: nature.wildlife });
  nature.update(.1, { paused: true });
  assert.equal(JSON.stringify({ time: nature.time, clouds: nature.clouds, animals: nature.wildlife }), state);
  nature.dispose();
});

test('nature has bounded draws and disposes every level resource once on replacement', () => {
  const scene = new THREE.Scene(), nature = new MeadowNature(scene); nature.setLevel({ ...meadow(9), weather: 'rain' });
  const resources = [...nature.resources], counts = new Map(resources.map(r => [r, 0]));
  for (const resource of resources) resource.addEventListener('dispose', () => counts.set(resource, counts.get(resource) + 1));
  let draws = 0; nature.root.traverse(o => { if (o.isMesh || o.isPoints) draws++; }); assert.ok(draws <= 11);
  for (const batch of Object.values(nature.batches)) assert.ok([...batch.instanceMatrix.array].every(Number.isFinite));
  nature.setLevel(meadow(20)); assert.ok([...counts.values()].every(count => count === 1));
  const root = nature.root; nature.dispose(); assert.equal(root.parent, null); assert.equal(nature.resources.size, 0);
  nature.dispose();
});
