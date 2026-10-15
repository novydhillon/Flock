import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import * as THREE from 'three';
import * as models from '../src/models.js';
import {createLevel} from '../src/simulation.js';
import {terrainHeight,targetFootprint,targetWorldPoint,containsTarget,gateSegment} from '../src/world.js';
import {goalSurface,goalOutline,drawGoalMap} from '../src/goal-view.js';
import {generateBushClusters} from '../src/vegetation.js';
import {setTailLightBarking} from '../src/tail-light.js';
import {WaterEffects} from '../src/water-effects.js';
import {MeadowNature} from '../src/nature.js';
import {ribbon,barkSurface} from '../src/surfaces.js';
import {createGateView,createStoneWallView} from '../src/gate-view.js';
import {StructureCutaway} from '../src/cutaway.js';

// This exercises actual scene/model/matrix construction. It substitutes the
// GPU and Canvas drawing surface; it is not a rendered-pixel or FPS test.
function setup({width=390,height=844}={}){
  const draw=new Proxy({createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),createRadialGradient:()=>({addColorStop(){}}),createLinearGradient:()=>({addColorStop(){}})},{get:(t,k)=>t[k]||(()=>{})});
  const document={createElement:()=>({width:0,height:0,getContext:()=>draw})};
  globalThis.document=document;
  class GPUStub{constructor(){this.shadowMap={};}setPixelRatio(){}setSize(){}render(scene){scene.updateMatrixWorld(true);}}
  const source=readFileSync(new URL('../src/render.js',import.meta.url),'utf8').replace(/^import .*;\s*$/gm,'').replace(/^export /gm,'');
  const context={THREE:{...THREE,WebGLRenderer:GPUStub},...models,createGateView,createStoneWallView,gateSegment,terrainHeight,targetFootprint,goalSurface,goalOutline,drawGoalMap,WaterEffects,generateBushClusters,setTailLightBarking,MeadowNature,ribbon,barkSurface,StructureCutaway,document,innerWidth:width,innerHeight:height,devicePixelRatio:2,performance:{now:()=>1000},requestAnimationFrame(){}};
  vm.runInNewContext(`${source}\nglobalThis.renderer=new MeadowRenderer({});`,context);
  return context.renderer;
}

// P2 adds fixed wildlife anatomy batches and 20 dormant puddle/splash objects.
// Object count includes hidden pool slots; submitted draw budget remains 170.
test('portrait scene builds articulated instance poses and finite camera matrices',()=>{
  const renderer=setup();
  for(const index of [0,1,3,8,20,23,99]){
    const level=createLevel(index),dog={...level.dog,heading:0};renderer.setLevel(level);
    assert.equal(renderer.atmosphere,undefined,'deferred cloud atmosphere is not part of the runtime renderer');
    const weatherObjects=[];renderer.scene.traverse(o=>{if(/cloud|atmosphere|shadow/i.test(`${o.name} ${o.type}`)&&o!==renderer.sun.shadow.camera&&o!==renderer.sun.shadow)weatherObjects.push(o);});
    assert.deepEqual(weatherObjects,[],'level rebuilds do not add visible cloud or cloud-shadow objects');
    renderer.update(level,dog,1/60,false);
    if(index===8||index===23){
      const rain=renderer.scene.getObjectByName('Visible rain');
      assert.ok(rain,'rain view remains in the scene without the deferred atmosphere');
      assert.ok(rain.children[0].geometry.attributes.position,'rain geometry is retained without the deferred atmosphere');
      assert.ok([...rain.children[0].geometry.attributes.position.array].every(Number.isFinite),'rain positions remain finite without the deferred atmosphere');
    }
    const firstLimb=renderer.animalBatches[0].meshes.find(m=>m.userData.limbIndex!==undefined);
    const neutral=[...firstLimb.instanceMatrix.array];
    level.animals.forEach(a=>{a.vx=2;a.vz=1;});renderer.update(level,dog,1/12,false);
    assert.equal(renderer.dog.rotation.y,0,'north heading remains valid');
    assert.ok(renderer.camera.projectionMatrix.elements.every(Number.isFinite));
    assert.ok(Number.isFinite(renderer.sun.intensity)&&Number.isFinite(renderer.hemisphere.intensity));
    for(const color of [renderer.scene.background,renderer.scene.fog.color])assert.ok([color.r,color.g,color.b].every(Number.isFinite));
    assert.ok(renderer.camera.matrixWorld.elements.every(Number.isFinite));
    const limbs=renderer.animalBatches.flatMap(batch=>batch.meshes).filter(m=>m.userData.limbIndex!==undefined);
    assert.equal(limbs.length,index>=3?16:8);
    for(const m of limbs)assert.ok([...m.instanceMatrix.array].every(Number.isFinite));
    assert.notDeepEqual([...firstLimb.instanceMatrix.array],neutral,'walking moves the articulated legs');
    const draws=[];renderer.scene.traverse(o=>{if(o.isMesh)draws.push(o);});
    assert.ok(draws.length<310,`scene remains batched: ${draws.length}`);
  }
});

