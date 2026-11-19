import { terrainHeight } from '../../world/world.js';
import { birdAirPathClear, birdPerchAvailable } from './bird-perches.js';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

export function birdWetFooting(wetGround, x, z) {
  if (!wetGround) return false;
  // Ground contacts fit within this small area, including the forward toes.
  const reach = 0.13;
  return (
    wetGround(x, z) ||
    wetGround(x - reach, z) ||
    wetGround(x + reach, z) ||
    wetGround(x, z - reach) ||
    wetGround(x, z + reach)
  );
}

/** Landing checks include the full river footprint, even where gameplay permits
 * bridge traversal. Birds forage on dry ground, never on a water surface. */
export function birdLandingPositionSafe(level, p, threats, occupancy) {
  if (!occupancy(level, p, 0) || threats.some((threat) => birdThreatAt(p, threat, 12))) return false;
  for (const river of level.rivers || []) {
    for (let i = 1; i < river.points.length; i++) {
      const a = river.points[i - 1],
        b = river.points[i],
        dx = b.x - a.x,
        dz = b.z - a.z;
      const t = clamp(((p.x - a.x) * dx + (p.z - a.z) * dz) / (dx * dx + dz * dz || 1), 0, 1);
      if (Math.hypot(p.x - a.x - dx * t, p.z - a.z - dz * t) < river.width / 2 + 0.5) return false;
    }
  }
  return true;
}

const smooth = (t) => t * t * (3 - 2 * t);
function birdRandom(level, bird) {
  bird.birdSeed =
    (Math.imul(
      bird.birdSeed ?? (level.seed || 42) ^ 0x42495244 ^ Math.imul((bird.slot || 0) + 1, 1013904223),
      1664525,
    ) +
      1013904223) >>>
    0;
  return bird.birdSeed / 4294967296;
}
function birdForage(level, bird) {
  bird.birdState = 'forage';
  bird.birdStateTime = 0;
  bird.altitude = 0;
  bird.forageRemaining = 5 + birdRandom(level, bird) * 7;
  bird.gestureWait = 0.3 + birdRandom(level, bird) * 1.2;
  bird.hopHeight = 0;
  bird.peck = 0;
  bird.hopElapsed = bird.peckElapsed = undefined;
  bird.landingX = bird.landingZ = undefined;
}
const isPerched = (bird) => bird.birdState === 'perched' || bird.birdState === 'perchedChirp';
const onGround = (bird) => !bird.birdState || bird.birdState === 'forage';
const position = (level, bird) => ({
  x: bird.x,
  y: terrainHeight(level, bird.x, bird.z) + (bird.altitude || 0) + (bird.hopHeight || 0),
  z: bird.z,
});

function moveTo(level, bird, point) {
  bird.x = point.x;
  bird.z = point.z;
  bird.altitude = point.y - terrainHeight(level, point.x, point.z);
}

function turnTo(bird, dx, dz, dt) {
  if (Math.hypot(dx, dz) < 0.001) return;
  const heading = bird.heading || 0;
  const turn = Math.atan2(dx, dz) - heading;
  bird.heading = heading + clamp(Math.atan2(Math.sin(turn), Math.cos(turn)), -dt * 4.5, dt * 4.5);
}

function groupNeighbors(bird, birds) {
  return bird.group === undefined ? [] : birds.filter((other) => other !== bird && other.group === bird.group);
}

function separateFromBirds(bird, point, birds) {
  return birds.every((other) => {
    if (other === bird) return true;
    const groundSite = other.landing?.anchor ? null : other.landing?.end;
    const hopSite = other.hopElapsed !== undefined ? { x: other.hopX, z: other.hopZ } : null;
    return (
      (!onGround(other) || distance(point, other) >= 0.85) &&
      (!groundSite || distance(point, groundSite) >= 0.85) &&
      (!hopSite || distance(point, hopSite) >= 0.85)
    );
  });
}

