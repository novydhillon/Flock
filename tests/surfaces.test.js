import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {ribbon,roadRibbon,roadNetwork,createRoadMaterial,barkSurface} from '../src/surfaces.js';
import {createLevel} from '../src/simulation.js';
import {createBridge} from '../src/models.js';
import {MeadowRenderer} from '../src/render.js';
import { terrainHeight, groundHeight, bridgeSurfaceHeight } from '../src/world.js';

const cross=(a,b,c)=>(b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x);
test('road terminals are rounded with gradual bounded coverage; water keeps square ends',()=>{
  for(const points of [[{x:0,z:0},{x:0,z:20}],[{x:0,z:0},{x:0,z:1}],[{x:0,z:0},{x:0,z:8},{x:8,z:8}]]){
    const geometry=roadRibbon(points,3),p=geometry.attributes.position,alpha=geometry.attributes.roadOpacity;
    assert.equal(alpha.count,p.count);assert.ok(p.count>0);
    assert.ok([...alpha.array].every(v=>v>=0&&v<=1));
    assert.ok([...alpha.array].some(v=>v>.05&&v<.95),'fade has intermediate coverage');
    assert.ok([...alpha.array].some(v=>v<.02),'terminal reaches grass');
    assert.ok([...p.array].every(Number.isFinite));geometry.dispose();
  }
  const water=ribbon([{x:0,z:0},{x:0,z:20}],3);water.computeBoundingBox();assert.equal(water.boundingBox.min.z,0);assert.equal(water.boundingBox.max.z,20);assert.equal(water.attributes.roadOpacity,undefined);water.dispose();
});
test('road fade composes existing shading and keeps depth without changing shared materials',()=>{
  const source=new THREE.MeshStandardMaterial({transparent:true,opacity:.36,depthWrite:false});
  source.onBeforeCompile=shader=>{shader.uniforms.existing={value:2};};source.customProgramCacheKey=()=> 'existing';
  const road=createRoadMaterial(source),shader={uniforms:{},vertexShader:'#include <begin_vertex>',fragmentShader:'#include <alphahash_fragment>'};road.onBeforeCompile(shader);
  assert.equal(shader.uniforms.existing.value,2);assert.match(shader.vertexShader,/vRoadOpacity = roadOpacity/);assert.match(shader.fragmentShader,/diffuseColor.a \*=/);
  assert.equal(road.alphaHash,true);assert.equal(road.depthWrite,true);assert.equal(road.transparent,false);assert.equal(source.transparent,true);assert.equal(source.depthWrite,false);assert.match(road.customProgramCacheKey(),/existing/);road.dispose();source.dispose();
});
function triangles(geometry){
  const p=geometry.getAttribute('position'),result=[];
  for(let i=0;i<Math.min(p.count,geometry.drawRange.count);i+=3)result.push([0,1,2].map(j=>({x:p.getX(i+j),y:p.getY(i+j),z:p.getZ(i+j)})));
  return result;
}
function overlap(a,b){
  let polygon=a;
  for(let i=0;i<3;i++){
    const c=b[i],d=b[(i+1)%3],next=[];
    for(let j=0;j<polygon.length;j++){
      const p=polygon[j],q=polygon[(j+1)%polygon.length],dp=cross(c,d,p),dq=cross(c,d,q);
      if(dp<=0)next.push(p);
      if(dp*dq<0){const t=dp/(dp-dq);next.push({x:p.x+(q.x-p.x)*t,z:p.z+(q.z-p.z)*t});}
    }
    polygon=next;
  }
  return Math.abs(polygon.reduce((sum,p,i)=>sum+p.x*polygon[(i+1)%polygon.length].z-p.z*polygon[(i+1)%polygon.length].x,0))/2;
}
function coverageAt(geometry,p){
  const ts=triangles(geometry),alpha=geometry.attributes.roadOpacity;
  for(let i=0;i<ts.length;i++){
    const [a,b,c]=ts[i],area=cross(a,b,c),weights=[cross(p,b,c)/area,cross(a,p,c)/area,cross(a,b,p)/area];
    if(weights.every(w=>w>=-1e-6&&w<=1+1e-6))return weights.reduce((sum,w,j)=>sum+w*alpha.getX(i*3+j),0);
  }
  return null;
}
test('rounded road reversals cover the outer bend and retain a circular silhouette',()=>{
  for(const x of [0,.25,1]){
    const geometry=roadRibbon([{x:0,z:0},{x:0,z:8},{x,z:0}],3);
    // The former bevel fan stopped at z=8, making a hard squared turn.
    assert.ok(coverageAt(geometry,{x:0,z:9.25})>.99,'hairpin has full rounded outer coverage');
    assert.equal(coverageAt(geometry,{x:-1.4,z:9.4}),null,'round tip does not fill a square corner');
    for(const t of triangles(geometry))assert.ok(cross(...t)<-1e-10,'round fan remains upward and nondegenerate');
    geometry.dispose();
  }
});
test('shared road endings form a single round union with interior coverage and no stacked layers',()=>{
  const roads=[{points:[{x:-8,z:0},{x:0,z:0}],width:3},{points:[{x:0,z:-8},{x:0,z:8}],width:3},{points:[{x:8,z:8},{x:0,z:0}],width:3}];
  const geometry=roadNetwork(roads),ts=triangles(geometry);
  assert.ok(coverageAt(geometry,{x:0,z:0})>.99,'another continuing road prevents a dim terminal seam');
  for(const p of [{x:-1.2,z:0},{x:0,z:-1.2},{x:.9,z:.9}])assert.ok(coverageAt(geometry,p)>.99,'shared junction stays filled');
  for(let i=0;i<ts.length;i++)for(let j=i+1;j<ts.length;j++)assert.ok(overlap(ts[i],ts[j])<2e-5,'network triangles cannot stack at a shared end');
  const single=roadRibbon(roads[0].points,3);assert.ok(coverageAt(single,{x:0,z:0})<.5,'standalone endpoint retains the accepted grass fade');
  const again=roadNetwork(roads);assert.deepEqual([...again.attributes.position.array],[...geometry.attributes.position.array]);assert.deepEqual([...again.attributes.roadOpacity.array],[...geometry.attributes.roadOpacity.array]);
  geometry.dispose();single.dispose();again.dispose();
});
test('opposite and branching shared endpoints remain solid while an exposed dead-end rim fades',()=>{
  const road=(x,z)=>({points:[{x,z},{x:0,z:0}],width:3});
  for(const roads of [[road(-8,0),road(8,0)],[road(-8,0),road(0,-8)],[road(-8,0),road(8,0),road(0,-8),road(0,8)]]){
    const geometry=roadNetwork(roads);
    assert.ok(coverageAt(geometry,{x:0,z:0})>.99,'connected endpoints cannot dim the junction centre');
    assert.ok(coverageAt(geometry,{x:.4,z:.4})>.99,'junction interior stays filled across endpoint fans');
    geometry.dispose();
  }
  const ending=roadNetwork([road(-8,0),road(0,-8)]);
  assert.ok(coverageAt(ending,{x:.95,z:.95})<.8,'exposed circular rim still fades into grass');
  assert.equal(coverageAt(ending,{x:1.4,z:1.4}),null,'shared ending stays round rather than square');ending.dispose();
});
test('dense curved road samples retain centreline coverage and bounded stroke width after visual simplification',()=>{
  const points=Array.from({length:301},(_,i)=>({x:Math.sin(i*.035)*1.5,z:i*.12})),width=3;
  const geometry=roadNetwork([{points,width}],{ragged:false});
  for(let i=30;i<points.length-30;i+=3)assert.ok(coverageAt(geometry,points[i])>.99,'physical centreline remains inside the road');
  const p=geometry.attributes.position;
  for(let i=0;i<p.count;i++){
    const v={x:p.getX(i),z:p.getZ(i)};let distance=Infinity;
    for(let j=1;j<points.length;j++){const a=points[j-1],b=points[j],dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((v.x-a.x)*dx+(v.z-a.z)*dz)/(dx*dx+dz*dz)));distance=Math.min(distance,Math.hypot(v.x-a.x-t*dx,v.z-a.z-t*dz));}
    assert.ok(distance<=width/2+.026,'stroke never moves more than 2.5cm outside the physical swept width');
  }
  geometry.dispose();
});
function checkRibbon(points,width,options){
  const geometry=ribbon(points,width,options),ts=triangles(geometry);
  assert.ok(ts.length>0);
  for(const t of ts){assert.ok(t.flatMap(p=>[p.x,p.y,p.z]).every(Number.isFinite));assert.ok(cross(...t)<-1e-10,'consistent nondegenerate upward winding');}
  const boxes=ts.map(t=>({minX:Math.min(...t.map(p=>p.x)),maxX:Math.max(...t.map(p=>p.x)),minZ:Math.min(...t.map(p=>p.z)),maxZ:Math.max(...t.map(p=>p.z))}));
  for(let i=0;i<ts.length;i++)for(let j=i+1;j<ts.length;j++){
    const a=boxes[i],b=boxes[j];if(a.maxX<=b.minX||b.maxX<=a.minX||a.maxZ<=b.minZ||b.maxZ<=a.minZ)continue;
    assert.ok(overlap(ts[i],ts[j])<2e-5,`triangles ${i}/${j} overlap`);
  }
  for(let i=1;i<points.length;i++)for(const f of [.01,.25,.5,.75,.99]){
    const p={x:points[i-1].x*(1-f)+points[i].x*f,z:points[i-1].z*(1-f)+points[i].z*f};
    assert.ok(ts.some(t=>t.every((a,j)=>cross(a,t[(j+1)%3],p)<=1e-5)),'continuous centerline coverage');
  }
  geometry.dispose();return ts.length;
}
test('ribbon union has no stacked or inverted triangles at corners, reversals and crossings',()=>{
  for(const points of [
    [{x:0,z:0},{x:0,z:4},{x:4,z:4}],
    [{x:0,z:0},{x:0,z:4},{x:.2,z:0},{x:4,z:4},{x:0,z:4}],
    [{x:0,z:0},{x:0,z:0},{x:1,z:0},{x:0,z:0}],
    [{x:0,z:0},{x:8,z:8},{x:0,z:8},{x:8,z:0}],
  ])for(const reverse of [false,true])checkRibbon(reverse?[...points].reverse():points,2,{ragged:true});
});
test('default levels 4 and 8 and alternate seeds retain coverage without coplanar overlap',()=>{
  for(const index of [3,7])for(const seed of [undefined,1,9182]){
    const level=createLevel(index,seed);
    for(const road of level.roads){const count=checkRibbon(road.points,road.width,{ragged:true,seed:level.seed});assert.ok(count<road.points.length*12,'union remains a bounded mesh');}
  }
});
test('perpendicular bridge approach slivers retain coverage and upward normals after Float32 storage',()=>{
  // These sweep columns collapsed to zero-width GPU triangles in actual level
  // meshes, although their double-precision areas passed the triangulator.
  const columns=[
    [3,9182,0,-8.988211631774902,2.9118611812591553,7.00779914855957],
    [7,1,1,5.119338035583496,1.3559695482254028,12.622101783752441],
    [7,9182,0,-16.991424560546875,-1.34243905544281,3.4677858352661133],
    [7,9182,1,-13.759108543395996,-35.53551483154297,-30.763782501220703],
    [7,9182,1,-13.53331184387207,-35.558467864990234,-30.726289749145508],
  ];
  for(const [index,seed,roadIndex,x,low,high] of columns){
    const level=createLevel(index,seed),road=level.roads[roadIndex];
    const geometry=ribbon(road.points,road.width,{ragged:true,seed}),ts=triangles(geometry),normals=geometry.getAttribute('normal');
    for(const t of ts)assert.ok(cross(...t)<-1e-10,'stored triangles have positive rendered area');
    for(let i=0;i<normals.count;i++)assert.ok(normals.getY(i)>.999,'every stored face has an upward lighting/shadow normal');
    // Check both neighboring slabs and the shared column across the road's
    // interior width, so discarding collapsed faces cannot open a visible gap.
    for(const offset of [-1e-5,0,1e-5])for(const f of [.1,.5,.9]){
      const p={x:x+offset,z:low+(high-low)*f};
      assert.ok(ts.some(t=>t.every((a,j)=>cross(a,t[(j+1)%3],p)<=1e-7)),`level ${index+1} seed ${seed} road ${roadIndex} covers Float32 column`);
    }
    geometry.dispose();
  }
});

