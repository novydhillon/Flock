import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { MeadowNature, weatherForLevel, safeWildlifePosition, stepWildlife } from '../src/nature.js';
import { wildlifePopulation, wildlifeGroundPositionSafe } from '../src/wildlife.js';
import { wildlifeBodyGeometry } from '../src/wildlife-models.js';

function meadow(index = 0) {
  return { index, seed: 42 + index, bounds: { minX: -40, maxX: 60, minZ: -60, maxZ: 60 },
    dog: { x: -20, z: 0 }, spawn: { x: -20, z: 0 }, animals: [{ x: -15, z: 0 }],
    roads: [{ points: [{ x: -25, z: 0 }, { x: 40, z: 0 }], width: 4 }], rivers: [], obstacles: [], fenceSegments: [] };
}

test('weather is bounded, deterministic, and snow is unavailable during first eight levels', () => {
  const types = new Set();
  for (let index = 0; index < 100; index++) {
    const config = weatherForLevel(meadow(index)); types.add(config.type);
    assert.deepEqual(config, weatherForLevel(meadow(index)));
    assert.ok(config.particles <= 128); assert.ok(config.birds + config.squirrels + config.butterflies <= 16);
    if (index < 8) assert.notEqual(config.type, 'snow');
  }
  assert.equal(types.size, 4);
  assert.equal(weatherForLevel({ index: 7, weather: 'snow' }).type, 'sun');
  assert.equal(weatherForLevel({ index: 8, weather: { type: 'snow' } }).type, 'snow');
});

test('wildlife spawns off routes on traversable ground and clear of the flock', () => {
  const level = meadow(), threats = [level.dog, ...level.animals];
  assert.equal(safeWildlifePosition(level, { x: 0, z: 0 }, threats), false);
  assert.equal(safeWildlifePosition(level, { x: -20, z: 7 }, threats), false);
  assert.equal(safeWildlifePosition(level, { x: 0, z: 20 }, threats), true);
  const nature = new MeadowNature(new THREE.Scene()); nature.setLevel(level);
  assert.ok(nature.wildlife.every(a => a.visible && safeWildlifePosition(level, a, threats)));
  nature.dispose();
});

test('wildlife flees actual nearby animals and ground critters obey occupancy', () => {
  const level = meadow(), bird = { kind: 'bird', x: 0, z: 10, homeX: 0, homeZ: 10, phase: 0 };
  stepWildlife(level, bird, .1, [{ x: 0, z: 9 }]);
  assert.ok(bird.z > 10); assert.equal(bird.fleeing, true);
  const squirrel = { kind: 'squirrel', x: 0, z: 10, homeX: 0, homeZ: 10, phase: 0 };
  const before = { ...squirrel }; let calls = 0;
  stepWildlife(level, squirrel, .1, [{ x: 0, z: 9 }], 0, () => { calls++; return false; });
  assert.equal(squirrel.x, before.x); assert.equal(squirrel.z, before.z); assert.ok(calls >= 1);
});

test('wildlife continues to avoid delivered robots inside their destination', () => {
  const nature = new MeadowNature(new THREE.Scene()), level = meadow(); nature.setLevel(level);
  const bird = nature.wildlife.find(a => a.kind === 'bird');
  Object.assign(bird, { x: 0, z: 20, homeX: 0, homeZ: 20, visible: true });
  nature.update(.1, { dog: level.dog, animals: [{ x: 0, z: 19, saved: true }] });
  assert.equal(bird.fleeing, true);
  assert.ok(bird.z > 20);
  nature.dispose();
});

test('wildlife also avoids nearby robotic companions', () => {
  const nature = new MeadowNature(new THREE.Scene()), level = meadow(); nature.setLevel(level);
  const bird = nature.wildlife.find(a => a.kind === 'bird');
  for (const type of ['helper', 'drone']) {
    Object.assign(bird, { x: 0, z: 20, homeX: 0, homeZ: 20, visible: true });
    level.helpers = [{ type, x: 0, z: 19 }];
    nature.update(.1, { dog: level.dog, animals: [] });
    assert.equal(bird.fleeing, true);
    assert.ok(bird.z > 20);
  }
  nature.dispose();
});

test('weather advances once with nature time and pause freezes fauna and weather', () => {
  const nature = new MeadowNature(new THREE.Scene()), level = meadow(10); nature.setLevel(level);
  const before = nature.weather.elapsed;
  nature.update(.1, { dog: level.dog, animals: level.animals });
  assert.equal(nature.weather.elapsed, before + .1);
  const state = JSON.stringify({ time:nature.time, weather:nature.weather, animals:nature.wildlife });
  nature.update(.1, { paused:true });
  assert.equal(JSON.stringify({ time:nature.time, weather:nature.weather, animals:nature.wildlife }), state);
  assert.equal(nature.clouds, undefined);
  nature.dispose();
});

