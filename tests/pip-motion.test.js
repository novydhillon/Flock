import test from 'node:test';
import assert from 'node:assert/strict';
import { createPipMotionState, updatePipMotion } from '../src/rendering/animation/pip-motion.js';

const [stand, sit, bow, lie, scratch, roll] = [-1, 0, 1, 2, 3, 4];

function step(s, speed, heading = 0, dt = 1 / 60, barking = false, nearAnimal = false, nearbyAnimals) {
  return updatePipMotion(
    s,
    {
      x: (s.previous?.x ?? 0) + dt * speed * Math.sin(heading),
      z: (s.previous?.z ?? 0) + dt * speed * Math.cos(heading),
      vx: speed * Math.sin(heading),
      vz: speed * Math.cos(heading),
      heading,
      barking,
      nearAnimal,
      nearbyAnimals,
    },
    dt,
  );
}

test('pace blends continuously during acceleration and deceleration without restarting the stride', () => {
  for (const puppy of [false, true]) {
    const s = createPipMotionState(puppy);
    let blended = 0,
      fastest = 0;
    for (let i = 0; i < 480; i++) {
      const speed = i < 240 ? i / 24 : (480 - i) / 24;
      const lastBlend = s.run,
        lastPhase = s.stride;
      step(s, speed);
      if (s.run > 0 && s.run < 1) blended++;
      fastest = Math.max(s.run, fastest);
      assert.ok(Math.abs(lastBlend - s.run) < 0.025);
      assert.ok((s.stride - lastPhase + 1) % 1 < 0.13);
    }
    assert.ok(blended > 50);
    assert.equal(fastest, 1);
    assert.equal(s.run, 0);
  }
});

test('positive and negative heading wrap produce mirrored, bounded turn rates', () => {
  const left = createPipMotionState(),
    right = createPipMotionState();
  for (let i = 0; i < 120; i++) {
    const angle = Math.atan2(Math.sin(3 + i / 60), Math.cos(3 + i / 60));
    step(left, 3, angle);
    step(right, 3, -angle);
    assert.ok(Math.abs(left.turnRate + right.turnRate) < 1e-9);
    assert.ok(Math.abs(left.turnRate) < 1.001);
  }
  assert.ok(left.turnRate > 0.98);
});

test('Buddy settles earlier, and play bows require a nearby animal', () => {
  const adult = createPipMotionState(),
    puppy = createPipMotionState(true),
    playful = createPipMotionState(true, () => 0);
  for (let i = 0; i < 90; i++) {
    step(adult, 0);
    step(puppy, 0);
    step(playful, 0, 0, 1 / 60, false, true);
  }
  assert.equal(adult.poseIndex, stand);
  assert.equal(puppy.poseIndex, sit);
  assert.equal(playful.poseIndex, bow);
  assert.ok(playful.idleWeight > 0.95);
  step(playful, 0);
  assert.notEqual(playful.poseIndex, bow);
  assert.ok(playful.poseWeights[bow] > 0 && playful.poseWeights[bow] < 1);
  step(playful, 0, 0, 0.52);
  for (let i = 0; i < 600; i++) {
    step(playful, 0, 0, 0.5);
    assert.notEqual(playful.poseIndex, bow);
    assert.equal(playful.poseWeights[bow], 0);
  }
  for (let i = 0; i < 50; i++) step(puppy, 3, 0, 1 / 60, i < 15);
  assert.equal(puppy.poseIndex, stand);
  assert.equal(puppy.idleWeight, 0);
  assert.ok(puppy.bark < 0.001);
});

for (const puppy of [false, true]) {
  test(`${puppy ? 'Buddy' : 'Pip'} idle dwells vary within their old-duration multipliers and blend directly`, () => {
    const previousDuration = [3.8, 2.15, 4.4, 2.8, 3.45];
    const s = createPipMotionState(puppy);
    const twin = createPipMotionState(puppy);
    const held = new Map();
    const advance = () => {
      step(s, 0, 0, 0.05, false, true);
      step(twin, 0, 0, 0.05, false, true);
      assert.equal(s.poseIndex, twin.poseIndex);
      assert.equal(s.poseDuration, twin.poseDuration);
    };
    for (let i = 0; i < 24000; i++) {
      const { poseIndex, poseTime, poseDuration } = s;
      advance();
      if (poseIndex === s.poseIndex || poseIndex === stand) continue;

      const multiplier = poseDuration / (previousDuration[poseIndex] * (puppy ? 0.82 : 1));
      const min = poseIndex === scratch ? 1 : poseIndex === lie ? 3 : 2;
      const max = poseIndex === scratch ? 3 : poseIndex === lie ? 8 : 5;
      assert.ok(multiplier >= min && multiplier <= max);
      assert.ok(poseTime >= poseDuration - 0.051);
      if (!held.has(poseIndex)) held.set(poseIndex, new Set());
      held.get(poseIndex).add(poseDuration);
      assert.equal(s.idleWeight, 1);
      if (s.poseIndex === scratch) assert.equal(poseIndex, sit);
      if (poseIndex === scratch) assert.equal(s.poseIndex, sit);
      advance();
      assert.ok(s.poseWeights[s.poseIndex] > 0 && s.poseWeights[poseIndex] < 1);
      assert.ok(Math.abs(s.idleWeight - 1) < 1e-12);
    }
    for (const pose of [sit, bow, lie, scratch, roll]) assert.ok(held.get(pose)?.size > 1, `pose ${pose}`);
  });
}

