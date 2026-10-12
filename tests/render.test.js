import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import * as THREE from 'three';
import * as models from '../src/models.js';
import {createLevel} from '../src/simulation.js';

// This exercises actual scene/model/matrix construction. It substitutes the
// GPU and Canvas drawing surface; it is not a rendered-pixel or FPS test.
function setup(){
  const draw=new Proxy({createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)})},{get:(t,k)=>t[k]||(()=>{})});
  const document={createElement:()=>({width:0,height:0,getContext:()=>draw})};
  globalThis.document=document;
  class GPUStub{constructor(){this.shadowMap={};}setPixelRatio(){}setSize(){}render(scene){scene.updateMatrixWorld(true);}}
  const source=readFileSync(new URL('../src/render.js',import.meta.url),'utf8').replace(/^import .*;\s*$/gm,'').replace(/^export /gm,'');
  const context={THREE:{...THREE,WebGLRenderer:GPUStub},...models,document,innerWidth:390,innerHeight:844,devicePixelRatio:2,performance:{now:()=>1000},requestAnimationFrame(){}};
  vm.runInNewContext(`${source}\nglobalThis.renderer=new MeadowRenderer({});`,context);
  return context.renderer;
}

test('portrait scene builds articulated instance poses and finite camera matrices',()=>{
  const renderer=setup();
  for(const index of [0,1,3,20,99]){
    const level=createLevel(index),dog={...level.dog,heading:0};renderer.setLevel(level);
    const firstLimb=renderer.animalBatches[0].meshes.find(m=>m.userData.limbIndex!==undefined);
    const neutral=[...firstLimb.instanceMatrix.array];
    level.animals.forEach(a=>{a.vx=2;a.vz=1;});renderer.update(level,dog,1/12,false);
    assert.equal(renderer.dog.rotation.y,0,'north heading remains valid');
    assert.ok(renderer.camera.projectionMatrix.elements.every(Number.isFinite));
    assert.ok(renderer.camera.matrixWorld.elements.every(Number.isFinite));
    const limbs=renderer.animalBatches.flatMap(batch=>batch.meshes).filter(m=>m.userData.limbIndex!==undefined);
    assert.equal(limbs.length,index>=3?16:8);
    for(const m of limbs)assert.ok([...m.instanceMatrix.array].every(Number.isFinite));
    assert.notDeepEqual([...firstLimb.instanceMatrix.array],neutral,'walking moves the articulated legs');
    const draws=[];renderer.scene.traverse(o=>{if(o.isMesh)draws.push(o);});
    assert.ok(draws.length<230,`scene remains batched: ${draws.length}`);
  }
});

test('changing levels disposes world resources without disposing cached animal geometry',()=>{
  const renderer=setup(),level=createLevel(0);renderer.setLevel(level);
  let worldDisposed=0,animalDisposed=0;
  renderer.terrain.traverse(o=>{if(o.userData.ownedGeometry)o.geometry.addEventListener('dispose',()=>worldDisposed++);});
  renderer.animalBatches[0].meshes[0].geometry.addEventListener('dispose',()=>animalDisposed++);
  renderer.celebrate(level.target.x,level.target.z);
  let confettiDisposed=0;renderer.particles.forEach(p=>p.mesh.geometry.addEventListener('dispose',()=>confettiDisposed++));
  renderer.setLevel(createLevel(1));
  assert.ok(worldDisposed>20);assert.equal(confettiDisposed,36);assert.equal(animalDisposed,0);
  const a=models.createFlowerPatch(1,3),b=models.createFlowerPatch(7,3);
  assert.equal(a.children[0].geometry,b.children[0].geometry,'flower variants reuse bounded geometry');
});

test('portrait camera keeps Pip visible when helpers move the flock far away',()=>{
  const renderer=setup(),level=createLevel(0),dog={...level.dog};renderer.setLevel(level);
  for(const animal of level.animals)animal.x=level.target.x;
  for(let i=0;i<600;i++)renderer.update(level,dog,1/60,false);
  renderer.camera.updateMatrixWorld(true);
  const position=new THREE.Vector3(dog.x,.5,dog.z).project(renderer.camera);
  assert.ok(Math.abs(position.x)<.8,`Pip stays within screen margins: ${position.x}`);
  assert.ok(Math.abs(position.y)<.8);
});
