import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as THREE from 'three';
import {createAnimal,createCowCoatMaterial,cowCoatVariant} from '../src/models.js';

// Model/matrix checks exercise real geometry; Canvas is a texture-data stand-in.
// They do not establish rendered likeness or device performance.
globalThis.document={createElement:()=>{
  const canvas={width:0,height:0};
  canvas.getContext=()=>({createImageData:(width,height)=>({data:new Uint8ClampedArray(width*height*4)}),putImageData(image){canvas.pixels=image.data;}});
  return canvas;
}};
const meshes=model=>{const result=[];model.traverse(p=>{if(p.isMesh)result.push(p);});return result;};
const bounds=model=>{model.updateMatrixWorld(true);return new THREE.Box3().setFromObject(model);};

function silhouetteHash(model){
  const hash=createHash('sha256');
  for(const part of meshes(model)){
    hash.update(Buffer.from(part.geometry.attributes.position.array.buffer));
    hash.update(JSON.stringify(part.position.toArray()));
  }
  return hash.digest('hex');
}

test('cow redesign preserves the accepted sheep geometry and has a larger grounded silhouette',()=>{
  const sheep=createAnimal('sheep'),cow=createAnimal('cow');
  assert.equal(silhouetteHash(sheep),'fa76ffcb7dab581709044d0a1820173560c64d2e10ece659cb9dd4c466f9972d',
    'cow work must not alter sheep vertices or hip transforms');
  const sheepSize=bounds(sheep).getSize(new THREE.Vector3()),cowBox=bounds(cow),cowSize=cowBox.getSize(new THREE.Vector3());
  for(const axis of ['x','y','z'])assert.ok(cowSize[axis]/sheepSize[axis]>1.35&&cowSize[axis]/sheepSize[axis]<(axis==='z'?2:1.8),
    `cow ${axis} silhouette is visibly larger with the deliberate torso length extension`);
  assert.ok(cowBox.min.y>=0&&cowBox.min.y<.06,`neutral hooves sit near ground: ${cowBox.min.y}`);
  const torso=meshes(cow).find(part=>part.material.map?.image?.width===256);
  const torsoSize=bounds(torso).getSize(new THREE.Vector3());
  // Accepted sheep core envelope: ellipsoid radii .32/.34/.39. Surface
  // sculpting may perturb vertices by 2.5%, but never rescale an axis twice.
  for(const [axis,diameter] of [['x',.64],['y',.68],['z',.975]])
    assert.ok(Math.abs(torsoSize[axis]/diameter-1.5)<.05,`${axis} torso uses 1.5x revised core dimensions`);
  const frontHip=meshes(cow).find(part=>part.userData.limbIndex===0).userData.pivot;
  const rearHip=meshes(cow).find(part=>part.userData.limbIndex===2).userData.pivot;
  assert.ok(Math.abs((frontHip[2]-rearHip[2])/(.22+.235)/1.5-1.25)<1e-12,'hips span the longer torso without lengthening legs');
  assert.deepEqual(cow.scale.toArray(),[1,1,1],'model scale is baked once, ready for the shared instance renderer');
});

test('cow cache shares immutable resources while clones retain independent articulated poses',()=>{
  const first=createAnimal('cow'),second=createAnimal('cow'),parts=meshes(first),other=meshes(second);
  assert.equal(parts.length,other.length);
  const before=other.map(p=>p.matrix.clone());
  for(let i=0;i<parts.length;i++){
    assert.notEqual(parts[i],other[i]);
    assert.equal(parts[i].geometry,other[i].geometry);
    assert.equal(parts[i].material,other[i].material);
    assert.ok(!parts[i].userData.ownedGeometry&&!parts[i].userData.ownedMaterial,
      'per-instance cleanup must not dispose the persistent flock cache');
  }
  assert.equal(first.userData.articulated,true);
  for(let index=0;index<4;index++){
    const limb=parts.filter(p=>p.userData.limbIndex===index);
    assert.equal(limb.length,2,'each hip has exactly coat and cloven-hoof batches');
    assert.deepEqual(limb[0].userData.pivot,limb[1].userData.pivot);
    for(const part of limb){
      assert.deepEqual(part.position.toArray(),part.userData.pivot);
      assert.ok(part.geometry.boundingBox?.min.y<0||bounds(part).min.y<part.position.y,'limb extends below its hip');
      part.rotation.x=.35;part.updateMatrix();
    }
  }
  other.forEach((part,i)=>assert.ok(part.matrix.equals(before[i]),'posing one cow leaves another pose unchanged'));
});

test('cow batches remain finite, textured once and bounded for flock instancing',()=>{
  const cow=createAnimal('cow'),parts=meshes(cow);let triangles=0;
  for(const part of parts){
    const geometry=part.geometry;
    for(const key of ['position','normal','uv']){
      assert.ok(geometry.attributes[key],`${key} exists`);
      assert.ok([...geometry.attributes[key].array].every(Number.isFinite),`${key} has finite values`);
    }
    if(geometry.index)assert.ok([...geometry.index.array].every(i=>i<geometry.attributes.position.count));
    triangles+=(geometry.index?.count||geometry.attributes.position.count)/3;
  }
  assert.ok(parts.length<=18,`bounded material/hip batches: ${parts.length}`);
  assert.ok(triangles<=6500,`bounded per-cow geometry: ${triangles}`);
  const coats=parts.filter(p=>p.material.map?.image?.width===256);
  assert.equal(coats.length,1,'organic coat remains one surface batch');
  const texture=coats[0].material.map;
  for(let i=0;i<20;i++)assert.equal(meshes(createAnimal('cow')).find(p=>p.material.map===texture)?.material.map,texture,
    'repeated flock construction reuses the coat texture');
});

test('four cached coat maps have distinct organic coverage independent of animal size',()=>{
  const textures=Array.from({length:4},(_,variant)=>createCowCoatMaterial(variant).map);
  const hashes=textures.map(texture=>createHash('sha256').update(texture.image.pixels).digest('hex'));
  assert.equal(new Set(hashes).size,4,'each coat has a different pixel layout');
  textures.forEach((texture,variant)=>{
    assert.equal(texture,createCowCoatMaterial(variant).map,'maps persist across level rebuilds');
    const pixels=texture.image.pixels;let dark=0;
    for(let i=0;i<pixels.length;i+=4)if(pixels[i]<100)dark++;
    assert.ok(dark/(pixels.length/4)>.2&&dark/(pixels.length/4)<.65,'each layout retains broad black and cream areas');
  });
  const variants=Array.from({length:100},(_,id)=>cowCoatVariant(123,id));
  assert.equal(new Set(variants).size,4);
  assert.deepEqual(variants,Array.from({length:100},(_,id)=>cowCoatVariant(123,id)),'restart keeps identity');
  assert.notDeepEqual(variants,Array.from({length:100},(_,id)=>cowCoatVariant(456,id)),'level seed varies the herd');
  assert.throws(()=>createCowCoatMaterial(4),RangeError);
});

test('horn mesh roots move modestly forward while retaining their curved geometry',()=>{
  const horn=meshes(createAnimal('cow')).find(part=>part.material.color.getHexString()==='e4d1ae');
  assert.ok(horn,'shared ivory horn batch exists');
  const box=bounds(horn);
  // Root plane is local head Z .4175 + forward horn offset .015. The
  // cylinder radius .045 reaches forward, then the 1.5x core scale is baked.
  assert.ok(Math.abs(box.max.z-(.4175+.015+.045)*1.5)<1e-6,'horn roots are .05 forward of their previous -.035 offset');
});
