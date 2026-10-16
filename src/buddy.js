import { canOccupy, moveBody, navigationTarget, hasClearGroundPath } from './world.js';

const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const normal = (x, z) => { const d = Math.hypot(x, z); return d > 1e-6 ? { x: x / d, z: z / d } : { x: 0, z: 0 }; };
const center = group => group.reduce((p, a) => ({ x: p.x + a.x / group.length, z: p.z + a.z / group.length }), { x: 0, z: 0 });

/** Ground-visible connected components; single animals are not flock groups. */
export function flockGroups(level, animals) {
  const remaining = new Set(animals), groups = [];
  while (remaining.size) {
    const first = remaining.values().next().value, group = [first];
    remaining.delete(first);
    for (let i = 0; i < group.length; i++) for (const other of remaining) {
      if (distance(group[i], other) <= 6.5 && hasClearGroundPath(level, group[i], other, .15)) {
        group.push(other); remaining.delete(other);
      }
    }
    groups.push(group);
  }
  return groups;
}

const overlap = (group, ids = []) => group.filter(a => ids.includes(a.id)).length;
const stableOrder = (a, b, ids) => overlap(b, ids) - overlap(a, ids) || Math.min(...a.map(v => v.id)) - Math.min(...b.map(v => v.id));

/** Buddy chooses travel from flock velocity, never from the destination or Pip.
 * All influence requires being behind the subject, in range, on clear ground. */
