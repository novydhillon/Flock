import { Matrix4, Quaternion, Vector3 } from 'three';
import settings from '../../config/gameplay.json' with { type: 'json' };
import { CONFIG_CONTRACTS } from '../../config/contracts.js';
import { resolveConfig } from '../../config/resolve.js';

const GAMEPLAY = resolveConfig(settings, 'gameplay', CONFIG_CONTRACTS.gameplay);

// Animation reads authoritative movement in world units/second; only joint-local
// transforms are written. Feet and torso share a +Z-forward, ground-level frame.
const clamp = (x, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));
const mix = (a, b, w) => a + (b - a) * w;
const smooth = (x) => {
  const u = clamp(x);
  return u * u * (3 - 2 * u);
};
const follow = (value, target, dt, tau) => mix(value, target, -Math.expm1(-dt / tau));
const STAND = -1,
  SIT = 0,
  BOW = 1,
  LIE = 2,
  SCRATCH = 3,
  ROLL = 4;
const durations = [3.8, 2.15, 4.4, 2.8, 3.45];
const poseBlend = 0.52;
const moveBlend = 0.38;
const tau = Math.PI * 2;
const strideLengthAt = (run) => mix(0.97, 2.4, run);

export function createPipMotionState(puppy = false, random = null) {
  return {
    puppy,
    time: 0,
    previous: null,
    speed: 0,
    localSpeed: 0,
    turnRate: 0,
    stride: 0,
    effort: 0,
    run: 0,
    idle: 0,
    poseIndex: STAND,
    poseWeights: durations.map(() => 0),
    blendFrom: durations.map(() => 0),
    blendTime: moveBlend,
    poseTime: 0,
    poseDuration: 0,
    bowReturn: STAND,
    idleWeight: 0,
    nearAnimal: false,
    nearbyAnimals: new Set(),
    random,
    randomSeed: puppy ? 0x84e1752d : 0x9e3779b9,
    bark: 0,
    barkTime: 0,
    barking: false,
  };
}

function idleRandom(state) {
  if (state.random) return state.random();
  let seed = state.randomSeed;
  seed ^= seed << 13;
  seed ^= seed >>> 17;
  seed ^= seed << 5;
  state.randomSeed = seed >>> 0;
  return state.randomSeed / 0x100000000;
}

function startPose(state, pose, bowReturn = STAND) {
  for (let i = 0; i < state.poseWeights.length; i++) state.blendFrom[i] = state.poseWeights[i];
  state.poseIndex = pose;
  state.blendTime = 0;
  state.poseTime = 0;
  state.poseDuration = 0;
  state.bowReturn = bowReturn;
  if (pose === STAND) return;
  const min = pose === SCRATCH ? 1 : 3;
  const max = pose === SCRATCH ? 3 : pose === LIE ? 8 : 6;
  state.poseDuration = durations[pose] * (state.puppy ? 0.82 : 1) * mix(min, max, idleRandom(state));
}

function nextIdlePose(state) {
  if (state.poseIndex === SCRATCH) return SIT;
  if (state.poseIndex === BOW && state.bowReturn !== STAND) return state.bowReturn;
  const poses = [SIT, LIE, ROLL];
  if (state.nearAnimal) poses.push(BOW);
  if (state.poseIndex === SIT) poses.push(SCRATCH);
  const choices = poses.filter((pose) => pose !== state.poseIndex);
  return choices[Math.floor(idleRandom(state) * choices.length)];
}

function updateIdle(state, sample, dt, activity) {
  const nearbyAnimals = sample.nearbyAnimals;
  const nearAnimal = nearbyAnimals ? nearbyAnimals.length > 0 : sample.nearAnimal === true;
  const arrived = nearbyAnimals
    ? nearbyAnimals.some((id) => !state.nearbyAnimals.has(id))
    : nearAnimal && !state.nearAnimal;
  state.nearAnimal = nearAnimal;
  state.nearbyAnimals.clear();
  if (nearbyAnimals) {
    for (const id of nearbyAnimals) state.nearbyAnimals.add(id);
  }
  const pose = state.poseIndex;
  if (activity > 0.12 || sample.barking) {
    state.idle = 0;
    if (pose !== STAND) startPose(state, STAND);
  } else if (pose === STAND) {
    if (state.blendTime >= moveBlend) state.idle += dt;
    if (state.idle > (state.puppy ? 0.75 : 1.7)) startPose(state, state.puppy && nearAnimal ? BOW : SIT);
  } else if (pose === BOW && !nearAnimal) {
    startPose(state, nextIdlePose(state));
  } else if (arrived && (pose === SIT || pose === LIE) && state.poseWeights[SCRATCH] === 0) {
    startPose(state, BOW, pose === SIT ? LIE : SIT);
  }

  const duration = state.poseIndex === STAND ? moveBlend : poseBlend;
  if (state.blendTime < duration) {
    const previousTime = state.blendTime;
    state.blendTime = Math.min(previousTime + dt, duration);
    const weight = smooth(state.blendTime / duration);
    state.idleWeight = 0;
    for (let i = 0; i < state.poseWeights.length; i++) {
      state.poseWeights[i] = mix(state.blendFrom[i], i === state.poseIndex ? 1 : 0, weight);
      state.idleWeight += state.poseWeights[i];
    }
    dt -= state.blendTime - previousTime;
  }
  if (state.poseIndex === STAND) return;
  state.poseTime += dt;
  if (state.poseTime >= state.poseDuration) startPose(state, nextIdlePose(state));
}

