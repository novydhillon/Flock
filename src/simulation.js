import { UPGRADE_CATALOG, purchaseUpgrade, validateUpgrades, upgradeEffects } from './progression.js';
export { UPGRADE_CATALOG, purchaseUpgrade };

/** Flock Foundry's deterministic, renderer-independent game simulation.
 * World coordinates are metres, +X points toward the destination and +Z south.
 */
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const normal = (x, z) => {
  const length = Math.hypot(x, z);
  return length > 0.0001 ? { x: x / length, z: z / length } : { x: 0, z: 0 };
};

function randomGenerator(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6D2B79F5;
    let value = Math.imul(state ^ state >>> 15, 1 | state);
    value ^= value + Math.imul(value ^ value >>> 7, 61 | value);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}

export function createLevel(index = 0, seed = index * 7919 + 42) {
  index = clamp(Math.floor(Number(index) || 0), 0, 99);
  const random = randomGenerator(seed);
  // Once the flock reaches its mobile-friendly cap, longer journeys keep each
  // following level harder instead of repeating the same-size world forever.
  const stretch = index;
  const startX = -14 - stretch * 3.4;
  const targetX = 15 + stretch * 3.6;
  const count = Math.min(5 + index * 3, 65);
  const targetZ = index === 0 ? 0 : (index % 2 ? -1 : 1) * (3 + random() * 4);
  const target = { x: targetX, z: targetZ, radius: 4.7 + Math.sqrt(count) * 0.2, type: index % 3 === 2 ? 'barn' : index % 3 === 1 ? 'field' : 'pen' };
  const animals = Array.from({ length: count }, (_, i) => {
    const row = Math.floor(i / 5);
    return {
      id: i, type: index >= 3 && i % 4 === 0 ? 'cow' : 'sheep',
      x: startX + row * 1.55 + (random() - 0.5) * 0.5,
      z: (i % 5 - 2) * 1.55 + (random() - 0.5) * 0.5,
      vx: 0, vz: 0, saved: false,
    };
  });
  const rivers = index > 0 ? [{
    x: -2 - stretch * 0.25, width: 2.8 + Math.min(index * 0.12, 1.8),
    minZ: -24, maxZ: 24,
    bridges: [{ z: index === 1 ? 0 : (index % 2 ? 1 : -1) * (5 + random() * 2), width: index === 1 ? 7.5 : 6.5 }],
  }] : [];
  if (index >= 5) rivers.push({
    x: targetX - 11, width: 2.8, minZ: -24, maxZ: 24,
    bridges: [{ z: -targetZ, width: 6.5 }],
  });
  const gates = index >= 2 ? [{ x: targetX - 6.8, z: targetZ, width: 7 }] : [];
  const fences = gates.map(gate => ({ x: gate.x, minZ: -24, maxZ: 24, gates: [{ z: gate.z, width: gate.width }] }));
  const obstacles = [];
  for (let i = 0; i < Math.min(index + 2, 11); i++) {
    const obstacle = { x: startX + 7 + random() * (targetX - startX - 13), z: (random() > 0.5 ? 1 : -1) * (10 + random() * 9), radius: 0.9 + random() * 1.1 };
    obstacles.push(obstacle);
  }
  const roadWaypoints = [{ x: startX - 6, z: 0 },
    ...[...rivers.map(r => ({ x: r.x, z: r.bridges[0].z })), ...gates.map(g => ({ x: g.x, z: g.z }))].sort((a, b) => a.x - b.x),
    { x: target.x, z: target.z }];
  const roads = roadWaypoints.slice(1).map((to, i) => ({ from: roadWaypoints[i], to, width: 3.3 }));
  const titles = ['First day on the farm', 'Over the babbling brook', 'Through the garden gate', 'A mixed-up meadow', 'The long way home', 'Two bridges, one flock'];
  return {
    index, seed, title: titles[index] || `Pasture patrol ${index + 1}`,
    description: index === 0 ? 'Move behind the sheep and gently guide all five into the sunny pen.' : `Bring ${count} robots to the ${target.type}. Stay behind the flock and use the crossings.`,
    bounds: { minX: startX - 12, maxX: targetX + 13, minZ: -24, maxZ: 24 },
    spawn: { x: startX + 1, z: 0 }, dog: { x: startX - 5.5, z: 0 }, target,
    animals, rivers, roads,
    gates, fences, obstacles, reward: 80 + index * 25,
  };
}