export function updateBuddy(level, active, effects, dt, events) {
  if (!effects.helper) return { forces: new Map(), memberIds: new Set() };
  let buddy = level.helpers.find(h => h.type === 'helper');
  if (!buddy) { buddy = { type: 'helper', x: level.dog.x, z: level.dog.z }; level.helpers.push(buddy); }
  const state = level.buddyHerd ||= {};
  const tier = effects.helperTier;
  buddy.barking = level.time < (buddy.barkUntil || 0);
  // Keep a retrieval target after our own pressure clears its excursion fields.
  let stray = tier >= 3 && active.find(a => a.id === state.retrieveId);
  const candidates = active.filter(a => a.id !== stray?.id && !a.wander && !a.wanderHome);
  const signature = candidates.map(a => a.id).join(',');
  if (!state.groups || signature !== state.signature || level.time - state.checkedAt >= .25) {
    state.groups = flockGroups(level, candidates).filter(g => g.length >= 2);
    state.signature = signature; state.checkedAt = level.time;
  }
  const groups = state.groups;
  groups.sort((a, b) => b.length - a.length || stableOrder(a, b, state.travelIds));
  const main = groups[0];
  if (!main) {
    buddy.mode = 'standby'; buddy.clusterIds = []; buddy.targetId = null; buddy.barking = false;
    delete state.retrieveId; return { forces: new Map(), memberIds: new Set() };
  }
  state.travelIds = main.map(a => a.id);
  const velocity = main.reduce((v, a) => ({ x: v.x + (a.vx || 0) / main.length, z: v.z + (a.vz || 0) / main.length }), { x: 0, z: 0 });
  const moving = Math.hypot(velocity.x, velocity.z) > .28;
  if (moving) {
    const measured = normal(velocity.x, velocity.z);
    // Follow a turn promptly without flipping the rear position on tiny jitter.
    const t = 1 - Math.exp(-dt * 4);
    if (state.forward) {
      const current = Math.atan2(state.forward.x, state.forward.z), target = Math.atan2(measured.x, measured.z);
      const turn = Math.atan2(Math.sin(target - current), Math.cos(target - current));
      state.forward = { x: Math.sin(current + turn * t), z: Math.cos(current + turn * t) };
    } else state.forward = measured;
  }
  const forward = state.forward || { x: 0, z: 1 };
  const nearestGroup = animal => [...groups].sort((a, b) => distance(animal, center(a)) - distance(animal, center(b)) || stableOrder(a, b))[0];
  if (stray) {
    const destination = nearestGroup(stray);
    if (destination.some(a => distance(a, stray) <= 4.5 && hasClearGroundPath(level, a, stray, .15))) {
      delete state.retrieveId; stray = null;
    }
  }
  if (tier >= 3 && !stray) {
    stray = active.filter(a => (a.wander || a.wanderHome) &&
      !groups.some(g => g.some(v => v.id === a.id)))
      .sort((a, b) => Number(Boolean(b.wander?.bolting)) - Number(Boolean(a.wander?.bolting)) || distance(buddy, a) - distance(buddy, b) || a.id - b.id)[0];
    if (stray) state.retrieveId = stray.id;
  }
  if (!stray) delete state.retrieveId;
  const selected = tier >= 2 ? [...groups].sort((a, b) => a.length - b.length || stableOrder(a, b, buddy.clusterIds))[0] : main;
  const group = stray ? nearestGroup(stray) : selected;
  const centroid = center(group);
  buddy.clusterIds = group.map(a => a.id); buddy.anchor = centroid; buddy.targetId = stray?.id ?? null;
  let subject = centroid, drive = forward;
  if (stray) {
    subject = stray;
    const radius = stray.type === 'cow' ? .78 : .55;
    const waypoint = navigationTarget(level, stray, centroid, radius);
    drive = normal(waypoint.x - stray.x, waypoint.z - stray.z);
  }
  buddy.mode = stray ? 'retrieve' : moving ? 'herd' : 'hold';
  // Stand beyond the rearmost animal, rather than inside the flock's centroid.
  const rear = stray ? 0 : Math.min(...group.map(a => (a.x - centroid.x) * drive.x + (a.z - centroid.z) * drive.z));
  // Lead a running stray so circling can overtake it before closing in.
  const lead = stray ? { x: (stray.vx || 0) * .4, z: (stray.vz || 0) * .4 } : { x: 0, z: 0 };
  const desired = { x: subject.x + drive.x * (rear - 3.2) + lead.x, z: subject.z + drive.z * (rear - 3.2) + lead.z };
  buddy.desired = desired; buddy.forward = { ...drive };
  // Circle around the subject before applying pressure; crossing its front
  // must not scatter it away from the group we are trying to recover.
  const offset = { x: buddy.x - subject.x, z: buddy.z - subject.z };
  let approach = desired;
  if (offset.x * drive.x + offset.z * drive.z > -2.5 && distance(buddy, subject) < 8) {
    const side = Math.sign(offset.x * -drive.z + offset.z * drive.x) || 1;
    approach = { x: subject.x - drive.x * 4.5 - drive.z * side * 5 + lead.x, z: subject.z - drive.z * 4.5 + drive.x * side * 5 + lead.z };
  }
  const waypoint = navigationTarget(level, buddy, approach, .6);
  const direction = normal(waypoint.x - buddy.x, waypoint.z - buddy.z);
  const travel = Math.min(distance(buddy, waypoint), dt * (stray ? 9 : 7));
  moveBody(level, buddy, direction.x * travel, direction.z * travel, .6);
  const subjects = stray ? [stray] : group;
  const forces = new Map(), memberIds = new Set();
  if (!moving && !stray) return { forces, memberIds };
  const inPosition = a => {
    const away = normal(a.x - buddy.x, a.z - buddy.z);
    return away.x * drive.x + away.z * drive.z > .6 && distance(buddy, a) < 8 && hasClearGroundPath(level, buddy, a, .15);
  };
  if (tier >= 3 && level.time >= (buddy.nextBarkAt || 0) && subjects.some(inPosition)) {
    buddy.barkUntil = level.time + .65; buddy.nextBarkAt = level.time + 3.2; buddy.barking = true;
    events.push({ type: 'buddyBark', x: buddy.x, z: buddy.z });
  }
  for (const animal of subjects) {
    if (!inPosition(animal)) continue;
    const radius = animal.type === 'cow' ? .78 : .55;
    const strength = (stray ? 3.7 : 1.15) * effects.helperStrength * (buddy.barking ? 1.45 : 1);
    // Route toward the nearest group when retrieving; flank correction keeps
    // ordinary rear herding compact without choosing a destination.
    const lateral = stray ? 0 : (centroid.x - animal.x) * -drive.z + (centroid.z - animal.z) * drive.x;
    const correction = Math.max(-.6, Math.min(.6, lateral * .12));
    const vector = { x: drive.x * strength - drive.z * correction, z: drive.z * strength + drive.x * correction };
    const ahead = { x: animal.x + drive.x * .7, z: animal.z + drive.z * .7 };
    if (!canOccupy(level, ahead.x, ahead.z, radius) || !hasClearGroundPath(level, animal, ahead, radius)) continue;
    forces.set(animal.id, vector); memberIds.add(animal.id);
  }
  return { forces, memberIds };
}