test('changing levels disposes world resources without disposing cached animal geometry',()=>{
  const renderer=setup(),level=createLevel(0);renderer.setLevel(level);
  let worldDisposed=0,animalDisposed=0,fenceDisposed=0;const worldGeometries=new Set();
  renderer.fenceParts.forEach(p=>p.geometry.addEventListener('dispose',()=>fenceDisposed++));
  renderer.terrain.traverse(o=>{if(o.userData.ownedGeometry)worldGeometries.add(o.geometry);});
  worldGeometries.forEach(geometry=>geometry.addEventListener('dispose',()=>worldDisposed++));
  renderer.animalBatches[0].meshes[0].geometry.addEventListener('dispose',()=>animalDisposed++);
  renderer.bark();let barkDisposed=0;renderer.barkEffects[0].mesh.material.addEventListener('dispose',()=>barkDisposed++);
  renderer.celebrate(level.target.x,level.target.z);
  let confettiDisposed=0;renderer.particles.forEach(p=>p.mesh.geometry.addEventListener('dispose',()=>confettiDisposed++));
  renderer.setLevel(createLevel(1));
  assert.equal(barkDisposed,1);assert.equal(renderer.barkEffects.length,0);
  assert.ok(worldGeometries.size>0);assert.equal(worldDisposed,worldGeometries.size);assert.equal(confettiDisposed,36);assert.equal(animalDisposed,0);assert.equal(fenceDisposed,0);
  const a=models.createFlowerPatch(1,3),b=models.createFlowerPatch(7,3);
  assert.equal(a.children[0].geometry,b.children[0].geometry,'flower variants reuse bounded geometry');
});