function clearanceAt(barrier, z, radius, openings) {
  return openings.some(opening => Math.abs(z - opening.z) <= opening.width / 2 - radius);
}

function targetFront(level) {
  const target = level.target, extent = target.radius + 1.4;
  return { x: target.x - extent, minZ: target.z - extent, maxZ: target.z + extent,
    gates: [{ z: target.z, width: 7 }], thickness: 0.18 };
}

function distanceToSegment(x, z, ax, az, bx, bz) {
  const dx = bx - ax, dz = bz - az;
  const t = clamp(((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz), 0, 1);
  return Math.hypot(x - ax - dx * t, z - az - dz * t);
}

function targetFenceCollision(level, x, z, radius) {
  const target = level.target, extent = target.radius + 1.4;
  const west = target.x - extent, east = target.x + extent;
  const north = target.z - extent, south = target.z + extent;
  const segments = [
    [west, north, east, north], [west, south, east, south], [east, north, east, south],
    [west, north, west, target.z - 3.5], [west, target.z + 3.5, west, south],
  ];
  return segments.some(segment => distanceToSegment(x, z, ...segment) < radius + 0.18);
}

/** True when a body can occupy this point, including its physical radius. */
export function canOccupy(level, x, z, radius = 0.55) {
  const bounds = level.bounds;
  if (x < bounds.minX + radius || x > bounds.maxX - radius || z < bounds.minZ + radius || z > bounds.maxZ - radius) return false;
  for (const river of level.rivers || []) {
    if (z > river.minZ - radius && z < river.maxZ + radius && Math.abs(x - river.x) < river.width / 2 + radius && !clearanceAt(river, z, radius, river.bridges)) return false;
  }
  for (const fence of level.fences || []) {
    if (z > fence.minZ - radius && z < fence.maxZ + radius && Math.abs(x - fence.x) < 0.18 + radius && !clearanceAt(fence, z, radius, fence.gates)) return false;
  }
  for (const obstacle of level.obstacles || []) if (Math.hypot(x - obstacle.x, z - obstacle.z) < radius + obstacle.radius) return false;
  if (targetFenceCollision(level, x, z, radius)) return false;
  return true;
}

function moveBody(level, body, dx, dz, radius) {
  // Small substeps prevent tunnelling across narrow fences during frame drops.
  const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / 0.3));
  const sx = dx / steps, sz = dz / steps;
  let blockedX = false, blockedZ = false;
  for (let i = 0; i < steps; i++) {
    if (canOccupy(level, body.x + sx, body.z + sz, radius)) {
      body.x += sx; body.z += sz;
    } else {
      if (canOccupy(level, body.x + sx, body.z, radius)) body.x += sx;
      else if (Math.abs(sx) > 0.0001) blockedX = true;
      if (canOccupy(level, body.x, body.z + sz, radius)) body.z += sz;
      else if (Math.abs(sz) > 0.0001) blockedZ = true;
    }
  }
  return { blockedX, blockedZ };
}

function openingDirection(level, animal, vx) {
  const barriers = [
    ...(level.rivers || []).map(river => ({ ...river, openings: river.bridges, thickness: river.width / 2 })),
    ...(level.fences || []).map(fence => ({ ...fence, openings: fence.gates, thickness: 0.2 })),
    { ...targetFront(level), openings: targetFront(level).gates },
  ];
  for (const barrier of barriers) {
    if ((barrier.x - animal.x) * vx <= 0 || Math.abs(animal.x - barrier.x) > barrier.thickness + 2) continue;
    if (clearanceAt(barrier, animal.z, 0.7, barrier.openings)) continue;
    const nearest = barrier.openings.reduce((best, opening) => Math.abs(opening.z - animal.z) < Math.abs(best.z - animal.z) ? opening : best);
    return Math.sign(nearest.z - animal.z);
  }
  return 0;
}

