import { canOccupy } from './world.js';
import { createWeatherState } from './weather.js';

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const seeded = seed => () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
};

/** A reproducible, area-scaled budget keeps meadow fauna varied and bounded. */
export function wildlifePopulation(level, weather = createWeatherState(level)) {
  // Weather stays fixed for the whole level: storm fauna never spawns.
  if (weather.kind === 'storm' || weather.storm) return { squirrel: 0, rabbit: 0, bird: 0, butterfly: 0 };
  const area = (level.bounds.maxX - level.bounds.minX) * (level.bounds.maxZ - level.bounds.minZ);
  const random = seeded((level.seed || 42) ^ 0x57494c44);
  const scale = clamp(area / 3600, .55, 2.4);
  const count = (base, cap) => Math.min(cap, Math.max(1, Math.round(base * scale * (.78 + random() * .44))));
  return {
    squirrel: count(2, 7), rabbit: count(2, 8),
    bird: Math.min(6, Math.max(2, Math.round(3 * scale))),
    butterfly: Math.min(8, Math.max(0, Math.round(5 * scale))),
  };
}

function routeDistance(level, p) {
  let closest = Infinity;
  for (const road of level.roads || []) {
    const points = road.points || [road.from, road.to];
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1], b = points[i], dx = b.x - a.x, dz = b.z - a.z;
      const t = clamp(((p.x - a.x) * dx + (p.z - a.z) * dz) / (dx * dx + dz * dz || 1), 0, 1);
      closest = Math.min(closest, Math.hypot(p.x - a.x - dx * t, p.z - a.z - dz * t));
    }
  }
  return closest;
}

const occupancyVariants = new WeakMap();
function wildlifeOccupancyLevel(level, margin) {
  let variants = occupancyVariants.get(level);
  if (!variants) { variants = new Map(); occupancyVariants.set(level, variants); }
  let open = variants.get(margin);
  if (!open || open.sourceRivers !== level.rivers || open.sourceObstacles !== level.obstacles ||
      open.sourceFenceSegments !== level.fenceSegments || open.targetType !== level.target?.type) {
    const b = level.bounds;
    const solidSegments = (level.fenceSegments || []).filter(segment =>
      segment.kind === 'wall' || segment.kind === 'stone' || segment.material === 'stone' || (segment.kind === 'target' && level.target?.type === 'barn'));
    open = { ...level, sourceRivers: level.rivers, sourceObstacles: level.obstacles,
      sourceFenceSegments: level.fenceSegments, targetType: level.target?.type, fenceSegments: solidSegments,
      bounds: { minX: b.minX - margin - 1, maxX: b.maxX + margin + 1,
        minZ: b.minZ - margin - 1, maxZ: b.maxZ + margin + 1 } };
    variants.set(margin, open);
  }
  return open;
}

/** Ground wildlife can cross ordinary fences and roads. Its spawn search also
 * keeps starts well clear of the route and nearby robots. */
export function wildlifeGroundPositionSafe(level, p, margin = .45) {
  const b = level.bounds;
  return p.x >= b.minX - margin && p.x <= b.maxX + margin && p.z >= b.minZ - margin && p.z <= b.maxZ + margin &&
    canOccupy(wildlifeOccupancyLevel(level, margin), p.x, p.z, .4);
}
export function wildlifePositionSafe(level, p, threats = [], margin = .45) {
  return routeDistance(level, p) > 5.5 && wildlifeGroundPositionSafe(level, p, margin) &&
    threats.every(threat => distance(p, threat) > 8);
}

// The thresholds leave ordinary wind and light rain populated. Small
// invertebrates retreat first, followed by squirrels, birds, then rabbits.
const shelterThreshold = { butterfly: .54, squirrel: .58, bird: .64, rabbit: .76 };
function shelterPoint(level, animal) {
  let nearest = null, nearestDistance = 18;
  for (const tree of level.obstacles || []) {
    const d = distance(animal, tree);
    if (d >= nearestDistance || d < .01) continue;
    const clearance = tree.radius + .85, awayX = (animal.x - tree.x) / d, awayZ = (animal.z - tree.z) / d;
    const candidate = { x: tree.x + awayX * clearance, z: tree.z + awayZ * clearance };
    if (wildlifeGroundPositionSafe(level, candidate, .2)) { nearest = candidate; nearestDistance = d; }
  }
  return nearest || { x: animal.homeX, z: animal.homeZ };
}
function randomizeWaypoint(animal) {
  const random = seeded(animal.randomSeed || ((Math.floor((animal.phase || 0) * 1e6) ^ animal.slot || 1) >>> 0));
  animal.randomSeed = Math.floor(random() * 4294967295) || 1;
  const angle = random() * Math.PI * 2, radius = 3 + random() * 8;
  animal.waypointX = animal.homeX + Math.cos(angle) * radius;
  animal.waypointZ = animal.homeZ + Math.sin(angle) * radius;
  animal.waitTimer = 0;
}

/** Pausable, deterministic wander/alert/shelter motion. Fauna never pushes
 * flock members; regular fence lines and dry roads are traversable. */
