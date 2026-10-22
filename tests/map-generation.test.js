import test from 'node:test';
import assert from 'node:assert/strict';
import {createLevel,canOccupy,hasClearGroundPath,moveBody,distance} from '../src/world.js';
import {animalRadius} from '../src/animal-size.js';

const walk=(level,route,radius)=>{
  const body={...level.spawn};
  for(const p of route.points){
    if(!hasClearGroundPath(level,body,p,radius))return false;
    moveBody(level,body,p.x-body.x,p.z-body.z,radius);
    if(distance(body,p)>.001)return false;
  }
  return distance(body,level.target)<.001;
};

test('seeded gate layouts include gate-free meadows and complete closed-panel alternatives',()=>{
  let gated=0,free=0,alternatives=0;
  for(let seed=0;seed<80;seed++){
    const level=createLevel(23,seed);
    assert.deepEqual(level,createLevel(23,seed));
    if(level.gates.length){
      gated++;
      assert.ok(level.gates.every(g=>g.operable&&!g.open));
      if(level.routes.some(route=>walk(level,route,.975)))alternatives++;
    }else{
      free++;
      assert.ok(level.routes.every(route=>walk(level,route,.975)),'gate-free map has complete physical routes');
    }
  }
  assert.ok(gated>20&&free>10,'both seeded map types occur');
  assert.ok(alternatives>10,'a meaningful subset of gated maps has an ungated crossing');
  for(let index=0;index<19;index++)assert.ok(createLevel(index).gates.every(g=>!g.operable&&g.open));
});

test('largest cows and helpers physically traverse later routes across seeds and compass rotations',()=>{
  for(const index of [19,23,39,69,99])for(const seed of [200,201,202,203,991]){
    const level=createLevel(index,seed);
    for(const gate of level.gates)gate.open=true;
    for(const animal of level.animals)assert.ok(canOccupy(level,animal.x,animal.z,animalRadius(animal)),`spawn ${index}/${seed}/${animal.id}`);
    for(const radius of [.975,.62])for(const route of level.routes)
      assert.ok(walk(level,route,radius),`route ${index}/${seed}/${route.id}/${radius}`);
  }
});

test('later meadow growth creates larger usable fields and stronger changes in travel direction',()=>{
  const area=level=>(level.bounds.maxX-level.bounds.minX)*(level.bounds.maxZ-level.bounds.minZ);
  const early=createLevel(19,200),late=createLevel(99,200);
  assert.ok(area(late)>area(early)*2);
  const lateralSpan=level=>{
    const f={x:Math.sin(level.target.heading),z:Math.cos(level.target.heading)};
    const values=level.routes.flatMap(r=>r.points.map(p=>p.x*f.z-p.z*f.x));
    return Math.max(...values)-Math.min(...values);
  };
  assert.ok(lateralSpan(late)>lateralSpan(early)+20);
  for(const route of late.routes){
    const f={x:Math.sin(late.target.heading),z:Math.cos(late.target.heading)};
    let outward=false,returning=false;
    for(let i=1;i<route.points.length;i++){
      const a=route.points[i-1],b=route.points[i],u=(b.x-a.x)*f.x+(b.z-a.z)*f.z,v=(b.x-a.x)*f.z-(b.z-a.z)*f.x;
      if(Math.abs(v)>Math.abs(u)){if(v>0)outward=true;else returning=true;}
    }
    assert.ok(outward&&returning,'route includes substantial lateral travel in both directions');
  }
});

test('stone walls use a reproducible per-level 15 percent distribution rather than a four-level sequence',()=>{
  let stone=0;
  for(let seed=0;seed<1000;seed++){
    const level=createLevel(0,seed),chosen=level.fenceSegments.some(s=>s.kind==='boundary'&&s.material==='stone');
    if(chosen)stone++;
    if(seed<20)assert.equal(chosen,createLevel(0,seed).fenceSegments.some(s=>s.kind==='boundary'&&s.material==='stone'));
  }
  assert.ok(stone>=115&&stone<=185,`stone frequency ${stone}/1000`);
});

test('later angular boundaries exclude concave cutouts from occupancy and physical travel',()=>{
  const shapes=new Set();
  for(const seed of [200,201,202,203,991,992]){
    const level=createLevel(69,seed),polygon=level.boundary;
    shapes.add(polygon.length);
    assert.ok(polygon.length>4);
    const area=Math.abs(polygon.reduce((sum,p,i)=>{const q=polygon[(i+1)%polygon.length];return sum+p.x*q.z-q.x*p.z;},0))/2;
    const box=(level.bounds.maxX-level.bounds.minX)*(level.bounds.maxZ-level.bounds.minZ);
    assert.ok(area<box*.9,'cutout materially changes playable shape');
    for(const edge of level.fenceSegments.filter(s=>s.kind==='boundary')){
      const middle={x:(edge.a.x+edge.b.x)/2,z:(edge.a.z+edge.b.z)/2};
      assert.equal(canOccupy(level,middle.x,middle.z,.975),false);
    }
    for(const gate of level.gates)gate.open=true;
    assert.ok(level.routes.every(route=>walk(level,route,.975)),'concave maps preserve complete cow routes');
    assert.ok(level.obstacles.every(tree=>canOccupy({...level,obstacles:[]},tree.x,tree.z,tree.radius)),'trees avoid excluded land');
  }
  assert.deepEqual([...shapes].sort(),[6,8],'both L and stepped outlines occur');
  const level={bounds:{minX:-10,maxX:10,minZ:-10,maxZ:10},boundary:[{x:-10,z:-10},{x:10,z:-10},{x:10,z:0},{x:0,z:0},{x:0,z:10},{x:-10,z:10}],rivers:[],obstacles:[]};
  level.fenceSegments=level.boundary.map((a,i)=>({a,b:level.boundary[(i+1)%level.boundary.length],kind:'boundary'}));
  assert.equal(canOccupy(level,6,6,.55),false,'outside polygon but inside AABB is excluded');
  assert.equal(hasClearGroundPath(level,{x:6,z:-3},{x:-3,z:6},.55),false,'diagonal cannot shortcut across concave cutout');
  const body={x:6,z:-3};moveBody(level,body,0,9,.55);
  assert.ok(body.z<0,'movement stops at inner boundary');
});
