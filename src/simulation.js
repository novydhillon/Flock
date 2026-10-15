import { UPGRADE_CATALOG, purchaseUpgrade, validateUpgrades, upgradeEffects } from './progression.js';
import { createLevel, canOccupy, moveBody, openingSteer, navigationTarget, hasClearGroundPath, hasClearPlayerSignal, containsTarget, targetLocalPoint, targetWorldPoint, targetFootprint } from './world.js';
export { UPGRADE_CATALOG, purchaseUpgrade, createLevel, canOccupy };

/** Renderer-independent flock behaviour. Companions support Pip's herding;
 * they never choose a destination or move the flock along a route. */
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const normal = (x, z) => {
  const length = Math.hypot(x, z);
  return length > 0.0001 ? { x: x / length, z: z / length } : { x: 0, z: 0 };
};
const centerOf = group => group.reduce((sum, a) => ({ x: sum.x + a.x / group.length, z: sum.z + a.z / group.length }), { x: 0, z: 0 });

/** Recovery time: 30s + 1s per extra five robots + 4s per extra route
 * + 2s per 40m of spawn-to-goal distance, capped at 60s. No travel timer. */
export function deliveryCountdownSeconds(level) {
  const extraRobots = Math.max(0, (level.animals?.length || 0) - 5);
  const routes = Math.max(1, level.routes?.length || 1);
  const journey = level.spawn && level.target ? distance(level.spawn, level.target) : 0;
  return clamp(30 + Math.ceil(extraRobots / 5) + (routes - 1) * 4 + Math.floor(journey / 40) * 2, 30, 60);
}

/** A run's score and maximum bolt entitlement share the same integer scale. */
export function deliveryScore(level, saved = level.animals.filter(a => a.saved).length) {
  const total = level.animals.length;
  return total ? Math.floor(Math.max(0, level.reward) * clamp(saved, 0, total) / total) : 0;
}

function deliveryResult(level, events = [], justCompleted = false, dogCollision = { blockedX: false, blockedZ: false }) {
  const saved = level.result?.saved ?? level.animals.filter(a => a.saved).length;
  const total = level.result?.total ?? level.animals.length;
  const score = level.result?.score ?? deliveryScore(level, saved);
  return { saved, total, score, possibleScore: level.reward, completed: Boolean(level.completed), justCompleted,
    reward: justCompleted ? score : 0, remaining: level.delivery?.remaining ?? null,
    countdownStarted: Boolean(level.delivery?.started), events, helpers: level.helpers || [], dogCollision };
}

function finishDelivery(level, reason, events = [], dogCollision) {
  level.completed = true;
  const saved = level.animals.filter(a => a.saved).length;
  level.result = { saved, total: level.animals.length, score: deliveryScore(level, saved), possibleScore: level.reward, reason };
  events.push({ type: 'levelCompleted', index: level.index, reward: level.result.score, reason });
  return deliveryResult(level, events, true, dogCollision);
}

// A flying helper must not apply a signal through a solid bank, rail or tree.
function clearSignal(level, a, b, radius = 0.15) {
  return hasClearGroundPath(level, a, b, radius);
}

/** Connected flock components, with a stable tie-break by animal ID. */
function largestHerd(level, active, previousIds = []) {
  const unvisited = new Set(active), groups = [];
  while (unvisited.size) {
    const first = unvisited.values().next().value, group = [first];
    unvisited.delete(first);
    for (let i = 0; i < group.length; i++) {
      for (const other of unvisited) {
        if (distance(group[i], other) <= 6.5 && clearSignal(level, group[i], other)) {
          group.push(other); unvisited.delete(other);
        }
      }
    }
    groups.push(group);
  }
  groups.sort((a, b) => b.length - a.length ||
    b.filter(v => previousIds.includes(v.id)).length - a.filter(v => previousIds.includes(v.id)).length ||
    Math.min(...a.map(v => v.id)) - Math.min(...b.map(v => v.id)));
  return groups[0] || [];
}