test('bark triangles stay above actual bridge planks across centers, ends and approaches',()=>{
  globalThis.document={createElement:()=>({getContext:()=>({createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),putImageData(){}})})};
  for(const index of [3,7]){
    const level=createLevel(index);
    for(const bridge of level.rivers.flatMap(r=>r.bridges)){
      const support = level.terrain?.enabled ? (x, z) => bridgeSurfaceHeight(level, bridge,
        bridge.x + Math.cos(bridge.heading) * x + Math.sin(bridge.heading) * z,
        bridge.z - Math.sin(bridge.heading) * x + Math.cos(bridge.heading) * z) : null;
      const model=createBridge(bridge.width,bridge.length,support);model.rotation.y=bridge.heading;model.position.set(bridge.x,0,bridge.z);model.updateMatrixWorld(true);
      for(const along of [-bridge.length/2-1,-bridge.length/2,0,bridge.length/2,bridge.length/2+1])for(const scale of [1,3.5,7]){
        const origin={x:bridge.x+Math.sin(bridge.heading)*along,z:bridge.z+Math.cos(bridge.heading)*along},geometry=barkSurface(level,origin,scale);
        for(const triangle of triangles(geometry))for(const weights of [[1/3,1/3,1/3],[.8,.1,.1],[.1,.8,.1],[.1,.1,.8]]){
          const p=triangle.reduce((p,v,i)=>({x:p.x+v.x*weights[i],y:p.y+v.y*weights[i],z:p.z+v.z*weights[i]}),{x:0,y:0,z:0});
          const ray=new THREE.Raycaster(new THREE.Vector3(p.x,terrainHeight(level,p.x,p.z)+.03,p.z),new THREE.Vector3(0,-1,0));
          const deck=ray.intersectObject(model,true)[0];
          if(deck)assert.ok(p.y>deck.point.y+.015,`bark ${p.y} clears rendered deck ${deck.point.y}; level=${index} along=${along} scale=${scale} x=${p.x} z=${p.z} support=${terrainHeight(level,p.x,p.z)}`);
          else assert.ok(p.y >= terrainHeight(level,p.x,p.z)+.015,'land clears supported roads and ground');
        }
        geometry.dispose();
      }
    }
  }
});
test('bark rings follow rolling hills and retain bounds throughout expansion', () => {
  for (const index of [5, 19, 99]) {
    let level;
    for (let seed = 200; seed < 220; seed++) {
      const candidate = createLevel(index, seed);
      if (candidate.terrain.enabled) { level = candidate; break; }
    }
    assert.ok(level, 'rolling fixture exists');
    const geometry = new THREE.BufferGeometry();
    for (const scale of [1, 3.5, 7]) {
      barkSurface(level, level.spawn, scale, geometry);
      const positions = geometry.attributes.position;
      for (let i = 0; i < geometry.drawRange.count; i++) {
        const point = new THREE.Vector3().fromBufferAttribute(positions, i);
        assert.ok(Math.abs(point.y - groundHeight(level, point.x, point.z) - .04) < 1e-6,
          'hill feedback stays just above its actual support');
        assert.ok(geometry.boundingSphere.containsPoint(point), 'expanded height remains inside culling bounds');
      }
    }
    geometry.dispose();
  }
});

