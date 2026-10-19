import { animalRadius } from './animal-size.js';
import { canOccupy, hasClearGroundPath, targetFootprint, destinationApproach, containsTarget } from './world.js';
import { buddyNavigationTarget, turnToward, moveBuddy } from './buddy-navigation.js';

const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const normal = (x, z) => { const d = Math.hypot(x, z); return d > 1e-6 ? { x: x / d, z: z / d } : { x: 0, z: 0 }; };
const center = group => group.reduce((p, a) => ({ x: p.x + a.x / group.length, z: p.z + a.z / group.length }), { x: 0, z: 0 });

/** Ground-visible connected components; single animals are not flock groups. */
export function flockGroups(level, animals, canLink = (a,b)=>hasClearGroundPath(level,a,b,.15)) {
  const remaining = new Set(animals), groups = [];
  while (remaining.size) {
    const first = remaining.values().next().value, group = [first];
    remaining.delete(first);
    for (let i = 0; i < group.length; i++) for (const other of remaining) {
      if (distance(group[i], other) <= 6.5 && canLink(group[i],other)) {
        group.push(other); remaining.delete(other);
      }
    }
    groups.push(group);
  }
  return groups;
}

const overlap = (group, ids = []) => group.filter(a => ids.includes(a.id)).length;
const stableOrder = (a, b, ids) => overlap(b, ids) - overlap(a, ids) || Math.min(...a.map(v => v.id)) - Math.min(...b.map(v => v.id));

const radiusOf = animal => animalRadius(animal);
const alongBridge = (p, bridge, sign) => ((p.x-bridge.x)*Math.sin(bridge.heading)+(p.z-bridge.z)*Math.cos(bridge.heading))*sign;
function passageComplete(level, passage, group) {
  return !group.length || (passage.kind === 'goal'
    ? group.every(a=>containsTarget(level.target,a,radiusOf(a)))
    : group.every(a=>alongBridge(a,passage.bridge,passage.sign)>passage.bridge.length/2+3));
}
function nearPassage(level, animal) {
  return distance(animal,level.target)<targetFootprint(level.target).halfLength+12 ||
    (level.rivers||[]).some(r=>r.bridges.some(b=>distance(animal,b)<b.length/2+12));
}
function choosePassage(level, state, group, forward) {
  if(state.passage){
    const p=state.passage,point=p.kind==='goal'?level.target:p.bridge;
    if(!passageComplete(level,p,group)&&distance(center(group),point)<(point.length||point.radius||5)+22)return p;
    delete state.passage;
  }
  const centroid=center(group),shape=targetFootprint(level.target);
  const playerNear=distance(level.dog,level.target)<level.target.radius+12 ||
    group.some(a=>distance(a,level.dog)<14&&hasClearGroundPath(level,a,level.dog,.15));
  if(playerNear&&distance(centroid,level.target)<shape.halfLength+12&&
    !group.every(a=>containsTarget(level.target,a,radiusOf(a))))
    return state.passage={kind:'goal',ids:group.map(a=>a.id)};
  const bridges=(level.rivers||[]).flatMap(r=>r.bridges).sort((a,b)=>distance(a,centroid)-distance(b,centroid));
  let flow=state.forward&&forward;
  if(!flow&&playerNear)flow=normal(centroid.x-level.dog.x,centroid.z-level.dog.z);
  if(!flow)return null;
  for(const bridge of bridges){
    if(distance(centroid,bridge)>bridge.length/2+12)continue;
    const projection=flow.x*Math.sin(bridge.heading)+flow.z*Math.cos(bridge.heading);
    if(Math.abs(projection)<.25)continue;
    const sign=Math.sign(projection),along=alongBridge(centroid,bridge,sign);
    if(along>bridge.length/2+1)continue; // Already leaving this crossing.
    return state.passage={kind:'bridge',bridge,sign,ids:group.map(a=>a.id)};
  }
  return null;
}
function passageTarget(level, passage, animal) {
  if(passage.kind==='goal')return destinationApproach(level,animal);
  const b=passage.bridge,extent=b.length/2+4;
  return {x:b.x+Math.sin(b.heading)*passage.sign*extent,z:b.z+Math.cos(b.heading)*passage.sign*extent};
}

