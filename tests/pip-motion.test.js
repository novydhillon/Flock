import test from 'node:test';
import assert from 'node:assert/strict';
import { createPipMotionState, updatePipMotion } from '../src/rendering/animation/pip-motion.js';

function step(s, speed, heading = 0, dt = 1 / 60, barking = false) {
  return updatePipMotion(
    s,
    {
      x: (s.previous?.x ?? 0) + dt * speed * Math.sin(heading),
      z: (s.previous?.z ?? 0) + dt * speed * Math.cos(heading),
      vx: speed * Math.sin(heading),
      vz: speed * Math.cos(heading),
      heading,
      barking,
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

test('idle poses have time to settle and release; Buddy initiates play earlier', () => {
  const adult = createPipMotionState(),
    puppy = createPipMotionState(true);
  for (let i = 0; i < 90; i++) {
    step(adult, 0);
    step(puppy, 0);
  }
  assert.equal(adult.idleWeight, 0);
  assert.ok(puppy.idleWeight > 0.95);
  const held = new Set();
  for (let i = 0; i < 2300; i++) {
    const pose = adult.poseIndex;
    step(adult, 0);
    if (adult.idleWeight > 0.99) held.add(adult.poseIndex);
    if (adult.poseIndex !== pose) assert.equal(adult.idleWeight, 0);
  }
  assert.equal(held.size, 5);
  for (let i = 0; i < 50; i++) step(puppy, 3, 0, 1 / 60, i < 15);
  assert.ok(puppy.idleWeight < 0.001 && puppy.bark < 0.001);
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