function nextCrossing(level, centroid) {
  const barriers = [...level.rivers.map(r => ({ x: r.x, z: r.bridges[0].z })), ...(level.gates || [])]
    .filter(b => b.x > centroid.x + 1).sort((a, b) => a.x - b.x);
  return barriers[0] || level.target;
}

function helperNavigationTarget(level, helper, desired) {
  const barriers = [
    ...level.rivers.map(river => ({ ...river, openings: river.bridges, thickness: river.width / 2 })),
    ...(level.fences || []).map(fence => ({ ...fence, openings: fence.gates, thickness: 0.2 })),
    { ...targetFront(level), openings: targetFront(level).gates },
  ];
  const direction = Math.sign(desired.x - helper.x) || 1;
  const crossed = barriers.filter(barrier => {
    const inside = Math.abs(helper.x - barrier.x) < barrier.thickness + 1.4;
    const opposite = (helper.x - barrier.x) * (desired.x - barrier.x) <= 0;
    return (inside || opposite) && Math.abs(desired.x - barrier.x) > barrier.thickness + 0.65;
  }).sort((a, b) => Math.abs(a.x - helper.x) - Math.abs(b.x - helper.x));
  if (!crossed.length) return desired;
  const barrier = crossed[0];
  const opening = barrier.openings.reduce((best, item) =>
    Math.abs(item.z - helper.z) + Math.abs(item.z - desired.z) < Math.abs(best.z - helper.z) + Math.abs(best.z - desired.z) ? item : best);
  const nearX = barrier.x - direction * (barrier.thickness + 1.5);
  const farX = barrier.x + direction * (barrier.thickness + 1.5);
  // Reach the entrance first, then hold the bridge centerline until fully clear.
  if ((helper.x - nearX) * direction < 0.3 && Math.abs(helper.z - opening.z) > 0.55) return { x: nearX, z: opening.z };
  return { x: farX, z: opening.z };
}

function destinationApproach(level, animal) {
  const target = level.target, extent = target.radius + 1.4;
  const west = target.x - extent, east = target.x + extent;
  const side = Math.sign(animal.z - target.z) || 1;
  if (animal.x > east + 0.4) return { x: east + 1.5, z: target.z + side * (extent + 1.5) };
  if (Math.abs(animal.z - target.z) > extent - 0.4 && animal.x > west - 0.8) {
    return { x: west - 1.05, z: target.z + side * (extent + 1.5) };
  }
  if (animal.x < west + 0.7) return { x: west + 2, z: target.z };
  return target;
}

