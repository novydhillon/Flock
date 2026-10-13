import test from 'node:test';
import assert from 'node:assert/strict';
import {createLevel,canOccupy,moveBody,hasClearGroundPath,hasClearPlayerSignal,separatedByBank,terrainHeight,routeProgress,nextNavigationPoint,navigationTarget,distance} from '../src/world.js';

test('ground helper navigation walks around dry bridge ends instead of pushing through rails',()=>{
  for(const seed of [200,201,202,203])for(const side of [-1,1])for(const end of [-1,1]){
    const level=createLevel(23,seed),b=level.rivers[0].bridges[0],f={x:Math.sin(b.heading),z:Math.cos(b.heading)};
    const point=(u,v)=>({x:b.x+f.x*u+f.z*v,z:b.z+f.z*u-f.x*v});
    const u=end*(b.length/2-.5),body=point(u,side*(b.width/2+1.5)),goal=point(u,side*(b.width/2-1.5));
    assert.ok(canOccupy(level,body.x,body.z,.6));assert.ok(canOccupy(level,goal.x,goal.z,.6));
    assert.equal(hasClearGroundPath(level,body,goal,.6),false);
    assert.equal(separatedByBank(level,body,goal),true,'cohesion cannot pull animals through a solid rail');
    assert.equal(hasClearPlayerSignal(level,body,goal),true,'Pip can call over a low rail on dry ground');
    for(let i=0;i<600&&distance(body,goal)>.12;i++){
      const waypoint=navigationTarget(level,body,goal),dx=waypoint.x-body.x,dz=waypoint.z-body.z,d=Math.hypot(dx,dz)||1,travel=Math.min(.12,d);
      moveBody(level,body,dx/d*travel,dz/d*travel,.6);
      assert.ok(canOccupy(level,body.x,body.z,.6));
    }
    assert.ok(distance(body,goal)<.2,`helper reaches deck: seed ${seed}, side ${side}, end ${end}`);
  }
});

test('Pip can call over a low pen fence while a barn wall and all body paths stay solid',()=>{
  const a={x:-2,z:0},b={x:2,z:0};
  for(const type of ['pen','barn']){
    const level={bounds:{minX:-20,maxX:20,minZ:-20,maxZ:20},target:{type},rivers:[],obstacles:[],fenceSegments:[{a:{x:0,z:-10},b:{x:0,z:10},kind:'target'}]};
    assert.equal(hasClearGroundPath(level,a,b,.62),false);
    assert.equal(hasClearPlayerSignal(level,a,b),type==='pen');
    assert.equal(canOccupy(level,0,0,.55),false);
  }
});