export function stepWildlife(level, animal, dt, threats = [], time = 0, weather = level.weather, occupancy = wildlifeGroundPositionSafe) {
  // Keep the former sixth-argument occupancy hook working for existing callers.
  const legacyOccupancy = typeof weather === 'function';
  if (legacyOccupancy) { occupancy = weather; weather = level.weather; }
  if (!(dt > 0)) return animal;
  const oldX = animal.x, oldZ = animal.z;
  const severity = clamp(Number(weather?.severity) || 0, 0, 1);
  const threshold = shelterThreshold[animal.kind] ?? .64;
  if(severity>=threshold)animal.sheltering=true;else if(severity<threshold-.12)animal.sheltering=false;
  const threatRadius = animal.kind === 'bird' ? 10 : animal.kind === 'butterfly' ? 6 : 7.5;
  let flee = false, dx = 0, dz = 0;
  for (const threat of threats) {
    const d = distance(animal, threat);
    if (d < threatRadius) {
      flee = true;
      dx += (animal.x - threat.x) / Math.max(.1, d) * (threatRadius - d);
      dz += (animal.z - threat.z) / Math.max(.1, d) * (threatRadius - d);
    }
  }

  if (flee) {
    if (!animal.fleeing) { animal.homeX = animal.x; animal.homeZ = animal.z; }
    animal.waypointX = undefined; animal.waypointZ = undefined;
    animal.alertTimer = 1.15;
    animal.shelter = Math.max(0, (animal.shelter || 0) - dt * 3.5);
    animal.hidden = false;
    animal.shelterX = undefined;
  } else {
    animal.alertTimer = Math.max(0, (animal.alertTimer || 0) - dt);
    if (animal.sheltering) {
      if (animal.shelterX === undefined) {
        const point = shelterPoint(level, animal);
        animal.shelterX = point.x; animal.shelterZ = point.z;
      }
      animal.shelter = Math.min(1, (animal.shelter || 0) + dt * .32);
      dx = animal.shelterX - animal.x;
      dz = animal.shelterZ - animal.z;
    } else {
      animal.shelter = Math.max(0, (animal.shelter || 0) - dt * .48);
      animal.hidden = animal.shelter >= .995;
      if (animal.shelterX !== undefined && animal.shelter === 0) {
        animal.shelterX = undefined;
        animal.shelterZ = undefined;
        animal.waypointX = undefined;
      }
      if (animal.alertTimer > 0) {
        dx = dz = 0;
      } else if ((animal.waitTimer || 0) > 0) {
        animal.waitTimer = Math.max(0, animal.waitTimer - dt);
        dx = dz = 0;
      } else {
        if (animal.waypointX !== undefined && distance(animal, { x: animal.waypointX, z: animal.waypointZ }) < .45) {
          const random = seeded(animal.randomSeed || 1);
          animal.randomSeed = Math.floor(random() * 4294967295) || 1;
          animal.waypointX = undefined; animal.waypointZ = undefined;
          animal.waitTimer = .55 + random() * 2.1;
          dx = dz = 0;
        } else {
          if (animal.waypointX === undefined) randomizeWaypoint(animal);
          dx = animal.waypointX - animal.x;
          dz = animal.waypointZ - animal.z;
        }
      }
    }
  }

  let length = Math.hypot(dx, dz);
  if (flee && length < .01) {
    const angle = Number.isFinite(animal.heading) ? animal.heading : (animal.phase || 0);
    dx = Math.sin(angle); dz = Math.cos(angle); length = 1;
  }
  const isRabbit = animal.kind === 'rabbit';
  const gaitPhase = ((animal.gait || 0) % 1 + 1) % 1;
  // Rabbits cover ground during the push/air phase, then visibly crouch to land.
  const airborne = !isRabbit || gaitPhase < .54;
  let speed = flee ? (animal.kind === 'bird' ? 5.2 : isRabbit ? 4.2 : 3.5)
    : animal.kind === 'squirrel' ? .9 : isRabbit ? 3.5 : animal.kind === 'bird' ? 1.4 : .8;
  if (animal.sheltering && !flee) speed = .95;
  const travel = length > .01 && airborne ? Math.min(length, dt * speed) : 0;
  if (travel) {
    const nx = animal.x + dx / length * travel, nz = animal.z + dz / length * travel;
    const valid = p => legacyOccupancy ? occupancy(level, p.x, p.z, .4) : occupancy(level, p, .45);
    if (animal.kind === 'bird' || valid({ x: nx, z: nz })) { animal.x = nx; animal.z = nz; }
    else if (valid({ x: nx, z: animal.z })) animal.x = nx;
    else if (valid({ x: animal.x, z: nz })) animal.z = nz;
  }

  animal.moving = Math.hypot(animal.x - oldX, animal.z - oldZ) > .001;
  if (animal.moving) { animal.heading = Math.atan2(animal.x - oldX, animal.z - oldZ); animal.stuckTimer = 0; }
  else if (travel > .001) {
    animal.stuckTimer = (animal.stuckTimer || 0) + dt;
    if (animal.stuckTimer >= 1) {
      const b = level.bounds;
      animal.waypointX = animal.x > b.maxX - .2 ? b.maxX - 1.2 : animal.x < b.minX + .2 ? b.minX + 1.2 : clamp(animal.homeX, b.minX + 1.2, b.maxX - 1.2);
      animal.waypointZ = animal.z > b.maxZ - .2 ? b.maxZ - 1.2 : animal.z < b.minZ + .2 ? b.minZ + 1.2 : clamp(animal.homeZ, b.minZ + 1.2, b.maxZ - 1.2);
      animal.shelterX = undefined; animal.shelterZ = undefined; animal.stuckTimer = 0; animal.waitTimer = .2;
    }
  }
  animal.fleeing = flee;
  animal.alert = flee || animal.alertTimer > 0;
  animal.gait = (animal.gait || 0) + dt * (flee ? 1.8 : isRabbit ? 1.35 : animal.kind === 'squirrel' ? 1.7 : 1.2);
  animal.hidden = animal.shelter >= .995 && !flee;
  return animal;
}