export function arrangeBirdGroups(level, birds, perches, threats, occupancy, wetGround) {
  const visible = birds.filter((bird) => bird.visible);
  const groupSize = visible.length === 4 ? 2 : 3;
  for (let i = 0; i < visible.length; i++) {
    const bird = visible[i];
    const leader = visible[i - (i % groupSize)];
    bird.group = Math.floor(i / groupSize);
    if (bird === leader) continue;
    for (let attempt = 0; attempt < 18; attempt++) {
      const heading = (i + attempt) * 2.399963;
      const radius = 1.15 + (attempt % 3) * 0.65;
      const p = { x: leader.x + Math.sin(heading) * radius, z: leader.z + Math.cos(heading) * radius };
      if (
        birdWetFooting(wetGround, p.x, p.z) ||
        !birdLandingPositionSafe(level, p, threats, occupancy) ||
        !separateFromBirds(bird, p, visible)
      )
        continue;
      const y = terrainHeight(level, p.x, p.z);
      if (!birdAirPathClear(level, perches, { ...p, y: y + 0.9 }, { ...p, y })) continue;
      bird.x = bird.homeX = p.x;
      bird.z = bird.homeZ = p.z;
      break;
    }
  }
}

function beginTakeoff(level, bird, exit = null) {
  bird.birdState = 'takeoff';
  bird.birdStateTime = 0;
  bird.altitude = Math.max(bird.altitude || 0, bird.hopHeight || 0);
  bird.takeoffAltitude = bird.altitude;
  bird.cruiseAltitude = Math.max(bird.altitude, 2.6 + birdRandom(level, bird) * 0.8);
  bird.flightRemaining = 3.5 + birdRandom(level, bird) * 3;
  bird.landingX = bird.landingZ = undefined;
  bird.hopElapsed = undefined;
  bird.hopHeight = 0;
  bird.peckElapsed = undefined;
  bird.peck = 0;
  bird.takeoffExit = exit;
  bird.landing = null;
  bird.perch = null;
  bird.perchedGesture = null;
  bird.gestureAmount = 0;
  bird.call = false;
  bird.groupAlarm = null;
}

function flightMove(level, bird, dt, dx, dz, speed, altitude, perches) {
  const b = level.bounds;
  if (bird.x < b.minX + 2 || bird.x > b.maxX - 2 || bird.z < b.minZ + 2 || bird.z > b.maxZ - 2) {
    dx += ((b.minX + b.maxX) / 2 - bird.x) * 0.5;
    dz += ((b.minZ + b.maxZ) / 2 - bird.z) * 0.5;
  }
  turnTo(bird, dx, dz, dt);
  const from = position(level, bird);
  const step = (heading, height, pace) => {
    const x = clamp(bird.x + Math.sin(heading) * pace * dt, b.minX + 0.6, b.maxX - 0.6);
    const z = clamp(bird.z + Math.cos(heading) * pace * dt, b.minZ + 0.6, b.maxZ - 0.6);
    const y = terrainHeight(level, x, z) + height;
    const to = { x, y, z };
    if (!birdAirPathClear(level, perches, from, to)) return false;
    moveTo(level, bird, to);
    return true;
  };
  const heading = bird.heading || 0;
  const towardEscape = dx * Math.sin(heading) + dz * Math.cos(heading);
  const flyingSpeed = bird.alert && towardEscape < 0 ? 0 : speed;
  if (step(heading, altitude, flyingSpeed)) return;
  // Rise at the obstacle boundary. Under a canopy or overhang, steer toward
  // the first clear side while holding height instead.
  if (step(0, bird.altitude + 3.5 * dt, 0)) return;
  for (const offset of [Math.PI / 2, -Math.PI / 2, Math.PI]) {
    if (step(heading + offset, bird.altitude, speed)) {
      turnTo(bird, Math.sin(heading + offset), Math.cos(heading + offset), dt);
      break;
    }
  }
}

