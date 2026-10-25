import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { WaterEffects } from '../src/water-effects.js';
import { createLevel } from '../src/simulation.js';
import { ribbon } from '../src/surfaces.js';

test('river crests add light contrast in every fixed weather tier without filling troughs or tiling seams',()=>{
  const effects=new WaterEffects(new THREE.Scene(),{maxPuddles:0,maxSplashes:0}),level=createLevel(0);
  const points=[{x:0,z:0},{x:0,z:8},{x:8,z:12}],geometry=ribbon(points,4,{y:.018});
  const source=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:'#4b9fae'}));
  effects.setLevel(level,{waterMaterial:source.material,rivers:[{mesh:source,points,width:4}]});
  const overlay=effects.root.children.find(c=>c.name==='River flow'),{data,width:n}=overlay.material.map.image;
  overlay.updateMatrixWorld();
  const at=(x,z)=>{
    const hit=new THREE.Raycaster(new THREE.Vector3(x,10,z),new THREE.Vector3(0,-1,0)).intersectObject(overlay)[0];
    assert.ok(hit,'flow footprint covers actual ribbon');return hit.uv;
  };
  // Sample interpolated GPU attributes on the real unioned ribbon, rather than
  // checking an invented strip. Each leg advances in its own local direction.
  for(const [a,b] of [[at(0,3),at(0,5)],[at(3,9.5),at(5,10.5)]]){
    assert.ok(Math.abs(a.x)<.03&&Math.abs(b.x)<.03,'flow stays centered after a bend');assert.ok(b.y>a.y,'flow arc length increases along each local tangent');
  }
  for(const x of [-1.99,1.99]){
    const hit=new THREE.Raycaster(new THREE.Vector3(x,10,4),new THREE.Vector3(0,-1,0)).intersectObject(overlay)[0];
    assert.ok(!hit||Math.abs(Math.abs(hit.uv.x)-.5)<.01,'physical banks have either no overlay or its transparent texture edge');
  }
  assert.ok(at(.01,8).distanceTo(at(-.01,8))<.02,'interpolated UVs remain continuous across the bend center');
  const position=overlay.geometry.attributes.position,uv=overlay.geometry.attributes.uv,shared=new Map();
  for(let i=0;i<position.count;i++){
    const key=[position.getX(i),position.getY(i),position.getZ(i)].join(','),value=[uv.getX(i),uv.getY(i)];
    if(shared.has(key))assert.deepEqual(value,shared.get(key),'coincident triangle vertices share one UV');else shared.set(key,value);
  }
  assert.equal(position.count,points.length*3,'owned flow uses three shared vertices per centerline station');
  const pixel=(x,y)=>Array.from(data.slice((y*n+x)*4,(y*n+x)*4+4));
  for(let i=0;i<n;i++){assert.deepEqual(pixel(0,i),pixel(n-1,i));assert.deepEqual(pixel(i,0),pixel(i,n-1));}
  let maxAlpha=0,minAlpha=255;for(let i=3;i<data.length;i+=4){maxAlpha=Math.max(maxAlpha,data[i]);minAlpha=Math.min(minAlpha,data[i]);}
  assert.equal(minAlpha,0);assert.ok(maxAlpha>100);
  const rows=new Set();for(let y=0;y<n-1;y++)rows.add(Array.from({length:n},(_,x)=>data[(y*n+x)*4+3]).join(','));assert.ok(rows.size>n*.8,'crests vary across the tile');
  for(const weather of [{type:'sun',daylight:1},{type:'wind',daylight:.8},{type:'rain',rainIntensity:.3},{type:'rain',rainIntensity:.65},{type:'rain',rainIntensity:1}]){
    effects.update(.1,{weather});const base=source.material.color;
    const crest=new THREE.Color(data[0]/255,data[1]/255,data[2]/255).multiply(overlay.material.color),alpha=maxAlpha/255*overlay.material.opacity;
    const composed=base.clone().lerp(crest,alpha),luminance=c=>c.r*.2126+c.g*.7152+c.b*.0722;
    assert.ok(luminance(composed)-luminance(base)>.03,'light crest has meaningful contrast against the actual wet/dry base');
    assert.ok(overlay.material.depthTest&&!overlay.material.depthWrite,'bridges continue to occlude the flow overlay');
  }
  const offset=overlay.material.map.offset.clone(),opacity=overlay.material.opacity;effects.update(.1,{paused:true,weather:{type:'sun'}});assert.deepEqual(overlay.material.map.offset,offset);assert.equal(overlay.material.opacity,opacity);
  effects.dispose();geometry.dispose();source.material.dispose();
});

