import { animalRadius } from './animal-size.js';
import { temperament, familiarNeighbor, updateRelaxation, unattendedBrowse } from './herd-behavior.js';
import { UPGRADE_CATALOG, purchaseUpgrade, validateUpgrades, upgradeEffects } from './progression.js';
import { createLevel, canOccupy, moveBody, openingSteer, hasClearGroundPath, hasClearPlayerSignal, containsTarget, targetLocalPoint, targetWorldPoint, targetFootprint } from './world.js';
import { flockGroups, updateBuddy } from './buddy.js';
import { canGrazeAt } from './grazing.js';
import { bridgeCrossing } from './bridge-crossing.js';
import { yieldAtOpening } from './chokepoints.js';
import { nextWanderOpportunity, evaluateWanderOpportunity, prepareWanderCohort } from './wandering.js';
import { updateGateContacts } from './gates.js';
export { UPGRADE_CATALOG, purchaseUpgrade, createLevel, canOccupy };

/** Renderer-independent flock behaviour. Buddy follows flock travel;
 * the drone holds the main herd when Pip leaves. Pip admits deliveries. */
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const normal = (x, z) => {
  const length = Math.hypot(x, z);
  return length > 0.0001 ? { x: x / length, z: z / length } : { x: 0, z: 0 };
};
const centerOf = group => group.reduce((sum, a) => ({ x: sum.x + a.x / group.length, z: sum.z + a.z / group.length }), { x: 0, z: 0 });

// Each animal owns a bounded resting patch and an independent clock. Brief
// browsing steps alternate with long quiet periods, so resting never depends on
// the previous herd travel heading or Buddy's current perimeter direction.
function restingTarget(level, animal, position) {
  const state=animal.buddyRest;
  if(!state || state.home!==position){
    animal.buddyRest={home:position,cycle:0,next:level.time+20+(animal.id*7%17)};
  }
  const rest=animal.buddyRest;
  if(level.time>=rest.next){rest.cycle++;rest.next=level.time+24+(animal.id*11+rest.cycle*5)%19;delete rest.target;}
  if(!rest.target){
    const angle=animal.id*2.399963+rest.cycle*1.618;
    const reach=rest.cycle===0?.45:.6;
    const candidate={x:position.x+Math.sin(angle)*reach,z:position.z+Math.cos(angle)*reach};
    // Do not leave dry safe ground or browse across hard-surface boundaries.
    const browsable=canGrazeAt(level,candidate)&&canOccupy(level,candidate.x,candidate.z,animalRadius(animal))&&
      hasClearGroundPath(level,animal,candidate,animalRadius(animal));
    rest.target=browsable?candidate:{x:animal.x,z:animal.z};
    // A path or blocked patch permits a quiet individual look/turn, without
    // inventing a walk onto grass or enabling grazing on the hard surface.
    rest.facing=browsable?undefined:angle;
  }
  return rest.target;
}

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
  const groups = flockGroups(level, active);
  groups.sort((a, b) => b.length - a.length ||
    b.filter(v => previousIds.includes(v.id)).length - a.filter(v => previousIds.includes(v.id)).length ||
    Math.min(...a.map(v => v.id)) - Math.min(...b.map(v => v.id)));
  return groups[0] || [];
}

function companionState(level, active, effects, dt) {
  const kinds = [effects.drone && 'drone'].filter(Boolean);
  level.helpers ||= [];
  level.helpers = level.helpers.filter(h => kinds.includes(h.type) || (effects.helper && h.type === 'helper'));
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
    // The drone remains airborne over the main herd. Ground Buddy has its
    // own tiered state and navigation in buddy.js.
    const direction = normal(centroid.x - helper.x, centroid.z - helper.z);
    const travel = Math.min(distance(helper, centroid), dt * 6);
    helper.x += direction.x * travel; helper.z += direction.z * travel;
  }
  return { helpers: level.helpers, group, centroid, memberIds, hold, state };
}