function landingSite(level, bird, threats, occupancy, frame) {
  const start = position(level, bird);
  const { perches, birds, wetGround } = frame;
  const anchors = perches?.anchors || [];
  if (anchors.length && birdRandom(level, bird) < 0.48) {
    const options = anchors
      .filter((anchor) => distance(bird, anchor) <= 17 && birdPerchAvailable(level, anchor))
      .sort((a, b) => distance(a, bird) - distance(b, bird));
    for (const anchor of options.slice(0, 12)) {
      if (
        birds.some((other) => {
          const occupied = other.perch || other.landing?.anchor;
          return (
            other !== bird &&
            occupied &&
            (occupied.id === anchor.id ||
              Math.hypot(occupied.x - anchor.x, occupied.y - anchor.y, occupied.z - anchor.z) < 0.75)
          );
        })
      )
        continue;
      if (
        birdAirPathClear(level, perches, start, anchor.approach) &&
        birdAirPathClear(level, perches, anchor.approach, anchor, anchor)
      )
        return { end: anchor, approach: anchor.approach, anchor };
    }
  }
  const neighbor = groupNeighbors(bird, birds).find(
    (other) => onGround(other) && !other.hidden && distance(other, bird) < 13,
  );
  for (let i = 0; i < 24; i++) {
    const groupSite = neighbor && i < 12;
    const angle = groupSite
      ? birdRandom(level, bird) * Math.PI * 2
      : (bird.heading || 0) + (birdRandom(level, bird) - 0.5) * 1.8;
    const radius = groupSite ? 1.3 + birdRandom(level, bird) * 2.2 : 2.5 + birdRandom(level, bird) * 6;
    const origin = groupSite ? neighbor : bird;
    const p = { x: origin.x + Math.sin(angle) * radius, z: origin.z + Math.cos(angle) * radius };
    if (
      birdWetFooting(wetGround, p.x, p.z) ||
      !birdLandingPositionSafe(level, p, threats, occupancy) ||
      !separateFromBirds(bird, p, birds)
    )
      continue;
    const end = { ...p, y: terrainHeight(level, p.x, p.z) };
    if (birdAirPathClear(level, perches, start, end)) return { end };
  }
  return null;
}

function beginLanding(level, bird, landing) {
  bird.birdState = 'landing';
  bird.birdStateTime = 0;
  bird.landingX = landing.end.x;
  bird.landingZ = landing.end.z;
  const from = position(level, bird);
  const to = landing.approach || landing.end;
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
  const approachLength = landing.approach ? distance(landing.approach, landing.end) : 0;
  const firstLength = distance(from, to);
  bird.landing = { ...landing, from, firstLength, totalLength: firstLength + approachLength };
  bird.landingDuration = Math.max(1.5, (bird.landing.totalLength * 2) / 3.2);
}

function perchExit(bird) {
  return bird.perch || (bird.landing?.inPerchCorridor ? bird.landing.anchor : null);
}

function landingPoint(landing, t) {
  const travel = (1 - (1 - t) ** 2) * landing.totalLength;
  const final = landing.approach && travel >= landing.firstLength;
  const from = final ? landing.approach : landing.from;
  const to = final ? landing.end : landing.approach || landing.end;
  const fraction = final
    ? (travel - landing.firstLength) / (landing.totalLength - landing.firstLength || 1)
    : travel / (landing.firstLength || 1);
  return {
    x: from.x + (to.x - from.x) * fraction,
    y: from.y + (to.y - from.y) * fraction,
    z: from.z + (to.z - from.z) * fraction,
    inPerchCorridor: !!final,
  };
}

function settleOnPerch(level, bird, anchor) {
  bird.perch = anchor;
  bird.landing = null;
  bird.landingX = bird.landingZ = undefined;
  bird.birdState = 'perched';
  bird.birdStateTime = 0;
  bird.perchRemaining = 9 + birdRandom(level, bird) * 12;
  bird.callWait =
    anchor.kind === 'tree' || birdRandom(level, bird) < 0.62 ? 1.2 + birdRandom(level, bird) * 4 : Infinity;
  bird.gestureWait = 0.65 + birdRandom(level, bird) * 2.1;
  bird.perchedGesture = null;
}

