import test from 'node:test';
import assert from 'node:assert/strict';
import {stepSimulation,stepSavedRoaming,createLevel} from '../src/simulation.js';
import {temperament,familiarNeighbor} from '../src/herd-behavior.js';
import {animalRadius} from '../src/animal-size.js';
import {updateAnimalTurn} from '../src/animal-turn.js';
import {updateGrazing} from '../src/grazing.js';
import {canOccupy,containsTarget,targetWorldPoint,targetLocalPoint,targetFootprint} from '../src/world.js';

function meadow(){
 const animals=Array.from({length:12},(_,id)=>({id,type:id%3?'sheep':'cow',scale:[1,13/12,7/6,1.25][id%4],x:(id%4-1.5)*2.2,z:(Math.floor(id/4)-1)*2.2,vx:0,vz:0,saved:false,nextWanderCheck:1e9}));
 return {index:23,time:0,seed:42,reward:300,animals,bounds:{minX:-60,maxX:60,minZ:-60,maxZ:60},dog:{x:-50,z:-50},target:{x:45,z:45,radius:7,type:'field',heading:0},rivers:[],fenceSegments:[],gates:[],obstacles:[],routes:[],roads:[]};
}
const run=(l,seconds)=>{for(let i=0;i<seconds*20;i++)stepSimulation(l,l.dog,{},.05);};
function spread(l){const c=l.animals.reduce((p,a)=>({x:p.x+a.x/l.animals.length,z:p.z+a.z/l.animals.length}),{x:0,z:0});return Math.sqrt(l.animals.reduce((v,a)=>v+(a.x-c.x)**2+(a.z-c.z)**2,0)/l.animals.length);}

test('personalities and familiar pairs are seeded without changing generated world or wander clocks',()=>{
 const a=createLevel(23,203),b=createLevel(23,203),before=structuredClone(a);
 const traits=a.animals.map(v=>({...temperament(a,v)}));
 assert.deepEqual(traits,b.animals.map(v=>({...temperament(b,v)})));
 assert.ok(new Set(traits.map(v=>v.confidence)).size>1);
 for(const t of traits){assert.ok(t.confidence>=.94&&t.confidence<=1.06);assert.ok(t.curiosity>=.9&&t.curiosity<=1.1);assert.ok(t.follow>=.94&&t.follow<=1);}
 assert.deepEqual(a.animals.map(({temperament,...v})=>v),before.animals);
 assert.deepEqual(a.obstacles,b.obstacles);assert.deepEqual(a.roads,b.roads);
 assert.equal(familiarNeighbor(a,a.animals[0],a.animals[1]),familiarNeighbor(b,b.animals[1],b.animals[0]));
});

test('unattended mixed flock increases field coverage, rests, and immediately responds to Pip',()=>{
 const l=meadow(),start=spread(l);run(l,60);
 assert.ok(spread(l)>start*1.8,'proposed spread metric: RMS radius grows at least 80% in 60s');
 assert.ok(l.animals.every(a=>!a.saved&&canOccupy(l,a.x,a.z,animalRadius(a))));
 const a=l.animals[0];Object.assign(l.dog,{x:a.x-2,z:a.z});
 stepSimulation(l,l.dog,{},.05);
 assert.equal(l.unattendedBrowse.has(a.id),false);assert.equal(a.relaxation,0);assert.ok(a.vx>0,'pressure cancels browsing without a wait');
 const saved=structuredClone(l);stepSimulation(l,l.dog,{},0);assert.deepEqual(l,saved);
});

test('unattended browsing cannot cross a closed barrier or invent autonomous deliveries',()=>{
 const l=meadow();l.fenceSegments=[{a:{x:5.5,z:-60},b:{x:5.5,z:60},kind:'interior'}];
 l.target={x:11,z:0,radius:5,type:'field',heading:0};
 run(l,80);
 assert.ok(l.animals.every(a=>a.x<5.5-animalRadius(a)&&!a.saved&&canOccupy(l,a.x,a.z,animalRadius(a))));
 assert.equal(l.delivery,undefined);
});

