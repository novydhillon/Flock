import test from 'node:test';
import assert from 'node:assert/strict';
import { stepSimulation, canOccupy } from '../src/simulation.js';
import { prepareWanderCohort } from '../src/wandering.js';

const animal = (id, x, z, vx = 0, vz = 0) => ({ id, x, z, vx, vz, type: 'sheep', saved: false, nextWanderCheck: 1e9 });
const center = group => group.reduce((p,a) => ({x:p.x+a.x/group.length,z:p.z+a.z/group.length}),{x:0,z:0});
const distance = (a,b) => Math.hypot(a.x-b.x,a.z-b.z);
function meadow(animals, changes = {}) {
  return { index:27, time:0, seed:42, reward:300, animals,
    bounds:{minX:-100,maxX:100,minZ:-100,maxZ:100},
    dog:{x:-70,z:-70}, target:{x:80,z:80,radius:5,heading:Math.PI/2,type:'field'},
    helpers:[{type:'helper',x:-4,z:0}], rivers:[],fenceSegments:[],gates:[],obstacles:[],routes:[],...changes };
}
function run(level, seconds, upgrades={helper:3}, inspect=()=>{}) {
  const events=[];
  for(let i=0;i<Math.round(seconds*20);i++) {
    events.push(...stepSimulation(level,level.dog,{},.05,upgrades).events); inspect(level);
  }
  return events;
}
const buddy = level => level.helpers.find(h=>h.type==='helper');

test('Buddy herds from the rear of measured flock travel in every compass direction',()=>{
  for(const [vx,vz] of [[2,0],[-2,0],[0,2],[0,-2]]) {
    const level=meadow([animal(0,0,-1,vx,vz),animal(1,0,1,vx,vz)]);
    const c=center(level.animals); Object.assign(buddy(level),{x:c.x-vx*2,z:c.z-vz*2});
    const baseline=structuredClone(level);
    stepSimulation(level,level.dog,{},.1,{helper:1});stepSimulation(baseline,baseline.dog,{},.1,{});
    const h=buddy(level);
    assert.equal(h.mode,'herd');
    assert.ok((h.x-c.x)*vx+(h.z-c.z)*vz<0,'behind the actual flock travel');
    assert.ok((h.desired.x-c.x)*vx+(h.desired.z-c.z)*vz<-3);
    const gain=level.animals.reduce((sum,a,i)=>sum+(a.vx-baseline.animals[i].vx)*vx+(a.vz-baseline.animals[i].vz)*vz,0);
    assert.ok(gain>.1,'rear dog contributes forward herding');
  }
});

test('a stationary flock gets no invented travel direction and remote Buddy cannot herd',()=>{
  const level=meadow([animal(0,0,0),animal(1,0,2)]),baseline=structuredClone(level);
  run(level,5,{helper:1});run(baseline,5,{});
  assert.equal(buddy(level).mode,'hold'); assert.deepEqual(level.animals,baseline.animals);
  const moving=meadow([animal(0,0,0,2),animal(1,0,2,2)],{helpers:[{type:'helper',x:-70,z:0}]});
  const alone=structuredClone(moving);stepSimulation(moving,moving.dog,{},.1,{helper:1});stepSimulation(alone,alone.dog,{},.1,{});
  assert.deepEqual(moving.animals,alone.animals,'no remote force before Buddy reaches the flock');
});

test('tier two selects the smaller flock, retains ties, and tier one keeps the largest',()=>{
  for(const [tier,ids] of [[1,[0,1,2,3]],[2,[4,5]],[3,[4,5]]]) {
    const level=meadow([animal(0,0,0,2),animal(1,2,0,2),animal(2,0,2,2),animal(3,2,2,2),animal(4,25,0),animal(5,27,0)]);
    stepSimulation(level,level.dog,{},.05,{helper:tier});
    assert.deepEqual(buddy(level).clusterIds,ids);
    if(tier>=2) {
      level.animals[2].saved=level.animals[3].saved=true;
      stepSimulation(level,level.dog,{},.05,{helper:tier});assert.deepEqual(buddy(level).clusterIds,[4,5]);
      level.animals[4].x=3;level.animals[5].x=4;run(level,.4,{helper:tier});
      assert.deepEqual([...buddy(level).clusterIds].sort(),[0,1,4,5],'merging restores one flock');
    }
  }
});