function stepPerched(level, bird, dt) {
  const anchor = bird.perch;
  if (!anchor || !birdPerchAvailable(level, anchor) || (bird.perchRemaining -= dt) <= 0) {
    beginTakeoff(level, bird, anchor);
    return;
  }
  turnTo(bird, Math.sin(anchor.heading || 0), Math.cos(anchor.heading || 0), dt);
  if (bird.birdState === 'perchedChirp' && bird.birdStateTime >= 0.55) {
    bird.birdState = 'perched';
    bird.birdStateTime = 0;
  }
  if ((bird.callWait -= dt) <= 0) {
    bird.birdState = 'perchedChirp';
    bird.birdStateTime = 0;
    bird.call = true;
    bird.perchedGesture = null;
    bird.gestureAmount = 0;
    bird.gestureWait = 0.9 + birdRandom(level, bird) * 1.8;
    bird.callWait = 3.5 + birdRandom(level, bird) * 6;
    return;
  }
  if (bird.birdState === 'perchedChirp') return;
  if (!bird.perchedGesture && (bird.gestureWait -= dt) <= 0) {
    bird.perchedGesture = ['tilt', 'preen', 'ruffle'][Math.floor(birdRandom(level, bird) * 3)];
    bird.gestureElapsed = 0;
  }
  if (!bird.perchedGesture) return;
  bird.gestureElapsed += dt;
  const duration = bird.perchedGesture === 'preen' ? 1.05 : 0.58;
  const t = clamp(bird.gestureElapsed / duration, 0, 1);
  bird.gestureAmount = Math.sin(t * Math.PI) ** 2 * (bird.perchedGesture === 'ruffle' ? Math.sin(t * Math.PI * 6) : 1);
  if (t === 1) {
    bird.perchedGesture = null;
    bird.gestureAmount = 0;
    bird.gestureWait = 1.4 + birdRandom(level, bird) * 3.3;
  }
}

function stepForage(level, bird, dt, threats, occupancy, frame) {
  if (
    birdWetFooting(frame.wetGround, bird.x, bird.z) ||
    !birdLandingPositionSafe(level, bird, [], occupancy) ||
    (bird.forageRemaining -= dt) <= 0
  ) {
    beginTakeoff(level, bird);
    return;
  }
  if (bird.hopElapsed !== undefined) {
    if (birdWetFooting(frame.wetGround, bird.hopX, bird.hopZ)) {
      beginTakeoff(level, bird);
      return;
    }
    bird.hopElapsed += dt;
    const t = clamp(bird.hopElapsed / 0.34, 0, 1);
    bird.x = bird.hopStartX + (bird.hopX - bird.hopStartX) * t;
    bird.z = bird.hopStartZ + (bird.hopZ - bird.hopStartZ) * t;
    bird.hopHeight = Math.sin(t * Math.PI) * 0.17;
    if (t === 1) {
      bird.hopElapsed = undefined;
      bird.hopHeight = 0;
      bird.gestureWait = 0.3 + birdRandom(level, bird) * 0.9;
    }
    return;
  }
  if (bird.peckElapsed !== undefined) {
    bird.peckElapsed += dt;
    const t = clamp(bird.peckElapsed / 0.48, 0, 1);
    bird.peck = Math.sin(t * Math.PI) ** 2;
    if (t === 1) {
      bird.peckElapsed = undefined;
      bird.peck = 0;
      bird.gestureWait = 0.35 + birdRandom(level, bird) * 1.2;
    }
    return;
  }
  if ((bird.gestureWait -= dt) > 0) return;
  if (birdRandom(level, bird) >= 0.4) {
    bird.peckElapsed = 0;
    return;
  }
  const heading = (bird.heading || 0) + (birdRandom(level, bird) - 0.5) * 2;
  const length = 0.45 + birdRandom(level, bird) * 0.55;
  const p = { x: bird.x + Math.sin(heading) * length, z: bird.z + Math.cos(heading) * length };
  if (!separateFromBirds(bird, p, frame.birds)) {
    bird.gestureWait = 0.6;
    return;
  }
  let previous = position(level, bird);
  for (let i = 1; i <= 5; i++) {
    const t = i / 5;
    const point = { x: bird.x + (p.x - bird.x) * t, z: bird.z + (p.z - bird.z) * t };
    point.y = terrainHeight(level, point.x, point.z) + Math.sin(t * Math.PI) * 0.17;
    if (
      birdWetFooting(frame.wetGround, point.x, point.z) ||
      !birdLandingPositionSafe(level, point, threats, occupancy) ||
      !birdAirPathClear(level, frame.perches, previous, point)
    ) {
      bird.gestureWait = 0.6;
      return;
    }
    previous = point;
  }
  bird.hopStartX = bird.x;
  bird.hopStartZ = bird.z;
  bird.hopX = p.x;
  bird.hopZ = p.z;
  bird.hopElapsed = 0;
  bird.heading = heading;
}

