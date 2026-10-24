import { canOccupy, containsTarget, segmentDistance } from './world.js';
import { animalScale } from './animal-size.js';
import { updateHerdPose } from './herd-pose.js';

const roadQueries = new WeakMap(), CELL = 8;
function nearbyRoadSegments(level, point) {
  const roads = level.roads || [];
  let cached = roadQueries.get(level);
  if (!cached || cached.roads !== roads) {
    const cells = new Map();
    for (const road of roads) for (let i = 1; i < road.points.length; i++) {
      const a = road.points[i-1], b = road.points[i], radius = road.width/2 + .5;
      for(let x=Math.floor((Math.min(a.x,b.x)-radius)/CELL);x<=Math.floor((Math.max(a.x,b.x)+radius)/CELL);x++)
        for(let z=Math.floor((Math.min(a.z,b.z)-radius)/CELL);z<=Math.floor((Math.max(a.z,b.z)+radius)/CELL);z++){
          const key=`${x},${z}`, entries=cells.get(key)||[];
          entries.push({a,b,radius});cells.set(key,entries);
        }
    }
    cached={roads,cells};roadQueries.set(level,cached);
  }
  return cached.cells.get(`${Math.floor(point.x/CELL)},${Math.floor(point.z/CELL)}`)||[];
}

// Bushes grow on the meadow's grass surface and need no separate permission.
// Hard surfaces always take precedence, including the ragged path shoulder.
export function canGrazeAt(level, point) {
  if (level.target?.type === 'barn' && containsTarget(level.target, point)) return false;
  for (const river of level.rivers || []) for (const bridge of river.bridges || []) {
    const dx = point.x - bridge.x, dz = point.z - bridge.z;
    const s = Math.sin(bridge.heading), c = Math.cos(bridge.heading);
    if (Math.abs(dx*s + dz*c) <= bridge.length/2 + .2 &&
        Math.abs(dx*c - dz*s) <= bridge.width/2 + .2) return false;
  }
  for (const {a,b,radius} of nearbyRoadSegments(level, point)) {
    if (segmentDistance(point, a, b) <= radius) return false;
  }
  return canOccupy(level, point.x, point.z, 0);
}

export function updateGrazing(pose, animal, level, dt) {
  if (!(dt > 0) || !Number.isFinite(dt)) return;
  const state = pose.userData;
  updateHerdPose(state, animal, dt, pose.rotation.y);
  const quiet = Math.hypot(animal.vx, animal.vz) < .45 &&
    (animal.alert || 0) < .03 && (state.turnSpeed || 0) < .05 &&
    !animal.wander && !animal.bridgeCrossing && !animal.ordinaryAnticipation;
  // Keep a fixed local anchor: minor shuffling can settle, continuous drift cannot.
  const anchor = state.grazeAnchor;
  const local = anchor && Math.hypot(animal.x-anchor.x, animal.z-anchor.z) <= .75;
  if (!quiet || !local) {
    state.grazeAnchor = {x:animal.x, z:animal.z};
    state.grazeWait = 0;
  }
  if (!quiet && !(state.graze > 0)) {
    state.grazeWait=0;state.graze=0;state.grazeTime=(state.grazeTime||0)+dt;return;
  }
  const reach = (animal.type === 'cow' ? 1.05 : .65) * animalScale(animal);
  const mouth = { x: animal.x + Math.sin(pose.rotation.y)*reach,
    z: animal.z + Math.cos(pose.rotation.y)*reach };
  const s = Math.sin(pose.rotation.y), c = Math.cos(pose.rotation.y), scale = animalScale(animal);
  // Check the outer hoof envelope as well as the center and muzzle. Large
  // cows can straddle a barn/deck boundary while their center is still grass.
  const cow = animal.type === 'cow', side = (cow ? .45 : .3)*scale;
  const front = (cow ? .56 : .36)*scale, back = (cow ? -.59 : -.36)*scale;
  const feet = [-side, side].flatMap(x => [back, front].map(z => ({
    x: animal.x + c*x + s*z, z: animal.z - s*x + c*z
  })));
  const edible = [animal, mouth, ...feet].every(point => canGrazeAt(level, point));
  state.grazeWait = edible && quiet ? (state.grazeWait || 0) + dt : 0;
  const settleTime = 7 + ((animal.temperament?.confidence ?? 1) - 1) * 4;
  const target = state.grazeWait + 1e-9 >= settleTime && (animal.relaxation ?? 1) > .85 && Math.hypot(animal.vx, animal.vz) < .1 ? 1 : 0;
  // Never retain a lowered head after crossing onto an excluded surface.
  state.graze = edible ? (state.graze || 0) +
    Math.max(-dt*4, Math.min(dt*2, target - (state.graze || 0))) : 0;
  state.grazeTime = (state.grazeTime || 0) + dt;
}

export function grazingAngle(state, index) {
  return (state.graze || 0) * (1.05 + Math.sin((state.grazeTime || 0)*3 + index*1.7)*.02);
}