test('tier three retrieves active wanderers, bolters and settled strays to the closest flock',()=>{
  for(const kind of ['wander','bolt','settled']) {
    const stray=animal(6,34,0);
    if(kind==='settled')stray.wanderHome={x:34,z:0};
    else stray.wander={x:75,z:0,until:10,bolting:kind==='bolt'};
    const level=meadow([animal(0,0,0),animal(1,0,2),animal(2,2,0),animal(3,2,2),animal(4,22,0),animal(5,22,2),stray],{helpers:[{type:'helper',x:30,z:8}]});
    stepSimulation(level,level.dog,{},.05,{helper:3});
    assert.equal(buddy(level).mode,'retrieve'); assert.equal(buddy(level).targetId,6);
    assert.deepEqual(buddy(level).clusterIds,[4,5],'closest group beats the largest group');
    const events=run(level,30,{helper:3},l=>assert.ok(l.animals.every(a=>canOccupy(l,a.x,a.z,.55))));
    assert.ok(level.animals.slice(4,6).some(a=>distance(a,stray)<6.5),`${kind} returns to the nearby group`);
    assert.equal(stray.wander,undefined);assert.equal(stray.wanderHome,undefined);
    assert.ok(events.some(e=>e.type==='buddyBark'),'retrieval barks autonomously');
    assert.equal(level.animals.some(a=>a.saved),false,'retrieval never scores remotely');
  }
});

test('lower tiers cannot retrieve; owned tiers respect public 20/24/28 activation gates',()=>{
  for(const [index,mode,ids] of [[19,'hold',[0,1,2]],[23,'hold',[3,4]],[27,'retrieve',[3,4]]]) {
    const stray=animal(5,40,0);stray.wanderHome={x:40,z:0};
    const level=meadow([animal(0,0,0),animal(1,0,2),animal(2,2,0),animal(3,25,0),animal(4,25,2),stray],{index});
    const result=stepSimulation(level,level.dog,{},.05,{helper:3});
    assert.equal(buddy(level).mode,mode);assert.deepEqual(buddy(level).clusterIds,ids);
    if(index<27){assert.ok(stray.wanderHome);assert.ok(!result.events.some(e=>e.type==='buddyBark'));}
  }
});

test('Buddy signals cannot cross walls or rivers and its body cannot cross solid ground',()=>{
  for(const barrier of [
    {fenceSegments:[{a:{x:4,z:-100},b:{x:4,z:100},kind:'interior'}]},
    {rivers:[{points:[{x:4,z:-100},{x:4,z:100}],width:2,bridges:[]}]},
  ]) {
    const level=meadow([animal(0,7,0,2),animal(1,7,2,2)],{...barrier,helpers:[{type:'helper',x:1,z:0}]});
    const baseline=structuredClone(level);
    const events=run(level,3,{helper:3});run(baseline,3,{});
    assert.deepEqual(level.animals,baseline.animals);assert.ok(buddy(level).x<3.45);
    assert.ok(canOccupy(level,buddy(level).x,buddy(level).z,.6));assert.equal(events.length,0);
  }
});

test('Buddy bark uses simulation time, independent cooldown, pause and reset',()=>{
  const level=meadow([animal(0,0,0,2),animal(1,0,2,2)]);
  const first=stepSimulation(level,level.dog,{bark:true},.05,{helper:3});
  assert.equal(first.events.filter(e=>e.type==='buddyBark').length,1);assert.equal(buddy(level).barking,true);
  const paused=structuredClone(level);stepSimulation(level,level.dog,{bark:true},0,{helper:3});assert.deepEqual(level,paused);
  const events=run(level,10,{helper:3});assert.ok(events.filter(e=>e.type==='buddyBark').length>=2);
  assert.ok(events.filter(e=>e.type==='buddyBark').length<=3,'no frame-based bark spam');
  assert.equal(meadow([]).buddyHerd,undefined);
});