test('relaxation progresses with varied quiet delays and renewed pressure interrupts immediately',()=>{
 const l=meadow();l.animals=l.animals.slice(0,2);Object.assign(l.dog,{x:-4,z:0});run(l,.2);
 assert.ok(l.animals.every(a=>a.relaxation===0));Object.assign(l.dog,{x:-50,z:-50});run(l,3);
 assert.ok(l.animals.some(a=>a.relaxation<1));run(l,5);assert.ok(l.animals.every(a=>a.relaxation===1));
 Object.assign(l.dog,{x:l.animals[0].x-2,z:l.animals[0].z});stepSimulation(l,l.dog,{bark:true},.05);
 assert.equal(l.animals[0].relaxation,0);assert.ok(l.animals[0].vx>0);
});

test('delivered mixed herd and all cow sizes occupy available space without overlap, exit or reward changes',()=>{
 const l=meadow();l.target={x:0,z:0,radius:9,heading:.7,type:'field'};l.completed=true;l.result={saved:12,total:12,score:300};l.delivery={remaining:18};
 l.animals.forEach((a,id)=>Object.assign(a,targetWorldPoint(l.target,-5+(id%3)*2.2,(Math.floor(id/3)-1.5)*2.2),{saved:true}));
 const first=targetLocalPoint(l.target,l.animals[0]).forward;let quiet=0;
 for(let i=0;i<800;i++){
  stepSavedRoaming(l,.05);
  for(const a of l.animals){
   assert.ok(containsTarget(l.target,a,animalRadius(a))&&canOccupy(l,a.x,a.z,animalRadius(a)));
   if(Math.hypot(a.vx,a.vz)<.1)quiet++;
   for(const b of l.animals)if(a!==b)assert.ok(Math.hypot(a.x-b.x,a.z-b.z)>=animalRadius(a)+animalRadius(b)-1e-7);
  }
 }
 assert.ok(targetLocalPoint(l.target,l.animals[0]).forward>first+.2,'arrival moves inward beyond doorway');
 assert.ok(quiet>l.animals.length*100,'animals have substantial quiet spells');
 assert.deepEqual(l.result,{saved:12,total:12,score:300});assert.equal(l.delivery.remaining,18);assert.ok(l.animals.every(a=>a.saved));
});


test('packed saved arrivals physically untangle and clear the entrance instead of freezing in overlap',()=>{
 for(const index of [7,8])for(const seed of [200,201,202,203]){
  const l=createLevel(index,seed),shape=targetFootprint(l.target);l.completed=true;l.result={saved:9,total:9,score:200};l.delivery={remaining:20};
  l.animals=l.animals.slice(0,9);
  l.animals.forEach((a,i)=>{a.type=i%2?'cow':'sheep';a.saved=true;Object.assign(a,targetWorldPoint(l.target,-shape.halfLength+animalRadius(a)+.005,(i-4)*.35),{vx:0,vz:0});});
  for(let n=0;n<1200;n++){
   stepSavedRoaming(l,.05);
   assert.ok(l.animals.every(a=>canOccupy(l,a.x,a.z,animalRadius(a))&&containsTarget(l.target,a,animalRadius(a))),'every untangling step stays physically confined');
  }
  for(const a of l.animals)for(const b of l.animals)if(a!==b)assert.ok(Math.hypot(a.x-b.x,a.z-b.z)>=animalRadius(a)+animalRadius(b)-1e-7,`packed ${index}/${seed} pair ${a.id}/${b.id} separates`);
  assert.ok(l.animals.every(a=>targetLocalPoint(l.target,a).forward>-shape.halfLength+animalRadius(a)+.1),'arrivals advance inward');
  assert.deepEqual(l.result,{saved:9,total:9,score:200});assert.equal(l.delivery.remaining,20);
 }
});


