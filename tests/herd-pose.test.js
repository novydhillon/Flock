import test from 'node:test';
import assert from 'node:assert/strict';
import { updateHerdPose } from '../src/herd-pose.js';
import { updateGrazing } from '../src/grazing.js';
import { createAnimal, createAnimalGestureGeometry } from '../src/models.js';

const calm = id => ({id,type:'sheep',x:0,z:0,vx:0,vz:0,heading:0,relaxation:1});
const meadow = () => ({bounds:{minX:-50,maxX:50,minZ:-50,maxZ:50},rivers:[],roads:[],fenceSegments:[],obstacles:[]});

test('idle gestures have individual timing, quiet gaps and freeze without simulation mutation',()=>{
  const a=calm(1),b=calm(2),before=structuredClone(a),s={graze:1},other={graze:1};
  let different=false,quiet=false,ear=false,tail=false,blink=false,chew=false;
  for(let i=0;i<1800;i++){
    updateHerdPose(s,a,1/60,0);updateHerdPose(other,b,1/60,0);
    const p=s.herdPose;
    different ||= Math.abs(p.ear-other.herdPose.ear)>1e-5;
    quiet ||= [p.ear,p.tail,p.blink,p.chew].every(v=>v===0);
    ear ||= p.ear>.1;tail ||= Math.abs(p.tail)>.1;blink ||= p.blink>.7;chew ||= Math.abs(p.chew)>.005;
  }
  assert.ok(different&&quiet&&ear&&tail&&blink&&chew);
  assert.deepEqual(a,before,'pose system is a read-only simulation consumer');
  const frozen=structuredClone(s);updateHerdPose(s,a,0,0);assert.deepEqual(s,frozen);
  const fresh={};updateHerdPose(fresh,a,1/60,0);assert.equal(fresh.herdPoseTime,1/60);
});

test('disturbance turns and lifts the head and shifts weight without waiting for locomotion',()=>{
  const a={...calm(4),alert:.4,attentionHeading:Math.PI/2},s={};
  updateHerdPose(s,a,1/60,0);
  assert.ok(s.herdPose.headYaw>0&&s.herdPose.headLift>0&&s.herdPose.anticipation>0);
  updateHerdPose(s,a,1/60,0);assert.ok(s.herdPose.weightShift>0);
  for(const key of ['ear','tail','blink','chew'])assert.equal(Math.abs(s.herdPose[key]),0,'threat overrides idle gestures');
  a.alert=0;a.vx=2;updateHerdPose(s,a,1/60,0);
  for(const key of ['ear','tail','blink','chew'])assert.equal(Math.abs(s.herdPose[key]),0,'locomotion overrides idle gestures');
  assert.equal(a.vx,2);
});

test('renewed pressure lifts a grazing head while hard surfaces reject feeding immediately',()=>{
  const a=calm(1),level=meadow(),pose={rotation:{y:0},userData:{}};
  for(let i=0;i<500;i++)updateGrazing(pose,a,level,1/60);
  assert.equal(pose.userData.graze,1);
  a.alert=1;a.relaxation=0;updateGrazing(pose,a,level,1/60);
  assert.ok(pose.userData.graze<1&&pose.userData.herdPose.headLift>0);
  level.roads=[{width:4,points:[{x:-10,z:0},{x:10,z:0}]}];
  updateGrazing(pose,a,level,1/60);assert.equal(pose.userData.graze,0);
});

test('animal gestures keep cached anatomy and draw count with independent owned instance buffers',()=>{
  const draw={createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),putImageData(){}};
  globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>draw})};
  for(const type of ['sheep','cow']){
    const animal=createAnimal(type),again=createAnimal(type),kinds=new Set();
    assert.equal(animal.children.length,again.children.length);
    for(let i=0;i<animal.children.length;i++){
      const part=animal.children[i],base=part.geometry;
      assert.equal(base,again.children[i].geometry,'cached geometry is shared');
      for(const kind of base.attributes.animalGesturePart.array.filter((_,n)=>n%2===0))kinds.add(kind);
      const wrapper=createAnimalGestureGeometry(base,3),other=createAnimalGestureGeometry(base,3);
      assert.equal(wrapper.attributes.position,base.attributes.position,'no cloned static vertices per animal or frame');
      assert.notEqual(wrapper.attributes.animalGesture,other.attributes.animalGesture,'level-local gestures');
      wrapper.attributes.animalGesture.setXYZW(0,.2,.1,.9,.01);
      assert.equal(other.attributes.animalGesture.getX(0),0);
      const shader={vertexShader:'#include <beginnormal_vertex>\n#include <begin_vertex>'};
      part.material.onBeforeCompile(shader);
      assert.match(shader.vertexShader,/attribute vec4 animalGesture;/);
      assert.match(shader.vertexShader,/transformed.y=animalGesturePivot.y/);
      assert.ok(base.attributes.position.array.every(Number.isFinite));
      wrapper.dispose();other.dispose();
    }
    assert.deepEqual([...kinds].sort(),[0,1,2,3,4],'ear, tail, eye and muzzle geometry are explicitly tagged');
  }
});