test('actual barn panels reveal Pip and dispose their private materials on level replacement',()=>{
  const renderer=setup(),level=createLevel(2),target=level.target;
  const collision=JSON.stringify(level.fenceSegments);renderer.setLevel(level);
  const controller=renderer.cutaway;
  assert.ok(controller.parts.length>12,'complete roof and segmented walls exist');
  level.dog.x=target.x;level.dog.z=target.z;
  for(let i=0;i<60;i++)renderer.update(level,level.dog,1/60);
  assert.ok(controller.parts.some(p=>p.material.opacity===.7),'Pip has a visible cutaway');
  assert.ok(controller.parts.some(p=>p.material.opacity===1),'unrelated structure stays opaque');
  assert.equal(JSON.stringify(level.fenceSegments),collision,'visibility never changes collision');
  assert.equal(renderer.materials.barn.opacity,1);assert.equal(renderer.materials.roof.opacity,1);
  const count=controller.parts.length;let disposed=0;
  for(const part of controller.parts)part.material.addEventListener('dispose',()=>disposed++);
  renderer.setLevel(createLevel(0));
  assert.equal(disposed,count);assert.equal(controller.disposed,true);assert.equal(renderer.cutaway,null);
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


function sceneBudget(renderer){
  renderer.scene.updateMatrixWorld(true);renderer.camera.updateMatrixWorld(true);
  const frustum=new THREE.Frustum().setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(renderer.camera.projectionMatrix,renderer.camera.matrixWorldInverse));
  const result={objects:0,draws:0,triangles:0,sceneryInstances:0,sceneryTriangles:0};
  renderer.scene.traverse(o=>{if(o.isMesh)result.objects++;});
  renderer.scene.traverseVisible(o=>{
    if(!o.isMesh||o.frustumCulled&&!frustum.intersectsObject(o))return;
    const count=o.isInstancedMesh?o.count:1;if(!count)return;
    result.draws++;result.triangles+=(o.geometry.index?.count||o.geometry.attributes.position.count)/3*count;
  });
  for(const {batch} of renderer.sceneryBatches){result.sceneryInstances+=batch.count;result.sceneryTriangles+=(batch.geometry.index?.count||batch.geometry.attributes.position.count)/3*batch.count;}
  return result;
}

test('mobile scenery submissions remain bounded as the world grows',t=>{
  const renderer=setup();
  for(const index of [0,5,19,49,99]){
    const level=createLevel(index),start=performance.now();renderer.setLevel(level);
    const budget=sceneBudget(renderer),elapsed=performance.now()-start;
    t.diagnostic(`level ${index+1}: ${JSON.stringify(budget)}; scene setup ${Math.round(elapsed)} ms`);
    assert.ok(budget.objects<310);assert.ok(budget.draws<170);
    assert.ok(budget.sceneryTriangles<45000,`nearby scenery triangle budget: ${budget.sceneryTriangles}`);
    const total=renderer.sceneryBatches.reduce((n,v)=>n+v.bounds.length/4,0);
    assert.ok(budget.sceneryInstances<total*.5,'offscreen static instances are omitted from GPU submissions');
  }
});

test('static instance culling retains visible geometry across travel, rotation and aspect changes',()=>{
  const renderer=setup(),sphere=new THREE.Sphere();
  for(const seed of [0,1]){
    const level=createLevel(19,seed);renderer.setLevel(level);
    for(const aspect of [390/844,844/390]){
      renderer.camera.left=-19.5*aspect;renderer.camera.right=19.5*aspect;renderer.camera.top=19.5;renderer.camera.bottom=-19.5;renderer.camera.updateProjectionMatrix();
      const road=level.roads[0].points;
      for(const point of [level.spawn,road[Math.floor(road.length/2)],level.target])for(const angle of [0,Math.PI/2]){
        renderer.camera.position.set(point.x+Math.sin(angle)*29,36,point.z+Math.cos(angle)*29);
        renderer.camera.lookAt(point.x,0,point.z);renderer.cullScenery();
        const frustum=renderer.sceneryFrustum;
        for(const {batch,matrices,bounds} of renderer.sceneryBatches){
          const submitted=new Set();
          for(let i=0;i<batch.count;i++)submitted.add(batch.instanceMatrix.array.subarray(i*16,(i+1)*16).join(','));
          for(let i=0;i<bounds.length;i+=4){
            sphere.center.set(bounds[i],bounds[i+1],bounds[i+2]);sphere.radius=bounds[i+3];
            if(frustum.intersectsSphere(sphere))assert.ok(submitted.has(matrices.subarray(i*4,i*4+16).join(',')),'every visible original instance is submitted');
          }
          assert.equal(batch.visible,batch.count>0);
        }
        const before=renderer.sceneryBatches.map(({batch})=>[batch.count,[...batch.instanceMatrix.array.slice(0,batch.count*16)]]);
        const position=renderer.camera.position.clone(),quaternion=renderer.camera.quaternion.clone();
        renderer.camera.position.add(new THREE.Vector3(10000,0,10000));renderer.cullScenery();
        assert.ok(renderer.sceneryBatches.every(({batch})=>!batch.visible&&batch.count===0));
        renderer.camera.position.copy(position);renderer.camera.quaternion.copy(quaternion);renderer.cullScenery();
        renderer.sceneryBatches.forEach(({batch},i)=>{assert.equal(batch.count,before[i][0]);assert.deepEqual([...batch.instanceMatrix.array.slice(0,batch.count*16)],before[i][1],'returning to a view restores exact poses');});
      }
    }
  }
});

test('shared fence instances preserve collision endpoints, post spacing and near-edge shadows',()=>{
  const renderer=setup(),level=createLevel(99);renderer.setLevel(level);
  const posts=renderer.sceneryBatches.find(({batch})=>batch.geometry===renderer.fenceParts[0].geometry);
  const fences=level.fenceSegments.filter(s=>s.material!=='stone'&&(s.kind!=='target'||level.target.type!=='barn'));
  assert.equal(posts.matrices.length/16,fences.reduce((n,s)=>n+Math.ceil(Math.hypot(s.b.x-s.a.x,s.b.z-s.a.z)/1.8)+1,0));
  const positions=[];for(let i=0;i<posts.matrices.length;i+=16)positions.push({x:posts.matrices[i+12],z:posts.matrices[i+14]});
  for(const fence of fences)for(const endpoint of [fence.a,fence.b])assert.ok(positions.some(p=>Math.hypot(p.x-endpoint.x,p.z-endpoint.z)<.0001),'rendered fence reaches exact collision endpoints');
  assert.ok(posts.batch.castShadow&&posts.batch.receiveShadow);
  // Fence tops cast less than one unit along the directional light at y=0;
  // the camera padding retains these casters when their ground shadow is visible.
  const edge=fences[0],center={x:(edge.a.x+edge.b.x)/2+11.9,z:(edge.a.z+edge.b.z)/2};
  renderer.camera.position.set(center.x,36,center.z+29);renderer.camera.lookAt(center.x,0,center.z);renderer.cullScenery();
  const shadow=new THREE.Vector3(.94*18/35,0,-.94*20/35),sphere=new THREE.Sphere(),frustum=renderer.sceneryFrustum;let checkedShadows=0;
  for(let i=0;i<posts.bounds.length;i+=4){
    sphere.center.set(posts.bounds[i]+shadow.x,0,posts.bounds[i+2]+shadow.z);sphere.radius=.1;
    if(frustum.intersectsSphere(sphere)){checkedShadows++;assert.ok([...posts.batch.instanceMatrix.array.slice(0,posts.batch.count*16)].some((_,j,array)=>j%16===12&&Math.abs(array[j]-posts.matrices[i*4+12])<.0001&&Math.abs(array[j+2]-posts.matrices[i*4+14])<.0001),'visible ground shadows retain their fence posts');}
  }
  assert.ok(checkedShadows>0,'shadow retention test exercises visible fence posts');
});

test('wide maps allocate a bounded detail budget beside winding routes with clear entrances',()=>{
  const renderer=setup();
  const distance=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-t*dx,p.z-a.z-t*dz);};
  const lineDistance=(p,points)=>Math.min(...points.slice(1).map((b,i)=>distance(p,points[i],b)));
  for(const index of [5,49,99]){
    const level=createLevel(index);renderer.setLevel(level);let besideRoute=0;
    assert.ok(renderer.meadowDetails.filter(p=>p.kind==='flower').length<=190);
    assert.ok(renderer.meadowDetails.filter(p=>p.kind==='tuft').length<=650);
    for(const p of renderer.meadowDetails){
      const padding=p.kind==='flower'?1:.4;
      for(const river of level.rivers)assert.ok(lineDistance(p,river.points)>=river.width/2+padding+.5);
      for(const road of level.roads)assert.ok(lineDistance(p,road.points)>=road.width/2+padding+.35);
      for(const fence of level.fenceSegments)assert.ok(distance(p,fence.a,fence.b)>=padding+.7);
      for(const obstacle of level.obstacles)assert.ok(Math.hypot(p.x-obstacle.x,p.z-obstacle.z)>=obstacle.radius+padding);
      if(level.roads.some(road=>lineDistance(p,road.points)<road.width/2+5))besideRoute++;
    }
    assert.ok(besideRoute>renderer.meadowDetails.length*.55,'most details sit near the playable winding routes');
  }
});

