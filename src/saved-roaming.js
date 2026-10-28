import { CONFIG_CONTRACTS } from './config/contracts.js';
import { animalRadius } from './animal-size.js';
import { updateRelaxation } from './herd-behavior.js';
import { targetFootprint, targetLocalPoint, targetWorldPoint, moveBody, canOccupy, hasClearGroundPath, containsTarget } from './world.js';
import settings from './config/gameplay.json' with { type: 'json' };
import { resolveConfig } from './config/resolve.js';
const GAMEPLAY = resolveConfig(settings, 'gameplay', CONFIG_CONTRACTS.gameplay);

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

// Delivered animals keep gently milling inside the pen while the recovery
// countdown runs. Their moving target is expressed in pen-local coordinates,
// so rotated goals have the same clearance and the open entrance stays closed
// to saved bodies. This is deliberately a cheap per-animal oscillator.
export function roamSavedAnimals(level, dt, phaseTime) {
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
    const epoch=Math.floor((phaseTime+(animal.id*7%19))/GAMEPLAY.saved.reservationSeconds);
    if(!animal.arrivalRest||animal.arrivalRest.epoch!==epoch){
      let best=null,bestScore=-Infinity;
      const spacing=GAMEPLAY.saved.patchSpacing,forwardStart=-halfForward*.25;
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
    if (speed > GAMEPLAY.saved.maximumSpeed) { wx *= GAMEPLAY.saved.maximumSpeed / speed; wz *= GAMEPLAY.saved.maximumSpeed / speed; }
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
          const travel=Math.min(.45,GAMEPLAY.saved.maximumSpeed)*dt;
          const angle=direction*Math.PI/8,p={x:before.x+Math.sin(angle)*travel,z:before.z+Math.cos(angle)*travel};
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
  dt = clamp(Number(dt) || 0, 0, GAMEPLAY.simulation.maximumStepSeconds);
  if (level.completed && dt > 0) {
    level.savedRoamTime = (level.savedRoamTime ?? (level.time || 0)) + dt;
    roamSavedAnimals(level, dt, level.savedRoamTime);
  }
}