function companionState(level, active, effects, dt) {
  const kinds = [effects.drone && 'drone', effects.helper && 'helper'].filter(Boolean);
  level.helpers ||= [];
  level.helpers = level.helpers.filter(h => kinds.includes(h.type));
  if (!kinds.length || !active.length) return { helpers: [], group: [], memberIds: new Set(), hold: false };
  const state = level.companionHerd ||= {};
  const activeSignature = active.map(a => a.id).join(',');
  if (!state.group || state.activeSignature !== activeSignature || level.time - state.clusterTime > 0.25) {
    state.group = largestHerd(level, active, state.clusterIds);
    state.activeSignature = activeSignature; state.clusterTime = level.time;
  }
  const group = state.group;
  if (group.length < 2) {
    state.mode = 'standby'; state.clusterIds = []; state.positions = {};
    for (const kind of kinds) {
      let helper = level.helpers.find(h => h.type === kind);
      if (!helper) { helper = { type: kind, x: level.dog.x, z: level.dog.z }; level.helpers.push(helper); }
      helper.mode = 'standby'; helper.clusterIds = []; helper.anchor = { x: helper.x, z: helper.z };
    }
    return { helpers: level.helpers, group: [], memberIds: new Set(), hold: false, state };
  }
  const centroid = centerOf(group);
  const ids = group.map(a => a.id), memberIds = new Set(ids);
  let playerDistance = Infinity;
  for (const animal of group) {
    const d = distance(level.dog, animal);
    if (d <= 18 && d < playerDistance && clearSignal(level, level.dog, animal)) playerDistance = d;
  }
  // Hysteresis stops companions switching modes while Pip circles a large herd.
  const hold = state.mode && state.mode !== 'standby' ? (state.mode === 'hold' ? playerDistance >= 12 : playerDistance > 18) : playerDistance > 14;
  const overlap = (state.clusterIds || []).filter(id => memberIds.has(id)).length;
  const changedHerd = !state.clusterIds || overlap < Math.min(state.clusterIds.length, ids.length) / 2;
  if (hold && (state.mode !== 'hold' || changedHerd)) {
    state.anchor = { ...centroid };
    state.positions = Object.fromEntries(group.map(a => [a.id, { x: a.x, z: a.z }]));
  }
  if (!hold) { state.anchor = { ...centroid }; state.positions = {}; }
  if (hold) for (const animal of group) state.positions[animal.id] ||= { x: animal.x, z: animal.z };
  state.mode = hold ? 'hold' : 'assist'; state.clusterIds = ids;
  for (const kind of kinds) {
    let helper = level.helpers.find(h => h.type === kind);
    if (!helper) {
      helper = { type: kind, x: kind === 'drone' ? centroid.x : level.dog.x, z: kind === 'drone' ? centroid.z : level.dog.z };
      level.helpers.push(helper);
    }
    helper.mode = state.mode; helper.clusterIds = [...ids]; helper.anchor = { ...state.anchor };
    // Orbit over the group, rather than repeatedly pursuing its rearmost robot.
    // The ground buddy joins Pip's flank. Its body has no blanket flee signal.
    const fromDog = normal(centroid.x - level.dog.x, centroid.z - level.dog.z);
    const desired = kind === 'drone' ? centroid : hold ? {
      x: centroid.x - fromDog.z * Math.max(2.8, Math.sqrt(group.length) * 0.6),
      z: centroid.z + fromDog.x * Math.max(2.8, Math.sqrt(group.length) * 0.6),
    } : {
      x: level.dog.x - fromDog.z * 2.1,
      z: level.dog.z + fromDog.x * 2.1,
    };
    const waypoint = kind === 'drone' ? desired : navigationTarget(level, helper, desired);
    const direction = normal(waypoint.x - helper.x, waypoint.z - helper.z);
    const travel = Math.min(distance(helper, waypoint), dt * (kind === 'drone' ? 6 : 7));
    if (kind === 'drone') { helper.x += direction.x * travel; helper.z += direction.z * travel; }
    else moveBody(level, helper, direction.x * travel, direction.z * travel, 0.6);
  }
  return { helpers: level.helpers, group, centroid, memberIds, hold, state };
}