function animalView(renderer,level,point,aspect=390/844,angle=0){
  renderer.camera.left=-19.5*aspect;renderer.camera.right=19.5*aspect;renderer.camera.top=19.5;renderer.camera.bottom=-19.5;renderer.camera.updateProjectionMatrix();
  renderer.camera.position.set(point.x+Math.sin(angle)*29,36,point.z+Math.cos(angle)*29);renderer.camera.lookAt(point.x,0,point.z);
  renderer.cullScenery();renderer.updateAnimalBatches(level,Math.floor(renderer.time*12)/12);
}

function assertAnimalMatrices(renderer,level){
  const actual=new THREE.Matrix4(),expected=new THREE.Matrix4(),rotation=new THREE.Matrix4();
  const poseTime=Math.floor(renderer.time*12)/12;
  for(const batch of renderer.animalBatches)for(const mesh of batch.meshes){
    assert.equal(mesh.count,batch.visibleIndices.length,'body and all articulated materials use the same visible count');
    assert.equal(mesh.visible,mesh.count>0);
    batch.visibleIndices.forEach((index,slot)=>{
      expected.copy(renderer.animalMeshes[index].matrix);
      if(mesh.userData.limbIndex!==undefined){
        const a=level.animals[index],limb=mesh.userData.limbIndex,phase=limb===0||limb===3?0:Math.PI;
        const gait=Math.sin(poseTime*12+index*.8+phase)*Math.min(.5,Math.hypot(a.vx,a.vz)*.15);
        rotation.makeTranslation(...mesh.userData.pivot).multiply(new THREE.Matrix4().makeRotationX(gait));expected.multiply(rotation);
      }
      mesh.getMatrixAt(slot,actual);
      actual.elements.forEach((n,i)=>assert.ok(Math.abs(n-expected.elements[i])<.00002,`instance ${slot} retains animal ${index}, matrix element ${i}`));
    });
  }
}

