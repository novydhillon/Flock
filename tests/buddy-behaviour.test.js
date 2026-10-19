import test from 'node:test';
import assert from 'node:assert/strict';
import { updateBuddy, BUDDY_WORK_GAP } from '../src/buddy.js';
import { canOccupy } from '../src/world.js';
const animal=(id,x,z,vx=0,vz=0)=>({id,x,z,vx,vz,type:'sheep'});
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const fixture=animals=>({time:0,animals,dog:{x:-50,z:-50},target:{x:80,z:80,radius:5,heading:0,type:'field'},helpers:[{type:'helper',x:-4,z:0}],bounds:{minX:-100,maxX:100,minZ:-100,maxZ:100},obstacles:[],rivers:[],gates:[],fenceSegments:[],routes:[]});
const tick=(l,tier=2)=>{l.time+=.05;return updateBuddy(l,l.animals,{helper:1,helperTier:tier,helperStrength:1},.05,[]);};

test('smaller flock uses its own opposite travel and stopped groups receive no borrowed pressure',()=>{
 const l=fixture([animal(0,0,0,2),animal(1,0,2,2),animal(2,2,1,2),animal(3,30,0,-2),animal(4,30,2,-2)]);
 tick(l);const h=l.helpers[0];assert.deepEqual(h.clusterIds,[3,4]);assert.ok(h.forward.x<-.99);assert.ok(h.desired.x>33);
 l.animals.slice(3).forEach(a=>a.vx=0);
 const result=tick(l);assert.equal(h.mode,'hold');assert.equal(result.forces.size,0);
});

test('Pip working gap keeps one yielding side through small repeated crossings',()=>{
 const l=fixture([animal(0,0,-1,0,2),animal(1,0,1,0,2)]);l.helpers[0]={type:'helper',x:0,z:-5};l.dog={x:0,z:-4.2};
 const pip=structuredClone(l.dog);let side;
 for(let i=0;i<40;i++){
  l.dog.x=Math.sin(i)*.1;tick(l,1);const h=l.helpers[0];
  assert.ok(distance(h.desired,l.dog)>=BUDDY_WORK_GAP-.01);
  side ??=Math.sign(h.desired.x);assert.equal(Math.sign(h.desired.x),side);
  assert.ok(canOccupy(l,h.x,h.z,.6));
 }
 assert.equal(l.dog.z,pip.z,'helper never changes player position');
});

test('standby returns near Pip, settles without circling, clears work and resumes promptly',()=>{
 const l=fixture([]);l.dog={x:0,z:0};l.helpers[0]={type:'helper',x:20,z:0};
 for(let i=0;i<300;i++)tick(l,1);
 const h=l.helpers[0];assert.equal(h.mode,'standby');assert.ok(distance(h,l.dog)>=2.9&&distance(h,l.dog)<6);
 const settled={x:h.x,z:h.z};for(let i=0;i<100;i++)tick(l,1);
 assert.ok(distance(h,settled)<.001);assert.equal(h.moveSpeed,0);assert.equal(h.targetId,null);assert.equal(h.forward,undefined);
 l.animals=[animal(0,10,0,2),animal(1,10,2,2)];tick(l,1);
 assert.equal(h.mode,'herd');assert.equal(l.buddyHerd.standby,undefined);
 const paused=structuredClone(l);updateBuddy(l,l.animals,{helper:1,helperTier:1},0,[]);assert.deepEqual(l,paused);
});

test('standby selects reachable ground on Pip side of wall',()=>{
 const l=fixture([]);l.dog={x:0,z:0};l.helpers[0]={type:'helper',x:-10,z:0};l.fenceSegments=[{a:{x:2,z:-100},b:{x:2,z:100},kind:'interior'}];
 for(let i=0;i<300;i++){tick(l,1);assert.ok(canOccupy(l,l.helpers[0].x,l.helpers[0].z,.6));}
 assert.ok(l.helpers[0].x<1.4);assert.ok(distance(l.helpers[0],l.dog)<7);
});

test('Pip gap applies to the actual orbit waypoint as Buddy circles to the rear',()=>{
 const l=fixture([animal(0,0,-1,0,2),animal(1,0,1,0,2)]);
 l.helpers[0]={type:'helper',x:0,z:0};l.dog={x:-5,z:-4.5};
 const pip=structuredClone(l.dog);tick(l,1);
 assert.ok(distance(l.helpers[0].desired,l.dog)>=BUDDY_WORK_GAP);
 assert.deepEqual(l.dog,pip);
});

