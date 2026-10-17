import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createTreeWood, deformTreeGeometry, configureTreeMaterial} from '../src/tree-geometry.js';

const point = (attribute, id) => new THREE.Vector3().fromBufferAttribute(attribute, id);

function surface(geometry) {
  const p=geometry.attributes.position,indices=geometry.index.array,edges=new Map(),neighbors=Array.from({length:p.count},()=>new Set()),triangles=[];
  let volume=0;
  for(let k=0;k<indices.length;k+=3){
    const ids=[...indices.slice(k,k+3)],points=ids.map(id=>point(p,id));
    assert.ok(points[1].clone().sub(points[0]).cross(points[2].clone().sub(points[0])).lengthSq()>1e-12,`triangle ${k/3} has nonzero area`);
    volume+=points[0].dot(points[1].clone().cross(points[2]))/6;
    triangles.push({ids,points,box:new THREE.Box3().setFromPoints(points)});
    for(let j=0;j<3;j++){
      const a=ids[j],b=ids[(j+1)%3],key=[a,b].sort((a,b)=>a-b).join(':');
      if(!edges.has(key))edges.set(key,[]);
      edges.get(key).push([a,b]);neighbors[a].add(b);neighbors[b].add(a);
    }
  }
  for(const [key,pair]of edges){
    assert.equal(pair.length,2,`edge ${key} is shared by exactly two triangles`);
    assert.equal(pair[0][0],pair[1][1],`edge ${key} has opposite winding`);
    assert.equal(pair[0][1],pair[1][0]);
  }
  const visited=new Set([0]),queue=[0];
  while(queue.length)for(const id of neighbors[queue.pop()])if(!visited.has(id)){visited.add(id);queue.push(id);}
  assert.equal(visited.size,p.count,'all wood vertices belong to a single welded surface');
  assert.equal(p.count-edges.size+triangles.length,2,'wood is one closed genus-zero surface without hidden shells');
  assert.ok(volume>0,'closed surface faces outward');
  return triangles;
}

function noIntersections(triangles){
  const ray=new THREE.Ray(),hit=new THREE.Vector3();
  for(let i=0;i<triangles.length;i++)for(let j=i+1;j<triangles.length;j++){
    const a=triangles[i],b=triangles[j];
    if(a.ids.some(id=>b.ids.includes(id))||!a.box.intersectsBox(b.box))continue;
    for(const [edge,face]of [[a,b],[b,a]])for(let k=0;k<3;k++){
      ray.origin.copy(edge.points[k]);ray.direction.copy(edge.points[(k+1)%3]).sub(ray.origin);
      const length=ray.direction.length();ray.direction.normalize();
      if(ray.intersectTriangle(...face.points,false,hit)){
        const distance=hit.distanceTo(ray.origin);
        assert.ok(distance<1e-7||distance>length-1e-7,`non-neighbor triangles ${i}/${j} must not cross`);
      }
    }
  }
}

test('every wood variant remains one closed welded surface at all supported widths',()=>{
  for(let variant=0;variant<3;variant++)for(const width of [.7,.731,.8,.867,.9,1]){
    const geometry=deformTreeGeometry(createTreeWood(variant),width);
    noIntersections(surface(geometry));
    geometry.dispose();
  }
});

