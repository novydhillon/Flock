import {canOccupy,navigationTarget,hasClearGroundPath} from './world.js';

const radiusOf=a=>a.type==='cow'?.78:.55;
const axes=b=>({x:Math.sin(b.heading),z:Math.cos(b.heading)});
const along=(p,b,f)=>(p.x-b.x)*f.x+(p.z-b.z)*f.z;

/** Walking onto a deck commits this animal to its far bank. This is local
 * traversal intent, never destination selection or permission to score. */
export function bridgeCrossing(level, animal, old) {
 let crossing=animal.bridgeCrossing;
 const radius=radiusOf(animal);
 if(crossing){
  const f=axes(crossing.bridge),progress=along(old,crossing.bridge,f)*crossing.sign;
  if(progress>crossing.bridge.length/2+radius+.7&&canOccupy(level,old.x,old.z,radius)){
   delete animal.bridgeCrossing;return {finished:true};
  }
 }else{
  search: for(const river of level.rivers||[])for(const b of river.bridges){
   const f=axes(b),u=along(old,b,f),v=(old.x-b.x)*f.z-(old.z-b.z)*f.x;
   if(Math.abs(u)>b.length/2+.15||Math.abs(v)>b.width/2-radius||!canOccupy(level,old.x,old.z,radius))continue;
   const motion=(old.vx||0)*f.x+(old.vz||0)*f.z;
   if(Math.abs(motion)<.12)continue;
   crossing=animal.bridgeCrossing={bridge:b,sign:Math.sign(motion),lane:Math.max(-b.width/2+radius+.35,Math.min(b.width/2-radius-.35,v))};
   break search;
  }
 }
 if(!crossing)return null;
 const b=crossing.bridge,f=axes(b);
 let exit;
 for(const margin of [radius+1.2,radius+2,radius+3.2,radius+5]){
  const u=crossing.sign*(b.length/2+margin),p={x:b.x+f.x*u+f.z*crossing.lane,z:b.z+f.z*u-f.x*crossing.lane};
  if(canOccupy(level,p.x,p.z,radius)){exit=p;break;}
 }
 if(!exit)return null; // Keep intent, but never move toward an unsafe bank.
 const waypoint=navigationTarget(level,old,exit,radius),dx=waypoint.x-old.x,dz=waypoint.z-old.z,d=Math.hypot(dx,dz);
 if(d<.02||!hasClearGroundPath(level,old,waypoint,radius))return {x:0,z:0,forward:f};
 return {x:dx/d,z:dz/d,forward:f};
}