test('seeded worlds are repeatable and rotate destinations across compass directions',()=>{
  assert.deepEqual(createLevel(23,991),createLevel(23,991));
  assert.notDeepEqual(createLevel(23,991),createLevel(23,992));
  const directions=new Set([200,201,202,203].map(seed=>Math.round(createLevel(23,seed).target.heading/(Math.PI/2))));
  assert.equal(directions.size,4);
});
test('tutorial footprints stay intimate and later meadows expand in the vertical axis',()=>{
  for(let i=0;i<5;i++){const l=createLevel(i);assert.equal(l.bounds.maxZ-l.bounds.minZ,48);assert.equal(l.routes.length,1);}
  for(let i=5;i<100;i++){const l=createLevel(i);assert.ok(l.bounds.maxZ-l.bounds.minZ>=168);assert.ok(l.routes.length>=1&&l.routes.length<=(i<15?2:3));}
  assert.ok(createLevel(99).bounds.maxZ-createLevel(99).bounds.minZ>createLevel(5).bounds.maxZ-createLevel(5).bounds.minZ);
  assert.equal(createLevel(5).routes.length,2);assert.equal(createLevel(15).routes.length,3);
});
test('the first tutorial bridge fits the starter flock spread while retaining solid rails and water',()=>{
  const l=createLevel(1),bridge=l.rivers[0].bridges[0],f={x:Math.sin(bridge.heading),z:Math.cos(bridge.heading)};
  const point=(u,v)=>({x:bridge.x+f.x*u+f.z*v,z:bridge.z+f.z*u-f.x*v});
  for(const animal of l.animals){
    const lateral=(animal.x-l.spawn.x)*f.z-(animal.z-l.spawn.z)*f.x;
    const near=point(-bridge.length/2-1,lateral),far=point(bridge.length/2+1,lateral);
    assert.ok(hasClearGroundPath(l,near,far,.55),`starter sheep ${animal.id} fits the first deck`);
  }
  for(const side of [-1,1]){
    const rail=point(0,side*bridge.width/2),water=point(0,side*(bridge.width/2+1));
    assert.equal(canOccupy(l,rail.x,rail.z,.55),false,'the wider deck still has solid rails');
    assert.equal(canOccupy(l,water.x,water.z,.55),false,'the river still blocks travel outside the deck');
  }
  for(const index of [2,3,4,5,15]){
    assert.ok(createLevel(index).rivers[0].bridges[0].width<bridge.width,'later crossings stay narrower');
  }
});
test('every route in all 100 levels is traversable by cows and actual ground bodies',()=>{
  for(let index=0;index<100;index++){
    const l=createLevel(index);
    assert.ok(canOccupy(l,l.dog.x,l.dog.z,.62),`dog spawn ${index}`);
    assert.ok(l.animals.every(a=>canOccupy(l,a.x,a.z,a.type==='cow'?.78:.55)),`flock spawns ${index}`);
    for(const route of l.routes){
      const body={...l.spawn};
      for(const p of route.points){
        assert.ok(hasClearGroundPath(l,body,p,.8),`cow corridor level ${index} ${route.id} ${JSON.stringify(p)}`);
        moveBody(l,body,p.x-body.x,p.z-body.z,.8);
        assert.ok(distance(body,p)<.001,`body actually reaches route sample ${index}`);
      }
      assert.ok(distance(body,l.target)<.001);
    }
  }
});
test('destination rims have generous clear land beyond the last bridges and gates',()=>{
  for(let i=1;i<100;i++){
    const l=createLevel(i);
    for(const bridge of l.rivers.flatMap(r=>r.bridges))assert.ok(distance(l.target,bridge)-l.target.radius-bridge.length/2>=14,`bridge landing ${i}`);
    for(const gate of l.gates)assert.ok(distance(l.target,gate)-l.target.radius>=14,`gate landing ${i}`);
  }
});
test('river meshes extend beyond the fenced map instead of ending in rectangular stubs',()=>{
  for(let i=1;i<100;i++){
    const l=createLevel(i),b=l.bounds;
    const outside=p=>p.x<b.minX-10||p.x>b.maxX+10||p.z<b.minZ-10||p.z>b.maxZ+10;
    for(const river of l.rivers){assert.ok(outside(river.points[0]));assert.ok(outside(river.points.at(-1)));}
  }
});
test('all visible fence segments block bodies and destination entrances fit cows',()=>{
  for(const index of [0,2,5,15,32]){
    const l=createLevel(index),t=l.target,f={x:Math.sin(t.heading),z:Math.cos(t.heading)},extent=t.radius+1.4;
    assert.ok(canOccupy(l,t.x-f.x*extent,t.z-f.z*extent,.8));
    for(const wall of l.fenceSegments){const p={x:(wall.a.x+wall.b.x)/2,z:(wall.a.z+wall.b.z)/2};assert.equal(canOccupy(l,p.x,p.z,.55),false);}
    const boundary=l.fenceSegments.find(s=>s.kind==='boundary');
    assert.ok(boundary);
  }
});
test('bridge decks and terrain height share the same rotated physical footprint',()=>{
  for(const seed of [200,201,202,203]){
    const l=createLevel(23,seed),bridge=l.rivers[0].bridges[0],f={x:Math.sin(bridge.heading),z:Math.cos(bridge.heading)},side={x:f.z,z:-f.x};
    assert.ok(canOccupy(l,bridge.x,bridge.z,.8));assert.ok(Math.abs(terrainHeight(l,bridge.x,bridge.z)-.3)<1e-8);
    const bank={x:bridge.x+side.x*(bridge.width/2+2),z:bridge.z+side.z*(bridge.width/2+2)};
    assert.equal(canOccupy(l,bank.x,bank.z,.6),false);
    const body={x:bridge.x-f.x*(bridge.length/2+1),z:bridge.z-f.z*(bridge.length/2+1)};
    moveBody(l,body,f.x*(bridge.length+2),f.z*(bridge.length+2),.8);
    assert.ok(distance(body,{x:bridge.x+f.x*(bridge.length/2+1),z:bridge.z+f.z*(bridge.length/2+1)})<.001);
  }
});
test('scenery hills stay outside the entire playable area and grass remains flat',()=>{
  for(let i=0;i<100;i++){
    const l=createLevel(i),b=l.bounds;
    for(const hill of l.sceneryHills)assert.ok(hill.x+hill.radius<b.minX||hill.x-hill.radius>b.maxX||hill.z+hill.radius<b.minZ||hill.z-hill.radius>b.maxZ);
    assert.equal(terrainHeight(l,l.spawn.x,l.spawn.z),0);
  }
});
test('later organic trails visibly reverse their lateral travel and navigation follows the route',()=>{
  for(const index of [5,9,15,22,60]){
    const l=createLevel(index);
    for(const route of l.routes){
      const heading=l.target.heading,f={x:Math.sin(heading),z:Math.cos(heading)},v=route.points.map(p=>p.x*f.z-p.z*f.x);
      assert.ok(Math.max(...v)-Math.min(...v)>20,`turning meadow ${index}`);
      assert.ok(v.some((n,i)=>i>0&&n>v[i-1]+.02)&&v.some((n,i)=>i>0&&n<v[i-1]-.02));
      const halfway=route.points[Math.floor(route.points.length/2)],info=routeProgress(l,halfway,route.id),next=nextNavigationPoint(l,halfway,route.id);
      assert.ok(info.progress>0&&info.progress<info.length);assert.ok(distance(next,halfway)>1);
    }
  }
});

