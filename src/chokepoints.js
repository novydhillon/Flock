import { animalRadius } from './animal-size.js';
import { targetFootprint } from './world.js';

/** Local passage behaviour at bridge mouths and open gates (F-HERD-005).
 * Pressured animals keep a lane, follow the animal ahead instead of being
 * shoved backward by the crowd, and give up yielding after a bounded wait.
 * State is transient per animal; it never chooses goals or moves bodies. */
export const APPROACH_DEPTH = 8;
export const YIELD_LIMIT = 3, ESCAPE_TIME = 2;
const axes = heading => ({ x: Math.sin(heading), z: Math.cos(heading) });

function openings(level) {
  const bridges = (level.rivers || []).flatMap(r => r.bridges).map(b => ({ x: b.x, z: b.z, heading: b.heading, width: b.width, half: b.length / 2 }));
  const gates = (level.gates || []).filter(g => !g.operable || g.open).map(g => ({ x: g.x, z: g.z, heading: g.heading, width: g.width, half: 0 }));
  // The destination entrance is approached from outside only.
  const shape = level.target && targetFootprint(level.target);
  const entrance = shape ? [{ x: shape.entrance.x, z: shape.entrance.z, heading: level.target.heading, width: shape.openingWidth, half: 0, inwardOnly: true }] : [];
  return [...bridges, ...gates, ...entrance];
}

/** The opening this body is approaching from either side, with the inward
 * direction and a lateral lane that keeps its whole body inside the opening. */
export function chokeApproach(level, body, radius = animalRadius(body)) {
  let best = null;
  for (const o of openings(level)) {
    const f = axes(o.heading), u = (body.x - o.x) * f.x + (body.z - o.z) * f.z, v = (body.x - o.x) * f.z - (body.z - o.z) * f.x;
    const outside = Math.abs(u) - o.half;
    if (outside < -.01 || outside > APPROACH_DEPTH || Math.abs(v) > o.width / 2 + 3 || (o.inwardOnly && u > 0)) continue;
    if (best && outside >= best.outside) continue;
    const side = Math.sign(u) || 1, limit = Math.max(0, o.width / 2 - radius - .35), lane = Math.max(-limit, Math.min(limit, v));
    const inward = { x: -f.x * side, z: -f.z * side };
    best = { opening: o, outside, inward, lateral: v, lane,
      mouth: { x: o.x + f.x * side * o.half + f.z * lane, z: o.z + f.z * side * o.half - f.x * lane } };
  }
  return best;
}

/** Adjust a pressured animal's desired velocity near an opening. `intent` is
 * the push the animal receives from Pip/helpers or its flock's travel; only
 * forward intent is shaped, so the player can still turn a flock back. */
export function yieldAtOpening(level, animal, old, snapshot, desired, intent, separation) {
  const radius = animalRadius(animal), approach = chokeApproach(level, old, radius);
  if (!approach || intent.x * approach.inward.x + intent.z * approach.inward.z <= .05) { delete animal.chokeYield; return desired; }
  const dir = approach.inward;
  let { x, z } = desired;
  // Crowd separation may spread animals sideways but not push them back out.
  const sepBack = separation.x * dir.x + separation.z * dir.z;
  if (sepBack < 0) { x -= dir.x * sepBack; z -= dir.z * sepBack; }
  // Once lined up with its lane, an animal does not back out of the approach.
  // Outside it, a small step back may be needed to round a rail end or post.
  const along = x * dir.x + z * dir.z;
  if (along < 0 && Math.abs(approach.lane - approach.lateral) < .3) { x -= dir.x * along; z -= dir.z * along; }
  // Drift toward the lane so animals stop converging on the opening's centre.
  const f = axes(approach.opening.heading), offLane = approach.lane - approach.lateral;
  if (Math.abs(offLane) > .3 && approach.outside < radius + 1.5) {
    // Beside a narrow opening: slide along the bank into the lane before
    // advancing, easing back if wedged against an end post or rail.
    const wedged = Math.abs(approach.lateral) > approach.opening.width / 2 - radius - .05 && approach.outside < radius + .45;
    const ahead = wedged ? -.5 : Math.min(x * dir.x + z * dir.z, .3), slide = Math.max(-1.5, Math.min(1.5, offLane * 1.5));
    x = dir.x * ahead + f.z * slide; z = dir.z * ahead - f.x * slide;
  } else {
    // Drift toward the lane so animals stop converging on the opening's centre.
    const drift = Math.max(-1, Math.min(1, offLane * .8));
    x += f.z * drift; z -= f.x * drift;
  }
  if (animal.chokeYield?.escapeUntil <= level.time) delete animal.chokeYield;
  const escaping = animal.chokeYield?.escapeUntil > level.time;
  if (!escaping) {
    // Follow, rather than push into, the nearest animal ahead in this lane.
    let ahead = null;
    for (const other of snapshot) {
      if (other.id === animal.id) continue;
      const dx = other.x - old.x, dz = other.z - old.z, front = dx * dir.x + dz * dir.z, side = Math.abs(dx * dir.z - dz * dir.x);
      const room = radius + animalRadius(other) + .25;
      if (front > 0 && front < room + .3 && side < room && (!ahead || front < ahead.front)) ahead = { other, front, room };
    }
    const forward = x * dir.x + z * dir.z;
    if (ahead) {
      const yieldState = animal.chokeYield ||= { since: level.time };
      if (level.time - yieldState.since > YIELD_LIMIT) animal.chokeYield = { since: level.time, escapeUntil: level.time + ESCAPE_TIME };
      else {
        const pace = Math.max(0, (ahead.other.vx || 0) * dir.x + (ahead.other.vz || 0) * dir.z) + Math.max(0, ahead.front - ahead.room) * 1.5;
        if (forward > pace) { x -= dir.x * (forward - pace); z -= dir.z * (forward - pace); }
      }
    } else delete animal.chokeYield;
  }
  return { x, z };
}