test('nature has bounded draws and disposes every level resource once on replacement', () => {
  const scene = new THREE.Scene(), nature = new MeadowNature(scene); nature.setLevel({ ...meadow(9), weather: 'rain' });
  const resources = [...nature.resources], counts = new Map(resources.map(r => [r, 0]));
  for (const resource of resources) resource.addEventListener('dispose', () => counts.set(resource, counts.get(resource) + 1));
  let draws = 0; nature.root.traverse(o => { if (o.isMesh || o.isPoints) draws++; }); assert.ok(draws <= 40);
  for (const batch of Object.values(nature.batches)) assert.ok([...batch.instanceMatrix.array].every(Number.isFinite));
  nature.setLevel(meadow(20)); assert.ok([...counts.values()].every(count => count === 1));
  const root = nature.root; nature.dispose(); assert.equal(root.parent, null); assert.equal(nature.resources.size, 0);
  nature.dispose();
});

test('squirrels and rabbits cross fences and may leave and re-enter within a bounded margin', () => {
  const level=meadow(); level.fenceSegments=[{a:{x:1,z:6},b:{x:1,z:14},kind:'boundary'}];
  const squirrel={kind:'squirrel',x:0,z:10,homeX:10,homeZ:10,waypointX:10,waypointZ:10,phase:0,heading:0};
  for(let i=0;i<18;i++)stepWildlife(level,squirrel,.1,[],i*.1);
  assert.ok(squirrel.x>1,'fence is permeable to ambient wildlife');
  const rabbit={kind:'rabbit',x:59.7,z:20,homeX:59,homeZ:20,waypointX:80,waypointZ:20,phase:0,heading:Math.PI/2};
  for(let i=0;i<6;i++)stepWildlife(level,rabbit,.1,[],i*.1);
  assert.ok(rabbit.x>level.bounds.maxX,'fauna can briefly roam outside the field');
  assert.ok(rabbit.x<=level.bounds.maxX+.45);
  for(let i=0;i<600;i++)stepWildlife(level,rabbit,.1,[],i*.1);
  assert.ok(rabbit.x<level.bounds.maxX+.1,'fauna returns to the playfield');
});

test('weather sheltering is gradual, leaves light weather fauna active, and releases hysteretically', () => {
  const level=meadow(), squirrel={kind:'squirrel',x:0,z:20,homeX:5,homeZ:20,waypointX:5,waypointZ:20,phase:0}, rabbit={kind:'rabbit',x:0,z:25,homeX:5,homeZ:25,waypointX:5,waypointZ:25,phase:0}, bird={kind:'bird',x:0,z:30,homeX:5,homeZ:30,waypointX:5,waypointZ:30,phase:0};
  stepWildlife(level,squirrel,.1,[],0,{severity:.35});
  assert.equal(squirrel.shelter||0,0,'light rain/wind do not make fauna disappear');
  stepWildlife(level,squirrel,.1,[],0,{severity:.7});stepWildlife(level,rabbit,.1,[],0,{severity:.7});stepWildlife(level,bird,.1,[],0,{severity:.7});
  assert.ok(squirrel.shelter>0&&squirrel.shelter<1);assert.equal(squirrel.hidden,false);
  assert.equal(rabbit.shelter||0,0,'larger rabbits shelter later');assert.ok(bird.shelter>0);
  for(let i=0;i<50;i++)stepWildlife(level,squirrel,.1,[],i*.1,{severity:0});
  assert.equal(squirrel.hidden,false);assert.equal(squirrel.shelter,0);
});

test('hidden wildlife still responds to nearby robots', () => {
  const level=meadow(), squirrel={kind:'squirrel',x:0,z:20,homeX:8,homeZ:20,waypointX:8,waypointZ:20,phase:0};
  for(let i=0;i<50;i++)stepWildlife(level,squirrel,.1,[],i*.1,{severity:.9});
  assert.equal(squirrel.hidden,true);
  const oldX=squirrel.x;
  stepWildlife(level,squirrel,.1,[{x:squirrel.x-1,z:squirrel.z}],0,{severity:.9});
  assert.equal(squirrel.hidden,false);assert.ok(squirrel.x>oldX);
});