test('constrained bridge keeps its passage task when the comfortable lateral gap is unavailable',()=>{
 const l=fixture([animal(0,-3,0,2),animal(1,-4,0,2)]);
 l.rivers=[{points:[{x:0,z:-100},{x:0,z:100}],width:3,bridges:[{x:0,z:0,width:2,length:8,heading:Math.PI/2}]}];
 l.helpers[0]={type:'helper',x:-6,z:0};l.dog={x:-6,z:0};const pip=structuredClone(l.dog);
 for(let i=0;i<40;i++){tick(l,2);assert.equal(l.helpers[0].mode,'bridge');assert.ok(canOccupy(l,l.helpers[0].x,l.helpers[0].z,.6));}
 assert.deepEqual(l.dog,pip);assert.ok(distance(l.helpers[0],{x:-6,z:0})>.2,'does not wait permanently for lateral room');
});

test('standby cannot cross an impassable wall to reach Pip',()=>{
 const l=fixture([]);l.dog={x:8,z:0};l.helpers[0]={type:'helper',x:-8,z:0};
 l.fenceSegments=[{a:{x:0,z:-100},b:{x:0,z:100},kind:'interior'}];
 for(let i=0;i<300;i++){tick(l,1);assert.ok(l.helpers[0].x<-.59);assert.ok(canOccupy(l,l.helpers[0].x,l.helpers[0].z,.6));}
 assert.equal(l.helpers[0].mode,'standby');
});

test('narrow gate yield falls back after a bounded wait instead of a permanent deadlock',()=>{
 const l=fixture([animal(0,0,0,0,2),animal(1,0,2,0,2)]);
 l.helpers[0]={type:'helper',x:0,z:-6};l.dog={x:0,z:-3.2};
 l.gates=[{x:0,z:-3.2,width:2,heading:0,open:true}];
 l.fenceSegments=[{a:{x:-100,z:-3.2},b:{x:-1,z:-3.2},kind:'interior'},{a:{x:1,z:-3.2},b:{x:100,z:-3.2},kind:'interior'}];
 for(let i=0;i<100;i++){tick(l,1);assert.ok(canOccupy(l,l.helpers[0].x,l.helpers[0].z,.6));}
 assert.ok(l.helpers[0].z>-4,'retains its work through a physically valid narrow opening');
});

test('standby follows a body-clear tree detour to return near Pip',()=>{
 const l=fixture([]);l.dog={x:0,z:0};l.helpers[0]={type:'helper',x:20,z:0};l.obstacles=[{x:10,z:0,radius:7}];
 let around=false;
 for(let i=0;i<600;i++){
  tick(l,1);const h=l.helpers[0];assert.ok(canOccupy(l,h.x,h.z,.6));around ||=Math.abs(h.z)>7;
 }
 const h=l.helpers[0];assert.ok(around,'takes a real detour around the large trunk');
 assert.ok(distance(h,l.dog)<7,'returns to reachable resting ground near Pip');
 const resting={x:h.x,z:h.z};for(let i=0;i<100;i++)tick(l,1);
 assert.ok(distance(h,resting)<.001);assert.equal(h.moveSpeed,0);
});

test('standby returns to Pip over a real bridge with several navigation waypoints',()=>{
 const l=fixture([]);l.dog={x:12,z:15};l.helpers[0]={type:'helper',x:-12,z:15};
 l.rivers=[{points:[{x:0,z:-100},{x:0,z:100}],width:6,bridges:[{x:0,z:0,width:3,length:10,heading:Math.PI/2}]}];
 let crossed=false;
 for(let i=0;i<800;i++){
  tick(l,1);const h=l.helpers[0];assert.ok(canOccupy(l,h.x,h.z,.6));
  crossed ||=h.x>5;
 }
 const h=l.helpers[0];assert.ok(crossed,'crosses to Pip bank through the bridge');assert.ok(distance(h,l.dog)<7);
 const resting={x:h.x,z:h.z};for(let i=0;i<100;i++)tick(l,1);
 assert.ok(distance(h,resting)<.001);assert.equal(h.moveSpeed,0);
});
