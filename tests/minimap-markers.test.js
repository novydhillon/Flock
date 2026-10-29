import test from 'node:test';
import assert from 'node:assert/strict';
import { minimapLivestockStates, minimapProjection, clipMinimap, drawLivestockMarker, drawGoalDirection, GOAL_POINTER_COLOR } from '../src/minimap-markers.js';
import { flockGroups } from '../src/buddy.js';

const animal=(id,x,z=0,saved=false)=>({id,x,z,saved,type:'sheep'});
const fixture=animals=>({animals,bounds:{minX:-100,maxX:100,minZ:-100,maxZ:100},rivers:[],obstacles:[],fenceSegments:[],gates:[],target:{x:80,z:80,radius:5,type:'pen',heading:0}});

test('states follow real connected flock groups with stable size ties and actual delivery',()=>{
  const a=animal(1,-20),b=animal(2,-15),c=animal(3,15),d=animal(4,20),saved=animal(5,-18,0,true);
  const level=fixture([d,c,saved,b,a]),before=JSON.stringify(level);
  assert.deepEqual(flockGroups(level,[a,b,c,d]).map(g=>g.length),[2,2]);
  let states=minimapLivestockStates(level);
  assert.equal(states.get(a),'undelivered');assert.equal(states.get(b),'undelivered');
  assert.equal(states.get(c),'separated');assert.equal(states.get(d),'separated');assert.equal(states.get(saved),'delivered');
  assert.equal(JSON.stringify(level),before,'presentation leaves all simulation data untouched');
  level.animals.reverse();states=minimapLivestockStates(level);assert.equal(states.get(a),'undelivered');
  a.saved=true;b.saved=true;states=minimapLivestockStates(level);
  assert.equal(states.get(a),'delivered');assert.equal(states.get(c),'undelivered');
  assert.equal(minimapLivestockStates(fixture([c])).get(c),'undelivered','a remaining solo animal is the primary flock');
  assert.equal(minimapLivestockStates(fixture([])).size,0);
});

test('barriers split nearby animals through the shared ground-path grouping',()=>{
  const a=animal(1,-2),b=animal(2,2),level=fixture([a,b]);
  assert.equal(flockGroups(level,level.animals).length,1);
  level.fenceSegments=[{a:{x:0,z:-20},b:{x:0,z:20},kind:'interior',material:'wood'}];
  assert.equal(flockGroups(level,level.animals).length,2);
  assert.equal(minimapLivestockStates(level).get(b),'separated');
});

test('circular map projection preserves metric scale while scrolling and retains Pip at corners',()=>{
  const bounds={minX:-200,maxX:200,minZ:-200,maxZ:200};
  for(const [width,height] of [[240,240],[240,160]]){
    const a=minimapProjection(bounds,{x:0,z:0},width,height,120),b=minimapProjection(bounds,{x:20,z:0},width,height,120);
    const origin=a.project({x:0,z:0}),east=a.project({x:10,z:0}),south=a.project({x:0,z:10});
    assert.ok(Math.abs((east.x-origin.x)-(south.y-origin.y))<1e-8,'equal world distances remain equal pixels on both axes');
    assert.deepEqual(b.project({x:20,z:0}),a.center);
    assert.ok(Math.abs(origin.x-b.project({x:0,z:0}).x-20*a.scale)<1e-8);
    for(const dog of [{x:195,z:195},{x:-195,z:-195}]){
      const view=minimapProjection(bounds,dog,width,height,120),p=view.project(dog);
      assert.ok(Math.hypot(p.x-view.center.x,p.y-view.center.y)+7<view.radius,'complete player ring stays inside circle');
    }
  }
  const small=minimapProjection({minX:-30,maxX:30,minZ:-10,maxZ:10},{x:0,z:0},240,240,120);
  assert.equal(small.project({x:0,z:0}).x,120);assert.equal(small.project({x:0,z:0}).y,120);
});

function recorder(){
  const calls=[],ctx={calls};
  for(const method of ['clearRect','save','beginPath','arc','clip','rect','moveTo','lineTo','closePath','fill','stroke'])ctx[method]=(...args)=>calls.push({method,args,color:ctx.fillStyle});
  return ctx;
}

test('circle clipping clears stale corners, clips a true circle, and draws no frame stroke',()=>{
  const ctx=recorder();clipMinimap(ctx,240,160);
  assert.deepEqual(ctx.calls.map(c=>c.method),['clearRect','save','beginPath','arc','clip']);
  assert.deepEqual(ctx.calls[3].args,[120,80,64,0,Math.PI*2]);
});

test('livestock states have different visible silhouettes independent of their color',()=>{
  const paths=[];
  for(const state of ['undelivered','delivered','separated']){
    const ctx=recorder();drawLivestockMarker(ctx,{x:20,y:30},animal(1,0),state);
    assert.ok(ctx.calls.some(c=>c.method==='fill'));assert.ok(ctx.calls.some(c=>c.method==='stroke'));
    paths.push(ctx.calls.filter(c=>['arc','rect','lineTo'].includes(c.method)).map(c=>c.method));
  }
  assert.deepEqual(paths,[['arc'],['rect'],['lineTo','lineTo','lineTo']]);
});

test('off-circle goal orbits wholly outside the circle and shares Pip pointer color',()=>{
  for(const [width,height] of [[240,240],[240,160]])for(let angle=0;angle<Math.PI*2;angle+=Math.PI/16){
    const view=minimapProjection({minX:-200,maxX:200,minZ:-200,maxZ:200},{x:0,z:0},width,height,120);
    const ctx=recorder();drawGoalDirection(ctx,{x:0,z:0},view);assert.equal(ctx.calls.length,0);
    drawGoalDirection(ctx,{x:200*Math.cos(angle),z:200*Math.sin(angle)},view);
    const vertices=ctx.calls.filter(c=>c.method==='moveTo'||c.method==='lineTo');assert.equal(vertices.length,3);
    for(const {args:[x,y]} of vertices){assert.ok(Math.hypot(x-view.center.x,y-view.center.y)>view.radius);assert.ok(x>=0&&x<=width&&y>=0&&y<=height,'gutter retains complete arrow at every bearing');}
    assert.equal(ctx.calls.find(c=>c.method==='fill').color,GOAL_POINTER_COLOR);
    const [x,y]=vertices[0].args,dx=x-view.center.x,dy=y-view.center.y;
    assert.ok(Math.abs(dx*Math.sin(angle)-dy*Math.cos(angle))<1e-8,'tip follows target bearing');
    assert.ok(dx*Math.cos(angle)+dy*Math.sin(angle)>0,'tip faces outward');
  }
});
