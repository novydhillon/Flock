import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createBuddy,createPip,updatePipPose,updatePipHover} from '../src/models.js';

function installCanvasStub(){
  const context={createImageData:(width,height)=>({data:new Uint8ClampedArray(width*height*4)}),putImageData(){}};
  globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>context})};
}

test('Buddy uses an independent Pip-compatible floating rig and a smaller readable puppy silhouette',()=>{
  installCanvasStub();
  const buddy=createBuddy(),pip=createPip(),parts=buddy.userData.parts;
  assert.equal(buddy.name,'Buddy the hovering robot puppy');
  assert.equal(buddy.userData.modelContract,'pip-pose-hover-v1');
  assert.equal(buddy.userData.suggestedScale,.82);
  assert.ok(parts.rig&&parts.head&&parts.tail&&parts.tailLight);
  assert.equal(parts.rig.parent,buddy);assert.equal(parts.head.parent,parts.rig);
  assert.equal(parts.legs.length,0,'Buddy floats on hover pods rather than inheriting Pip legs');
  assert.equal(parts.pods.length,4);assert.equal(parts.rings.length,4);assert.equal(parts.rings.flat().length,12);
  assert.ok(parts.rings.flat().every(r=>r.parent===buddy&&r.geometry.type==='TorusGeometry'));
  assert.notEqual(buddy.userData.motion,pip.userData.motion,'Buddy owns separate turn/acceleration history');
  assert.notEqual(buddy.userData.hover,pip.userData.hover,'Buddy owns separate ground-trail animation history');

  buddy.updateMatrixWorld(true);pip.updateMatrixWorld(true);
  const buddyBounds=new THREE.Box3().setFromObject(buddy),pipBounds=new THREE.Box3().setFromObject(pip);
  const heightRatio=(buddyBounds.max.y-buddyBounds.min.y)/(pipBounds.max.y-pipBounds.min.y);
  assert.ok(heightRatio>.72&&heightRatio<1.08,`native silhouette remains in the same camera framing (${heightRatio})`);
  const scaledBuddy=buddy.clone();scaledBuddy.scale.setScalar(buddy.userData.suggestedScale);
  const scaledBounds=new THREE.Box3().setFromObject(scaledBuddy);
  const pipHeight=pipBounds.max.y-pipBounds.min.y,scaledHeight=scaledBounds.max.y-scaledBounds.min.y;
  assert.ok(scaledHeight/pipHeight>.72&&scaledHeight/pipHeight<.9,'recommended rendered Buddy size is smaller than Pip but remains legible');
});

test('Buddy supports smooth head/turn/hover pose updates without moving its simulation root or lifting glow anchors',()=>{
  installCanvasStub();
  const buddy=createBuddy(),parts=buddy.userData.parts;
  updatePipPose(buddy,{x:0,z:0,heading:0,vx:0,vz:0},0);
  const anchorBefore=parts.pods.map(p=>p.clone());
  updatePipPose(buddy,{x:0,z:0,heading:.3,vx:Math.sin(.3)*2,vz:Math.cos(.3)*2},1/60);
  assert.equal(buddy.position.y,0);
  assert.ok(parts.rig.position.y>.83,'only the local rig performs the gentle hover');
  assert.ok(parts.head.rotation.y!==0,'head can look into the turn');
  assert.ok(parts.rig.rotation.z!==0,'body banks smoothly into the turn');
  assert.ok(parts.pods.some((p,i)=>!p.equals(anchorBefore[i])),'ground-effect anchors follow the body bank');
  parts.rings.forEach(group=>group.forEach(r=>r.material.opacity=1));
  updatePipHover(buddy,1/60);
  assert.ok(parts.rings.flat().every(r=>Number.isFinite(r.position.y)&&r.position.y<parts.pods[0].y),
    'the hover plume remains below pod level for ground/deck illumination');
});

test('Buddy exposes only private baked meshes and feedback resources for instance cleanup',()=>{
  installCanvasStub();
  const buddy=createBuddy(),meshes=[];buddy.traverse(object=>{if(object.isMesh)meshes.push(object);});
  const baked=[];buddy.userData.parts.body.traverse(object=>{if(object.isMesh)baked.push(object);});
  buddy.userData.parts.head.traverse(object=>{if(object.isMesh)baked.push(object);});
  assert.ok(baked.length>1&&baked.every(mesh=>mesh.userData.ownedGeometry),
    'baked chassis/head geometries are explicitly marked as instance-owned');
  assert.ok(baked.some(mesh=>mesh.userData.ownedMaterial),'Buddy-only shell/pod materials can be released with the instance');
  assert.ok(buddy.userData.parts.rings.flat().every(r=>r.userData.ownedMaterial),'ring materials can be released per Buddy');
  assert.ok(buddy.userData.parts.tailLight.userData.ownedMaterial,'tail feedback material is not shared with Pip');
  assert.ok(meshes.every(mesh=>mesh.geometry),'every visible part has valid geometry');
});