function companionAssist(level, companions, dog, effects) {
  const forces = new Map();
  if (!companions.group.length || companions.hold) return forces;
  const { group, centroid } = companions;
  const forward = normal(centroid.x - dog.x, centroid.z - dog.z);
  const lateral = { x: -forward.z, z: forward.x };
  const strength = Math.min(1.2, effects.droneStrength * 0.35);
  const comfortable = Math.max(2.1, Math.sqrt(group.length) * 0.66);
  for (const animal of group) {
    const offset = (centroid.x - animal.x) * lateral.x + (centroid.z - animal.z) * lateral.z;
    // Only tidy the flanks. Longitudinal drive belongs to the player alone.
    const force = clamp(Math.sign(offset) * Math.max(0, Math.abs(offset) - comfortable) * strength, -0.75, 0.75);
    const vector = { x: lateral.x * force, z: lateral.z * force };
    const radius = animalRadius(animal);
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
    const radius = animalRadius(animal);
    const local = targetLocalPoint(level.target, animal);
    const phase = animal.roamPhase ?? (animal.id * 2.399963229728653);
    animal.roamPhase = phase;
    const halfForward = shape.halfLength - radius - 0.48;
    const halfLateral = shape.halfWidth - radius - 0.24;
    // Reserve a quiet patch of available floor, with a long pause before
    // browsing to another patch. Reservations keep arrivals from converging
    // on a shared oscillator and favor space beyond the doorway.
    const epoch=Math.floor((phaseTime+(animal.id*7%19))/32);
    if(!animal.arrivalRest||animal.arrivalRest.epoch!==epoch){
      let best=null,bestScore=-Infinity;
      const spacing=2.3,forwardStart=-halfForward*.25;
      for(let forward=forwardStart;forward<=halfForward;forward+=spacing)for(let lateral=-halfLateral;lateral<=halfLateral;lateral+=spacing){
        const point=targetWorldPoint(level.target,forward,lateral);
        if(!canOccupy(level,point.x,point.z,radius)||!hasClearGroundPath(level,animal,point,radius))continue;
        let clearance=Infinity;
        for(const other of level.animals){
          if(other===animal||!other.saved)continue;
          const reserved=other.arrivalRest?.point||other;
          clearance=Math.min(clearance,distance(point,reserved)-radius-animalRadius(other));
        }
        const score=Math.min(3,clearance)+forward*.025-distance(point,animal)*.025+Math.sin(phase+forward+lateral+epoch)*.04;
        if(score>bestScore){bestScore=score;best={point,forward,lateral,epoch};}
      }
      animal.arrivalRest=best||{point:{x:animal.x,z:animal.z},forward:local.forward,lateral:local.lateral,epoch};
    }
    const goal=animal.arrivalRest;
    const arrived=Math.hypot(goal.forward-local.forward,goal.lateral-local.lateral)<.12;
    let vx = arrived?0:(goal.forward - local.forward) * 0.65;
    let vz = arrived?0:(goal.lateral - local.lateral) * 0.65;
    for (const other of level.animals) {
      if (other === animal || !other.saved) continue;
      const dx = animal.x - other.x, dz = animal.z - other.z, d = Math.hypot(dx, dz);
      const separation = radius + (animalRadius(other)) + 0.35;
      if (d > 1e-4 && d < separation) {
        const force = (separation - d) / d * 2.5;
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
    const crowdEnergy=point=>level.animals.reduce((sum,other)=>other===animal||!other.saved?sum:
      sum+Math.max(0,radius+animalRadius(other)+.04-distance(point,other))**2,0);
    const priorEnergy=crowdEnergy(before);
    // A crowded admission may already overlap several arrivals. Reducing total
    // penetration permits a physical untangling step even if one individual
    // gap briefly shrinks; a clear start can never create a fresh overlap.
    if (crowdEnergy(animal)>priorEnergy+1e-10 || !(canOccupy(level, animal.x, animal.z, radius) && containsTarget(level.target, animal, radius))) {
      animal.x = before.x; animal.z = before.z;
      if(priorEnergy>1e-8){
        let best=before,energy=priorEnergy;
        for(let direction=0;direction<16;direction++){
          const angle=direction*Math.PI/8,p={x:before.x+Math.sin(angle)*.45*dt,z:before.z+Math.cos(angle)*.45*dt};
          if(!canOccupy(level,p.x,p.z,radius)||!containsTarget(level.target,p,radius)||!hasClearGroundPath(level,before,p,radius))continue;
          const candidate=crowdEnergy(p);
          if(candidate<energy-1e-10){best=p;energy=candidate;}
        }
        animal.x=best.x;animal.z=best.z;
      }
    }
    animal.vx = (animal.x - before.x) / dt; animal.vz = (animal.z - before.z) / dt;
    animal.alert=0;
    updateRelaxation(level,animal,0,dt,undefined,phaseTime);
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
  if (level.completed || dt <= 0) return deliveryResult(level);
  if (dt > 0 && level.delivery?.started) {
    level.delivery.remaining = Math.max(0, level.delivery.remaining - dt);
    // Close admission before movement when the remaining time is exhausted.
    if (level.delivery.remaining <= 1e-8) {
      level.delivery.remaining = 0;
      return finishDelivery(level, 'timeout');
    }
  }
  level.time = (level.time || 0) + dt;
  const wanderCohort = prepareWanderCohort(level);
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
  const buddy = updateBuddy(level, active, effects, dt, events);
  events.push(...updateGateContacts(level,dog));
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
  const playerSignals = new Map(snapshot.map(animal=>{
    const d=distance(animal,dog),active=d<radius&&hasClearPlayerSignal(level,animal,dog);
    const urgency=active?Math.pow(1-d/radius,.65)*(input.bark?1.65+effects.barkBoost:1):0;
    const flee=d>.01?normal(animal.x-dog.x,animal.z-dog.z):normal(Math.sin(dog.heading||0),Math.cos(dog.heading||0));
    return [animal.id,{active,urgency,x:flee.x*urgency*5.2,z:flee.z*urgency*5.2}];
  }));
  // Cohesion still stabilizes a connected flock, but cannot bridge a real
  // split. Reuse pair visibility so this adds no duplicate geometry queries.
  const flockMembership = new Map(), flockMotion = new Map();
  const previousTravel=level.flockTravel||[],nextTravel=[];
  flockGroups(level,snapshot,visibleNeighbor).forEach((group,index)=>{
    const ordinary=group.filter(a=>!a.wander&&!a.wanderHome);
    const members=ordinary.length?ordinary:group,center=centerOf(members);
    let vx=0,vz=0,px=0,pz=0;
    for(const animal of members){
      vx+=(animal.vx||0)/members.length;vz+=(animal.vz||0)/members.length;
      const pip=playerSignals.get(animal.id),help=buddy.forces.get(animal.id);
      px+=(pip.x+(help?.x||0))/members.length;pz+=(pip.z+(help?.z||0))/members.length;
    }
    const ids=group.map(a=>a.id),idSet=new Set(ids);
    const prior=previousTravel.map(v=>({v,count:v.ids.filter(id=>idSet.has(id)).length}))
      .sort((a,b)=>b.count-a.count)[0];
    const speed=Math.hypot(vx,vz),pressureSpeed=Math.hypot(px,pz);
    const forward=speed>.28?normal(vx,vz):pressureSpeed>.03?normal(px,pz):prior?.count?prior.v.forward:null;
    const drive=forward?Math.max(speed>.28?vx*forward.x+vz*forward.z:0,pressureSpeed>.03?(px*forward.x+pz*forward.z)*.65:0,0):0;
    const motion={center,forward,drive,pressure:pressureSpeed};
    nextTravel.push({ids,forward});
    flockMotion.set(index,motion);
    for(const animal of group)flockMembership.set(animal.id,index);
  });
  level.flockTravel=nextTravel;
  const browseGround={...level,obstacles:[]};
  for (let i = 0; i < active.length; i++) {
    const animal = active[i], old = snapshot[i];
    const physicalRadius = animalRadius(animal), traits=temperament(level,animal);
    const bridgeIntent=bridgeCrossing(level,animal,old);
    const crossing=bridgeIntent?.finished?null:bridgeIntent;
    if(bridgeIntent?.finished&&companions.hold&&companions.memberIds.has(animal.id)){
      companions.state.positions[animal.id]={x:old.x,z:old.z};
    }
    let sx = 0, sz = 0, cx = 0, cz = 0, avx = 0, avz = 0, neighbors = 0, socialWeight = 0, preferred = 0, pressure = 0;
    for (const other of snapshot) {
      if (other.id === animal.id) continue;
      const dx = old.x - other.x, dz = old.z - other.z, d = Math.hypot(dx, dz);
      const separation = Math.max(animal.type==='cow'?2.15:2, physicalRadius + animalRadius(other) + .35);
      if (d < separation && d > 0.01) { const force = (separation - d) / d; sx += dx * force; sz += dz * force; }
      if (d < 18 && flockMembership.get(old.id) === flockMembership.get(other.id) && visibleNeighbor(old, other)) { const weight=d<6&&preferred<2&&familiarNeighbor(level,animal,other)?(preferred++,1.12):1; cx += other.x*weight; cz += other.z*weight; socialWeight+=weight; avx += other.vx; avz += other.vz; neighbors++; }
    }
    let desiredX = sx * 2.5, desiredZ = sz * 2.5;
    const playerSignal=playerSignals.get(animal.id);
    const dogActivelyHerding=playerSignal.active;
    const buddyActivelyHerding = buddy.memberIds.has(animal.id);
    const helperActivelyHerding = (!companions.hold && companions.memberIds.has(animal.id)) || buddyActivelyHerding;
    if (dogActivelyHerding || helperActivelyHerding || crossing) { delete animal.wander; delete animal.wanderHome; }
    if (dogActivelyHerding) {
      desiredX+=playerSignal.x*traits.confidence;desiredZ+=playerSignal.z*traits.confidence;
      pressure=playerSignal.urgency;animal.lastPlayerPressure=level.time;
    }
    if (buddyActivelyHerding) {
      const force = buddy.forces.get(animal.id);
      desiredX += force.x; desiredZ += force.z; pressure = Math.max(pressure, .45);
    }
    const buddyPosition=buddy.holds?.get(animal.id);
    if(bridgeIntent?.finished&&level.buddyHerd?.containment?.positions[animal.id]){
      Object.assign(level.buddyHerd.containment.positions[animal.id],{x:old.x,z:old.z});
      // A completed crossing establishes a safe new holding area on this bank.
      if(level.buddyHerd?.containment)level.buddyHerd.containment.anchor={x:old.x,z:old.z};
    }
    const holding = !crossing && !dogActivelyHerding && pressure < 0.03 &&
      (Boolean(buddyPosition) || (companions.hold && companions.memberIds.has(animal.id)));
    const settle = () => { animal.wanderHome = {x:old.x,z:old.z}; delete animal.wander; };
    if (animal.wander && (level.time >= animal.wander.until || !wanderCohort.has(animal.id))) settle();
    const opportunity = nextWanderOpportunity(level, animal, dt);
    if (opportunity !== null && pressure < 0.03) {
      const center = companions.centroid || centerOf(snapshot);
      const candidate = evaluateWanderOpportunity(level, animal, opportunity, center, dogActivelyHerding || helperActivelyHerding || holding || Boolean(crossing));
      if (candidate) {
        if(!candidate.bolting){candidate.departAt=level.time+.35;candidate.until+=.35;}
        animal.wander = candidate;
      }
    }
    let wander = animal.wander;
    if (holding) {
      // Kill inherited forward velocity and alignment. Merely parking the drone
      // would leave the flock's old momentum/cohesion walking toward the goal.
      const position = buddyPosition || companions.state.positions[animal.id];
      if(buddyPosition){
        const target=restingTarget(level,animal,position);
        const dx=target.x-old.x,dz=target.z-old.z,d=Math.hypot(dx,dz);
        // Arrive fully and retain the individual facing during the quiet spell.
        // Separation still lets a crowded animal yield within its home patch.
        desiredX=(d>.055?dx*.9:0)+sx*.35;
        desiredZ=(d>.055?dz*.9:0)+sz*.35;
        const speed=Math.hypot(desiredX,desiredZ);
        if(speed>.38){desiredX*=.38/speed;desiredZ*=.38/speed;}
      }else{
        delete animal.buddyRest;
        desiredX=clamp((position.x-old.x)*2.6+sx*.35,-1.1,1.1);
        desiredZ=clamp((position.z-old.z)*2.6+sz*.35,-1.1,1.1);
      }
    } else {
      delete animal.buddyRest;
      if (neighbors && !wander && !animal.wanderHome && !(buddyActivelyHerding && level.buddyHerd?.retrieveId === animal.id)) {
        const dx = cx / socialWeight - old.x, dz = cz / socialWeight - old.z, d = Math.hypot(dx, dz);
        const motion=flockMotion.get(flockMembership.get(animal.id)),forward=motion.forward;
        const leading=forward&&((old.x-motion.center.x)*forward.x+(old.z-motion.center.z)*forward.z)>.6;
        if (d > 2.6) {
          const toward=normal(dx,dz),cohesion=Math.min(2.6,(d-2.6)*.36)*.7*(1+effects.cohesionBoost)*traits.follow*(animal.type==='cow'?.96:1);
          let pullX=toward.x*cohesion,pullZ=toward.z*cohesion;
          // Leading animals may tuck in sideways, but cohesion cannot pull
          // them backward against their connected flock's established travel.
          const backward=leading?Math.min(0,pullX*forward.x+pullZ*forward.z):0;
          if(backward){pullX-=forward.x*backward;pullZ-=forward.z*backward;}
          desiredX+=pullX;desiredZ+=pullZ;
        }
        desiredX+=avx/neighbors*.45;desiredZ+=avz/neighbors*.45;
        if(leading&&motion.drive>.03&&!dogActivelyHerding&&!buddyActivelyHerding){
          // Fill the front's missing forward motion; do not add a second
          // push on top of an animal already under direct dog pressure.
          const carry=Math.max(0,motion.drive-desiredX*forward.x-desiredZ*forward.z);
          desiredX+=forward.x*carry;desiredZ+=forward.z*carry;
          if(motion.pressure>.03)pressure=Math.max(pressure,Math.min(.35,motion.pressure/5.2));
        }
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
      if (wander && !(wander.departAt>level.time+1e-9)) {
        const dx = wander.x - old.x, dz = wander.z - old.z, d = Math.hypot(dx, dz);
        if (d > 0.35) { desiredX += dx / d * (wander.bolting ? 5.8 : 2.1); desiredZ += dz / d * (wander.bolting ? 5.8 : 2.1); }
        else { settle(); wander = null; }
      }
      if (animal.wanderHome && !dogActivelyHerding && !helperActivelyHerding) {
        const home = animal.wanderHome, phase = animal.id * 2.39996;
        desiredX = (home.x + Math.sin(level.time * .24 + phase) * 1.4 - old.x) * .35 + sx * .2;
        desiredZ = (home.z + Math.cos(level.time * .19 + phase) * 1.4 - old.z) * .35 + sz * .2;
      }
    }
    // Browsing is separate from straggler schedules and is cancelled by any
    // active control/committed crossing. It replaces passive magnetic return.
    const watchingBuddy=level.helpers.some(h=>h.type==='helper'&&h.mode!=='standby'&&h.clusterIds?.includes(animal.id)&&distance(h,animal)<12&&hasClearGroundPath(browseGround,h,animal,.15));
    const browse=unattendedBrowse(level,animal,dogActivelyHerding||helperActivelyHerding||watchingBuddy||holding||Boolean(crossing)||Boolean(wander)||Boolean(animal.wanderHome)||pressure>.03,dt);
    if(browse){desiredX=browse.x+sx*.3;desiredZ=browse.z+sz*.3;}
    const preparation=browse?.preparing?browse:wander&&!wander.bolting&&wander.departAt>level.time+1e-9?{
      heading:Math.atan2(wander.x-old.x,wander.z-old.z),anticipation:clamp(1-(wander.departAt-level.time)/.35,.01,1)
    }:null;
    if(preparation){desiredX=sx*.3;desiredZ=sz*.3;animal.ordinaryAnticipation=preparation.anticipation;animal.ordinaryAttentionHeading=preparation.heading;}
    else {delete animal.ordinaryAnticipation;delete animal.ordinaryAttentionHeading;}
    updateRelaxation(level,animal,pressure,dt,dogActivelyHerding?Math.atan2(dog.x-animal.x,dog.z-animal.z):animal.heading);
    if (pressure > 0.03 && !crossing && !holding && !animal.wanderHome && !wander?.bolting) {
      // Queue at bridge mouths and open gates instead of surging and reversing.
      // Only direct Pip/Buddy pressure counts: a flock's travel direction can
      // point back across a river it straddles.
      const help = buddyActivelyHerding ? buddy.forces.get(animal.id) : null;
      const intent = { x: (dogActivelyHerding ? playerSignal.x : 0) + (help?.x || 0), z: (dogActivelyHerding ? playerSignal.z : 0) + (help?.z || 0) };
      ({ x: desiredX, z: desiredZ } = yieldAtOpening(level, animal, old, snapshot, { x: desiredX, z: desiredZ }, intent, { x: sx * 2.5, z: sz * 2.5 }));
    } else delete animal.chokeYield;
    if(crossing){
      const lateral=clamp(sx*crossing.forward.z-sz*crossing.forward.x,-.7,.7);
      const speed=animal.type==='cow'?2.7:3.2;
      desiredX=crossing.x*speed+crossing.forward.z*lateral*.5;
      desiredZ=crossing.z*speed-crossing.forward.x*lateral*.5;
      pressure=Math.max(pressure,.4);
    }
    if (pressure > 0.03 && !crossing) {
      const steer = openingSteer(level, animal, desiredX, desiredZ, physicalRadius);
      desiredX += steer.x; desiredZ += steer.z;
    }
    const maxSpeed = animal.wanderHome && !holding ? .75 : wander?.bolting ? 6 : animal.type === 'cow' ? 3.3 : 4.2, desiredSpeed = Math.hypot(desiredX, desiredZ);
    if (desiredSpeed > maxSpeed) { desiredX *= maxSpeed / desiredSpeed; desiredZ *= maxSpeed / desiredSpeed; }
    const smoothing = 1 - Math.exp(-dt * (holding ? 12 : animal.type === 'cow' ? 3.5 : 5.5));
    animal.vx += (desiredX - animal.vx) * smoothing; animal.vz += (desiredZ - animal.vz) * smoothing;
    const home = !holding && animal.wanderHome;
    const outsideHome = home && Math.hypot(animal.x + animal.vx * dt - home.x, animal.z + animal.vz * dt - home.z) > 3;
    const collision = moveBody(level, animal, outsideHome ? 0 : animal.vx * dt, outsideHome ? 0 : animal.vz * dt, physicalRadius);
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
    if(preparation)animal.heading=preparation.heading;
    else if(Math.hypot(animal.vx,animal.vz)>.1)animal.heading=Math.atan2(animal.vx,animal.vz);
    else if(holding&&animal.buddyRest?.facing!==undefined){
      const heading=animal.heading||0,target=animal.buddyRest.facing;
      const delta=Math.atan2(Math.sin(target-heading),Math.cos(target-heading));
      const rate=animal.type==='cow'?Math.PI/1.5:Math.PI;
      animal.heading=heading+clamp(delta,-rate*dt,rate*dt);
    }else animal.heading ||= 0;
    animal.alert = pressure; animal.pushed = dogActivelyHerding || buddyActivelyHerding;
    const playerAtDestination = distance(dog, level.target) < level.target.radius + 12;
    // Admission uses the same attendance decision as companion herding. A
    // parked herd's residual movement must not deliver it while Pip is away.
    if (dt > 0 && playerAtDestination && !holding && containsTarget(level.target, animal, physicalRadius) && clearSignal(level, dog, animal)) {
      animal.saved = true; animal.vx = 0; animal.vz = 0; delete animal.wander; delete animal.wanderHome; delete animal.nextWanderCheck; delete animal.wanderOpportunity; delete animal.buddyNavigation; delete animal.bridgeCrossing; delete animal.chokeYield; delete animal.lastBridge; delete animal.pushed;
      events.push({ type: 'animalSaved', id: animal.id, animalType: animal.type });
    }
  }
  const remainingCohort = prepareWanderCohort(level);
  for (const animal of level.animals) if (!animal.saved && animal.wander && !remainingCohort.has(animal.id)) {
    animal.wanderHome = {x:animal.x,z:animal.z}; delete animal.wander;
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