test('animal arrivals prompt a bow from sit and lie, then blend into the other rest pose', () => {
  const s = createPipMotionState(false, () => 0);
  const advance = (nearAnimal = false) => step(s, 0, 0, 0.05, false, nearAnimal);
  for (let i = 0; i < 50; i++) advance();
  for (const [from, to] of [
    [sit, lie],
    [lie, sit],
  ]) {
    assert.equal(s.poseWeights[from], 1);
    advance(true);
    assert.equal(s.poseIndex, bow);
    assert.ok(s.poseWeights[bow] > 0 && s.poseWeights[from] > 0);
    for (let i = 0; i < 150 && s.poseIndex === bow; i++) advance(true);
    assert.equal(s.poseIndex, to);
    for (let i = 0; i < 20; i++) advance();
  }
  assert.equal(s.poseWeights[sit], 1);
});

test('a nearby arrival does not always interrupt rest with a play bow', () => {
  const s = createPipMotionState(false, () => 0.8);
  for (let i = 0; i < 50; i++) step(s, 0, 0, 0.05);
  step(s, 0, 0, 0.05, false, true, ['sheep-1']);
  assert.equal(s.poseIndex, sit);
});

test('a new nearby animal ID prompts a bow while other animals remain in range', () => {
  const s = createPipMotionState(false, () => 0);
  const advance = (ids) => step(s, 0, 0, 0.05, false, true, ids);
  for (let i = 0; i < 50; i++) advance(['sheep-1']);
  assert.equal(s.poseWeights[sit], 1);

  const animals = ['sheep-1', 'cow-2'];
  advance(animals);
  assert.equal(s.poseIndex, bow);
  for (let i = 0; i < 150 && s.poseIndex === bow; i++) advance(animals);
  assert.equal(s.poseIndex, lie);

  for (let i = 0; i < 20; i++) advance(['cow-2', 'sheep-1']);
  assert.equal(s.poseWeights[lie], 1);
  advance(['cow-2']);
  assert.equal(s.poseIndex, lie);
  advance(['cow-2', 'sheep-1']);
  assert.equal(s.poseIndex, bow);

  advance([]);
  assert.equal(s.poseIndex, sit);
  assert.equal(s.nearAnimal, false);
});

test('scratch keeps a seated base through animal arrival and can be paused or interrupted', () => {
  const s = createPipMotionState(false, () => 0.99);
  const advance = (nearAnimal = false) => step(s, 0, 0, 0.05, false, nearAnimal);
  for (let i = 0; i < 550 && s.poseIndex !== scratch; i++) advance();
  assert.equal(s.poseIndex, scratch);
  advance(true);
  assert.equal(s.poseIndex, scratch);
  for (let i = 0; i < 200 && s.poseIndex === scratch; i++) {
    assert.ok(Math.abs(s.poseWeights[sit] + s.poseWeights[scratch] - 1) < 1e-12);
    advance(true);
  }
  assert.equal(s.poseIndex, sit);
  assert.equal(s.poseWeights[scratch], 1);
  const weights = [...s.poseWeights];
  step(s, 3, 0, 0);
  assert.deepEqual(s.poseWeights, weights);
  step(s, 3);
  assert.equal(s.poseIndex, stand);
  assert.ok(s.poseWeights[scratch] > 0 && s.poseWeights[scratch] < 1);
});

test('pause freezes history and relocation resets interrupted activities, gait and bark', () => {
  const s = createPipMotionState(true);
  for (let i = 0; i < 100; i++) step(s, 6, i / 25, 1 / 60, true);
  const before = structuredClone(s);
  const elsewhere = { x: 90, z: 56, heading: -2, vx: 0, vz: 0 };
  for (const dt of [0, -1, NaN, Infinity]) {
    updatePipMotion(s, elsewhere, dt);
    assert.deepEqual(s, before);
  }
  updatePipMotion(s, elsewhere, 1 / 60);
  assert.deepEqual(s, { ...createPipMotionState(true), previous: { x: 90, z: 56, heading: -2 } });
});

test('walk and gallop phase converge at 30, 60 and 120 Hz', () => {
  for (const speed of [1.3, 7]) {
    const states = [30, 60, 120].map((hz) => {
      const s = createPipMotionState();
      for (let i = 0; i < 3 * hz; i++) step(s, speed, 0, 1 / hz);
      return s;
    });
    for (const s of states) {
      const phase = (s.stride - states[2].stride) * 2 * Math.PI;
      assert.ok(Math.abs(Math.atan2(Math.sin(phase), Math.cos(phase))) < 0.75);
    }
  }
});