function updateHelpers(level, active, dt, upgrades) {
  if (!active.length) return [];
  // Complete the earliest unfinished crossing first. A centroid over the river
  // used to send helpers to the next gate while half the herd stayed behind.
  const crossings = [
    ...level.rivers.map(r => ({ x: r.x, z: r.bridges[0].z, extent: r.width / 2 })),
    ...(level.gates || []).map(g => ({ ...g, extent: 0.2 })),
    { x: targetFront(level).x, z: level.target.z, extent: 0.2, destination: true },
  ].sort((a, b) => a.x - b.x);
  const crossing = crossings.find(c => active.some(a => a.x < c.x + c.extent + 1));
  const group = crossing ? active.filter(a => a.x < crossing.x + crossing.extent + 1) : active;
  const centroid = group.reduce((sum, a) => ({ x: sum.x + a.x / group.length, z: sum.z + a.z / group.length }), { x: 0, z: 0 });
  const waypoint = crossing ? { x: crossing.x + crossing.extent + 2.2, z: crossing.z } : level.target;
  const toward = normal(waypoint.x - centroid.x, waypoint.z - centroid.z);
  const helpers = level.helpers || (level.helpers = []);
  const kinds = [upgrades.helper && 'helper', upgrades.drone && 'drone'].filter(Boolean);
  for (const kind of kinds) {
    let helper = helpers.find(h => h.type === kind);
    if (!helper) {
      // Pip is already on valid ground, including when a helper is bought on
      // a narrow bridge. Ground helpers must share that safe starting point.
      helper = { type: kind, x: level.dog.x + (kind === 'drone' ? -1 : 0), z: level.dog.z + (kind === 'drone' ? 3 : 0) };
      helpers.push(helper);
    }
    const ranked = [...group].sort((a, b) => a.x * toward.x + a.z * toward.z - b.x * toward.x - b.z * toward.z);
    helper.avoidAnchors ||= {};
    helper.herdProbe ||= { ...centroid, time: level.time, remaining: active.length };
    if (level.time - helper.herdProbe.time >= 12) {
      if (helper.herdProbe.remaining === active.length && distance(centroid, helper.herdProbe) < 0.9) {
        if (helper.focusId !== undefined) helper.avoidAnchors[helper.focusId] = level.time + 14;
        helper.recoveryTurn = (helper.recoveryTurn || 0) + 1;
        helper.recoverUntil = level.time + 6;
      }
      helper.herdProbe = { ...centroid, time: level.time, remaining: active.length };
    }
    const previous = group.find(animal => animal.id === helper.focusId);
    if (previous && helper.focusProbe && level.time - helper.focusProbe.time >= 5) {
      if (distance(previous, helper.focusProbe) < 0.55 && distance(helper, previous) < 8) {
        // Pressure can balance cohesion or pin an animal at a tree. Temporarily
        // work another flank, then retry, rather than repeating forever.
        helper.avoidAnchors[previous.id] = level.time + 12;
        helper.recoveryTurn = (helper.recoveryTurn || 0) + 1;
        helper.recoverUntil = level.time + 6;
      }
      helper.focusProbe = { x: previous.x, z: previous.z, time: level.time };
    }
    const available = ranked.filter(animal => (helper.avoidAnchors[animal.id] || 0) < level.time);
    const anchor = available[0] || ranked[0];
    if (helper.focusId !== anchor.id) {
      helper.focusId = anchor.id;
      helper.focusProbe = { x: anchor.x, z: anchor.z, time: level.time };
    }
    const localWaypoint = crossing && !crossing.destination ? waypoint : destinationApproach(level, anchor);
    const drive = normal(localWaypoint.x - anchor.x, localWaypoint.z - anchor.z);
    const recoverySide = helper.recoverUntil > level.time ? (helper.recoveryTurn % 2 ? 1.8 : -1.8) : 0;
    const side = (kind === 'drone' ? 0.7 : -0.7) + recoverySide;
    const desired = { x: anchor.x - drive.x * 2.9 - drive.z * side, z: anchor.z - drive.z * 2.9 + drive.x * side };
    if (kind === 'helper' && !canOccupy(level, desired.x, desired.z, 0.62)) {
      // A helper cannot stand inside the solid bank while pressuring sheep along
      // it. Stay on their bank; the drone can approach from above the water.
      for (const river of level.rivers) {
        if (Math.abs(desired.x - river.x) < river.width / 2 + 0.8 && !clearanceAt(river, desired.z, 0.62, river.bridges)) {
          desired.x = river.x + Math.sign(anchor.x - river.x) * (river.width / 2 + 0.85);
        }
      }
    }
    const navigation = kind === 'drone' ? desired : helperNavigationTarget(level, helper, desired);
    const direction = normal(navigation.x - helper.x, navigation.z - helper.z);
    const travel = Math.min(distance(helper, navigation), dt * (kind === 'drone' ? 6 : 7));
    if (kind === 'drone') { helper.x += direction.x * travel; helper.z += direction.z * travel; }
    else moveBody(level, helper, direction.x * travel, direction.z * travel, 0.6);
  }
  return helpers.filter(h => kinds.includes(h.type));
}

function separatedByBank(level, a, b) {
  return level.rivers.some(river =>
    (a.x - river.x) * (b.x - river.x) < 0 &&
    !clearanceAt(river, (a.z + b.z) / 2, 0.65, river.bridges));
}