function birdThreatAt(bird, threat, radius) {
  const d = distance(bird, threat);
  if (d >= radius) return false;
  // Livestock must be moving quickly toward the point. The existing Pip and
  // robotic companion proximity triggers still apply.
  if (threat.type !== 'cow' && threat.type !== 'sheep') return true;
  const vx = threat.vx || 0;
  const vz = threat.vz || 0;
  const closing = ((bird.x - threat.x) * vx + (bird.z - threat.z) * vz) / Math.max(0.1, d);
  return Math.hypot(vx, vz) >= 2.4 && (d < 0.1 || closing >= 1.3);
}

function escapeVector(level, bird, threats, dt, birds) {
  let dx = 0;
  let dz = 0;
  let direct = false;
  for (const threat of threats) {
    if (!birdThreatAt(bird, threat, 10)) continue;
    const d = distance(bird, threat);
    direct = true;
    dx += ((bird.x - threat.x) / Math.max(0.1, d)) * (10 - d);
    dz += ((bird.z - threat.z) / Math.max(0.1, d)) * (10 - d);
  }
  const grounded = onGround(bird) || isPerched(bird) || bird.birdState === 'landing';
  if (direct && grounded) {
    for (const other of groupNeighbors(bird, birds)) {
      if (!onGround(other) || other.hidden || other.groupAlarm || distance(other, bird) > 5.5) continue;
      other.groupAlarm = { remaining: 0.13 + birdRandom(level, other) * 0.52, dx, dz };
    }
  }
  if (direct) return { dx, dz, flee: true };
  if (bird.groupAlarm && (bird.groupAlarm.remaining -= dt) <= 0)
    return { dx: bird.groupAlarm.dx, dz: bird.groupAlarm.dz, flee: true };
  if ((bird.alertTimer || 0) > 0 && bird.escapeCourse) return { ...bird.escapeCourse, flee: false };
  return { dx: 0, dz: 0, flee: false };
}

function departure(level, bird, dt, dx, dz, perches) {
  const anchor = bird.takeoffExit;
  if (!anchor) {
    const t = clamp(bird.birdStateTime / 0.75, 0, 1);
    const altitude = Math.max(
      bird.altitude,
      bird.takeoffAltitude + (bird.cruiseAltitude - bird.takeoffAltitude) * smooth(t),
    );
    flightMove(level, bird, dt, dx, dz, 2.8 + t * 2.4, altitude, perches);
    return t === 1;
  }
  const start = position(level, bird);
  const to = anchor.approach;
  const length = Math.hypot(start.x - to.x, start.y - to.y, start.z - to.z);
  const t = Math.min(1, (dt * 3.6) / (length || 1));
  const next = {
    x: start.x + (to.x - start.x) * t,
    y: start.y + (to.y - start.y) * t,
    z: start.z + (to.z - start.z) * t,
  };
  if (!birdAirPathClear(level, perches, start, next, anchor)) {
    flightMove(level, bird, dt, dx, dz, 2.8, bird.altitude + dt * 3, perches);
    return true;
  }
  turnTo(bird, to.x - start.x, to.z - start.z, dt);
  moveTo(level, bird, next);
  return t === 1;
}

