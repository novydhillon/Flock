import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluateWanderOpportunity,prepareWanderCohort,wanderCohortSize,wanderTuning,nextWanderOpportunity,WANDER_CHECK_RANGE} from '../src/wandering.js';
import {createLevel,stepSimulation,canOccupy} from '../src/simulation.js';
const flock=count=>Array.from({length:count},(_,id)=>({id,x:id*1.5,z:0,saved:false}));
const center={x:0,z:0};

test('per-level cohort is floor 20% of undelivered animals and shrinks as deliveries occur',()=>{
  for(let count=0;count<=65;count++){
    const level={index:39,seed:42,animals:flock(count)};
    assert.equal(prepareWanderCohort(level).size,Math.floor(count*.2));
    level.animals.forEach((a,i)=>a.saved=i%2===0);
    const ids=prepareWanderCohort(level);
    assert.equal(ids.size,wanderCohortSize(level.animals.filter(a=>!a.saved).length));
    assert.ok([...ids].every(id=>!level.animals[id].saved));
  }
  assert.equal(wanderCohortSize(5),1);assert.equal(wanderCohortSize(65),13);
  const a=createLevel(39,42),b=createLevel(40,42),restart=createLevel(39,42);
  assert.deepEqual([...prepareWanderCohort(a)],[...prepareWanderCohort(restart)]);
  assert.notDeepEqual([...prepareWanderCohort(a)],[...prepareWanderCohort(b)]);
  assert.ok(restart.animals.every(a=>!a.wander&&!a.wanderHome&&!a.nextWanderCheck));
});

test('each animal gets reproducible independent 5-8 second checks with pause and no catch-up bursts',()=>{
  assert.deepEqual(WANDER_CHECK_RANGE,[5,8]);
  function schedule(dt){const level={index:16,seed:23,time:0},animal={id:7},times=[];for(let i=0;i<100/dt;i++){level.time+=dt;const n=nextWanderOpportunity(level,animal,dt);if(n!==null)times.push({n,next:animal.nextWanderCheck});}return times;}
  const a=schedule(.1),b=schedule(.05);
  assert.equal(a.length,b.length);
  a.forEach((v,i)=>{assert.equal(v.n,b[i].n);assert.ok(Math.abs(v.next-b[i].next)<1e-9);if(i)assert.ok(v.next-a[i-1].next>=5&&v.next-a[i-1].next<=8);});
  const level={index:16,seed:23,time:.1},one={id:1},two={id:2};
  nextWanderOpportunity(level,one,.1);nextWanderOpportunity(level,two,.1);
  assert.notEqual(one.nextWanderCheck,two.nextWanderCheck);
  const before=structuredClone(one);assert.equal(nextWanderOpportunity(level,one,0),null);assert.deepEqual(one,before);
  level.time=100;assert.equal(nextWanderOpportunity(level,one,.1),0);assert.ok(one.nextWanderCheck>100);assert.equal(nextWanderOpportunity(level,one,.1),null);
});

test('public level boundaries keep explicit wander, conditional bolt and duration bands',()=>{
  for(const [number,wanderChance,boltChance,duration] of [[8,.33,.1,[3,5]],[17,.33,.1,[3,5]],[39,.33,.1,[3,5]],[40,.33,.1,[4,6]],[41,.2,.2,[4,6]],[69,.2,.2,[4,6]],[70,.2,.2,[5,10]],[71,.25,.2,[5,10]],[100,.25,.2,[5,10]]]){
    assert.deepEqual(wanderTuning(number-1),{wanderChance,boltChance,duration});
  }
});

test('seeded opportunity rates match all bands, with saved/herded/settled animals excluded',()=>{
  for(const index of [7,15,16,39,40,69,70,99]){
    let eligible=0,wandered=0,bolted=0;
    for(let seed=1;seed<=400;seed++){
      const level={index,seed,time:20,animals:flock(60)};
      for(const a of level.animals){const r=evaluateWanderOpportunity(level,a,3,center);if(level.wanderCohort.has(a.id))eligible++;if(r){wandered++;if(r.bolting){bolted++;const [min,max]=wanderTuning(index).duration;assert.ok(r.until-20>=min&&r.until-20<=max);}assert.deepEqual(r,evaluateWanderOpportunity(level,a,3,center));assert.equal(evaluateWanderOpportunity(level,a,3,center,true),null);}}
    }
    const tuning=wanderTuning(index);assert.equal(eligible,4800);
    assert.ok(Math.abs(wandered/eligible-tuning.wanderChance)<.035);
    if(index<16)assert.equal(bolted,0);else assert.ok(Math.abs(bolted/wandered-tuning.boltChance)<.045);
  }
  const level={index:16,seed:4,time:0,animals:flock(30)},a=level.animals[0];
  for(const state of [{saved:true},{wander:{}},{wanderHome:{x:0,z:0}}])assert.equal(evaluateWanderOpportunity(level,{...a,...state},1,center),null);
  for(const index of [0,6])assert.equal(evaluateWanderOpportunity({...level,index},a,1,center),null);
});

function meadow(){const level=createLevel(16,42);Object.assign(level,{boundary:null,bounds:{minX:-100,maxX:100,minZ:-100,maxZ:100},rivers:[],obstacles:[],fenceSegments:[],animals:flock(30).map(a=>({...a,x:-10+(a.id%6)*1.5,z:Math.floor(a.id/6)*1.5,vx:0,vz:0,type:'sheep',nextWanderCheck:10000})),dog:{x:-70,z:-70}});Object.assign(level.target,{x:80,z:80});return level;}
function step(level,seconds,upgrades={}){for(let i=0;i<Math.round(seconds*10);i++)stepSimulation(level,level.dog,{},.1,upgrades);}

