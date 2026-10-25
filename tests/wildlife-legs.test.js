import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { MeadowNature } from '../src/nature.js';
import { wildlifeParts } from '../src/wildlife-models.js';

const meadow=()=>({index:0,seed:42,bounds:{minX:-40,maxX:60,minZ:-60,maxZ:60},dog:{x:-20,z:0},spawn:{x:-20,z:0},animals:[],roads:[],rivers:[],obstacles:[],fenceSegments:[]});
const matrix=(batch,slot)=>{const m=new THREE.Matrix4();batch.getMatrixAt(slot,m);return m;};

test('squirrel and rabbit rear feet protrude beyond body sides and every foot has an independent live instance',()=>{
  const nature=new MeadowNature(new THREE.Scene());nature.setLevel(meadow());
  for(const kind of ['squirrel','rabbit']){
    const parts=wildlifeParts[kind],paws=parts.filter(p=>p.part==='paw'),body=parts.find(p=>p.part==='body');
    const rear=paws.filter(p=>p.at[2]<0);assert.equal(paws.length,4);assert.equal(rear.length,2);
    for(const p of rear)assert.ok(Math.abs(p.at[0])+p.scale[0]>body.scale[0],'rear foot extends outside body silhouette');
    const animals=nature.wildlife.filter(a=>a.kind===kind),batch=nature.batches[`${kind}Paw`];
    assert.equal(batch.count,animals.length*4);
    for(const a of animals)for(let j=0;j<4;j++){
      const m=matrix(batch,a.slot*4+j),p=new THREE.Vector3().setFromMatrixPosition(m),scale=new THREE.Vector3().setFromMatrixScale(m);
      assert.ok(m.elements.every(Number.isFinite));assert.ok(scale.x>0&&scale.y>0&&scale.z>0);assert.ok(Math.hypot(p.x-a.x,p.z-a.z)<.6);
    }
  }
  nature.dispose();
});

test('four-foot animation remains independent per animal, freezes on pause and clears hidden slots',()=>{
  const nature=new MeadowNature(new THREE.Scene());nature.setLevel(meadow());
  for(const kind of ['squirrel','rabbit']){
    const a=nature.wildlife.find(a=>a.kind===kind),batch=nature.batches[`${kind}Paw`];
    a.x=0;a.z=20;a.homeX=0;a.homeZ=20;a.waypointX=5;a.waypointZ=20;a.heading=Math.PI/2;a.gait=.1;a.moving=true;
    nature.update(0,{});const before=Array.from({length:4},(_,j)=>matrix(batch,a.slot*4+j).elements.slice());
    nature.update(.1,{});assert.ok(a.moving);const after=Array.from({length:4},(_,j)=>matrix(batch,a.slot*4+j).elements.slice());
    for(let j=0;j<4;j++)assert.notDeepEqual(after[j],before[j],'front and rear feet follow the moving body');
    nature.update(.1,{paused:true});for(let j=0;j<4;j++)assert.deepEqual(matrix(batch,a.slot*4+j).elements,after[j]);
    a.visible=false;nature.update(0,{});
    for(let j=0;j<4;j++){const scale=new THREE.Vector3().setFromMatrixScale(matrix(batch,a.slot*4+j));assert.equal(scale.lengthSq(),0);}
    const neighbor=nature.wildlife.find(b=>b.kind===kind&&b!==a);
    if(neighbor)for(let j=0;j<4;j++)assert.ok(new THREE.Vector3().setFromMatrixScale(matrix(batch,neighbor.slot*4+j)).lengthSq()>0);
  }
  const draws=Object.keys(nature.batches).length;assert.ok(draws<=8,'extra limbs reuse existing instanced batches');nature.dispose();
});

test('all feet remain attached to the shrinking body during gradual sheltering',()=>{
  const nature=new MeadowNature(new THREE.Scene());nature.setLevel(meadow());
  for(const kind of ['squirrel','rabbit']){
    const a=nature.wildlife.find(a=>a.kind===kind),batch=nature.batches[`${kind}Paw`],parts=wildlifeParts[kind].filter(p=>p.part==='paw');
    a.heading=.7;a.moving=false;
    for(const shelter of [0,.5,.95]){
      a.shelter=shelter;nature.update(0,{});const scale=1-shelter*.94;
      for(let j=0;j<4;j++){
        const p=new THREE.Vector3().setFromMatrixPosition(matrix(batch,a.slot*4+j)),dx=p.x-a.x,dz=p.z-a.z;
        const localX=(dx*Math.cos(a.heading)-dz*Math.sin(a.heading))/scale,localZ=(dx*Math.sin(a.heading)+dz*Math.cos(a.heading))/scale;
        assert.ok(Math.abs(localX-parts[j].at[0])<.0001);assert.ok(Math.abs(localZ-parts[j].at[2])<.0001,'feet stay in body-local positions throughout shrinking');
      }
    }
  }
  nature.dispose();
});
