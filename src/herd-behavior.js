import { animalRadius } from './animal-size.js';
import { canOccupy, hasClearGroundPath, targetFootprint, targetLocalPoint } from './world.js';

const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
// Separate hash domain: personality never advances world or wander randomness.
function hash(seed,id,salt){let x=(seed^Math.imul(id+1,0x9e3779b1)^salt)>>>0;x^=x>>>16;x=Math.imul(x,0x7feb352d);x^=x>>>15;x=Math.imul(x,0x846ca68b);return ((x^(x>>>16))>>>0)/4294967296;}
export function temperament(level,animal){
  return animal.temperament ||= {confidence:.94+.12*hash(level.seed,animal.id,0xc011),curiosity:.9+.2*hash(level.seed,animal.id,0xc012),follow:.94+.06*hash(level.seed,animal.id,0xc013)};
}
export function familiarNeighbor(level,a,b){
  const low=Math.min(a.id,b.id),high=Math.max(a.id,b.id);
  return hash(level.seed,low,Math.imul(high+1,0x85ebca6b))<.18;
}
export function updateRelaxation(level,animal,pressure,dt,attentionHeading,clock=level.time){
  if(pressure>.03){animal.relaxation=0;animal.quietSince=clock;animal.attentionHeading=attentionHeading??animal.heading;}
  else {
    animal.quietSince??=clock;
    const wait=1.5+hash(level.seed,animal.id,0x5e771)*2;
    const target=clamp((clock-animal.quietSince-wait)/4,0,1);
    animal.relaxation=Math.max(animal.relaxation||0,target);
  }
}
function outsideDestination(level,p,margin){
  const shape=targetFootprint(level.target),local=targetLocalPoint(level.target,p);
  return Math.abs(local.forward)>shape.halfLength+margin||Math.abs(local.lateral)>shape.halfWidth+margin;
}
// A slow browse followed by a long rest. Nearby candidate paths stay in the
// current usable field, never request a crossing, and keep clear of delivery.
export function unattendedBrowse(level,animal,controlled,dt){
  const states=level.unattendedBrowse ||= new Map();
  if(controlled){states.delete(animal.id);return null;}
  let state=states.get(animal.id);
  if(!state){state={since:level.time,cycle:0};states.set(animal.id,state);}
  if(level.time-state.since<8)return null;
  const radius=animalRadius(animal),traits=temperament(level,animal);
  if(!state.next||level.time>=state.next){
    const cycle=state.cycle++,salt=Math.imul(cycle+1,7919);
    state.next=level.time+24+hash(level.seed,animal.id,salt^0xb01)*10;
    state.departAt=level.time+.35;state.walkUntil=state.departAt+10;state.target=null;
    for(let attempt=0;attempt<8;attempt++){
      let angle=hash(level.seed,animal.id,salt^Math.imul(attempt+1,0x1f123bb5))*Math.PI*2;
      // Explore outward from the original spawn/field center, rather than
      // randomly closing an intentionally open split. This uses no remote
      // animal positions, so independent flocks remain independent.
      const origin=level.spawn||{x:(level.bounds.minX+level.bounds.maxX)/2,z:(level.bounds.minZ+level.bounds.maxZ)/2};
      const outward={x:animal.x-origin.x,z:animal.z-origin.z};
      if(Math.hypot(outward.x,outward.z)>.5&&Math.sin(angle)*outward.x+Math.cos(angle)*outward.z<0)angle+=Math.PI;
      const reach=(4+hash(level.seed,animal.id,salt^0xc01)*5)*traits.curiosity;
      const p={x:animal.x+Math.sin(angle)*reach,z:animal.z+Math.cos(angle)*reach};
      if(outsideDestination(level,p,radius+2)&&outsideDestination(level,animal,radius+2)&&canOccupy(level,p.x,p.z,radius)&&hasClearGroundPath(level,animal,p,radius)) {state.target=p;break;}
    }
  }
  if(!state.target||level.time>=state.walkUntil)return {x:0,z:0,resting:true};
  const dx=state.target.x-animal.x,dz=state.target.z-animal.z,d=Math.hypot(dx,dz);
  if(d<.18)return {x:0,z:0,resting:true};
  if(level.time<state.departAt-1e-9)return {x:0,z:0,resting:false,preparing:true,
    heading:Math.atan2(dx,dz),anticipation:clamp(1-(state.departAt-level.time)/.35,.01,1)};
  const speed=Math.min(.55,d*.6)*traits.curiosity;
  const next={x:animal.x+dx/d*speed*dt,z:animal.z+dz/d*speed*dt};
  if(!outsideDestination(level,next,radius+1.8))return {x:0,z:0,resting:true};
  return {x:dx/d*speed,z:dz/d*speed,resting:false};
}
