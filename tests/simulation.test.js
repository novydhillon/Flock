import test from 'node:test';
import assert from 'node:assert/strict';
import { createLevel, stepSimulation, canOccupy, defaultProfile, purchaseUpgrade, applyLevelReward, validateProfile, loadProfile, saveProfile } from '../src/simulation.js';
import { distance } from '../src/world.js';

test('idle waiting cannot finish the tutorial, but player herding can', () => {
  const idle=createLevel(0); for(let i=0;i<2400;i++)stepSimulation(idle,idle.dog,{},1/60);
  assert.equal(idle.animals.filter(a=>a.saved).length,0);
  const level=createLevel(0),start={...level.animals[0]};
  for(let i=0;i<3600&&!level.completed;i++){
    const active=level.animals.filter(a=>!a.saved);
    const center=active.reduce((p,a)=>({x:p.x+a.x/active.length,z:p.z+a.z/active.length}),{x:0,z:0});
    const dx=level.target.x-center.x,dz=level.target.z-center.z,length=Math.hypot(dx,dz)||1;
    const desired={x:center.x-dx/length*3.3,z:center.z-dz/length*3.3};
    const x=desired.x-level.dog.x,z=desired.z-level.dog.z,d=Math.max(1,Math.hypot(x,z));
    stepSimulation(level,level.dog,{x:x/d,z:z/d},1/60);
  }
  assert.equal(level.completed,true);assert.ok(distance(level.animals[0],start)>15);
});

test('curved banks block movement and rotated bridge decks permit it',()=>{
  for(const seed of [200,201,202,203]){
    const level=createLevel(23,seed); level.animals=[];
    const river=level.rivers[0],bridge=river.bridges[0],f={x:Math.sin(bridge.heading),z:Math.cos(bridge.heading)},s={x:f.z,z:-f.x};
    const dog={x:bridge.x-f.x*(bridge.length/2+1),z:bridge.z-f.z*(bridge.length/2+1)};
    for(let i=0;i<180;i++)stepSimulation(level,dog,{x:f.x,z:f.z},1/60);
    assert.ok((dog.x-bridge.x)*f.x+(dog.z-bridge.z)*f.z>river.width/2);
    const blocked={x:bridge.x-f.x*(bridge.length/2+1)+s.x*(bridge.width/2+3),z:bridge.z-f.z*(bridge.length/2+1)+s.z*(bridge.width/2+3)};
    for(let i=0;i<150;i++)stepSimulation(level,blocked,{x:f.x,z:f.z},1/60);
    assert.ok((blocked.x-bridge.x)*f.x+(blocked.z-bridge.z)*f.z<0);
    assert.ok(canOccupy(level,blocked.x,blocked.z,.62));
  }
});

test('visible destination walls stop bodies while their oriented entrance permits entry',()=>{
  for(const seed of [200,201,202,203]){
    const level=createLevel(23,seed),t=level.target,extent=t.radius+1.4,f={x:Math.sin(t.heading),z:Math.cos(t.heading)},side={x:f.z,z:-f.x};
    level.animals=[];
    const blocked={x:t.x-f.x*(extent+1)+side.x*4.5,z:t.z-f.z*(extent+1)+side.z*4.5};
    for(let i=0;i<120;i++)stepSimulation(level,blocked,{x:f.x,z:f.z},1/60);
    assert.ok((blocked.x-t.x)*f.x+(blocked.z-t.z)*f.z<-extent);
    const dog={x:t.x-f.x*(extent+1),z:t.z-f.z*(extent+1)};
    for(let i=0;i<240;i++)stepSimulation(level,dog,{x:f.x,z:f.z},1/60);
    const position=(dog.x-t.x)*f.x+(dog.z-t.z)*f.z;
    assert.ok(position>0&&position<extent,'Pip enters through gap and stops at rear wall');
  }
});

test('fenced level edges stop movement even during long frames',()=>{
  const level=createLevel(5);level.animals=[];
  const dog={x:level.bounds.minX+2,z:level.bounds.minZ+3};
  for(let i=0;i<30;i++)stepSimulation(level,dog,{x:-1},10);
  assert.ok(dog.x>level.bounds.minX+.6);assert.ok(canOccupy(level,dog.x,dog.z,.62));
});

test('rewards are single-award and locked purchases preserve points and saves',()=>{
  const level=createLevel(0),dog={...level.target};
  level.animals.forEach(a=>Object.assign(a,{x:level.target.x,z:level.target.z}));
  const first=stepSimulation(level,dog,{},1/60);
  assert.equal(first.justCompleted,true);assert.equal(first.reward,80);
  assert.equal(stepSimulation(level,dog,{},1/60).reward,0);
  const profile=defaultProfile();
  assert.equal(purchaseUpgrade(profile,'drone').reason,'locked');
  assert.equal(applyLevelReward(profile,level),80);assert.equal(applyLevelReward(profile,level),0);
  assert.equal(purchaseUpgrade(profile,'speed').ok,true);assert.equal(profile.points,0);
  let data;const storage={setItem:(_k,v)=>data=v,getItem:()=>data};
  assert.ok(saveProfile(profile,storage));assert.deepEqual(loadProfile(storage),profile);
  assert.equal(loadProfile({getItem:()=>'broken JSON'}).points,0);
});

test('the final campaign reward remains within the supported level range',()=>{
  const profile=defaultProfile(),level=createLevel(99);level.completed=true;
  applyLevelReward(profile,level);assert.equal(profile.highestLevel,99);
});

test('blocked storage getters preserve a playable in-memory profile',()=>{
  const previous=Object.getOwnPropertyDescriptor(globalThis,'localStorage');
  try{
    Object.defineProperty(globalThis,'localStorage',{configurable:true,get(){throw new Error('denied');}});
    assert.deepEqual(loadProfile(),defaultProfile());assert.equal(saveProfile(defaultProfile()),false);
  }finally{if(previous)Object.defineProperty(globalThis,'localStorage',previous);else delete globalThis.localStorage;}
  assert.deepEqual(validateProfile({points:-100,upgrades:{bogus:true},completedLevels:[-1,0,0]}).completedLevels,[0]);
});

test('larger flocks and longer destination journeys continue through the campaign',()=>{
  let previous=createLevel(0);
  for(let i=1;i<100;i++){
    const level=createLevel(i);
    assert.ok(level.animals.length>=previous.animals.length);
    assert.ok(distance(level.spawn,level.target)>distance(previous.spawn,previous.target));
    assert.ok(level.animals.length<=65);previous=level;
  }
});