test('bark preserves depth occlusion and freezes on pause with bounded disposable effects',()=>{
  const renderer=Object.create(MeadowRenderer.prototype);renderer.level=createLevel(7);renderer.level.terrain.enabled=false;renderer.dog=new THREE.Object3D();renderer.actors=new THREE.Group();renderer.barkEffects=[];
  renderer.bark();const effect=renderer.barkEffects[0],mesh=effect.mesh;
  assert.equal(mesh.material.depthTest,true);assert.equal(mesh.material.depthWrite,false);
  assert.equal(mesh.userData.ownedGeometry,true);assert.equal(mesh.userData.ownedMaterial,true);
  const before=[...mesh.geometry.attributes.position.array];renderer.updateBarks(0);assert.equal(effect.age,0);assert.deepEqual([...mesh.geometry.attributes.position.array],before);
  let geometryDisposed=0,materialDisposed=0;mesh.geometry.addEventListener('dispose',()=>geometryDisposed++);mesh.material.addEventListener('dispose',()=>materialDisposed++);
  renderer.updateBarks(.6);assert.equal(renderer.barkEffects.length,0);assert.equal(renderer.actors.children.length,0);assert.equal(geometryDisposed,1);assert.equal(materialDisposed,1);
  for(let i=0;i<20;i++)renderer.bark();assert.equal(renderer.barkEffects.length,4);assert.equal(renderer.actors.children.length,4);
  // Compare actual ray distances from the game's raised camera direction.
  const ring=renderer.barkEffects[0].mesh,rail=new THREE.Mesh(new THREE.BoxGeometry(4,.1,.1),new THREE.MeshBasicMaterial());rail.position.set(0,.69,-.356);rail.updateMatrixWorld(true);ring.updateMatrixWorld(true);
  const ray=new THREE.Raycaster(new THREE.Vector3(0,4,3),new THREE.Vector3(0,-3.945,-4).normalize());
  const hits=ray.intersectObjects([ring,rail]);assert.ok(hits.some(hit=>hit.object===ring),'camera ray also intersects ring behind rail');assert.equal(hits[0]?.object,rail,'raised fence rail occludes the ring by ordinary depth');
});