test('ordinary browsing looks, lifts and shifts before departure while pressure interrupts preparation immediately',()=>{
 for(const type of ['sheep','cow']){
  const l=meadow(),a={id:1,type,x:0,z:0,vx:0,vz:0,heading:0,saved:false,nextWanderCheck:1e9};l.animals=[a];
  const pose={rotation:{y:0},userData:{graze:1,grazeWait:10}};
  let prepared=false,lifted=false,shifted=false,looked=false,departed=false,preparationFrames=0;
  for(let i=0;i<240;i++){
   stepSimulation(l,l.dog,{},.05);updateAnimalTurn(pose,a,.05);updateGrazing(pose,a,l,.05);
   if(a.ordinaryAnticipation){
    prepared=true;preparationFrames++;assert.ok(Math.hypot(a.vx,a.vz)<.2,'preparation precedes browsing speed');
    lifted ||= pose.userData.herdPose.headLift>0;shifted ||= pose.userData.herdPose.weightShift>.005;looked ||= Math.abs(pose.userData.herdPose.headYaw)>.005;
   }
   if(Math.hypot(a.vx,a.vz)>.4){assert.ok(prepared&&lifted&&shifted&&looked,'real simulation departure follows visible anticipation');departed=true;break;}
  }
  assert.ok(departed&&preparationFrames>=5&&preparationFrames<=8);
  const waiting=meadow(),b={...a,id:1,x:0,z:0,vx:0,vz:0};waiting.animals=[b];delete b.ordinaryAnticipation;delete b.ordinaryAttentionHeading;
  for(let i=0;i<180&&!b.ordinaryAnticipation;i++)stepSimulation(waiting,waiting.dog,{},.05);
  assert.ok(b.ordinaryAnticipation);Object.assign(waiting.dog,{x:b.x-2,z:b.z});
  stepSimulation(waiting,waiting.dog,{bark:true},.05);
  assert.equal(b.ordinaryAnticipation,undefined);assert.ok(b.vx>0,'bark applies physical response in this very frame');assert.equal(b.relaxation,0);
 }
});


test('scheduled non-bolting wander prepares visually before moving without shortening its movement window',()=>{
 const l=meadow();l.index=10;l.seed=4;
 l.animals=Array.from({length:30},(_,id)=>({id,type:'sheep',x:(id%6)*2,z:Math.floor(id/6)*2,vx:0,vz:0,heading:0,saved:false}));
 const a=l.animals[9],pose={rotation:{y:0},userData:{}};
 let began=false,prepared=false,lifted=false,shifted=false,looked=false,departed=false,nextCheck=null;
 for(let i=0;i<160;i++){
  stepSimulation(l,l.dog,{},.05);updateAnimalTurn(pose,a,.05);updateGrazing(pose,a,l,.05);
  if(a.wander&&!began){
   began=true;assert.equal(a.wander.bolting,false);assert.ok(a.ordinaryAnticipation);
   assert.ok(Math.abs(a.wander.until-a.wander.departAt-2.5)<1e-8,'retains the full2.5-second ordinary-wander window after preparation');
   nextCheck=a.nextWanderCheck;assert.ok(nextCheck-l.time>=5&&nextCheck-l.time<=8,'next independent opportunity keeps original cadence');
  }
  if(a.ordinaryAnticipation&&a.wander){
   prepared=true;lifted ||= pose.userData.herdPose.headLift>0;shifted ||= pose.userData.herdPose.weightShift>.005;looked ||= Math.abs(pose.userData.herdPose.headYaw)>.005;
   assert.ok(Math.hypot(a.vx,a.vz)<.3,'nonbolt preparation does not immediately add excursion propulsion');
  }
  if(a.wander&&l.time>=a.wander.departAt&&Math.hypot(a.vx,a.vz)>.4){departed=true;break;}
 }
 assert.ok(began&&prepared&&lifted&&shifted&&looked&&departed);assert.equal(a.nextWanderCheck,nextCheck);
 // Immediate player pressure supersedes a pending ordinary-wander pose.
 a.wander.departAt=l.time+.3;a.wander.until=l.time+2.8;
 Object.assign(l.dog,{x:a.x-2,z:a.z});stepSimulation(l,l.dog,{bark:true},.05);
 assert.equal(a.wander,undefined);assert.equal(a.ordinaryAnticipation,undefined);assert.ok(a.vx>0);
});
