import test from 'node:test';
import assert from 'node:assert/strict';
import { COW_SCALES, animalScale, animalRadius } from '../src/animal-size.js';
import { createLevel, canOccupy, distance, containsTarget, targetWorldPoint, targetFootprint } from '../src/world.js';
import { stepSimulation } from '../src/simulation.js';

test('cow size variants are discrete, repeatable, varied across seeds and bounded for invalid state', () => {
  const sizes = seed => createLevel(40, seed).animals.filter(a => a.type === 'cow').map(a => a.scale);
  assert.deepEqual(sizes(210), sizes(210));
  assert.notDeepEqual(sizes(210), sizes(211));
  const seen = new Set();
  for (let seed=0;seed<20;seed++) for (const scale of sizes(seed)) { assert.ok(COW_SCALES.includes(scale)); seen.add(scale); }
  assert.equal(seen.size, 4);
  assert.equal(animalScale({type:'cow'}), 1);
  for (const scale of [NaN, Infinity, -100, 100, 1.13]) assert.ok(COW_SCALES.includes(animalScale({type:'cow',scale})));
  assert.equal(animalScale({type:'sheep',scale:1.25}),1);
  assert.ok(Math.abs(animalRadius({type:'cow',scale:1.25})-.975)<1e-12);
});

test('scaled herds spawn clear of geometry and each other through all100 meadows and custom seeds', () => {
  for(const seed of [undefined,1,200,999]) for(let index=0;index<100;index++) {
    const level=createLevel(index,seed);
    for(const animal of level.animals) {
      assert.ok(canOccupy(level,animal.x,animal.z,animalRadius(animal)),`geometry ${index}/${seed}/${animal.id}`);
      for(const other of level.animals) if(other.id>animal.id)
        assert.ok(distance(animal,other)+1e-8>=animalRadius(animal)+animalRadius(other),`overlap ${index}/${seed}/${animal.id}/${other.id}`);
    }
  }
});

test('largest cow requires full clearance for admission and remains inside after delivery', () => {
  const level=createLevel(4),cow=level.animals.find(a=>a.type==='cow');
  cow.scale=1.25;level.animals=[cow];
  const shape=targetFootprint(level.target);
  Object.assign(cow,targetWorldPoint(level.target,shape.halfLength-.85,0));
  assert.equal(containsTarget(level.target,cow,animalRadius(cow)),false);
  Object.assign(cow,{x:level.target.x,z:level.target.z,vx:0,vz:0});
  Object.assign(level.dog,{x:level.target.x,z:level.target.z});
  stepSimulation(level,level.dog,{},.1);
  assert.equal(cow.saved,true);
  for(let i=0;i<100;i++)stepSimulation(level,level.dog,{},.1);
  assert.ok(containsTarget(level.target,cow,animalRadius(cow)));
});

test('largest cow respects narrow bridge and gate clearance while base cow fits', async () => {
  const {bridgeCrossing}=await import('../src/bridge-crossing.js');
  const level={bounds:{minX:-30,maxX:30,minZ:-30,maxZ:30},obstacles:[],gates:[],fenceSegments:[],rivers:[{points:[{x:-30,z:0},{x:30,z:0}],width:5,bridges:[{x:0,z:0,width:1.8,length:7,heading:0}]}]};
  const cow={type:'cow',scale:1,x:0,z:0,vx:0,vz:1};
  assert.ok(bridgeCrossing(level,cow,{...cow}));
  delete cow.bridgeCrossing;cow.scale=1.25;
  assert.equal(bridgeCrossing(level,cow,{...cow}),null);
  level.rivers[0].bridges[0]={...level.rivers[0].bridges[0],width:3};
  assert.ok(bridgeCrossing(level,cow,{...cow}),'largest variant traverses a sufficiently wide deck');
  level.rivers=[];
  level.fenceSegments=[{a:{x:-10,z:0},b:{x:-1.05,z:0}},{a:{x:1.05,z:0},b:{x:10,z:0}}];
  assert.ok(canOccupy(level,0,0,animalRadius({...cow,scale:1})));
  assert.equal(canOccupy(level,0,0,animalRadius(cow)),false);
});