export function updatePipMotion(state, sample, dt, modelScale = state.puppy ? 0.82 : 1) {
  if (!(dt > 0) || !Number.isFinite(dt)) return state;
  const { x, z, heading = Math.PI / 2 } = sample;
  const speed = Math.hypot(sample.vx || 0, sample.vz || 0);
  const prev = state.previous;
  if (prev && Math.hypot(x - prev.x, z - prev.z) > 3) {
    const { random, randomSeed } = state;
    Object.assign(state, createPipMotionState(state.puppy, random), { randomSeed });
    state.previous = { x, z, heading };
    return state;
  }
  const delta = heading - (prev?.heading ?? heading);
  const rate = Math.atan2(Math.sin(delta), Math.cos(delta)) / dt;
  state.turnRate = follow(state.turnRate, clamp(rate, -9, 9), dt, 0.075);
  state.speed = follow(state.speed, speed, dt, 0.085);
  const pivotSpeed = Math.abs(state.turnRate) * 0.27;
  // Keep up with the first accelerating step, then ease back to idle on release.
  const gaitSpeed = Math.max(speed, state.speed);
  state.localSpeed = gaitSpeed / modelScale;
  const activity = state.localSpeed + pivotSpeed;
  state.effort = smooth(activity / 0.65);
  const runSpeed = GAMEPLAY.simulation.dogSpeed * (state.puppy ? GAMEPLAY.simulation.buddySpeedFraction : 1);
  state.run = smooth((gaitSpeed / runSpeed - 0.42) / 0.58);
  // World stride length grows from a four-beat walk into a gathered gallop.
  const strideLength = strideLengthAt(state.run);
  state.stride = (state.stride + (dt * activity) / strideLength) % 1;
  state.time += dt;
  updateIdle(state, sample, dt, activity);
  if (sample.barking && !state.barking) state.barkTime = 0;
  if (sample.barking) state.barkTime += dt;
  state.barking = Boolean(sample.barking);
  const jaw = sample.barking ? 0.55 + 0.45 * Math.sin(state.barkTime * 22) : 0;
  state.bark = follow(state.bark, jaw, dt, 0.039);
  state.previous ??= {};
  state.previous.x = x;
  state.previous.z = z;
  state.previous.heading = heading;
  return state;
}

const target = new Vector3();
const inverse = new Quaternion();
const tuckedPaw = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), 0.6);
const hip = new Vector3();
const rootInverse = new Matrix4();
const localMatrix = new Matrix4();

// During a rollover the support transfers from paws to shoulder, back and ear.
// Use the lowest sculpted vertex in the dog's own frame for this brief action.
function groundRoll(dog, rig) {
  rig.updateWorldMatrix(true, true);
  rootInverse.copy(dog.matrixWorld).invert();
  let lowest = Infinity;
  rig.traverse((joint) => {
    if (!joint.isMesh) return;
    const e = localMatrix.multiplyMatrices(rootInverse, joint.matrixWorld).elements;
    const p = joint.geometry.attributes.position;
    for (let i = 0; i < p.count; i++)
      lowest = Math.min(lowest, e[1] * p.getX(i) + e[5] * p.getY(i) + e[9] * p.getZ(i) + e[13]);
  });
  rig.position.y -= lowest;
}

const recoveryDuration = 0.105;