test('campaign bend centers retain the current and conservative strips stay inside real river ribbons in either orientation',()=>{
  for(const index of [23,48,98])for(const rotated of [false,true]){
    const level=createLevel(index),effects=new WaterEffects(new THREE.Scene(),{maxPuddles:0,maxSplashes:0});
    const rivers=level.rivers.map(r=>{
      const points=r.points.map(p=>rotated?{x:-p.z,z:p.x}:{...p});
      return {...r,points,mesh:new THREE.Mesh(ribbon(points,r.width,{y:.018}),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}))};
    });
    effects.setLevel(level,{rivers});const overlays=effects.root.children.filter(c=>c.name==='River flow');
    for(let ri=0;ri<rivers.length;ri++){
      const {points,mesh}=rivers[ri],overlay=overlays[ri],position=overlay.geometry.attributes.position,indices=overlay.geometry.index;
      mesh.updateMatrixWorld();overlay.updateMatrixWorld();assert.equal(position.count,points.length*3);assert.equal(indices.count,(points.length-1)*12);
      const ray=new THREE.Raycaster();ray.ray.direction.set(0,-1,0);const hitAt=(object,x,z)=>{ray.ray.origin.set(x,10,z);return ray.intersectObject(object)[0];};
      let prior=-Infinity;
      for(let i=1;i<points.length;i++){
        const x=(points[i-1].x+points[i].x)/2,z=(points[i-1].z+points[i].z)/2,hit=hitAt(overlay,x,z);
        assert.ok(hit,`public ${index+1} river ${ri} segment ${i} retains center coverage`);
        assert.ok(Math.abs(hit.uv.x)<.001,`public ${index+1} river ${ri} segment ${i} keeps U=0 on the current`);
        assert.ok(hit.uv.y>prior,'arc length advances through every campaign segment');prior=hit.uv.y;
      }
      // Convex interior samples of every effect triangle remain over the real
      // physical ribbon, including joins. This is geometry evidence, not pixels.
      for(let i=0;i<indices.count;i+=3){
        const a=new THREE.Vector3().fromBufferAttribute(position,indices.getX(i)),b=new THREE.Vector3().fromBufferAttribute(position,indices.getX(i+1)),c=new THREE.Vector3().fromBufferAttribute(position,indices.getX(i+2));
        for(const weights of [[1/3,1/3,1/3],[.8,.1,.1],[.1,.8,.1],[.1,.1,.8]]){
          const p=a.clone().multiplyScalar(weights[0]).addScaledVector(b,weights[1]).addScaledVector(c,weights[2]);assert.ok(hitAt(mesh,p.x,p.z),`public ${index+1} river ${ri} effect remains inside source banks`);
        }
      }
      mesh.geometry.dispose();mesh.material.dispose();
    }
    effects.dispose();
  }
});

test('duplicate-only centerline falls back safely without leaking source geometry',()=>{
  const effects=new WaterEffects(new THREE.Scene(),{maxPuddles:0,maxSplashes:0}),source=new THREE.Mesh(ribbon([{x:0,z:0},{x:0,z:8}],4),new THREE.MeshBasicMaterial());
  let disposed=0;source.geometry.addEventListener('dispose',()=>disposed++);
  assert.doesNotThrow(()=>effects.setLevel(createLevel(0),{rivers:[{mesh:source,points:[{x:0,z:0},{x:0,z:0}],width:4}]}));
  effects.dispose();assert.equal(disposed,0);source.geometry.dispose();source.material.dispose();
});