function companionAssist(level, companions, dog, effects) {
  const forces = new Map();
  if (!companions.group.length || companions.hold) return forces;
  const { group, centroid } = companions;
  const forward = normal(centroid.x - dog.x, centroid.z - dog.z);
  const lateral = { x: -forward.z, z: forward.x };
  const strength = Math.min(1.2, effects.droneStrength * 0.35 + effects.helperStrength * 0.25);
  const comfortable = Math.max(2.1, Math.sqrt(group.length) * 0.66);
  for (const animal of group) {
    const offset = (centroid.x - animal.x) * lateral.x + (centroid.z - animal.z) * lateral.z;
    // Only tidy the flanks. Longitudinal drive belongs to the player alone.
    const force = clamp(Math.sign(offset) * Math.max(0, Math.abs(offset) - comfortable) * strength, -0.75, 0.75);
    const vector = { x: lateral.x * force, z: lateral.z * force };
    const radius = animal.type === 'cow' ? 0.78 : 0.55;
    if (force && !clearSignal(level, animal, { x: animal.x + vector.x, z: animal.z + vector.z }, radius)) continue;
    if (!canOccupy(level, animal.x + vector.x * 0.7, animal.z + vector.z * 0.7, radius)) continue;
    forces.set(animal.id, vector);
  }
  // Balanced lateral support has zero net propulsion, even on an uneven flank.
  const total = [...forces.values()].reduce((sum, f) => ({ x: sum.x + f.x, z: sum.z + f.z }), { x: 0, z: 0 });
  for (const vector of forces.values()) {
    vector.x -= total.x / forces.size; vector.z -= total.z / forces.size;
  }
  return forces;
}

// Delivered animals keep gently milling inside the pen while the recovery
// countdown runs. Their moving target is expressed in pen-local coordinates,
// so rotated goals have the same clearance and the open entrance stays closed
// to saved bodies. This is deliberately a cheap per-animal oscillator.
function roamSavedAnimals(level, dt, phaseTime) {
  if (dt <= 0) return;
  const shape = targetFootprint(level.target);
  for (const animal of level.animals) {
    if (!animal.saved) continue;
    const radius = animal.type === 'cow' ? 0.78 : 0.55;
    const local = targetLocalPoint(level.target, animal);
    const phase = animal.roamPhase ?? (animal.id * 2.399963229728653);
    animal.roamPhase = phase;
    const halfForward = shape.halfLength - radius - 0.48;
    const halfLateral = shape.halfWidth - radius - 0.24;
    const goal = {
      forward: Math.sin(phaseTime * 0.22 + phase) * halfForward * 0.72,
      lateral: Math.cos(phaseTime * 0.19 + phase * 1.7) * halfLateral * 0.72,
    };
    let vx = (goal.forward - local.forward) * 0.32;
    let vz = (goal.lateral - local.lateral) * 0.32;
    for (const other of level.animals) {
      if (other === animal || !other.saved) continue;
      const dx = animal.x - other.x, dz = animal.z - other.z, d = Math.hypot(dx, dz);
      const separation = radius + (other.type === 'cow' ? 0.78 : 0.55) + 0.35;
      if (d > 1e-4 && d < separation) {
        const force = (separation - d) / d * 0.6;
        vx += (dx * shape.forward.x + dz * shape.forward.z) * force;
        vz += (dx * shape.side.x + dz * shape.side.z) * force;
      }
    }
    // The entrance is open to incoming flock. Saved animals turn inward before
    // reaching that opening, while still accepting arrivals at the full
    // physical admission boundary.
    const entranceEdge = -shape.halfLength + radius;
    if (local.forward < entranceEdge + 0.45) vx += (entranceEdge + 0.45 - local.forward) * 1.2;
    // Convert the local steering vector to world space, then cap its gentle
    // drift. The contracted target footprint below prevents any route through
    // the open doorway.
    const f = shape.forward, s = shape.side;
    let wx = f.x * vx + s.x * vz, wz = f.z * vx + s.z * vz;
    const speed = Math.hypot(wx, wz);
    if (speed > 0.65) { wx *= 0.65 / speed; wz *= 0.65 / speed; }
    const before = { x: animal.x, z: animal.z };
    moveBody(level, animal, wx * dt, wz * dt, radius);
    if (!(canOccupy(level, animal.x, animal.z, radius) && containsTarget(level.target, animal, radius))) {
      animal.x = before.x; animal.z = before.z;
    }
    animal.vx = (animal.x - before.x) / dt; animal.vz = (animal.z - before.z) / dt;
    animal.heading = Math.hypot(animal.vx, animal.vz) > 0.03 ? Math.atan2(animal.vx, animal.vz) : (animal.heading || 0);
  }
}

