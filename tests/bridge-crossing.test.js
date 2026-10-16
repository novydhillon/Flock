import test from 'node:test';
import assert from 'node:assert/strict';
import {stepSimulation,canOccupy} from '../src/simulation.js';

function crossingLevel({type='sheep',sign=1,heading=Math.PI/2,count=1}={}){
 const f={x:Math.sin(heading),z:Math.cos(heading)},side={x:f.z,z:-f.x};
 const bridge={x:0,z:0,width:7,length:7,heading};
 const point=(u,v)=>({x:f.x*u+side.x*v,z:f.z*u+side.z*v});
 const animals=Array.from({length:count},(_,id)=>({id,type,...point(sign*(-2.7+id*.8),id*.9),vx:f.x*sign,vz:f.z*sign,saved:false,nextWanderCheck:1e9}));
 const level={index:27,time:0,seed:42,reward:300,animals,bounds:{minX:-100,maxX:100,minZ:-100,maxZ:100},dog:{x:-75,z:-75},
  target:{x:80,z:80,radius:5,type:'field',heading},rivers:[{points:[point(0,-100),point(0,100)],width:5,bridges:[bridge]}],
  fenceSegments:[],gates:[],obstacles:[],routes:[]};
 return {level,f,sign};
}

test('walking onto a bridge commits sheep and cows to the far bank in either direction and rotation',()=>{
 for(const type of ['sheep','cow'])for(const sign of [-1,1])for(const heading of [0,.65,Math.PI/2]){
  const {level,f}=crossingLevel({type,sign,heading});const a=level.animals[0];let started=false;
  for(let i=0;i<240;i++){
   const before=(a.x*f.x+a.z*f.z)*sign;
   stepSimulation(level,level.dog,{},.05);
   if(a.bridgeCrossing){started=true;assert.ok((a.x*f.x+a.z*f.z)*sign>=before-.01,'no retreat along the deck');}
   assert.ok(canOccupy(level,a.x,a.z,type==='cow'?.78:.55));
  }
  assert.equal(started,true);assert.ok((a.x*f.x+a.z*f.z)*sign>4.7,'whole body reaches dry far-bank ground');
  assert.equal(a.bridgeCrossing,undefined);assert.equal(a.saved,false);
 }
});

test('a holding drone does not drag animals back onto the bridge after they finish crossing',()=>{
 const {level,f}=crossingLevel({count:2});
 for(let i=0;i<600;i++)stepSimulation(level,level.dog,{},.05,{drone:3});
 assert.ok(level.animals.every(a=>a.x*f.x+a.z*f.z>4.7));
 assert.ok(level.animals.every(a=>!a.saved));assert.notEqual(level.completed,true);
});

test('pausing freezes a crossing and direct pressure from the far side does not reverse it mid-deck',()=>{
 const {level,f}=crossingLevel();const a=level.animals[0];
 stepSimulation(level,level.dog,{},.05);assert.ok(a.bridgeCrossing);
 const paused=structuredClone(level);stepSimulation(level,level.dog,{},0);assert.deepEqual(level,paused);
 level.dog={x:f.x*3,z:f.z*3};
 for(let i=0;i<70;i++)stepSimulation(level,level.dog,{},.05);
 assert.ok(a.x*f.x+a.z*f.z>4.7,'committed animal keeps crossing rather than fleeing back along the deck');
 assert.equal(crossingLevel().level.animals[0].bridgeCrossing,undefined,'fresh levels start without stale intent');
});

test('a stationary animal or a walker beside the river is not automatically launched across',()=>{
 const {level}=crossingLevel();Object.assign(level.animals[0],{vx:0,vz:0});
 stepSimulation(level,level.dog,{},.05);assert.equal(level.animals[0].bridgeCrossing,undefined);
 const bank=crossingLevel().level;Object.assign(bank.animals[0],{x:-6,z:8,vx:1,vz:0});
 stepSimulation(bank,bank.dog,{},.05);assert.equal(bank.animals[0].bridgeCrossing,undefined);
});
