import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {StructureCutaway} from '../src/cutaway.js';

function fixture(heading=0){
  const group=new THREE.Group(),material=new THREE.MeshStandardMaterial({color:'#d9977e'}),parts=[];
  const box=(x,y,z,w,h,d)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);m.position.set(x,y,z);m.castShadow=true;group.add(m);parts.push(m);return m;};
  const near=box(0,1.2,4,8,2.4,.2),far=box(0,1.2,-4,8,2.4,.2);
  near.userData.coverSide='+z';far.userData.coverSide='-z';
  const roofNear=box(0,3,2,8,.2,4),roofFar=box(0,3,-2,8,.2,4);
  roofNear.userData.coverKind=roofFar.userData.coverKind='roof';
  const sideX=box(4,1.2,0,.2,2.4,8);sideX.userData.coverSide='+x';
  group.rotation.y=heading;group.updateMatrixWorld(true);
  const camera=new THREE.OrthographicCamera(-10,10,10,-10,.1,100);
  camera.position.set(0,8,16).applyAxisAngle(new THREE.Vector3(0,1,0),heading);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  const target={x:0,z:0,heading,radius:2.6},controller=new StructureCutaway(target,parts);
  return {controller,camera,material,parts,near,far,roofNear,roofFar,sideX};
}
const settle=(f,actors,frames=90)=>{for(let i=0;i<frames;i++)f.controller.update(f.camera,actors,1/60);};

test('covered actors fade the whole camera-facing wall and roof, then restore',()=>{
  const f=fixture(),dog={x:0,z:2};settle(f,[dog]);
  assert.equal(f.near.material.opacity,.7);assert.equal(f.far.material.opacity,1);
  assert.equal(f.roofNear.material.opacity,.7);assert.equal(f.roofFar.material.opacity,.7);
  assert.equal(f.near.castShadow,false);assert.equal(f.material.opacity,1);
  dog.x=12;settle(f,[dog]);
  for(const part of f.parts){assert.equal(part.material.opacity,1);assert.equal(part.material.transparent,false);assert.equal(part.castShadow,true);}
});

test('rotated cover and camera preserve visibility; an outside actor cannot trigger it',()=>{
  const f=fixture(Math.PI/2),actor={x:2,z:0};settle(f,[actor]);
  assert.equal(f.near.material.opacity,.7);assert.equal(f.far.material.opacity,1);
  actor.x=8;settle(f,[actor]);assert.equal(f.near.material.opacity,1);
});

test('diagonal camera fades both camera-facing walls',()=>{
  const f=fixture(),actor={x:0,z:0};
  f.camera.position.set(16,8,16);f.camera.lookAt(0,0,0);f.camera.updateMatrixWorld(true);settle(f,[actor]);
  assert.equal(f.near.material.opacity,.7);assert.equal(f.sideX.material.opacity,.7);
  assert.equal(f.far.material.opacity,1);
});

test('any covered actor reveals complete roof and fade membership is pause aware',()=>{
  const f=fixture(),left={x:0,z:-3},right={x:0,z:1};
  f.camera.position.set(0,16,16);f.camera.lookAt(0,0,0);settle(f,[left,right]);
  assert.equal(f.roofNear.material.opacity,.7);assert.equal(f.roofFar.material.opacity,.7);
  left.x=10;settle(f,[left,right]);assert.equal(f.roofFar.material.opacity,.7);
  f.camera.position.set(0,8,16);f.camera.lookAt(0,0,0);
  right.x=0;right.z=0;settle(f,[right]);assert.equal(f.near.material.opacity,.7);
  const alpha=f.near.material.opacity;right.x=9;f.controller.update(f.camera,[right],0);
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