test('saved or missing retrieval targets are released and no flock leaves Buddy in standby',()=>{
  const stray=animal(2,20,0);stray.wanderHome={x:20,z:0};
  const level=meadow([animal(0,0,0),animal(1,0,2),stray]);
  stepSimulation(level,level.dog,{},.05,{helper:3});assert.equal(buddy(level).targetId,2);
  stray.saved=true;stepSimulation(level,level.dog,{},.05,{helper:3});assert.equal(buddy(level).targetId,null);
  level.animals[0].saved=true;stepSimulation(level,level.dog,{},.05,{helper:3});
  assert.equal(buddy(level).mode,'standby');assert.deepEqual(buddy(level).clusterIds,[]);
});


test('Buddy follows a reversal in group travel instead of staying at the new front',()=>{
  const level=meadow([animal(0,0,0,2),animal(1,0,2,2)]);
  stepSimulation(level,level.dog,{},.05,{helper:1});
  for(let i=0;i<50;i++) {
    level.animals.forEach(a=>{a.vx=-2;a.vz=0;});
    stepSimulation(level,level.dog,{},.05,{helper:1});
  }
  assert.ok(buddy(level).forward.x<-.99);
  assert.ok(buddy(level).desired.x>center(level.animals).x+3);
});

test('retrieval uses a real bridge with body clearance and works alongside a holding drone',()=>{
  const stray=animal(4,16,8);stray.wanderHome={x:16,z:8};
  const points=[{x:-15,z:8},{x:-3,z:0},{x:5,z:0},{x:13,z:0},{x:20,z:8}];
  const level=meadow([animal(0,-8,7),animal(1,-8,9),animal(2,-10,7),animal(3,-10,9),stray],{
    helpers:[{type:'helper',x:20,z:8}],
    rivers:[{points:[{x:5,z:-100},{x:5,z:100}],width:2,bridges:[{x:5,z:0,width:7,length:5,heading:Math.PI/2}]}],
    routes:[{id:'main',points}],
  });
  let crossed=false;
  run(level,55,{helper:3,drone:3},l=>{
    assert.ok(canOccupy(l,buddy(l).x,buddy(l).z,.6),'Buddy stays dry and outside rails');
    assert.ok(canOccupy(l,stray.x,stray.z,.55),'retrieved sheep stays on usable ground');
    if(stray.x<3)crossed=true;
  });
  assert.ok(crossed,'stray crosses the bridge toward the closest flock');
  assert.ok(level.animals.slice(0,4).some(a=>distance(a,stray)<6.5),'stray rejoins the flock');
});


test('Buddy catches a cohort-eligible bolter before expiry and prioritizes it over a nearer settled stray',()=>{
 const level=meadow(Array.from({length:10},(_,id)=>animal(id,(id%3)*2,Math.floor(id/3)*2)),{helpers:[{type:'helper',x:15,z:8}]});
 const id=[...prepareWanderCohort(level)][0],stray=level.animals.find(a=>a.id===id);
 Object.assign(stray,{x:24,z:0,wander:{x:90,z:0,until:10,bolting:true}});
 const other=level.animals.find(a=>a!==stray);Object.assign(other,{x:16,z:0,wanderHome:{x:16,z:0}});
 stepSimulation(level,level.dog,{},.05,{helper:3});assert.equal(buddy(level).targetId,id);
 let caughtAt=null,rejoined=false;
 for(let i=0;i<800;i++){
  stepSimulation(level,level.dog,{},.05,{helper:3});
  if(caughtAt===null&&!stray.wander&&!stray.wanderHome)caughtAt=level.time;
  if(level.animals.some(a=>a!==stray&&a!==other&&!a.wanderHome&&distance(a,stray)<4.5)){rejoined=true;break;}
 }
 assert.ok(caughtAt!==null&&caughtAt<10,'Buddy catches the active bolt, rather than waiting for expiry');
 assert.equal(rejoined,true,'caught bolter returns to the flock');
});

test('retrieved cows use their larger collision footprint and return without Pip',()=>{
 const stray={...animal(2,20,0),type:'cow',wanderHome:{x:20,z:0}};
 const level=meadow([animal(0,0,-1),animal(1,0,1),stray],{helpers:[{type:'helper',x:24,z:0}]});
 run(level,25,{helper:3},l=>assert.ok(canOccupy(l,stray.x,stray.z,.78)));
 assert.ok(level.animals.slice(0,2).some(a=>distance(a,stray)<6.5));
 assert.equal(stray.wanderHome,undefined);
});