/** Advance only the decorative, saved-animal pen roaming. Safe to call after
 * completion: it does not touch result, reward, timer, dog, or unsaved animals. */
export function stepSavedRoaming(level, dt = 1 / 60) {
  dt = clamp(Number(dt) || 0, 0, 0.1);
  if (level.completed && dt > 0) {
    level.savedRoamTime = (level.savedRoamTime ?? (level.time || 0)) + dt;
    roamSavedAnimals(level, dt, level.savedRoamTime);
  }
}

export function stepSimulation(level, dog, input = {}, dt = 1 / 60, upgrades = {}) {
  const effects = upgradeEffects(upgrades, level.index + 1);
  dt = clamp(Number(dt) || 0, 0, 0.1);
  if (level.completed) return deliveryResult(level);
  if (dt > 0 && level.delivery?.started) {
    level.delivery.remaining = Math.max(0, level.delivery.remaining - dt);
    // Close admission before movement when the remaining time is exhausted.
    if (level.delivery.remaining <= 1e-8) {
      level.delivery.remaining = 0;
      return finishDelivery(level, 'timeout');
    }
  }
  level.time = (level.time || 0) + dt;
  roamSavedAnimals(level, dt, level.time);
  const events = [];
  const ix = Number(input.x) || 0, iz = Number(input.z ?? input.y) || 0;
  const magnitude = Math.min(1, Math.hypot(ix, iz));
  const direction = normal(ix, iz), speed = 7.8 + effects.speedBoost;
  const before = { x: dog.x, z: dog.z };
  const dogCollision = moveBody(level, dog, direction.x * magnitude * speed * dt, direction.z * magnitude * speed * dt, 0.62);
  dog.vx = dt ? (dog.x - before.x) / dt : 0;
  dog.vz = dt ? (dog.z - before.z) / dt : 0;
  dog.heading = magnitude > 0.03 ? Math.atan2(direction.x, direction.z) : (dog.heading || 0);
  level.dog = dog;
  const active = level.animals.filter(a => !a.saved);
  const companions = companionState(level, active, effects, dt);
  const support = companionAssist(level, companions, dog, effects);
  const radius = 7.6 + effects.signalBoost + (input.bark ? 3.3 : 0);
  const snapshot = active.map(a => ({ ...a }));
  const visibility = level.flockVisibility ||= new Map();
  const cells = new Map(snapshot.map(a => [a.id, `${Math.floor(a.x * 5)},${Math.floor(a.z * 5)}`]));
  const visibleNeighbor = (a, b) => {
    const low = a.id < b.id ? a : b, high = a.id < b.id ? b : a;
    const key = `${low.id}:${high.id}`, position = `${cells.get(low.id)}:${cells.get(high.id)}`;
    const cached = visibility.get(key);
    if (cached?.position === position) return cached.clear;
    const clear = hasClearGroundPath(level, a, b, .15);
    visibility.set(key, { position, clear }); return clear;
  };
  for (let i = 0; i < active.length; i++) {
    const animal = active[i], old = snapshot[i];
    const physicalRadius = animal.type === 'cow' ? 0.78 : 0.55;
    let sx = 0, sz = 0, cx = 0, cz = 0, avx = 0, avz = 0, neighbors = 0, pressure = 0;
    for (const other of snapshot) {
      if (other.id === animal.id) continue;
      const dx = old.x - other.x, dz = old.z - other.z, d = Math.hypot(dx, dz);
      if (d < 2 && d > 0.01) { const force = (2 - d) / d; sx += dx * force; sz += dz * force; }
      if (d < 18 && visibleNeighbor(old, other)) { cx += other.x; cz += other.z; avx += other.vx; avz += other.vz; neighbors++; }
    }
    let desiredX = sx * 2.5, desiredZ = sz * 2.5;
    const dogDistance = distance(old, dog);
    if (dogDistance < radius && hasClearPlayerSignal(level, old, dog)) {
      const urgency = Math.pow(1 - dogDistance / radius, 0.65) * (input.bark ? 1.65 + effects.barkBoost : 1);
      const flee = dogDistance > 0.01 ? normal(old.x - dog.x, old.z - dog.z) : normal(Math.sin(dog.heading || 0), Math.cos(dog.heading || 0));
      desiredX += flee.x * urgency * 5.2; desiredZ += flee.z * urgency * 5.2;
      pressure = urgency; animal.lastPlayerPressure = level.time;
    }
    const holding = companions.hold && companions.memberIds.has(animal.id) && pressure < 0.03;
    if (holding) {
      // Kill inherited forward velocity and alignment. Merely parking the drone
      // would leave the flock's old momentum/cohesion walking toward the goal.
      const position = companions.state.positions[animal.id];
      desiredX = clamp((position.x - old.x) * 2.6 + sx * 0.35, -1.1, 1.1);
      desiredZ = clamp((position.z - old.z) * 2.6 + sz * 0.35, -1.1, 1.1);
    } else {
      if (neighbors) {
        const dx = cx / neighbors - old.x, dz = cz / neighbors - old.z, d = Math.hypot(dx, dz);
        if (d > 2.6) {
          const toward = normal(dx, dz), cohesion = Math.min(2.6, (d - 2.6) * 0.36) * (1 + effects.cohesionBoost);
          desiredX += toward.x * cohesion; desiredZ += toward.z * cohesion;
        }
        desiredX += avx / neighbors * 0.45; desiredZ += avz / neighbors * 0.45;
      }
      const assist = support.get(animal.id);
      if (assist && canOccupy(level, old.x + assist.x * 0.7, old.z + assist.z * 0.7, physicalRadius) &&
        clearSignal(level, old, { x: old.x + assist.x, z: old.z + assist.z }, physicalRadius)) {
        desiredX += assist.x; desiredZ += assist.z;
      }
      if (pressure < 0.03) {
        desiredX += Math.sin(level.time * 0.6 + animal.id * 2.1) * 0.12;
        desiredZ += Math.cos(level.time * 0.5 + animal.id * 1.7) * 0.12;
      }
    }
    if (pressure > 0.03) {
      const steer = openingSteer(level, animal, desiredX, desiredZ, physicalRadius);
      desiredX += steer.x; desiredZ += steer.z;
    }
    const maxSpeed = animal.type === 'cow' ? 3.3 : 4.2, desiredSpeed = Math.hypot(desiredX, desiredZ);
    if (desiredSpeed > maxSpeed) { desiredX *= maxSpeed / desiredSpeed; desiredZ *= maxSpeed / desiredSpeed; }
    const smoothing = 1 - Math.exp(-dt * (holding ? 12 : animal.type === 'cow' ? 3.5 : 5.5));
    animal.vx += (desiredX - animal.vx) * smoothing; animal.vz += (desiredZ - animal.vz) * smoothing;
    const collision = moveBody(level, animal, animal.vx * dt, animal.vz * dt, physicalRadius);
    if ((collision.blockedX || collision.blockedZ) && pressure > 0.03) {
      const forward = normal(animal.vx, animal.vz), travel = Math.min(0.24, Math.hypot(animal.vx, animal.vz) * dt);
      for (const angle of [Math.PI / 6, -Math.PI / 6, Math.PI / 3, -Math.PI / 3, Math.PI / 2, -Math.PI / 2]) {
        const dx = (forward.x * Math.cos(angle) - forward.z * Math.sin(angle)) * travel;
        const dz = (forward.x * Math.sin(angle) + forward.z * Math.cos(angle)) * travel;
        if (canOccupy(level, animal.x + dx, animal.z + dz, physicalRadius)) { moveBody(level, animal, dx, dz, physicalRadius); break; }
      }
    }
    if (collision.blockedX) animal.vx *= 0.45;
    if (collision.blockedZ) animal.vz *= 0.45;
    animal.heading = Math.hypot(animal.vx, animal.vz) > 0.1 ? Math.atan2(animal.vx, animal.vz) : (animal.heading || 0);
    animal.alert = pressure;
    const playerAtDestination = distance(dog, level.target) < level.target.radius + 12;
    // Admission uses the same attendance decision as companion herding. A
    // parked herd's residual movement must not deliver it while Pip is away.
    if (dt > 0 && playerAtDestination && !holding && containsTarget(level.target, animal, physicalRadius) && clearSignal(level, dog, animal)) {
      animal.saved = true; animal.vx = 0; animal.vz = 0;
      events.push({ type: 'animalSaved', id: animal.id, animalType: animal.type });
    }
  }
  const saved = level.animals.filter(a => a.saved).length;
  if (events.some(event => event.type === 'animalSaved') && !level.delivery?.started) {
    const duration = deliveryCountdownSeconds(level);
    level.delivery = { started: true, duration, remaining: duration };
    events.push({ type: 'countdownStarted', duration });
  }
  if (saved === level.animals.length && saved > 0) return finishDelivery(level, 'all-arrived', events, dogCollision);
  return deliveryResult(level, events, false, dogCollision);
}

