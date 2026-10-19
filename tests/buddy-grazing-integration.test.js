import test from 'node:test';
import assert from 'node:assert/strict';
import { stepSimulation } from '../src/simulation.js';
import { updateAnimalTurn } from '../src/animal-turn.js';
import { updateGrazing } from '../src/grazing.js';

test('contained sheep and every cow size settle into grazing without patrol pressure', () => {
  const animals = ['sheep', 'cow', 'cow', 'cow', 'cow'].map((type, id) => ({
    id, type, scale: type === 'cow' ? [1, 1, 1.0833, 1.1667, 1.25][id] : 1,
    x: (id - 2) * 2.8, z: 0, vx: .8, vz: 0, heading: Math.PI / 2,
    saved: false, nextWanderCheck: 1e9,
  }));
  const level = {index: 27, time: 0, seed: 42, reward: 300, animals,
    bounds: {minX: -100, maxX: 100, minZ: -100, maxZ: 100},
    dog: {x: -50, z: -50}, target: {x: 80, z: 80, radius: 5, heading: 0, type: 'field'},
    helpers: [{type: 'helper', x: 0, z: -7}],
    obstacles: [], rivers: [], gates: [], fenceSegments: [], routes: [], roads: [],
  };
  const poses = animals.map(a => ({rotation: {y: a.heading}, userData: {}}));
  let barks = 0;const grazed=animals.map(()=>0);
  for (let i = 0; i < 600; i++) {
    const result = stepSimulation(level, level.dog, {}, .05, {helper: 2});
    barks += result.events.filter(e => e.type === 'buddyBark').length;
    animals.forEach((a, j) => {
      updateAnimalTurn(poses[j], a, .05);
      updateGrazing(poses[j], a, level, .05);
      if(poses[j].userData.graze===1)grazed[j]+=.05;
    });
  }
  assert.equal(level.helpers[0].mode, 'contain');
  assert.equal(barks, 0);
  animals.forEach((a, i) => {
    assert.ok(Math.abs(a.x - (i - 2) * 2.8) < 1, 'keeps its original holding area');
    assert.equal(a.saved, false);
    assert.ok(Math.hypot(a.vx, a.vz) < .1);
    assert.ok(grazed[i]>8, `${a.type}/${a.scale} grazes while Buddy patrols`);
  });
});

test('large connected mixed flock stays local and grazes throughout a complete patrol', () => {
  const animals = Array.from({length:65}, (_, id) => ({
    id, type: id % 2 ? 'cow' : 'sheep', scale: [1, 13/12, 7/6, 1.25][id % 4],
    x: (id % 13 - 6) * 2.4, z: (Math.floor(id/13) - 2) * 2.4,
    vx: 0, vz: 1.5, heading: 0, saved: false, nextWanderCheck: 1e9,
  }));
  const starts = animals.map(a => ({x:a.x,z:a.z}));
  const level = {index:27,time:0,seed:42,reward:300,animals,
    bounds:{minX:-100,maxX:100,minZ:-100,maxZ:100},dog:{x:-70,z:-70},
    target:{x:80,z:80,radius:5,heading:0,type:'field'},helpers:[{type:'helper',x:0,z:-9}],
    obstacles:[],rivers:[],gates:[],fenceSegments:[],routes:[],roads:[],
  };
  const poses=animals.map(()=>({rotation:{y:0},userData:{}}));
  const grazed=animals.map(()=>0);
  for(let i=0;i<1200;i++){
    stepSimulation(level,level.dog,{},.05,{helper:2});
    animals.forEach((a,j)=>{updateAnimalTurn(poses[j],a,.05);updateGrazing(poses[j],a,level,.05);if(poses[j].userData.graze===1)grazed[j]+=.05;});
  }
  assert.equal(level.helpers[0].mode,'contain');
  animals.forEach((a,j)=>{
    assert.ok(Math.hypot(a.x-starts[j].x,a.z-starts[j].z)<1,`member ${j} stays in place`);
    assert.equal(a.saved,false);
    assert.ok(grazed[j]>20,`member ${j} grazes after the full patrol`);
  });
});