test('curved-bank custom seeds keep the whole spawn grid safe, compact, and ahead of Pip',()=>{
  const seeds=[5,30,31,38,41,48,73,80,82,88,102,113,119,125,162,195];
  for(const index of [0,1,2,3,4,5,15,40,99])for(const seed of seeds){
    const l=createLevel(index,seed),f={x:Math.sin(l.target.heading),z:Math.cos(l.target.heading)};
    assert.ok(canOccupy(l,l.dog.x,l.dog.z,.62),`dog ${index}/${seed}`);
    for(const animal of l.animals){
      const r=animal.type==='cow'?.78:.55;
      assert.ok(canOccupy(l,animal.x,animal.z,r),`safe spawn ${index}/${seed}/${animal.id}`);
      assert.ok((animal.x-l.dog.x)*f.x+(animal.z-l.dog.z)*f.z>2,`dog stays behind ${index}/${seed}`);
      for(const other of l.animals)if(other.id>animal.id){
        const otherRadius=other.type==='cow'?.78:.55;
        assert.ok(distance(animal,other)>r+otherRadius,`separated spawn ${index}/${seed}`);
      }
    }
    assert.ok(Math.max(...l.animals.map(a=>distance(a,l.spawn)))<18,`compact herd ${index}/${seed}`);
  }
});
test('rotated bridge side rails block dry-end shortcuts but permit walking around open ends',()=>{
  for(const heading of [0,Math.PI/2,Math.PI,Math.PI*1.5]){
    const f={x:Math.sin(heading),z:Math.cos(heading)},side={x:f.z,z:-f.x};
    const p=(u,v)=>({x:f.x*u+side.x*v,z:f.z*u+side.z*v});
    const bridge={x:0,z:0,heading,width:8.5,length:8.1};
    const l={bounds:{minX:-30,maxX:30,minZ:-30,maxZ:30},obstacles:[],fenceSegments:[],rivers:[{width:3.1,points:Array.from({length:41},(_,i)=>p(0,-40+i*2)),bridges:[bridge]}]};
    const start=p(3.55,3.25),outside=p(3.55,5.25),rail=p(3.55,4.25);
    assert.ok(canOccupy(l,start.x,start.z,.62));assert.ok(canOccupy(l,outside.x,outside.z,.62));
    assert.equal(canOccupy(l,rail.x,rail.z,.62),false,'dry-deck rail is solid');
    assert.equal(hasClearGroundPath(l,start,outside,.62),false,'ray cannot cut across dry-deck rail');
    const body={...start};moveBody(l,body,outside.x-body.x,outside.z-body.z,.62);
    assert.ok(distance(body,outside)>1,'actual movement is blocked by the rail');
    const around=[p(6.05,3.25),p(6.05,5.25),outside];
    const walker={...start};
    for(const waypoint of around){assert.ok(hasClearGroundPath(l,walker,waypoint,.62));moveBody(l,walker,waypoint.x-walker.x,waypoint.z-walker.z,.62);assert.ok(distance(walker,waypoint)<.001);}
    // Posts protrude farther than the narrow rail beam and remain solid.
    const postSide=p(-4.05,4.31);assert.equal(canOccupy(l,postSide.x,postSide.z,.01),false);
  }
});