/** Buddy follows flock travel, with tier-two local crossing/goal assistance.
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
    state.allGroups = flockGroups(level, candidates);
    state.groups = state.allGroups.filter(g => g.length >= 2);
    state.signature = signature; state.checkedAt = level.time;
  }
  let groups = state.groups;
  // A final sheep at an entrance still needs local help after its companions
  // have crossed or been delivered. This is not ordinary straggler retrieval.
  if(!groups.length&&tier>=2){
    const solo=(state.allGroups||[]).filter(g=>nearPassage(level,g[0]))
      .sort((a,b)=>distance(buddy,a[0])-distance(buddy,b[0]))[0];
    if(solo)groups=[solo];
  }
  groups.sort((a, b) => b.length - a.length || stableOrder(a, b, state.travelIds));
  const main = groups[0];
  if (!main) {
    buddy.mode = 'standby'; buddy.clusterIds = []; buddy.targetId = null; buddy.barking = false;
    buddy.moveSpeed = 0; buddy.vx = 0; buddy.vz = 0;
    delete state.retrieveId; return { forces: new Map(), memberIds: new Set() };
  }
  state.travelIds = main.map(a => a.id);
  const velocity = main.reduce((v, a) => ({ x: v.x + (a.vx || 0) / main.length, z: v.z + (a.vz || 0) / main.length }), { x: 0, z: 0 });
  const moving = Math.hypot(velocity.x, velocity.z) > .28;
  if (moving) {
    const measured = normal(velocity.x, velocity.z);
    // Follow a turn promptly without flipping the rear position on tiny jitter.
    if (state.forward) {
      const current = Math.atan2(state.forward.x, state.forward.z), target = Math.atan2(measured.x, measured.z);
      const angle = turnToward(current,target,1.8,dt);
      state.forward = { x: Math.sin(angle), z: Math.cos(angle) };
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
  if (tier >= 3 && !stray && groups.some(g=>g.length>=2)) {
    stray = active.filter(a => (a.wander || a.wanderHome) &&
      !groups.some(g => g.some(v => v.id === a.id)))
      .sort((a, b) => Number(Boolean(b.wander?.bolting)) - Number(Boolean(a.wander?.bolting)) || distance(buddy, a) - distance(buddy, b) || a.id - b.id)[0];
    if (stray) state.retrieveId = stray.id;
  }
  if (!stray) delete state.retrieveId;
  let selected = tier >= 2 ? [...groups].sort((a, b) => a.length - b.length || stableOrder(a, b, buddy.clusterIds))[0] : main;
  if(tier>=2&&state.passage){
    const remaining=active.filter(a=>state.passage.ids.includes(a.id)&&!a.wander&&!a.wanderHome);
    if(remaining.length&&!passageComplete(level,state.passage,remaining))selected=remaining;
  }
  const group = stray ? nearestGroup(stray) : selected;
  const passage = !stray && tier>=2 ? choosePassage(level,state,group,forward) : null;
  const centroid = center(group);
  buddy.clusterIds = group.map(a => a.id); buddy.anchor = centroid; buddy.targetId = stray?.id ?? null;
  let subject = centroid, drive = forward;
  if (stray) {
    subject = stray;
    const radius = animalRadius(stray);
    const waypoint = buddyNavigationTarget(level, stray, centroid, radius);
    drive = normal(waypoint.x - stray.x, waypoint.z - stray.z);
  }
  if(passage){
    // Work the remaining tail through the opening, including a final singleton.
    subject=[...group].sort((a,b)=>passage.kind==='bridge'
      ? alongBridge(a,passage.bridge,passage.sign)-alongBridge(b,passage.bridge,passage.sign)
      : distance(b,level.target)-distance(a,level.target))[0];
    const waypoint=buddyNavigationTarget(level,subject,passageTarget(level,passage,subject),radiusOf(subject));
    drive=normal(waypoint.x-subject.x,waypoint.z-subject.z);
  }
  if(stray||passage){
    const angle=Math.atan2(drive.x,drive.z);
    state.workHeading=turnToward(state.workHeading??angle,angle,1.8,dt);
    drive={x:Math.sin(state.workHeading),z:Math.cos(state.workHeading)};
  }else delete state.workHeading;
  buddy.mode = stray ? 'retrieve' : passage ? passage.kind : moving ? 'herd' : 'hold';
  // Stand beyond the rearmost animal, rather than inside the flock's centroid.
  const rear = stray || passage ? 0 : Math.min(...group.map(a => (a.x - centroid.x) * drive.x + (a.z - centroid.z) * drive.z));
  // Lead a running stray so circling can overtake it before closing in.
  const lead = stray ? { x: (stray.vx || 0) * .4, z: (stray.vz || 0) * .4 } : { x: 0, z: 0 };
  const desired = { x: subject.x + drive.x * (rear - 3.2) + lead.x, z: subject.z + drive.z * (rear - 3.2) + lead.z };
  buddy.desired = desired; buddy.forward = { ...drive };
  // Circle around the subject before applying pressure; crossing its front
  // must not scatter it away from the group we are trying to recover.
  const offset = { x: buddy.x - subject.x, z: buddy.z - subject.z };
  let approach = desired;
  if (offset.x * drive.x + offset.z * drive.z > -2.5 && distance(buddy, subject) < 8) {
    // Keep one circling side until we have reached the rear. Tiny centroid
    // changes while inside a flock must not flip the waypoint every frame.
    const side = state.orbitSide ||= Math.sign(offset.x * -drive.z + offset.z * drive.x) || 1;
    approach = { x: subject.x - drive.x * 4.5 - drive.z * side * 5 + lead.x, z: subject.z - drive.z * 4.5 + drive.x * side * 5 + lead.z };
  }
  if (offset.x * drive.x + offset.z * drive.z < -3) delete state.orbitSide;
  const waypoint = buddyNavigationTarget(level,buddy,approach,.6);
  moveBuddy(level,buddy,waypoint,dt,stray?9:7);
  const subjects = stray ? [stray] : group;
  const forces = new Map(), memberIds = new Set();
  if (!moving && !stray && !passage) return { forces, memberIds };
  const directionFor = a => {
    if(!passage)return drive;
    const waypoint=buddyNavigationTarget(level,a,passageTarget(level,passage,a),radiusOf(a));
    return normal(waypoint.x-a.x,waypoint.z-a.z);
  };
  const inPosition = a => {
    if(passage?.kind==='bridge'&&alongBridge(a,passage.bridge,passage.sign)>passage.bridge.length/2+3)return false;
    const forward=directionFor(a);
    const away = normal(a.x - buddy.x, a.z - buddy.z);
    return away.x * forward.x + away.z * forward.z > .6 && distance(buddy, a) < 8 && hasClearGroundPath(level, buddy, a, .15);
  };
  if (tier >= 2 && level.time >= (buddy.nextBarkAt || 0) && subjects.some(inPosition)) {
    buddy.barkUntil = level.time + .65; buddy.nextBarkAt = level.time + 3.2; buddy.barking = true;
    events.push({ type: 'buddyBark', x: buddy.x, z: buddy.z });
  }
  for (const animal of subjects) {
    if (!inPosition(animal)) continue;
    const radius = animalRadius(animal);
    const strength = (stray ? 3.7 : passage ? 2.4 : 1.15) * effects.helperStrength * (buddy.barking ? 1.45 : 1);
    // Route toward the nearest group when retrieving; flank correction keeps
    // ordinary rear herding compact without choosing a destination.
    const forceDirection=directionFor(animal);
    const lateral = stray || passage ? 0 : (centroid.x - animal.x) * -drive.z + (centroid.z - animal.z) * drive.x;
    const correction = Math.max(-.6, Math.min(.6, lateral * .12));
    const vector = { x: forceDirection.x * strength - forceDirection.z * correction, z: forceDirection.z * strength + forceDirection.x * correction };
    const ahead = { x: animal.x + forceDirection.x * .7, z: animal.z + forceDirection.z * .7 };
    if (!canOccupy(level, ahead.x, ahead.z, radius) || !hasClearGroundPath(level, animal, ahead, radius)) continue;
    forces.set(animal.id, vector); memberIds.add(animal.id);
  }
  return { forces, memberIds };
}