test('animal batches compact split flocks and restore body and limb poses after distant travel',t=>{
  const renderer=setup(),level=createLevel(99);
  level.animals.forEach((a,i)=>{const p=i%3===1?level.spawn:level.target;a.x=p.x+(i%3)*.2;a.z=p.z+(i%5)*.2;a.vx=2;a.vz=1;a.heading=i*.7;a.saved=i%7===0;});
  renderer.setLevel(level);renderer.update(level,level.dog,.2,false);
  const near=level.animals.flatMap((_,i)=>i%3===1?[i]:[]),far=level.animals.flatMap((_,i)=>i%3!==1?[i]:[]);
  const triangles=(full=false)=>renderer.animalBatches.reduce((sum,b)=>sum+b.meshes.reduce((n,m)=>n+(m.geometry.index?.count||m.geometry.attributes.position.count)/3*(full?b.indices.length:m.count),0),0),fullTriangles=triangles(true);
  for(const aspect of [390/844,844/390])for(const angle of [0,Math.PI/2]){
    animalView(renderer,level,level.spawn,aspect,angle);
    assert.deepEqual(Array.from(renderer.animalBatches.flatMap(b=>b.visibleIndices)).sort((a,b)=>a-b),near,'spawn view submits just the nearby noncontiguous flock indices');assertAnimalMatrices(renderer,level);
    assert.ok(triangles()<fullTriangles*.45,'split view submits fewer actual animal geometry triangles');
    if(aspect===390/844&&angle===0)t.diagnostic(`level 100 animal triangles: all ${fullTriangles}; split spawn view ${triangles()}; distant view 0`);
    const snapshot=renderer.animalBatches.map(b=>b.meshes.map(m=>[m.count,[...m.instanceMatrix.array.slice(0,m.count*16)]]));
    animalView(renderer,level,{x:10000,z:10000},aspect,angle);
    assert.ok(renderer.animalBatches.every(b=>b.visibleIndices.length===0&&b.meshes.every(m=>m.count===0&&!m.visible)),'distant views submit no animal triangles');
    assert.equal(triangles(),0);
    animalView(renderer,level,level.target,aspect,angle);
    assert.deepEqual(Array.from(renderer.animalBatches.flatMap(b=>b.visibleIndices)).sort((a,b)=>a-b),far,'destination view restores the other group');assertAnimalMatrices(renderer,level);
    animalView(renderer,level,level.spawn,aspect,angle);
    renderer.animalBatches.forEach((b,bi)=>b.meshes.forEach((m,mi)=>{assert.equal(m.count,snapshot[bi][mi][0]);assert.deepEqual([...m.instanceMatrix.array.slice(0,m.count*16)],snapshot[bi][mi][1]);}));
  }
});