// Keep a loaded paw at touchdown while the torso accelerates or changes heading.
// Carry the placement correction out through swing so lift-off stays continuous.
function holdContact(leg, motion, scale, inStance, swing) {
  const foot = leg.target;
  if (
    !motion.previous ||
    (motion.effort < 0.05 && leg.liftOff == null) ||
    motion.time === 0 ||
    motion.idleWeight > 0.01
  ) {
    leg.planted = false;
    leg.liftOff = null;
    leg.release.set(0, 0);
    return;
  }
  const { x, z, heading } = motion.previous;
  const sin = Math.sin(heading),
    cos = Math.cos(heading);
  if (leg.liftOff != null && motion.time - leg.liftOff >= recoveryDuration) leg.liftOff = null;
  if (inStance && !leg.planted && leg.liftOff == null) {
    leg.anchor.set(x + (foot.x * cos + foot.z * sin) * scale, z + (foot.z * cos - foot.x * sin) * scale);
  }
  if (inStance || leg.liftOff != null) {
    const dx = (leg.anchor.x - x) / scale,
      dz = (leg.anchor.y - z) / scale;
    leg.release.set(dx * cos - dz * sin - foot.x, dx * sin + dz * cos - foot.z);
    // A sudden direction change can consume the stance allowance mid-step.
    // Lift from the world anchor and converge on the moving gait target.
    if (leg.planted && leg.release.lengthSq() > 0.23 ** 2) leg.liftOff = leg.contactTime;
    if (leg.liftOff != null) {
      const progress = clamp((motion.time - leg.liftOff) / recoveryDuration);
      const carry = 1 - smooth(progress);
      foot.x += carry * leg.release.x;
      foot.z += carry * leg.release.y;
      foot.y += 0.1 * Math.sin(Math.PI * progress);
      leg.release.set(0, 0);
      leg.planted = false;
      return;
    }
    leg.contactTime = motion.time;
  }
  const weight = inStance ? 1 : 1 - smooth(swing);
  foot.x += leg.release.x * weight;
  foot.z += leg.release.y * weight;
  leg.planted = inStance;
}

function plantLeg(leg, x, y, z, rig, fold, scratch, scratchBeat) {
  target.set(x, y, z).sub(rig.position).applyQuaternion(inverse).sub(leg.upper.position);
  // During a roll the paws curl towards the chest and travel with the body.
  target.x = mix(target.x, leg.side * 0.055, fold);
  target.y = mix(target.y, -0.22, fold);
  target.z = mix(target.z, leg.fore ? -0.09 : 0.17, fold);
  if (!leg.fore && leg.side > 0) {
    target.y = mix(target.y, -0.07 + 0.055 * scratchBeat, scratch);
    target.z = mix(target.z, 0.62 + 0.06 * scratchBeat, scratch);
    target.x += scratch * 0.1;
  }
  const down = Math.hypot(target.x, target.y);
  const distance = clamp(Math.hypot(down, target.z), 0.025, leg.upperLength + leg.lowerLength - 0.0001);
  // Two equal links: reverse the elbow bend on hind legs so the stifle leads.
  const bend = (leg.fore ? 1 : -1) * Math.acos(clamp(distance / (2 * leg.upperLength), -1, 1));
  leg.upper.rotation.order = 'ZXY';
  leg.upper.rotation.z = Math.atan2(target.x, -target.y);
  leg.upper.rotation.x = -Math.atan2(target.z, down) + bend;
  leg.lower.rotation.x = -2 * bend;
  leg.paw.quaternion
    .copy(rig.quaternion)
    .multiply(leg.upper.quaternion)
    .multiply(leg.lower.quaternion)
    .invert()
    .slerp(tuckedPaw, fold);
}