export function stepBird(level, bird, dt, threats, weather, occupancy, shelterPoint, frame = { birds: [] }) {
  if (!bird.birdState) birdForage(level, bird);
  bird.altitude ??= bird.birdState === 'forage' ? 0 : 3;
  bird.birdStateTime = (bird.birdStateTime || 0) + dt;
  bird.call = false;
  const oldX = bird.x;
  const oldZ = bird.z;
  const severity = clamp(Number(weather?.severity) || 0, 0, 1);
  if (severity >= 0.64) bird.sheltering = true;
  else if (severity < 0.52) bird.sheltering = false;
  let { dx, dz, flee } = escapeVector(level, bird, threats, dt, frame.birds);
  if (flee) {
    bird.escapeCourse = { dx, dz };
    bird.alertTimer = 1.15;
    bird.clearTime = 0;
    bird.shelter = Math.max(0, (bird.shelter || 0) - dt * 3.5);
  } else {
    bird.alertTimer = Math.max(0, (bird.alertTimer || 0) - dt);
    bird.clearTime = (bird.clearTime || 0) + dt;
    bird.shelter = clamp((bird.shelter || 0) + dt * (bird.sheltering ? 0.32 : -0.48), 0, 1);
    if (bird.sheltering) {
      const point = shelterPoint(level, bird);
      dx = point.x - bird.x;
      dz = point.z - bird.z;
    }
  }
  bird.fleeing = flee;
  bird.alert = flee || bird.alertTimer > 0;
  bird.hidden = bird.shelter >= 0.995 && !flee;
  if ((flee || bird.sheltering) && (onGround(bird) || isPerched(bird) || bird.birdState === 'landing')) {
    beginTakeoff(level, bird, perchExit(bird));
  }

  if (bird.birdState === 'forage') stepForage(level, bird, dt, threats, occupancy, frame);
  else if (isPerched(bird)) stepPerched(level, bird, dt);

  if (bird.birdState === 'takeoff') {
    if (departure(level, bird, dt, dx, dz, frame.perches)) {
      bird.birdState = 'flight';
      bird.birdStateTime = 0;
      bird.takeoffExit = null;
    }
  } else if (bird.birdState === 'flight') {
    const altitude = bird.altitude + ((bird.cruiseAltitude || 3) - bird.altitude) * Math.min(1, dt * 3);
    bird.courseRemaining = (bird.courseRemaining || 0) - dt;
    if (bird.courseRemaining <= 0) {
      bird.course = (bird.heading || 0) + (birdRandom(level, bird) - 0.5) * 1.8;
      bird.courseRemaining = 1 + birdRandom(level, bird) * 2;
    }
    if (!bird.alert && !bird.sheltering) {
      dx = Math.sin(bird.course);
      dz = Math.cos(bird.course);
    }
    flightMove(level, bird, dt, dx, dz, flee ? 5.2 : 3.2, altitude, frame.perches);
    bird.flightRemaining = (bird.flightRemaining ?? 4) - dt;
    bird.landingRetry = Math.max(0, (bird.landingRetry || 0) - dt);
    if (!flee && !bird.sheltering && bird.clearTime >= 2.5 && bird.flightRemaining <= 0 && bird.landingRetry === 0) {
      const site = landingSite(level, bird, threats, occupancy, frame);
      bird.landingRetry = 1.5;
      if (site) beginLanding(level, bird, site);
    }
  } else if (bird.birdState === 'landing') {
    const landing = bird.landing;
    const anchor = landing?.anchor;
    const t = clamp(bird.birdStateTime / bird.landingDuration, 0, 1);
    const next = landing && landingPoint(landing, t);
    if (
      !landing ||
      (anchor
        ? !birdPerchAvailable(level, anchor)
        : birdWetFooting(frame.wetGround, landing.end.x, landing.end.z) ||
          !birdLandingPositionSafe(level, landing.end, threats, occupancy) ||
          !separateFromBirds(bird, landing.end, frame.birds)) ||
      !birdAirPathClear(level, frame.perches, position(level, bird), next, anchor)
    )
      beginTakeoff(level, bird, perchExit(bird));
    else {
      const heading = anchor?.heading || 0;
      if (anchor && t > 0.45) turnTo(bird, Math.sin(heading), Math.cos(heading), dt);
      else turnTo(bird, next.x - bird.x, next.z - bird.z, dt);
      moveTo(level, bird, next);
      landing.inPerchCorridor = next.inPerchCorridor;
      if (t === 1) {
        bird.landing = null;
        if (anchor) settleOnPerch(level, bird, anchor);
        else birdForage(level, bird);
      }
    }
  }
  bird.moving = Math.hypot(bird.x - oldX, bird.z - oldZ) > 0.001;
  return bird;
}