test('animal bounds enclose real body vertices, moving limbs and visible ground shadow casters',()=>{
  const renderer=setup(),level=createLevel(19);renderer.setLevel(level);
  const vertex=new THREE.Vector3(),sphere=new THREE.Sphere();
  for(const batch of renderer.animalBatches){
    for(const mesh of batch.meshes){
      const positions=mesh.geometry.attributes.position;
      for(const gait of [-.5,0,.5])for(let i=0;i<positions.count;i++){
        vertex.fromBufferAttribute(positions,i);
        if(mesh.userData.limbIndex!==undefined)vertex.applyAxisAngle(new THREE.Vector3(1,0,0),gait).add(new THREE.Vector3(...mesh.userData.pivot));
        assert.ok(vertex.length()<=batch.radius+.000001,'actual articulated geometry remains within its conservative animal-origin sphere');
      }
    }
  }
  // Put both species at a view edge, then evaluate every actual body/limb
  // sphere and its projection onto the ground along the directional light.
  level.animals.forEach((a,i)=>{a.x=level.spawn.x+8+i*.12;a.z=level.spawn.z+(i%3);a.heading=i*.4;a.vx=3;a.vz=1;});
  renderer.update(level,level.dog,.2,false);animalView(renderer,level,level.spawn);
  const poseTime=Math.floor(renderer.time*12)/12,rotation=new THREE.Matrix4();let checked=0;
  for(const batch of renderer.animalBatches)for(const index of batch.indices)for(const mesh of batch.meshes){
    const world=renderer.animalMeshes[index].matrix.clone();
    if(mesh.userData.limbIndex!==undefined){const limb=mesh.userData.limbIndex,phase=limb===0||limb===3?0:Math.PI,a=level.animals[index],gait=Math.sin(poseTime*12+index*.8+phase)*Math.min(.5,Math.hypot(a.vx,a.vz)*.15);rotation.makeTranslation(...mesh.userData.pivot).multiply(new THREE.Matrix4().makeRotationX(gait));world.multiply(rotation);}
    sphere.copy(mesh.geometry.boundingSphere).applyMatrix4(world);
    const visibleBody=renderer.sceneryFrustum.intersectsSphere(sphere);
    const shadowSphere=sphere.clone();shadowSphere.center.x+=shadowSphere.center.y*18/35;shadowSphere.center.z-=shadowSphere.center.y*20/35;shadowSphere.center.y=0;shadowSphere.radius*=1.3;
    if(visibleBody||renderer.sceneryFrustum.intersectsSphere(shadowSphere)){checked++;assert.ok(batch.visibleIndices.includes(index),'visible body/limb and nearby ground shadow retain their original animal');}
  }
  assert.ok(checked>0);
  assertAnimalMatrices(renderer,level);
});

test('actual target meshes and map show the shared rectangle across every enclosure type and compass heading',()=>{
  const renderer=setup();
  for(const index of [6,7,8])for(const seed of [200,201,202,203]){
    const level=createLevel(index,seed),target=level.target,shape=targetFootprint(target);renderer.setLevel(level);
    for(const mesh of [renderer.goal,renderer.goalOutline,...(target.type==='barn'?[renderer.goalFloor]:[])]){
      assert.ok(mesh?.parent===renderer.terrain,'actual goal surface is in the scene');
      mesh.updateWorldMatrix(true,false);
      const positions=mesh.geometry.attributes.position;
      for(let i=0;i<4;i++){
        const actual=new THREE.Vector3().fromBufferAttribute(positions,i).applyMatrix4(mesh.matrixWorld),expected=shape.corners[i];
        assert.ok(Math.hypot(actual.x-expected.x,actual.z-expected.z)<.00001,`${target.type} geometry reaches physical corner ${i}`);
      }
    }
    const admitted=targetWorldPoint(target,shape.halfLength-.98,shape.halfWidth-.98);
    assert.ok(containsTarget(target,admitted,.78));
    const ray=new THREE.Raycaster(new THREE.Vector3(admitted.x,2,admitted.z),new THREE.Vector3(0,-1,0));
    assert.ok(ray.intersectObject(renderer.goal).length,'admitted cow corner is visibly inside goal');
    let path=[],fills=[];
    const ctx={fillRect(){},beginPath(){path=[];},moveTo(x,y){path.push([x,y]);},lineTo(x,y){path.push([x,y]);},closePath(){path.push('close');},arc(){path.push('arc');},stroke(){},fill(){fills.push({color:this.fillStyle,path:[...path]});}};
    const canvas={width:240,height:160,getContext:()=>ctx};renderer.drawMap(canvas,level,level.dog);
    const mapGoal=fills.find(p=>p.color==='#f9e7a2');
    assert.ok(mapGoal,'minimap draws target');assert.equal(mapGoal.path.length,5);assert.equal(mapGoal.path[4],'close');
    shape.corners.forEach((corner,i)=>{
      const expected=[8+(corner.x-level.bounds.minX)/(level.bounds.maxX-level.bounds.minX)*224,8+(corner.z-level.bounds.minZ)/(level.bounds.maxZ-level.bounds.minZ)*144];
      assert.ok(mapGoal.path[i].every((n,j)=>Math.abs(n-expected[j])<1e-8),'minimap uses exact projected physical corners');
    });
    if(target.type==='barn')assert.ok(renderer.cutaway?.parts.length>12,'barn cutaway remains installed');
  }
});

