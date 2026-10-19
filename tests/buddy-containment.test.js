import test from 'node:test';
import assert from 'node:assert/strict';
import { stepSimulation } from '../src/simulation.js';
import { updateBuddy } from '../src/buddy.js';
import { canOccupy } from '../src/world.js';
import { animalRadius } from '../src/animal-size.js';
import { updateAnimalTurn } from '../src/animal-turn.js';
import { updateGrazing } from '../src/grazing.js';
const animal=(id,x,z,vx=0,vz=0)=>({id,x,z,vx,vz,type:'sheep',saved:false,nextWanderCheck:1e9});
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const center=as=>as.reduce((p,a)=>({x:p.x+a.x/as.length,z:p.z+a.z/as.length}),{x:0,z:0});
const fixture=(animals,more={})=>({index:27,time:0,seed:42,reward:300,animals,dog:{x:-50,z:-50},target:{x:80,z:80,radius:5,heading:0,type:'field'},helpers:[{type:'helper',x:-5,z:0}],bounds:{minX:-100,maxX:100,minZ:-100,maxZ:100},obstacles:[],rivers:[],gates:[],fenceSegments:[],routes:[],...more});
const run=(l,seconds,inspect=()=>{},upgrades={helper:2})=>{const events=[];for(let i=0;i<seconds*20;i++){events.push(...stepSimulation(l,l.dog,{},.05,upgrades).events);inspect(l);}return events;};

test('remote Pip makes Buddy patrol and arrest travel for sheep and every cow size',()=>{
 for(const [type,size] of [['sheep',1],... [1,1+1/12,1+1/6,1.25].map(s=>['cow',s])]){
  const l=fixture([animal(0,0,-2,2),animal(1,0,2,2),animal(2,3,0,2)]);
  l.animals.forEach(a=>Object.assign(a,{type,scale:size}));const start=center(l.animals),startBuddy={...l.helpers[0]};let excursion=0;
  const events=run(l,25,()=>{
   excursion=Math.max(excursion,distance(l.helpers[0],startBuddy));
   assert.ok(l.animals.every(a=>canOccupy(l,a.x,a.z,animalRadius(a))));
   assert.ok(canOccupy(l,l.helpers[0].x,l.helpers[0].z,.6));
  });
  assert.equal(l.helpers[0].mode,'contain');assert.ok(distance(center(l.animals),start)<.6);
  assert.ok(Math.max(...l.animals.map(a=>distance(a,start)))<4);
  assert.ok(excursion>6,'patrols physically rather than parking');
  assert.ok(events.every(e=>e.type!=='buddyBark'));assert.ok(l.animals.every(a=>a.alert===0&&!a.saved));
 }
});

test('containment stays anchored, supports pause and returns only inside attendance hysteresis',()=>{
 const l=fixture([animal(0,0,0,2),animal(1,0,2,2)]);run(l,2);
 const anchor={...l.buddyHerd.containment.anchor};run(l,4);assert.deepEqual(l.buddyHerd.containment.anchor,anchor);
 const pause=structuredClone(l);stepSimulation(l,l.dog,{},0,{helper:2});assert.deepEqual(l,pause);
 l.dog={x:16,z:1};run(l,.1);assert.equal(l.helpers[0].mode,'contain');
 l.dog={x:12,z:1};run(l,.1);assert.notEqual(l.helpers[0].mode,'contain');
 l.dog={x:16,z:1};run(l,.1);assert.notEqual(l.helpers[0].mode,'contain');
 l.dog={x:22,z:1};run(l,.1);assert.equal(l.helpers[0].mode,'contain');
 assert.equal(fixture([]).buddyHerd,undefined);
});

test('fences, closed gates and river banks trigger containment but trees and open gates do not',()=>{
 const walls=[{a:{x:0,z:-100},b:{x:0,z:-2},kind:'interior'},{a:{x:0,z:2},b:{x:0,z:100},kind:'interior'}];
 for(const [barrier,expected] of [
  [{fenceSegments:[{a:{x:0,z:-100},b:{x:0,z:100},kind:'interior'}]},true],
  [{rivers:[{points:[{x:0,z:-100},{x:0,z:100}],width:3,bridges:[]}]},true],
  [{fenceSegments:walls,gates:[{x:0,z:0,width:4,heading:0,operable:true,open:false}]},true],
  [{fenceSegments:walls,gates:[{x:0,z:0,width:4,heading:0,operable:true,open:true}]},false],
  [{obstacles:[{x:0,z:0,radius:2}]},false],
 ]){
  const l=fixture([animal(0,5,-.5,0,2),animal(1,5,.5,0,2)],{dog:{x:-5,z:0},helpers:[{type:'helper',x:6,z:-5}],...barrier});
  run(l,.1);assert.equal(l.helpers[0].mode==='contain',expected);
 }
});