export function applyDogPose(dog) {
  const s = dog.userData.motion;
  const { rig, body, head, jaw, tail, ears, legs } = dog.userData.parts;
  const [seated, bow, lay, scratch, roll] = s.poseWeights;
  const sit = seated + scratch;
  const fold = smooth(roll / 0.7);
  const beat = s.stride * tau,
    scratchBeat = Math.sin(s.time * 21);
  const turn = clamp(s.turnRate / 4, -1, 1);
  const lean = -turn * smooth(s.speed / 4) * 0.25;
  const bounce = s.effort * (0.019 * Math.cos(2 * beat) + s.run * 0.049 * Math.sin(beat));
  // The back lengthens between hind push-off and fore touchdown.
  const extension = (1 + Math.cos(beat - tau * 0.4)) / 2;
  const backLength = 1 + s.run * mix(-0.08, 0.18, extension);
  body.scale.z = backLength;
  tail.position.z = -0.54 * backLength;
  rig.position.y =
    0.736 +
    bounce -
    0.11 * s.run -
    sit * 0.22 -
    lay * 0.4 -
    bow * 0.177 -
    0.255 * roll -
    0.125 * Math.sin(Math.PI * roll) ** 2;
  rig.rotation.set(-0.53 * sit + 0.49 * bow + 0.085 * s.run * Math.sin(beat), 0, lean + roll * Math.PI);
  head.position.set(
    0,
    0.245 - s.run * (0.12 + 0.06 * extension) - roll * 0.16 - scratch * 0.09,
    0.42 * backLength + 0.105 * s.run - scratch * 0.16,
  );
  head.rotation.set(
    -rig.rotation.x * 0.66 + 0.16 * s.run - 0.3 * s.bark + 0.24 * lay + 0.94 * fold,
    turn * 0.44 + 1.42 * scratch + 0.4 * roll,
    -0.46 * scratch + 0.07 * Math.sin(s.time * 1.7) * (1 - s.effort),
  );
  jaw.rotation.x = 0.045 + s.bark * 0.73 + s.run * 0.16;
  const wag = Math.sin(s.time * (s.puppy ? 9.8 : 5.6));
  tail.rotation.set(
    -0.12 + 0.55 * sit + 0.29 * bow + 0.12 * s.run + 0.15 * wag * bow,
    wag * (s.puppy ? 0.48 : 0.29) + turn * 0.17,
    0,
  );
  ears.forEach((ear, i) => {
    ear.rotation.x = -0.18 * s.run + 0.17 * s.effort * Math.sin(beat + i * 0.29) + 0.12 * s.bark;
    ear.rotation.z = (i ? -1 : 1) * (0.11 * bow + 0.23 * fold);
  });

  inverse.copy(rig.quaternion).invert();
  for (const leg of legs) {
    leg.upper.position.z = leg.restZ * backLength;
    const left = leg.side < 0;
    // Lateral-sequence walk (hind then fore); gallop gathers the hind pair
    // and extends the fore pair, retaining a small left/right lead.
    const walkOffset = (left ? 0 : 0.5) + (leg.fore ? 0.75 : 0);
    const gallopOffset = (leg.fore ? 0.5 : 0) + (left ? 0 : 0.09);
    const phaseDelta = gallopOffset - walkOffset;
    const offset = walkOffset + s.run * (phaseDelta - Math.round(phaseDelta));
    const phase = (s.stride + offset + 2) % 1;
    const stance = mix(0.63, 0.32, s.run);
    const swing = clamp((phase - stance) / (1 - stance));
    // Shorten the inside stride on arcs. A pivot sends the inside feet backwards.
    const travel = s.localSpeed - leg.side * 0.22 * s.turnRate;
    const activity = Math.max(0.01, s.localSpeed + Math.abs(s.turnRate) * 0.27);
    const strideRatio = clamp(travel / activity, -1, 1.4);
    const stanceTravel = strideLengthAt(s.run) * stance * s.effort;
    const placement = stanceTravel * (phase < stance ? 0.5 - phase / stance : smooth(swing) - 0.5);
    // Yaw sweeps the fore and hind hips sideways in opposite directions.
    const footX = leg.upper.position.x + (placement * leg.upper.position.z * s.turnRate) / activity;
    const arc = Math.sin(Math.PI * swing);
    // Follow through after lift-off, then reach past touchdown during swing.
    const followThrough = -0.33 * Math.sin(tau * swing) * s.run * s.effort;
    const footZ =
      leg.upper.position.z +
      (placement + followThrough) * strideRatio +
      (leg.fore ? 0.1 * sit + 0.075 * lay + 0.052 * bow : 0.18 * sit + 0.13 * lay - 0.07 * bow);
    const lift = arc * arc * s.effort * mix(0.13, leg.fore ? 0.28 : 0.38, s.run);
    const foot = leg.target.set(footX + leg.side * (0.035 * lay + 0.035 * sit), 0.074 + lift, footZ);
    holdContact(leg, s, dog.scale.x, phase < stance, swing);
    // Lower the shoulders just enough to keep the outside paw reachable on a
    // banked turn. Otherwise clamping the IK chain makes a planted paw skate.
    if (s.effort > 0 && !fold) {
      hip.copy(leg.upper.position).applyQuaternion(rig.quaternion);
      const span = (leg.upperLength + leg.lowerLength - 0.0002) ** 2;
      const vertical = Math.sqrt(Math.max(0, span - (foot.x - hip.x) ** 2 - (foot.z - hip.z) ** 2));
      rig.position.y = Math.min(rig.position.y, foot.y + vertical - hip.y);
    }
  }
  for (const leg of legs) {
    const { x, y, z } = leg.target;
    plantLeg(leg, x, y, z, rig, fold, scratch, scratchBeat);
  }
  if (roll > 0) groundRoll(dog, rig);
}

export function updatePipPose(dog, sample, dt) {
  if (!(dt > 0) || !Number.isFinite(dt)) return;
  updatePipMotion(dog.userData.motion, sample, dt, dog.scale.x);
  applyDogPose(dog);
}