test('ground bark draws over real decorative blades while opaque fence rails retain depth',()=>{
  const renderer=setup(),level=createLevel(0);renderer.setLevel(level);
  const grass=renderer.terrain.children.find(mesh=>mesh.userData.decorativeGrass);
  assert.ok(grass?.isInstancedMesh);
  assert.equal(grass.material.transparent,true);assert.equal(grass.material.opacity,1);
  assert.equal(grass.material.depthWrite,false);assert.equal(grass.material.depthTest,true);
  const blade=new THREE.Mesh(grass.geometry,grass.material),matrix=new THREE.Matrix4();grass.getMatrixAt(0,matrix);blade.applyMatrix4(matrix);blade.updateMatrixWorld(true);
  const center=blade.position.clone(),direction=new THREE.Vector3(0,-36,-31).normalize();
  const ray=new THREE.Raycaster(center.clone().addScaledVector(direction,-10),direction);
  const land=center.clone().addScaledVector(direction,(.055-center.y)/direction.y);
  renderer.dog.position.set(land.x-1,0,land.z);renderer.bark();const ring=renderer.barkEffects[0].mesh;ring.updateMatrixWorld(true);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(8,8),renderer.grass);ground.rotation.x=-Math.PI/2;ground.position.set(land.x,-.035,land.z);ground.updateMatrixWorld(true);
  const rail=renderer.fenceParts[2].clone();rail.scale.x=4;rail.position.copy(center).addScaledVector(direction,(.34-center.y)/direction.y);rail.updateMatrixWorld(true);
  const hits=new Map([ground,blade,ring,rail].map(mesh=>[mesh,ray.intersectObject(mesh)[0]]));
  for(const mesh of [ground,blade,ring,rail])assert.ok(hits.get(mesh),'ray intersects actual ground, blade, ring and fence geometry');
  assert.ok(hits.get(blade).distance<hits.get(ring).distance,'literal blade geometry would hide the lower ring if it wrote depth');
  assert.ok(hits.get(rail).distance<hits.get(ring).distance,'fence rail is in front of ring');
  assert.ok(ring.renderOrder>grass.renderOrder);assert.equal(ring.material.depthTest,true);assert.equal(rail.material.depthWrite,true);
  // Resolve this ray with the same opaque/transparent queues, order and depth
  // rules as WebGLRenderer. Geometry intersections above reproduce the defect;
  // this checks the selective drawing policy rather than material flags alone.
  function visible(meshes){
    let depth=Infinity,last;
    const opaque=meshes.filter(m=>!m.material.transparent).sort((a,b)=>hits.get(a).distance-hits.get(b).distance);
    const transparent=meshes.filter(m=>m.material.transparent).sort((a,b)=>a.renderOrder-b.renderOrder||hits.get(b).distance-hits.get(a).distance);
    for(const mesh of [...opaque,...transparent])if(!mesh.material.depthTest||hits.get(mesh).distance<=depth){last=mesh;if(mesh.material.depthWrite)depth=hits.get(mesh).distance;}
    return last;
  }
  assert.equal(visible([ground,blade]),blade,'decorative grass remains visible over the ground without bark');
  assert.equal(visible([ground,blade,ring]),ring,'bark covers grass at its projected location');
  assert.equal(visible([ground,blade,ring,rail]),rail,'raised fence still occludes bark and grass');
});


test('integrated tail, live gate view and shared weather freeze with renderer time',()=>{
 const renderer=setup(),level=createLevel(19);renderer.setLevel(level);
 const gate=level.gates.find(g=>g.operable);assert.ok(gate);
 const panel=[];renderer.gateView.traverse(o=>{if(o.name==='gate-panel')panel.push(o);});assert.equal(panel[0].position.x,0);
 gate.open=true;renderer.update(level,level.dog,.05);assert.ok(panel[0].position.x<0);
 const material=renderer.dog.userData.parts.tailLight.material,idle=material.color.clone();renderer.bark();assert.ok(!material.color.equals(idle));
 const before=renderer.nature.weather.elapsed;renderer.update(level,level.dog,0);assert.equal(renderer.nature.weather.elapsed,before);assert.ok(!material.color.equals(idle));
 for(let i=0;i<8;i++)renderer.update(level,level.dog,.1);assert.ok(material.color.equals(idle));
 let disposed=0;material.addEventListener('dispose',()=>disposed++);renderer.setLevel(createLevel(0));assert.equal(disposed,1);
});