export function defaultProfile() { return { version: 2, points: 0, upgrades: {}, completedLevels: [], bestScores: {}, bestEarnedBolts: {}, highestLevel: 0, music: true }; }

// The campaign's maximum reward is fixed by level, independently of save data.
const maximumLevelReward = index => 80 + index * 25;
function validateLedger(raw) {
  const ledger = {};
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return ledger;
  for (const [key, score] of Object.entries(raw)) {
    const index = Number(key);
    if (String(index) !== key || !Number.isInteger(index) || index < 0 || index > 99 || !Number.isFinite(score) || score <= 0) continue;
    ledger[index] = clamp(Math.floor(score), 0, maximumLevelReward(index));
    if (!ledger[index]) delete ledger[index];
  }
  return ledger;
}

export function validateProfile(value) {
  const result = defaultProfile();
  if (!value || typeof value !== 'object') return result;
  result.points = Number.isFinite(value.points) ? clamp(Math.floor(value.points), 0, 1e9) : 0;
  result.upgrades=validateUpgrades(value.upgrades);
  const legacyCompleted = [...new Set((Array.isArray(value.completedLevels) ? value.completedLevels : []).filter(v => Number.isInteger(v) && v >= 0 && v <= 99))];
  result.bestEarnedBolts = validateLedger(value.bestEarnedBolts);
  // Only pre-ledger saves receive the old full-reward entitlement. A v2
  // completedLevels cache must never inflate a partially earned ledger.
  if (value.version === undefined || value.version === 1) {
    for (const index of legacyCompleted) result.bestEarnedBolts[index] = maximumLevelReward(index);
  }
  // Scores are a display cache of the authoritative earned entitlement. A
  // stale or malformed cache cannot rewrite a player's lifetime reward cap.
  result.bestScores = { ...result.bestEarnedBolts };
  result.completedLevels = Object.keys(result.bestEarnedBolts).map(Number).sort((a, b) => a - b);
  result.highestLevel = clamp(Math.max(Number.isInteger(value.highestLevel) ? value.highestLevel : 0, ...result.completedLevels.map(v => v + 1)), 0, 99);
  result.music = value.music !== false;
  return result;
}

