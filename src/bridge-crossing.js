import { animalRadius } from './animal-size.js';
import {canOccupy,navigationTarget,hasClearGroundPath} from './world.js';

const radiusOf=a=>animalRadius(a);
/** Approach distance before a deck end where pressured walkers commit. */
export const COMMIT_DEPTH=3;
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
   animal.lastBridge={bridge:crossing.bridge,sign:crossing.sign};
   delete animal.bridgeCrossing;return {finished:true};
  }
 }else{
  search: for(const river of level.rivers||[])for(const b of river.bridges){
   const f=axes(b),u=along(old,b,f),v=(old.x-b.x)*f.z-(old.z-b.z)*f.x;
   const motion=(old.vx||0)*f.x+(old.vz||0)*f.z;
   // On the deck any walk commits. In the short approach zone only a pressured
   // animal already lined up with the deck and walking onto it commits, so the
   // player can still turn a flock back before it reaches the bridge.
   // Approach commitment needs direct Pip/Buddy pressure, and never sends an
   // animal back over a deck it already crossed; walking on still commits.
   const back=animal.lastBridge?.bridge===b&&Math.sign(motion)!==animal.lastBridge.sign;
   const onDeck=Math.abs(u)<=b.length/2+.15,approaching=!onDeck&&!back&&old.pushed&&Math.abs(u)<=b.length/2+COMMIT_DEPTH&&motion*u<0;
   if((!onDeck&&!approaching)||Math.abs(v)>b.width/2-radius-(approaching?.1:0)||!canOccupy(level,old.x,old.z,radius))continue;
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
