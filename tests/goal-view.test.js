import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {goalSurface,goalOutline,drawGoalMap} from '../src/goal-view.js';
import {targetFootprint,targetWorldPoint,containsTarget} from '../src/world.js';

const headings=[0,Math.PI/2,Math.PI,Math.PI*1.5,.37];
const point=(positions,i)=>({x:positions.getX(i),z:positions.getZ(i)});

test('goal fill, floor and inward border use the physical rectangular corners with upward winding',()=>{
  for(const type of ['pen','field','barn'])for(const heading of headings){
    const target={x:37,z:-18,radius:5.7,heading,type},shape=targetFootprint(target);
    for(const geometry of [goalSurface(target),goalSurface(target,.013),goalOutline(target)]){
      const positions=geometry.attributes.position,normals=geometry.attributes.normal;
      for(let i=0;i<4;i++){
        const p=point(positions,i),corner=shape.corners[i];
        assert.ok(Math.hypot(p.x-corner.x,p.z-corner.z)<.000005);
      }
      for(let i=0;i<normals.count;i++)assert.ok(normals.getY(i)>.9999,'triangles face upward');
      assert.ok(geometry.index.count<=24,'the marker needs only a few rectangular triangles');
      geometry.dispose();
    }
  }
});

test('real goal triangles cover admitted body corners beyond the old circular highlight and stop at the enclosure edge',()=>{
  for(const heading of headings){
    const target={x:12,z:-7,radius:5,heading},shape=targetFootprint(target);
    const mesh=new THREE.Mesh(goalSurface(target),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));mesh.updateMatrixWorld(true);
    for(const radius of [.55,.78])for(const u of [-1,1])for(const v of [-1,1]){
      const inside=targetWorldPoint(target,u*(shape.halfLength-radius-.2),v*(shape.halfWidth-radius-.2));
      assert.ok(containsTarget(target,inside,radius));
      assert.ok(Math.hypot(inside.x-target.x,inside.z-target.z)>target.radius);
      const ray=new THREE.Raycaster(new THREE.Vector3(inside.x,2,inside.z),new THREE.Vector3(0,-1,0));
      assert.ok(ray.intersectObject(mesh).length>=1,'admitted corner is visibly highlighted');
      const outside=targetWorldPoint(target,u*(shape.halfLength+.01),v*(shape.halfWidth+.01));
      ray.ray.origin.set(outside.x,2,outside.z);assert.equal(ray.intersectObject(mesh).length,0,'highlight stops at the physical enclosure');
    }
    mesh.geometry.dispose();mesh.material.dispose();
  }
});

test('minimap target is the same projected four-corner polygon rather than a fixed-size dot',()=>{
  for(const heading of headings){
    const target={x:12,z:-7,radius:5,heading},calls=[];
    const ctx={beginPath(){calls.push(['begin']);},moveTo(x,y){calls.push(['move',x,y]);},lineTo(x,y){calls.push(['line',x,y]);},closePath(){calls.push(['close']);},fill(){calls.push(['fill']);},stroke(){calls.push(['stroke']);}};
    const project=p=>({x:p.x*2+3,y:p.z*3-4});drawGoalMap(ctx,target,project);
    const actual=calls.filter(c=>c[0]==='move'||c[0]==='line');
    assert.equal(actual.length,4);
    targetFootprint(target).corners.forEach((p,i)=>{const expected=project(p);assert.deepEqual(actual[i],[i?'line':'move',expected.x,expected.y]);});
    assert.ok(calls.some(c=>c[0]==='close'));assert.equal(ctx.fillStyle,'#f9e7a2');
  }
});
