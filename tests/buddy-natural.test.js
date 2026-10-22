import test from 'node:test';
import assert from 'node:assert/strict';
import { stepSimulation } from '../src/simulation.js';
import { updateAnimalTurn } from '../src/animal-turn.js';
import { updateGrazing } from '../src/grazing.js';
import { canOccupy } from '../src/world.js';
import { animalRadius } from '../src/animal-size.js';
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const center=as=>as.reduce((p,a)=>({x:p.x+a.x/as.length,z:p.z+a.z/as.length}),{x:0,z:0});
function fixture(count=65,spacing=2.4){
 const animals=Array.from({length:count},(_,id)=>({id,type:id%2?'cow':'sheep',scale:[1,13/12,7/6,1.25][id%4],x:(id%13-6)*spacing,z:(Math.floor(id/13)-2)*spacing,vx:1.5,vz:0,heading:Math.PI/2,saved:false,nextWanderCheck:1e9}));
 return {index:27,time:0,seed:42,reward:300,animals,bounds:{minX:-100,maxX:100,minZ:-100,maxZ:100},dog:{x:-70,z:-70},target:{x:80,z:80,radius:5,heading:0,type:'field'},helpers:[{type:'helper',x:0,z:-9}],obstacles:[],rivers:[],gates:[],fenceSegments:[],routes:[],roads:[]};
}
function tick(l,poses){
 const before=l.animals.map(a=>({...a})),buddy={...l.helpers[0]};
 const result=stepSimulation(l,l.dog,{},.05,{helper:2});
 l.animals.forEach((a,i)=>{
  assert.ok(distance(a,before[i])<.12,'animal takes physical steps rather than teleporting');
  assert.ok(canOccupy(l,a.x,a.z,animalRadius(a)));
  updateAnimalTurn(poses[i],a,.05);updateGrazing(poses[i],a,l,.05);
 });
 assert.ok(distance(l.helpers[0],buddy)<.351,'Buddy takes bounded physical steps at up to 7m/s');
 assert.ok(canOccupy(l,l.helpers[0].x,l.helpers[0].z,.6));
 assert.ok(!result.events.some(e=>e.type==='animalSaved'||e.type==='buddyBark'));
}

test('large mixed flock rests with diverse headings and asynchronous bounded browsing for three minutes',()=>{
 const l=fixture(),initial=l.animals.map(a=>({...a})),poses=l.animals.map(a=>({rotation:{y:a.heading},userData:{}}));
 const grazed=l.animals.map(()=>0),quietRun=l.animals.map(()=>0),longestQuiet=l.animals.map(()=>0),movedAfterRest=new Set();
 let maxCentroid=0,maxExcursion=0,maxMoving=0,minMoving=65,watch=0,checkDistance=0,previous={...l.helpers[0]};
 for(let i=0;i<3600;i++){
  tick(l,poses);
  let moving=0;
  l.animals.forEach((a,j)=>{
   const speed=Math.hypot(a.vx,a.vz);
   if(speed>.1){moving++;if(i>400)movedAfterRest.add(j);}
   quietRun[j]=speed<.1?quietRun[j]+.05:0;longestQuiet[j]=Math.max(longestQuiet[j],quietRun[j]);
   if(poses[j].userData.graze===1)grazed[j]+=.05;
   maxExcursion=Math.max(maxExcursion,distance(a,initial[j]));
  });
  if(i>400){maxMoving=Math.max(maxMoving,moving);minMoving=Math.min(minMoving,moving);}
  if(l.helpers[0].containmentActivity==='watch'&&distance(l.helpers[0],previous)<.001)watch+=.05;
  checkDistance+=distance(l.helpers[0],previous);previous={...l.helpers[0]};
  maxCentroid=Math.max(maxCentroid,distance(center(l.animals),center(initial)));
  if(i===300){
   const headings=new Set(l.animals.map(a=>Math.floor((a.heading+Math.PI)/(Math.PI/4))));
   assert.ok(headings.size>=6,'resting animals retain many individual facing directions');
   assert.ok(poses.every(p=>p.userData.graze===1),'initial settle permits the full herd to graze before later browse steps');
  }
 }
 assert.ok(maxExcursion<1.2,'individual home patches remain bounded');
 assert.ok(maxCentroid<.3,'no cumulative directional flock drift');
 assert.ok(grazed.every(t=>t>90),'each mixed-size animal spends most of the run grazing');
 assert.ok(longestQuiet.every(t=>t>15),'every animal has extended uninterrupted quiet spells');
 assert.equal(movedAfterRest.size,65,'all animals occasionally take a new browsing step');
 assert.ok(maxMoving<55 && minMoving<5,'later browsing clocks do not move the flock in unison');
 assert.ok(watch>30 && checkDistance>20,'Buddy combines substantial stationary watching with real perimeter checks');
});

test('hard surfaces do not cause browsing toward nearby grass or grass grazing on the path',()=>{
 const l=fixture(13);l.roads=[{points:[{x:-40,z:-4.8},{x:40,z:-4.8}],width:5}];
 const poses=l.animals.map(a=>({rotation:{y:a.heading},userData:{}})),initial=l.animals.map(a=>({...a}));
 for(let i=0;i<1000;i++)tick(l,poses);
 assert.ok(poses.every(p=>p.userData.graze===0));
 const headings=new Set(l.animals.map(a=>Math.floor((Math.atan2(Math.sin(a.heading),Math.cos(a.heading))+Math.PI)/(Math.PI/4))));
 assert.ok(headings.size>=6,'animals on a path choose individual resting orientations without walking toward grass');
 assert.ok(l.animals.every((a,j)=>distance(a,initial[j])<.25),'animals rest on a path without seeking a grass target');
});


test('a distant Buddy promptly reaches a moving flock without unattended watching or remote holds',()=>{
 const l=fixture();l.bounds={minX:-150,maxX:150,minZ:-150,maxZ:150};
 l.dog={x:-120,z:-120};Object.assign(l.helpers[0],{x:-80,z:0});
 l.animals.forEach(a=>{a.vx=2;a.vz=0;});
 const poses=l.animals.map(a=>({rotation:{y:a.heading},userData:{}}));
 const start=center(l.animals);let acquiredAt;
 for(let i=0;i<600;i++){
  tick(l,poses);
  const hold=l.buddyHerd.containment;
  if(!hold.acquired){
   assert.notEqual(l.helpers[0].containmentActivity,'watch','Buddy approaches at working speed until physically attending');
   assert.ok(l.animals.every(a=>!a.buddyRest),'no resting influence before local acquisition');
  }else{acquiredAt=l.time;break;}
 }
 assert.ok(acquiredAt<30,`reaches the moving flock promptly; acquired at ${acquiredAt}`);
 assert.ok(distance(start,center(l.animals))>1,'flock retains its own movement before Buddy arrives');
});
