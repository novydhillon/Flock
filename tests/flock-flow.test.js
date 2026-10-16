import test from 'node:test';
import assert from 'node:assert/strict';
import {stepSimulation,canOccupy} from '../src/simulation.js';

const animal=(id,x,z,vx=0,vz=0)=>({id,x,z,vx,vz,type:'sheep',saved:false,nextWanderCheck:1e9});
function meadow(animals,changes={}){
 return {index:23,time:0,seed:42,reward:300,animals,bounds:{minX:-100,maxX:100,minZ:-100,maxZ:100},dog:{x:-70,z:-70},
  target:{x:80,z:80,radius:5,type:'field',heading:Math.PI/2},rivers:[],fenceSegments:[],gates:[],obstacles:[],routes:[],...changes};
}
function run(level,seconds,upgrades={}){for(let i=0;i<seconds*20;i++)stepSimulation(level,level.dog,{},.05,upgrades);}

test('leaders keep moving with the flock in all four directions instead of recoiling to its centre',()=>{
 for(const [x,z] of [[1,0],[-1,0],[0,1],[0,-1]]){
  const level=meadow([-4,0,4].map((offset,id)=>animal(id,x*offset,z*offset,x,z)));
  const front=level.animals[2],start={...front};
  for(let i=0;i<40;i++){
   stepSimulation(level,level.dog,{},.05);
   assert.ok(front.vx*x+front.vz*z>.1,'front never turns backward toward the group centre');
  }
  assert.ok((front.x-start.x)*x+(front.z-start.z)*z>1,'front continues the group journey');
 }
});

test('rear dog pressure reaches an initially stationary front through a connected flock',()=>{
 const level=meadow([animal(0,0,-1),animal(1,0,1),animal(2,5,0),animal(3,10,0)],{dog:{x:-3,z:0}});
 const front=level.animals[3];
 assert.ok(Math.hypot(front.x-level.dog.x,front.z-level.dog.z)>7.6,'front is outside direct Pip range');
 stepSimulation(level,level.dog,{},.1);
 assert.ok(front.vx>.05,'rear pressure is carried forward before the front starts recoiling');
 run(level,3);assert.ok(front.x>10.5);
});

test('pressure at the side steers the connected front with the group',()=>{
 const level=meadow([animal(0,0,0),animal(1,2,0),animal(2,4,0),animal(3,6,0)],{dog:{x:0,z:-3}});
 stepSimulation(level,level.dog,{},.1);
 assert.ok(level.animals.every(a=>a.vz>0),'side pressure carries the flock away from the dog');
});

test('weaker cohesion remains gentle while the cohesion upgrade still strengthens regrouping',()=>{
 const base=meadow([animal(0,0,0),animal(1,6,0)]),strong=structuredClone(base);
 stepSimulation(base,base.dog,{},.1);stepSimulation(strong,strong.dog,{},.1,{cohesion:3});
 assert.ok(base.animals[0].vx>.32&&base.animals[0].vx<.41,'stationary 6m pair has the reduced baseline attraction');
 assert.ok(strong.animals[0].vx>base.animals[0].vx*1.25,'purchased harmony still improves the lower baseline');
});

test('leading-flow protection allows direct dog reversal and obeys collision and pause',()=>{
 const level=meadow([-4,0,4].map((x,id)=>animal(id,x,0,1)),{dog:{x:5,z:0}});
 run(level,.5);assert.ok(level.animals[2].vx<0,'Pip in front can still turn the leader back');
 const blocked=meadow([-4,0,4].map((x,id)=>animal(id,x,0,2)),{fenceSegments:[{a:{x:5,z:-100},b:{x:5,z:100},kind:'interior'}]});
 run(blocked,4);assert.ok(blocked.animals.every(a=>a.x<4.45&&canOccupy(blocked,a.x,a.z,.55)));
 const paused=structuredClone(blocked);stepSimulation(blocked,blocked.dog,{},0);assert.deepEqual(blocked,paused);
});

test('rear pressure cannot propagate into another split flock or cause unattended scoring',()=>{
 const level=meadow([animal(0,0,0),animal(1,2,0),animal(2,12,0),animal(3,14,0)],{dog:{x:-3,z:0}});
 const other=meadow([animal(2,12,0),animal(3,14,0)],{dog:{x:-3,z:0}});
 stepSimulation(level,level.dog,{},.1);stepSimulation(other,other.dog,{},.1);
 assert.deepEqual(level.animals.slice(2),other.animals,'separate groups do not receive remote pressure');
 const moving=meadow([-4,0,4].map((x,id)=>animal(id,x,0,2)),{target:{x:10,z:0,radius:5,type:'field',heading:Math.PI/2}});
 run(moving,15);assert.ok(moving.animals.every(a=>!a.saved));assert.notEqual(moving.completed,true);
});