test('forks begin at mid-trunk, share trunk indices, curve and taper progressively',()=>{
  for(let variant=0;variant<3;variant++){
    const geometry=createTreeWood(variant),{forks,trunkProfile,trunkRings}=geometry.userData;
    assert.equal(forks.length,4);
    assert.ok(forks[0].point[1]/3.12>=.49&&forks[0].point[1]/3.12<=.51);
    for(let i=1;i<forks.length;i++)assert.ok(forks[i].point[1]-forks[i-1].point[1]>.3);
    for(let i=1;i<trunkProfile.length;i++){
      assert.ok(trunkProfile[i].y>trunkProfile[i-1].y);
      assert.ok(trunkProfile[i].r<trunkProfile[i-1].r,'trunk tapers rather than acquiring collars');
      assert.ok((trunkProfile[i-1].r-trunkProfile[i].r)/(trunkProfile[i].y-trunkProfile[i-1].y)<.4,'radius has no abrupt step');
    }
    const index=geometry.index.array;
    for(const fork of forks){
      assert.equal(fork.parentRing,trunkRings[fork.lower]);
      assert.equal(fork.continuingRing,trunkRings[fork.lower+1]);
      const branchIds=new Set(fork.branchRings[0].indices);
      for(const ring of [fork.parentRing,fork.continuingRing])assert.ok([...index].some((id,k)=>k%3===0&&[...index.slice(k,k+3)].some(n=>ring.includes(n))&&[...index.slice(k,k+3)].some(n=>branchIds.has(n))),'fork bridge uses actual shared trunk vertices');
      const directions=[];
      for(let i=1;i<fork.branchRings.length;i++){
        const a=fork.branchRings[i-1],b=fork.branchRings[i];
        assert.ok(b.radius<a.radius);
        directions.push(new THREE.Vector3(...b.center).sub(new THREE.Vector3(...a.center)).normalize());
      }
      assert.ok(directions[0].angleTo(directions.at(-1))>.1,'branch bends along its length');
    }
    assert.ok(Math.abs(geometry.attributes.treeCenter.getX(trunkRings[4][0]))>.02,'trunk centerline has a slight bend');
  }
});

test('shader deformation uses exact smooth normals of the deformed connected mesh',()=>{
  const material=new THREE.MeshStandardMaterial();configureTreeMaterial(material);
  const shader={vertexShader:THREE.ShaderLib.standard.vertexShader,fragmentShader:THREE.ShaderLib.standard.fragmentShader,uniforms:{}};
  material.onBeforeCompile(shader);
  assert.equal(shader.uniforms.treeWidth,material.userData.treeWidth);
  assert.match(shader.vertexShader,/woodWidth = treeInstanceWidth;/);
  assert.match(shader.vertexShader,/transformed = treeCenter \+ woodWidth \* \(position - treeCenter\)/);
  assert.doesNotMatch(shader.vertexShader,/#include <beginnormal_vertex>|#include <begin_vertex>/);
  for(let variant=0;variant<3;variant++)for(const width of [.7,.743,.8,.9,1]){
    const geometry=createTreeWood(variant),deformed=deformTreeGeometry(geometry,width),attrs=geometry.attributes;
    for(let i=0;i<attrs.position.count;i++){
      const shaderNormal=point(attrs.treeNormal0,i).addScaledVector(point(attrs.treeNormal1,i),width).addScaledVector(point(attrs.treeNormal2,i),width*width).normalize();
      assert.ok(shaderNormal.distanceTo(point(deformed.attributes.normal,i))<2e-5,`shader and actual deformed area-weighted normal match at vertex ${i}`);
      const shaderPosition=point(attrs.treeCenter,i).addScaledVector(point(attrs.position,i).sub(point(attrs.treeCenter,i)),width);
      assert.ok(shaderPosition.distanceTo(point(deformed.attributes.position,i))<3e-7);
    }
    deformed.dispose();
  }
});


test('exposed wood and fork transitions have no opposing smooth corner normals',()=>{
  // A welded surface can still pinch: testing normals only against a recomputed
  // copy misses folds whose incident faces disagree with their shared normal.
  for(let variant=0;variant<3;variant++)for(const width of [.7,.731,.8,.867,.9,1]){
    const geometry=deformTreeGeometry(createTreeWood(variant),width),p=geometry.attributes.position,n=geometry.attributes.normal,indices=geometry.index.array;
    for(let k=0;k<indices.length;k+=3){
      const ids=[...indices.slice(k,k+3)],vertices=ids.map(id=>point(p,id));
      const faceNormal=vertices[1].clone().sub(vertices[0]).cross(vertices[2].clone().sub(vertices[0])).normalize();
      // The closing base cap is below soil; check every exposed corner.
      for(const id of ids)if(p.getY(id)>0)assert.ok(faceNormal.dot(point(n,id))>.08,`variant ${variant}, width ${width}: fork face ${k/3} and corner ${id} have compatible outward normals`);
    }
    geometry.dispose();
  }
});