test('split opposite-moving flocks retain tier selection and do not gain remote holding forces',()=>{
 const l=fixture([animal(0,-20,0,2),animal(1,-20,2,2),animal(2,-18,0,2),animal(3,20,0,-2),animal(4,20,2,-2)],{helpers:[{type:'helper',x:16,z:1}]});
 const prior=center(l.animals.slice(0,3));run(l,8);
 assert.deepEqual(l.helpers[0].clusterIds,[3,4]);assert.ok(distance(center(l.animals.slice(3)),{x:20,z:1})<.5);
 assert.ok(distance(center(l.animals.slice(0,3)),prior)>1,'unselected flock keeps its own independent travel');
 const remote=fixture([animal(0,0,0,2),animal(1,0,2,2)],{helpers:[{type:'helper',x:-80,z:0}]});
 const baseline=structuredClone(remote);stepSimulation(remote,remote.dog,{},.05,{helper:2});stepSimulation(baseline,baseline.dog,{},.05,{});
 assert.deepEqual(remote.animals,baseline.animals,'no remote forces while Buddy is still approaching');
});

test('Pip pressure overrides containment and inactive Buddy changes no flock behavior',()=>{
 const l=fixture([animal(0,0,-1),animal(1,0,1)]);run(l,3);const before=center(l.animals);
 l.dog={x:-3,z:0};run(l,1);assert.ok(center(l.animals).x>before.x+1);assert.notEqual(l.helpers[0].mode,'contain');
 const inactive=fixture([animal(0,0,0,2),animal(1,0,2,2)]),baseline=structuredClone(inactive);
 run(inactive,2,()=>{},{});run(baseline,2,()=>{},{});assert.deepEqual(inactive,baseline);assert.equal(inactive.buddyHerd,undefined);
 const untouched=structuredClone(inactive);updateBuddy(inactive,inactive.animals,{helper:0},.1,[]);assert.deepEqual(inactive,untouched);
});

test('already committed bridge animals complete crossing then hold their dry-bank positions',()=>{
 for(const type of ['sheep','cow']){
  const bridge={x:0,z:0,width:7,length:6,heading:Math.PI/2};
  const l=fixture([animal(0,0,-1,2),animal(1,0,1,2)],{helpers:[{type:'helper',x:0,z:0}],rivers:[{points:[{x:0,z:-100},{x:0,z:100}],width:3,bridges:[bridge]}]});
  l.animals.forEach(a=>{a.type=type;a.bridgeCrossing={bridge,sign:1,lane:a.z*-1};});
  run(l,18,()=>assert.ok(l.animals.every(a=>canOccupy(l,a.x,a.z,animalRadius(a)))));
  assert.ok(l.animals.every(a=>a.x>4&&!a.bridgeCrossing),'both animals finish on dry far bank');
  const positions=l.animals.map(a=>({...a}));run(l,10);
  assert.ok(l.animals.every((a,i)=>distance(a,positions[i])<.3),'holds safely instead of returning onto deck');
 }
});

test('wide nine-animal row and large mixed connected herd remain spread and graze through long perimeter patrols',()=>{
 for(const layout of ['row','mixed']){
  const animals=Array.from({length:layout==='row'?9:65},(_,id)=>{
   const a=animal(id,layout==='row'?(id-4)*3:(id%13-6)*3,layout==='row'?0:(Math.floor(id/13)-2)*3,0,2);
   if(layout==='mixed'&&id%2){a.type='cow';a.scale=[1,13/12,7/6,1.25][id%4];}return a;
  });
  const l=fixture(animals,{dog:{x:-70,z:-70},helpers:[{type:'helper',x:0,z:-7}],roads:[]});
  const initial=animals.map(a=>({...a}));const poses=animals.map(a=>({rotation:{y:0},userData:{}}));
  let furthest=0;
  for(let i=0;i<1800;i++){
   stepSimulation(l,l.dog,{},.05,{helper:2});
   animals.forEach((a,j)=>{
    updateAnimalTurn(poses[j],a,.05);updateGrazing(poses[j],a,l,.05);
    furthest=Math.max(furthest,distance(a,initial[j]));
   });
   if(i===599||i===1799){
    assert.ok(furthest<.6,`${layout}: retains each original position instead of collapsing the group`);
    assert.ok(poses.every(p=>p.userData.graze===1),`${layout}: every animal grazes while Buddy patrols`);
   }
  }
  assert.equal(l.helpers[0].mode,'contain');assert.ok(distance(center(animals),center(initial))<.3);
 }
});

test('a distant arriving Buddy acquires current positions instead of pulling animals back to stale onset',()=>{
 const l=fixture([animal(0,0,0,2),animal(1,0,2,2)],{helpers:[{type:'helper',x:-35,z:0}]});
 const initial=center(l.animals);let acquired;
 for(let i=0;i<500;i++){
  stepSimulation(l,l.dog,{},.05,{helper:2});
  if(l.buddyHerd.containment.acquired&&!acquired)acquired=center(l.animals);
 }
 assert.ok(acquired);assert.ok(distance(acquired,initial)>.2,'animals travel naturally before physical Buddy arrival');
 assert.ok(distance(center(l.animals),acquired)<.7,'holds the arrival area instead of returning to stale positions');
});