export function applyLevelReward(profile, level) {
  if (!level.completed || !Number.isInteger(level.index) || level.index < 0 || level.index > 99) return 0;
  const saved = level.result?.saved ?? level.animals.filter(a => a.saved).length;
  if (saved <= 0 || !level.animals.length) return 0;
  Object.assign(profile, validateProfile(profile));
  const score = Math.min(maximumLevelReward(level.index), deliveryScore(level, saved));
  const previousEarned = profile.bestEarnedBolts[level.index] || 0;
  const reward = Math.max(0, score - previousEarned);
  profile.bestScores[level.index] = Math.max(profile.bestScores[level.index] || 0, score);
  profile.bestEarnedBolts[level.index] = Math.max(previousEarned, score);
  if (!profile.completedLevels.includes(level.index)) profile.completedLevels.push(level.index);
  profile.completedLevels.sort((a, b) => a - b);
  profile.highestLevel = Math.min(99, Math.max(profile.highestLevel, level.index + 1));
  profile.points += reward;
  return reward;
}

export function loadProfile(storage, key = 'flock-foundry-v1') {
  try {
    storage ||= globalThis.localStorage;
    return validateProfile(JSON.parse(storage.getItem(key)));
  } catch { return defaultProfile(); }
}

export function saveProfile(profile, storage, key = 'flock-foundry-v1') {
  try {
    storage ||= globalThis.localStorage;
    storage.setItem(key, JSON.stringify(validateProfile(profile)));
    return true;
  } catch { return false; }
}