test('wander and bolt expiry settle locally against flock cohesion until active Pip pressure resumes',()=>{
  for(const bolting of [false,true]){
    const level=meadow(),a=level.animals.find(a=>prepareWanderCohort(level).has(a.id));
    a.wander={x:a.x+40,z:a.z,until:1,bolting};
    step(level,.9);assert.equal(a.wander?.bolting,bolting,'timed excursion is not truncated');
    const paused=structuredClone(a);stepSimulation(level,level.dog,{},0);assert.deepEqual(a,paused);
    step(level,.2);assert.ok(a.wanderHome);assert.equal(a.wander,undefined);
    const home={...a.wanderHome};step(level,60);
    assert.ok(Math.hypot(a.x-home.x,a.z-home.z)<=3.000001,'settled animal remains in its new area');
    assert.ok(canOccupy(level,a.x,a.z,.55));assert.deepEqual(a.wanderHome,home);
    Object.assign(level.dog,{x:a.x-1,z:a.z});step(level,.1);
    assert.equal(a.wanderHome,undefined);assert.equal(a.wander,undefined);
    const fresh=meadow();assert.ok(fresh.animals.every(a=>!a.wanderHome&&!a.wander));
  }
});

test('local roaming respects barriers and delivered animals retain goal confinement',()=>{
  const level=meadow(),a=level.animals[0];
  Object.assign(a,{x:0,z:0,wanderHome:{x:0,z:0}});
  level.obstacles=[{x:1.4,z:0,radius:.8}];step(level,25);
  assert.ok(canOccupy(level,a.x,a.z,.55));assert.ok(Math.hypot(a.x,a.z)<=3.000001);
  const saved=createLevel(16,6),b=saved.animals[0];
  Object.assign(b,{x:saved.target.x,z:saved.target.z,wander:{x:999,z:999,until:10,bolting:true},wanderHome:{x:999,z:999}});
  Object.assign(saved.dog,{x:saved.target.x,z:saved.target.z});
  step(saved,.1);assert.equal(b.saved,true);assert.equal(b.wander,undefined);assert.equal(b.wanderHome,undefined);
  step(saved,3);assert.equal(b.saved,true);assert.ok(Math.hypot(b.x-saved.target.x,b.z-saved.target.z)<saved.target.radius+1);
});

test('active helper herding clears excursion and local-home state without nearby Pip pressure',()=>{
  const level=meadow();
  level.animals=level.animals.slice(0,4);
  Object.assign(level.dog,{x:-20,z:0});
  const a=level.animals[0];a.wander={x:50,z:0,until:10,bolting:true};a.wanderHome={x:a.x,z:a.z};
  const before=structuredClone(a);stepSimulation(level,level.dog,{},0,{drone:1});assert.deepEqual(a,before);
  step(level,.1,{drone:1});
  assert.equal(level.helpers[0].mode,'assist');assert.equal(a.lastPlayerPressure,undefined);
  assert.equal(a.wander,undefined);assert.equal(a.wanderHome,undefined);
});

test('a delivery shrinks the active excursion cap in the same tick',()=>{
  const level=meadow(),ids=prepareWanderCohort(level);
  for(const a of level.animals)if(ids.has(a.id))a.wander={x:a.x+50,z:a.z,until:100,bolting:true};
  const arrival=level.animals.find(a=>!ids.has(a.id));
  Object.assign(arrival,{x:level.target.x,z:level.target.z});
  Object.assign(level.dog,{x:level.target.x,z:level.target.z});
  step(level,.1);assert.equal(arrival.saved,true);
  assert.equal(level.animals.filter(a=>!a.saved&&a.wander).length,5);
  assert.ok(level.animals.some(a=>a.wanderHome),'removed eligibility ends the excursion locally');
});

test('naturally triggered excursions on generated levels keep stable local homes without returning to the herd',()=>{
  let settled=0,bolters=0;
  for(const [index,seed] of [[7,1],[16,6],[40,12],[70,42]]){
    const level=createLevel(index,seed),homes=new Map(),boltIds=new Set();
    Object.assign(level.dog,{x:level.bounds.minX+2,z:level.bounds.minZ+2});
    for(let frame=0;frame<1200;frame++){
      stepSimulation(level,level.dog,{},.1);
      for(const a of level.animals){
        if(a.wander?.bolting)boltIds.add(a.id);
        if(!a.wanderHome)continue;
        if(!homes.has(a.id)){homes.set(a.id,{...a.wanderHome});settled++;if(boltIds.has(a.id))bolters++;}
        assert.deepEqual(a.wanderHome,homes.get(a.id),'unattended local home never migrates toward the flock');
        assert.ok(Math.hypot(a.x-a.wanderHome.x,a.z-a.wanderHome.z)<=3.000001);
        assert.ok(canOccupy(level,a.x,a.z,a.type==='cow'?.78:.55));
        assert.equal(a.wander,undefined,'settled animals do not start new escape excursions');
      }
    }
    assert.equal(level.animals.some(a=>a.saved),false,'unattended excursions do not deliver themselves');
    assert.ok(homes.size>0,`public level ${index+1} naturally produces settled wanderers`);
  }
  assert.ok(settled>4);assert.ok(bolters>0,'real generated cases include bolt-to-local-settle transitions');
});
