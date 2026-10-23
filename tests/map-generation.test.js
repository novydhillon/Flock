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
  for(const index of [19,23,39,69,99])for(const seed of [200,201,202,203,991,3041712678,1788458060]){
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
  assert.ok(late.routes.every(route=>route.length>distance(late.spawn,late.target)*1.2),'later journey includes a substantial compulsory detour');
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
  assert.ok(shapes.has(6)&&shapes.has(8)&&shapes.has(10),'L, U/Z and stepped outlines occur');
  const level={bounds:{minX:-10,maxX:10,minZ:-10,maxZ:10},boundary:[{x:-10,z:-10},{x:10,z:-10},{x:10,z:0},{x:0,z:0},{x:0,z:10},{x:-10,z:10}],rivers:[],obstacles:[]};
  level.fenceSegments=level.boundary.map((a,i)=>({a,b:level.boundary[(i+1)%level.boundary.length],kind:'boundary'}));
  assert.equal(canOccupy(level,6,6,.55),false,'outside polygon but inside AABB is excluded');
  assert.equal(hasClearGroundPath(level,{x:6,z:-3},{x:-3,z:6},.55),false,'diagonal cannot shortcut across concave cutout');
  const body={x:6,z:-3};moveBody(level,body,0,9,.55);
  assert.ok(body.z<0,'movement stops at inner boundary');
});

test('L offshoots on both sides and U/Z/step layouts physically require corners to reach their goals',()=>{
  const kinds=new Set(),sides=new Set();
  for(let seed=0;seed<20;seed++){
    const level=createLevel(69,seed),bare={...level,rivers:[],obstacles:[],gates:[],fenceSegments:level.fenceSegments.filter(s=>s.kind==='boundary')};
    kinds.add(level.layoutKind);
    assert.equal(hasClearGroundPath(bare,level.spawn,level.target,.975),false,'removing water, trees and gates still cannot create a straight shortcut');
    level.gates.forEach(g=>g.open=true);
    assert.ok(level.routes.every(route=>walk(level,route,.975)),'largest cow walks around every required corner');
    if(level.layoutKind==='L'){
      const f={x:Math.sin(level.startHeading),z:Math.cos(level.startHeading)},dx=level.target.x-level.spawn.x,dz=level.target.z-level.spawn.z;
      sides.add(Math.sign(dx*f.z-dz*f.x));
    }
  }
  assert.deepEqual([...kinds].sort(),['L','U','Z','step']);assert.equal(sides.size,2);
});

test('level60+ has compact starter travel and safe, populated starter groves',()=>{
  for(const index of [59,69,99])for(const seed of [200,201,202,203]){
    const level=createLevel(index,seed),bridges=level.rivers[0].bridges;
    assert.ok(Math.min(...bridges.map(b=>distance(level.spawn,b)))<130,'first crossing stays near the starter herd as later arms grow');
    assert.ok(level.obstacles.length>=100&&level.obstacles.length<=260,'tree population is denser but bounded');
    assert.ok(level.groves.length>=6,'multiple real clusters survive clearance rejection');
    assert.ok(level.obstacles.filter(tree=>tree.grove!==undefined&&distance(tree,level.spawn)<130).length>=35,'groves populate the starter field');
    assert.ok(level.obstacles.every(tree=>distance(tree,level.spawn)>=14));
    level.gates.forEach(g=>g.open=true);assert.ok(level.routes.every(route=>walk(level,route,.975)));
  }
});

test('river variants include larger bends and preserve broad clear land before interior barriers',()=>{
  const styles=new Set();
  for(let seed=0;seed<12;seed++){
    const level=createLevel(69,seed),f={x:Math.sin(level.startHeading),z:Math.cos(level.startHeading)};styles.add(level.riverStyle);
    for(const river of level.rivers){
      const longitudinal=river.points.map(p=>p.x*f.x+p.z*f.z),span=Math.max(...longitudinal)-Math.min(...longitudinal);
      if(level.riverStyle==='meandering')assert.ok(span>10,'strong bends are materially wider than the gentle river');
    }
    for(const gate of level.gates){
      const nearest=Math.min(...level.rivers.flatMap(r=>r.points.map(p=>distance(p,gate)-r.width/2)));
      assert.ok(nearest>30,'gate approach has clear bank-to-barrier breathing room');
    }
  }
  assert.equal(styles.size,2);
});