test('wildlife population is seeded, area-scaled, and capped', () => {
  const small=meadow();small.bounds={minX:-20,maxX:20,minZ:-20,maxZ:20};
  const wide=meadow();wide.bounds={minX:-200,maxX:200,minZ:-200,maxZ:200};
  assert.deepEqual(wildlifePopulation(wide),wildlifePopulation(wide));
  const a=wildlifePopulation(small),b=wildlifePopulation(wide);
  assert.ok(b.squirrel>=a.squirrel&&b.rabbit>=a.rabbit&&b.bird>=a.bird&&b.butterfly>=a.butterfly);
  assert.ok(b.squirrel<=7&&b.rabbit<=8&&b.bird<=6&&b.butterfly<=8);
});

test('ground wildlife still avoids trees and rivers while ignoring fence lines', () => {
  const level=meadow();level.obstacles=[{x:1.1,z:20,radius:.8}];
  const squirrel={kind:'squirrel',x:0,z:20,homeX:10,homeZ:20,waypointX:10,waypointZ:20,phase:0,heading:Math.PI/2};
  for(let i=0;i<20;i++)stepWildlife(level,squirrel,.1,[],i*.1);
  assert.ok(squirrel.x<.2,'tree footprint remains solid');
  level.obstacles=[];level.rivers=[{points:[{x:-10,z:40},{x:10,z:40}],width:2,bridges:[]}];
  const rabbit={kind:'rabbit',x:0,z:38.4,homeX:0,homeZ:40,waypointX:0,waypointZ:40,phase:0,heading:0};
  for(let i=0;i<20;i++)stepWildlife(level,rabbit,.1,[],i*.1);
  assert.ok(rabbit.z<39.6,'water remains solid');
});


test('fauna crosses dry routes but respects barn walls and stone walls', () => {
  const level=meadow(), squirrel={kind:'squirrel',x:0,z:-2,homeX:0,homeZ:3,waypointX:0,waypointZ:3,phase:0};
  for(let i=0;i<50;i++)stepWildlife(level,squirrel,.1,[],i*.1);
  assert.ok(squirrel.z>1,'dry route is not a collision surface');
  const wall={a:{x:0,z:5},b:{x:0,z:15},kind:'target'};
  level.fenceSegments=[wall];level.target={type:'barn'};
  assert.equal(wildlifeGroundPositionSafe(level,{x:.1,z:10}),false);
  level.target={type:'pen'};
  assert.equal(wildlifeGroundPositionSafe(level,{x:.1,z:10}),true,'ordinary target fencing remains crossable');
  level.fenceSegments=[{...wall,kind:'boundary',material:'stone'}];
  assert.equal(wildlifeGroundPositionSafe(level,{x:.1,z:10}),false);
});


test('coincident threats trigger deterministic flight and blocked headings stay stable', () => {
  const level=meadow(), animal={kind:'squirrel',x:0,z:20,homeX:0,homeZ:20,heading:0,waypointX:30,waypointZ:20};
  stepWildlife(level,animal,.1,[{x:0,z:20}],0);
  assert.ok(animal.z>20,'zero-distance threat still creates a flight direction');
  const blocked={kind:'squirrel',x:0,z:20,homeX:0,homeZ:20,heading:1,waypointX:30,waypointZ:20};
  for(let i=0;i<2;i++)stepWildlife(level,blocked,.1,[],i,undefined,()=>false);
  assert.equal(blocked.heading,1,'a blocked animal does not spin toward an impossible waypoint');
});


test('composed squirrel and rabbit meshes contain valid colored triangles', () => {
  for(const kind of ['squirrel','rabbit']) {
    const geometry=wildlifeBodyGeometry(kind),positions=geometry.getAttribute('position'),colors=geometry.getAttribute('color');
    assert.equal(geometry.index,null);assert.equal(positions.count%3,0);assert.equal(colors.count,positions.count);
    for(let i=0;i<positions.count;i+=3){
      const a=new THREE.Vector3().fromBufferAttribute(positions,i),b=new THREE.Vector3().fromBufferAttribute(positions,i+1),c=new THREE.Vector3().fromBufferAttribute(positions,i+2);
      assert.ok(b.sub(a).cross(c.sub(a)).lengthSq()>1e-12,`${kind} triangle ${i/3} has area`);
    }
    geometry.dispose();
  }
});


test('shelter hysteresis prevents return flicker around the species threshold',()=>{
 const level=meadow(),animal={kind:'squirrel',x:0,z:20,homeX:0,homeZ:20,phase:0,heading:0};
 stepWildlife(level,animal,.1,[],0,{severity:.65});assert.equal(animal.sheltering,true);const before=animal.shelter;
 stepWildlife(level,animal,.1,[],.1,{severity:.53});assert.equal(animal.sheltering,true);assert.ok(animal.shelter>before);
 stepWildlife(level,animal,.1,[],.2,{severity:.4});assert.equal(animal.sheltering,false);
});
