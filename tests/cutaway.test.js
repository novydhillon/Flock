import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {StructureCutaway} from '../src/cutaway.js';

function fixture(heading=0){
  const group=new THREE.Group(),material=new THREE.MeshStandardMaterial({color:'#d9977e'}),parts=[];
  const box=(x,y,z,w,h,d)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);m.position.set(x,y,z);m.castShadow=true;group.add(m);parts.push(m);return m;};
  const near=box(0,1.2,4,8,2.4,.2),far=box(0,1.2,-4,8,2.4,.2);
  const roofNear=box(0,3,2,8,.2,4),roofFar=box(0,3,-2,8,.2,4);
  group.rotation.y=heading;group.updateMatrixWorld(true);
  const camera=new THREE.OrthographicCamera(-10,10,10,-10,.1,100);
  camera.position.set(0,8,16).applyAxisAngle(new THREE.Vector3(0,1,0),heading);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  const target={x:0,z:0,heading,radius:2.6},controller=new StructureCutaway(target,parts);
  return {controller,camera,material,parts,near,far,roofNear,roofFar};
}
const settle=(f,actors,frames=90)=>{for(let i=0;i<frames;i++)f.controller.update(f.camera,actors,1/60);};

test('covered actors fade actual camera-side occluders and restore after leaving',()=>{
  const f=fixture(),dog={x:0,z:2};settle(f,[dog]);
  assert.ok(f.near.material.opacity<.2);assert.equal(f.far.material.opacity,1);
  assert.equal(f.roofNear.material.opacity,1,'roof beyond this sightline stays solid');assert.equal(f.roofFar.material.opacity,1);
  assert.equal(f.near.castShadow,false);assert.equal(f.material.opacity,1);
  dog.x=12;settle(f,[dog]);
  for(const part of f.parts){assert.equal(part.material.opacity,1);assert.equal(part.material.transparent,false);assert.equal(part.castShadow,true);}
});

test('rotated cover and camera preserve visibility; an outside actor cannot trigger it',()=>{
  const f=fixture(Math.PI/2),actor={x:2,z:0};settle(f,[actor]);
  assert.ok(f.near.material.opacity<.2);assert.equal(f.far.material.opacity,1);
  actor.x=8;settle(f,[actor]);assert.equal(f.near.material.opacity,1);
});

test('split groups reveal independent roof panels and survive partial entry without flicker',()=>{
  const f=fixture(),left={x:0,z:-3},right={x:0,z:1};
  f.camera.position.set(0,16,16);f.camera.lookAt(0,0,0);settle(f,[left,right]);
  assert.ok(f.roofNear.material.opacity<.2);assert.ok(f.roofFar.material.opacity<.2);
  left.x=10;settle(f,[left,right]);assert.equal(f.roofFar.material.opacity,1);
  f.camera.position.set(0,8,16);f.camera.lookAt(0,0,0);
  right.x=4.3;right.z=2;settle(f,[right]);assert.ok(f.near.material.opacity<.2,'body-width entry sample remains visible');
  const alpha=f.near.material.opacity;right.x=4.5;f.controller.update(f.camera,[right],0);
  assert.equal(f.near.material.opacity,alpha,'pause freezes state');
});

test('fade timestep is deterministic, invalid deltas are stable, resources are owned once',()=>{
  const a=fixture(),b=fixture(),actor={x:0,z:2};
  a.controller.update(a.camera,[actor],.1);for(let i=0;i<6;i++)b.controller.update(b.camera,[actor],1/60);
  assert.ok(Math.abs(a.near.material.opacity-b.near.material.opacity)<1e-12);
  const alpha=a.near.material.opacity;for(const dt of [0,-1,NaN,Infinity])a.controller.update(a.camera,[],dt);
  assert.equal(a.near.material.opacity,alpha);
  let disposed=0,sharedDisposed=0;
  a.material.addEventListener('dispose',()=>sharedDisposed++);
  for(const m of a.parts)m.material.addEventListener('dispose',()=>disposed++);
  assert.equal(new Set(a.parts.map(m=>m.material)).size,a.parts.length);
  a.controller.dispose();a.controller.dispose();
  assert.equal(disposed,a.parts.length);assert.equal(sharedDisposed,0);
  for(const m of a.parts)assert.equal(m.material,a.material);
});