export function stepSimulation(level, dog, input = {}, dt = 1 / 60, upgrades = {}) {
  const effects=upgradeEffects(upgrades);
  dt = clamp(Number(dt) || 0, 0, 0.1);
  level.time = (level.time || 0) + dt;
  const events = [];
  const ix = Number(input.x) || 0, iz = Number(input.z ?? input.y) || 0;
  const magnitude = Math.min(1, Math.hypot(ix, iz));
  const direction = normal(ix, iz);
  const speed = 7.8 + effects.speedBoost;
  const before = { x: dog.x, z: dog.z };
  const dogCollision = moveBody(level, dog, direction.x * magnitude * speed * dt, direction.z * magnitude * speed * dt, 0.62);
  dog.vx = dt ? (dog.x - before.x) / dt : 0;
  dog.vz = dt ? (dog.z - before.z) / dt : 0;
  dog.heading = magnitude > 0.03 ? Math.atan2(direction.x, direction.z) : (dog.heading || 0);
  level.dog = dog;
  const active = level.animals.filter(a => !a.saved);
  const helpers = updateHelpers(level, active, dt, upgrades);
  const radius = 7.6 + effects.signalBoost + (input.bark ? 3.3 : 0);
  const predators = [{ ...dog, radius, strength: input.bark ? 1.65+effects.barkBoost : 1 }, ...helpers.map(h => ({ ...h, radius: 6, strength: h.type === 'drone' ? effects.droneStrength : effects.helperStrength }))];
  // Read the entire flock snapshot before moving any sheep: order is irrelevant.
  const snapshot = active.map(a => ({ ...a }));
  for (let i = 0; i < active.length; i++) {
    const animal = active[i], old = snapshot[i];
    const physicalRadius = animal.type === 'cow' ? 0.78 : 0.55;
    let sx = 0, sz = 0, cx = 0, cz = 0, avx = 0, avz = 0, neighbors = 0, pressure = 0;
    for (const other of snapshot) {
      if (other.id === animal.id) continue;
      const dx = old.x - other.x, dz = old.z - other.z, d = Math.hypot(dx, dz);
      if (d < 2 && d > 0.01) { const force = (2 - d) / d; sx += dx * force; sz += dz * force; }
      if (d < 18 && !separatedByBank(level, old, other)) { cx += other.x; cz += other.z; avx += other.vx; avz += other.vz; neighbors++; }
    }
    let desiredX = sx * 2.5, desiredZ = sz * 2.5;
    for (const predator of predators) {
      const dx = old.x - predator.x, dz = old.z - predator.z, d = Math.hypot(dx, dz);
      if (d < predator.radius) {
        const urgency = Math.pow(1 - d / predator.radius, 0.65) * predator.strength;
        const flee = d > 0.01 ? { x: dx / d, z: dz / d } : { x: 1, z: 0 };
        desiredX += flee.x * urgency * 5.2;
        desiredZ += flee.z * urgency * 5.2;
        pressure = Math.max(pressure, urgency);
      }
    }
    if (neighbors) {
      const dx = cx / neighbors - old.x, dz = cz / neighbors - old.z;
      const d = Math.hypot(dx, dz);
      if (d > 2.6) {
        const toward = normal(dx, dz);
        const cohesion = Math.min(2.6, (d - 2.6) * 0.36)*(1+effects.cohesionBoost);
        desiredX += toward.x * cohesion; desiredZ += toward.z * cohesion;
      }
    }
    if (neighbors) { desiredX += avx / neighbors * 0.45; desiredZ += avz / neighbors * 0.45; }
    // A tiny deterministic idle sway makes the animals alive, without goal drift.
    if (pressure < 0.03) {
      desiredX += Math.sin(level.time * 0.6 + animal.id * 2.1) * 0.12;
      desiredZ += Math.cos(level.time * 0.5 + animal.id * 1.7) * 0.12;
    }
    // When pushed against a barrier, animals seek its opening along that barrier.
    const openingZ = pressure > 0.03 ? openingDirection(level, animal, desiredX) : 0;
    if (openingZ) { desiredZ += openingZ * Math.min(2.4, Math.abs(desiredX) * 0.8 + 0.5); desiredX *= 0.65; }
    const maxSpeed = animal.type === 'cow' ? 3.3 : 4.2;
    const desiredSpeed = Math.hypot(desiredX, desiredZ);
    if (desiredSpeed > maxSpeed) { desiredX *= maxSpeed / desiredSpeed; desiredZ *= maxSpeed / desiredSpeed; }
    const smoothing = 1 - Math.exp(-dt * (animal.type === 'cow' ? 3.5 : 5.5));
    animal.vx += (desiredX - animal.vx) * smoothing;
    animal.vz += (desiredZ - animal.vz) * smoothing;
    const collision = moveBody(level, animal, animal.vx * dt, animal.vz * dt, physicalRadius);
    if ((collision.blockedX || collision.blockedZ) && pressure > 0.03) {
      // Round corners instead of pinning a body against the end of a rail.
      // This follows the player's/helper's pressure, never the destination.
      const forward = normal(animal.vx, animal.vz);
      const travel = Math.min(0.24, Math.hypot(animal.vx, animal.vz) * dt);
      for (const angle of [Math.PI / 6, -Math.PI / 6, Math.PI / 3, -Math.PI / 3, Math.PI / 2, -Math.PI / 2]) {
        const dx = (forward.x * Math.cos(angle) - forward.z * Math.sin(angle)) * travel;
        const dz = (forward.x * Math.sin(angle) + forward.z * Math.cos(angle)) * travel;
        if (canOccupy(level, animal.x + dx, animal.z + dz, physicalRadius)) {
          moveBody(level, animal, dx, dz, physicalRadius);
          break;
        }
      }
    }
    if (collision.blockedX) animal.vx *= 0.45;
    if (collision.blockedZ) animal.vz *= 0.45;
    animal.heading = Math.hypot(animal.vx, animal.vz) > 0.1 ? Math.atan2(animal.vx, animal.vz) : (animal.heading || 0);
    animal.alert = pressure;
    if (distance(animal, level.target) < level.target.radius - physicalRadius * 0.5) {
      animal.saved = true; animal.vx = 0; animal.vz = 0;
      events.push({ type: 'animalSaved', id: animal.id, animalType: animal.type });
    }
  }
  const saved = level.animals.filter(a => a.saved).length;
  const completed = saved === level.animals.length && saved > 0;
  const justCompleted = completed && !level.completed;
  if (justCompleted) {
    level.completed = true;
    events.push({ type: 'levelCompleted', index: level.index, reward: level.reward });
  }
  return { saved, total: level.animals.length, completed, justCompleted, reward: justCompleted ? level.reward : 0, events, helpers, dogCollision };
}

export function defaultProfile() { return { version: 1, points: 0, upgrades: {}, completedLevels: [], highestLevel: 0, music: true }; }

export function validateProfile(value) {
  const result = defaultProfile();
  if (!value || typeof value !== 'object') return result;
  result.points = Number.isFinite(value.points) ? clamp(Math.floor(value.points), 0, 1e9) : 0;
  result.upgrades=validateUpgrades(value.upgrades);
  result.completedLevels = [...new Set((Array.isArray(value.completedLevels) ? value.completedLevels : []).filter(v => Number.isInteger(v) && v >= 0 && v <= 99))].sort((a, b) => a - b);
  result.highestLevel = clamp(Math.max(Number.isInteger(value.highestLevel) ? value.highestLevel : 0, ...result.completedLevels.map(v => v + 1)), 0, 99);
  result.music = value.music !== false;
  return result;
}

export function applyLevelReward(profile, level) {
  if (!level.completed || profile.completedLevels.includes(level.index)) return 0;
  profile.completedLevels.push(level.index);
  profile.highestLevel = Math.min(99, Math.max(profile.highestLevel, level.index + 1));
  profile.points += level.reward;
  return level.reward;
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
