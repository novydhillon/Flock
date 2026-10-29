import { plantClumpGeometry, bankClumpSites } from '../src/plant-clumps.js';
import {createShowcase} from '../src/landing-ui.js';
import {defaultProfile} from '../src/profile.js';
import * as minimap from '../src/minimap-markers.js';
import { CONFIG_CONTRACTS } from '../src/config/contracts.js';
import presentationSettings from '../src/config/presentation.json' with { type: 'json' };
import { resolveConfig } from '../src/config/resolve.js';
import {updateAnimalTurn,animalGaitSpeed} from '../src/animal-turn.js';
import {updateGrazing,grazingAngle} from '../src/grazing.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import * as THREE from 'three';
import * as models from '../src/models.js';
import {animalScale} from '../src/animal-size.js';
import {createLevel} from '../src/simulation.js';
import {terrainHeight,targetFootprint,targetWorldPoint,containsTarget,gateSegment,canOccupy} from '../src/world.js';
import {goalSurface,goalOutline,drawGoalMap} from '../src/goal-view.js';
import {generateBushClusters} from '../src/vegetation.js';
import {setTailLightBarking} from '../src/tail-light.js';
import {WaterEffects} from '../src/water-effects.js';
import {MeadowNature} from '../src/nature.js';
import {ribbon,roadNetwork,createRoadMaterial,barkSurface} from '../src/surfaces.js';
import {createGateView,createStoneWallView} from '../src/gate-view.js';
import {StructureCutaway} from '../src/cutaway.js';
import {ThrusterGroundGlow} from '../src/thruster-glow.js';
import {ViewShadows,treeDepthMaterial} from '../src/view-shadows.js';

test('fitted sun map contains ground receivers and upstream casters across aspect, zoom and distant travel',()=>{
  const sun=new THREE.DirectionalLight(),fit=new ViewShadows(),point=new THREE.Vector3(),ray=new THREE.Vector3();
  sun.shadow.mapSize.set(1024,1024);
  for(const aspect of [.46,1,2.2])for(const zoom of [.7,1.4])for(const center of [new THREE.Vector3(),new THREE.Vector3(530,0,-410)]){
    const camera=new THREE.OrthographicCamera(-24*aspect,24*aspect,24,-24,.1,300);camera.zoom=zoom;camera.updateProjectionMatrix();
    camera.position.copy(center).add(new THREE.Vector3(0,36,29));camera.lookAt(center);camera.updateMatrixWorld(true);
    sun.target.position.copy(center);sun.position.copy(center).add(new THREE.Vector3(-18,35,20));fit.maxHeight=18;fit.fit(camera,sun);sun.shadow.updateMatrices(sun);
    const frustum=sun.shadow.getFrustum();ray.setFromMatrixColumn(camera.matrixWorld,2).negate();
    for(const y of [-1,0,18])for(const x of [-1,0,1])for(const z of [-1,0,1]){
      point.set(x,z,0).unproject(camera);point.addScaledVector(ray,(y-point.y)/ray.y);
      assert.ok(frustum.containsPoint(point),'visible receivers and raised geometry stay inside the shadow camera');
      if(y===0){point.addScaledVector(new THREE.Vector3(-18/35,1,20/35),18);assert.ok(frustum.containsPoint(point),'offscreen tall caster above a visible ground shadow stays inside depth range');}
    }
    assert.equal(sun.shadow.mapSize.x,1024,'fitting never allocates a map scaled to world size');
  }
});

test('small elevated crown is retained when only its directional ground shadow is visible',()=>{
  const camera=new THREE.OrthographicCamera(-5,5,5,-5,.1,200),sun=new THREE.DirectionalLight(),fit=new ViewShadows();
  camera.position.set(0,30,25);camera.lookAt(0,0,0);sun.position.set(-18,35,20);fit.maxHeight=20;fit.fit(camera,sun);
  const frustum=new THREE.Frustum().setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse)),crown=new THREE.Vector3(-18/35*18,18,20/35*18);
  assert.equal(frustum.intersectsSphere(new THREE.Sphere(crown,.2)),false,'the small crown itself is offscreen');
  assert.equal(frustum.containsPoint(new THREE.Vector3()),true,'its sun-projected ground contact is visible');
  assert.ok(fit.intersects(frustum.planes,crown.x,crown.y,crown.z,.2),'caster culling includes vertical drop as well as horizontal shadow reach');
  assert.equal(fit.intersects(frustum.planes,crown.x+100,crown.y,crown.z,.2),false,'distant unrelated casters stay culled');
});

test('scene wildlife and immutable scenery retain directional shadows and owned depth resources across restart',()=>{
  const renderer=setup(),level=createLevel(19,201);renderer.setLevel(level);
  const wood=renderer.sceneryBatches.filter(({batch})=>batch.userData.treeWood);assert.ok(wood.length);
  for(const {batch}of wood){assert.ok(batch.castShadow&&batch.receiveShadow);assert.ok(batch.customDepthMaterial);assert.equal(batch.geometry.attributes.treeInstanceWidth.count,batch.instanceMatrix.count);}
  const fauna=Object.entries(renderer.nature.batches).filter(([name])=>/rabbit|squirrel|bird/.test(name));assert.ok(fauna.length>=4);
  for(const [,mesh]of fauna)assert.ok(mesh.castShadow&&mesh.receiveShadow,'live anatomical wildlife batches cast and receive the sun');
  const before=fauna.map(([,mesh])=>mesh.instanceMatrix.array.slice());renderer.update(level,level.dog,0);
  fauna.forEach(([,mesh],i)=>assert.deepEqual(mesh.instanceMatrix.array,before[i],'paused wildlife and its shadow matrices freeze together'));
  const moving=renderer.nature.batches.butterflyWing,old=moving.instanceMatrix.array.slice();renderer.update(level,level.dog,.05);assert.notDeepEqual(moving.instanceMatrix.array,old,'wildlife animation updates the actual shadow-casting instance matrices');
  const gestured=renderer.animalBatches.flatMap(b=>b.meshes).filter(m=>m.geometry.attributes.animalGesture);assert.ok(gestured.length);
  const depth=gestured[0].customDepthMaterial;assert.ok(depth);assert.ok(gestured.every(m=>m.customDepthMaterial===depth),'one owned depth material serves all animated herd parts');
  const materialDisposals=new Map([...wood.map(v=>v.batch.customDepthMaterial),depth].map(m=>[m,0]));for(const m of materialDisposals.keys())m.addEventListener('dispose',()=>materialDisposals.set(m,materialDisposals.get(m)+1));
  const source=gestured[0].material,makeShader=()=>({uniforms:{},vertexShader:'#include <beginnormal_vertex>\n#include <begin_vertex>',fragmentShader:''}),surfaceShader=makeShader(),depthShader=makeShader();source.onBeforeCompile(surfaceShader);depth.onBeforeCompile(depthShader);
  assert.equal(depthShader.vertexShader,surfaceShader.vertexShader,'ear, tail, blink and chew deformation uses the identical visible/depth vertex program');
  renderer.setLevel(createLevel(0,201));for(const count of materialDisposals.values())assert.equal(count,1,'restart disposes each owned depth material exactly once');
});

test('scenery batching separates identical geometry with different cast or receive flags',()=>{
  const renderer=setup(),geometry=new THREE.BoxGeometry(1,1,1),material=new THREE.MeshStandardMaterial();renderer.terrain.clear();
  for(const cast of [false,true])for(const receive of [false,true])for(let i=0;i<2;i++){const mesh=new THREE.Mesh(geometry,material);mesh.castShadow=cast;mesh.receiveShadow=receive;mesh.position.set(i,1,0);renderer.terrain.add(mesh);}
  renderer.batchScenery();assert.equal(renderer.sceneryBatches.length,4);
  const flags=new Set(renderer.sceneryBatches.map(({batch})=>`${batch.castShadow}:${batch.receiveShadow}`));assert.equal(flags.size,4,'batching cannot silently inherit another piece shadow policy');
});
import {gateButtons,updateGateContacts} from '../src/gates.js';

// This exercises actual scene/model/matrix construction. It substitutes the
// GPU and Canvas drawing surface; it is not a rendered-pixel or FPS test.
function setup({width=390,height=844,treeYaw=true,settings=presentationSettings}={}){
  const draw=new Proxy({createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),createRadialGradient:()=>({addColorStop(){}}),createLinearGradient:()=>({addColorStop(){}})},{get:(t,k)=>t[k]||(()=>{})});
  const document={createElement:()=>({width:0,height:0,getContext:()=>draw})};
  globalThis.document=document;
  class GPUStub{constructor(){this.shadowMap={};}setPixelRatio(ratio){this.pixelRatio=ratio;}setSize(){}render(scene){scene.updateMatrixWorld(true);}}
  const source=readFileSync(new URL('../src/render.js',import.meta.url),'utf8').replace(/^import .*;\s*$/gm,'').replace(/^export /gm,'').replace(/tree.rotation.y=treeRotation\(\)\*Math.PI\*2;/g,treeYaw?'tree.rotation.y=treeRotation()*Math.PI*2;':'tree.rotation.y=0;');
  const context={plantClumpGeometry,bankClumpSites,...minimap,ViewShadows,treeDepthMaterial,settings,resolveConfig,CONFIG_CONTRACTS,updateGrazing,grazingAngle,updateAnimalTurn,animalGaitSpeed,animalScale,THREE:{...THREE,WebGLRenderer:GPUStub},...models,createGateView,createStoneWallView,gateSegment,terrainHeight,targetFootprint,canOccupy,goalSurface,goalOutline,drawGoalMap,WaterEffects,generateBushClusters,setTailLightBarking,MeadowNature,ribbon,roadNetwork,createRoadMaterial,barkSurface,StructureCutaway,ThrusterGroundGlow,document,innerWidth:width,innerHeight:height,devicePixelRatio:2,performance:{now:()=>1000},requestAnimationFrame(){}};
  vm.runInNewContext(`${source}\nglobalThis.renderer=new MeadowRenderer({});`,context);
  return context.renderer;
}

// P2 adds fixed wildlife anatomy batches and 20 dormant puddle/splash objects.
test('live gate lamps follow contact state after scenery batching and level replacement',()=>{
  const renderer=setup();
  const fixture=material=>{
    const level=createLevel(0,201),gate={id:'render-contact-gate',x:-7,z:0,width:5,heading:0,material,operable:true,open:false};
    Object.assign(level,{gates:[gate],animals:[],helpers:[],obstacles:[],rivers:[],fenceSegments:[{a:{x:-32,z:0},b:{x:-9.5,z:0},material},{a:{x:-4.5,z:0},b:{x:30,z:0},material}]});
    return {level,gate};
  };
  for(const material of ['wood','stone']){
    const {level,gate}=fixture(material),pads=gateButtons(gate),dog={...level.dog,x:-20,z:-10};renderer.setLevel(level);
    const live=(name)=>{const found=[];renderer.scene.traverse(o=>{if(o.name===name)found.push(o);});return found;};
    const assertState=(open)=>{
      assert.equal(gate.open,open);const color=open?'32f56a':'ff382b';
      const domes=live('gate-button'),halos=live('gate-light-halo');assert.equal(domes.length,2,'both domes remain in the rendered scene after batching');assert.equal(halos.length,2);
      for(const object of [...domes,...halos]){assert.equal(object.material.color.getHexString(),color);assert.ok(renderer.gateView.getObjectById(object.id),'stateful visual remains in the live gate view');}
      renderer.scene.traverse(o=>{if(o.isInstancedMesh)assert.ok(!['ff382b','32f56a'].includes(o.material.color?.getHexString()),'no static red/green lamp ghost survives batching');});
    };
    assertState(false);renderer.batchScenery();assertState(false);
    Object.assign(dog,pads[0]);assert.equal(updateGateContacts(level,dog)[0]?.open,true);renderer.update(level,dog,1/60,false);assertState(true);
    assert.deepEqual(updateGateContacts(level,dog),[],'held contact does not toggle again');renderer.update(level,dog,0,false);assertState(true);
    Object.assign(dog,{x:-20,z:-10});updateGateContacts(level,dog);
    level.helpers=[{type:'helper',...pads[1],heading:0}];assert.equal(updateGateContacts(level,dog)[0]?.open,false);renderer.update(level,dog,1/60,false);assertState(false);
    level.helpers=[];updateGateContacts(level,dog);Object.assign(dog,pads[1]);assert.equal(updateGateContacts(level,dog)[0]?.open,true);renderer.update(level,dog,1/60,false);assertState(true);
    const dome=live('gate-button')[0],oldMaterial=dome.material,oldGeometry=dome.geometry;let materialDisposals=0,geometryDisposals=0;
    oldMaterial.addEventListener('dispose',()=>materialDisposals++);oldGeometry.addEventListener('dispose',()=>geometryDisposals++);
    const restart=fixture(material);renderer.setLevel(restart.level);assert.equal(materialDisposals,1);assert.equal(geometryDisposals,1);
    assert.ok(!renderer.scene.getObjectById(dome.id),'old lamp is removed on restart');assert.equal(live('gate-button').length,2);assert.ok(live('gate-button').every(o=>o.material.color.getHexString()==='ff382b'),'replacement gate starts visibly red');
  }
});
test('road fade clones preserve glow, weather baselines and once-only replacement disposal',()=>{
  const renderer=setup(),level=createLevel(15,201),baseline=renderer.path.color.clone();renderer.setLevel(level);
  const roads=[];renderer.terrain.traverse(o=>{if(o.isMesh&&o.geometry.attributes.roadOpacity)roads.push(o);});
  assert.ok(roads.length>=2);const materials=new Set(roads.map(o=>o.material));assert.equal(materials.size,2);
  for(const material of materials){
    assert.notEqual(material,renderer.path);assert.notEqual(material,renderer.pathShoulder);
    const shader={uniforms:{},vertexShader:'#include <begin_vertex>\n#include <project_vertex>',fragmentShader:'#include <emissivemap_fragment>\n#include <alphahash_fragment>'};material.onBeforeCompile(shader);
    assert.ok(shader.uniforms.pipGlowCenters);assert.match(shader.fragmentShader,/vRoadOpacity/);
  }
  const core=roads.find(o=>o.material.map===renderer.path.map).material;
  assert.ok(renderer.waterEffects.materialSnapshots.some(s=>s.material===core));
  const counts=new Map([...materials].map(m=>[m,0]));for(const m of materials)m.addEventListener('dispose',()=>counts.set(m,counts.get(m)+1));
  renderer.path.color.set('#000000');renderer.setLevel(createLevel(0,201));
  assert.ok(renderer.path.color.distanceTo?renderer.path.color.distanceTo(baseline)<1e-6:renderer.path.color.equals(baseline));
  for(const count of counts.values())assert.equal(count,1);
});
// Object count includes hidden pool slots; submitted draw budget remains 170.
test('angular playable turf is triangulated from the physical boundary and disposed on replacement',()=>{
  const renderer=setup(),level=createLevel(69,201);renderer.setLevel(level);
  const meadow=renderer.terrain.getObjectByName('playable-meadow');assert.ok(meadow);
  const ground=renderer.terrain.children.find(o=>o.isMesh&&o.geometry.type==='PlaneGeometry'&&o.material===renderer.grass);assert.ok(ground);
  assert.equal(meadow.material,ground.material,'field and surrounding grass share color, wetness and glow');
  const uv=meadow.geometry.attributes.uv,mp=meadow.geometry.attributes.position;
  for(let i=0;i<mp.count;i++){
    assert.ok(Math.abs(uv.getX(i)-((mp.getX(i)-ground.position.x)/ground.geometry.parameters.width+.5))<1e-6);
    assert.ok(Math.abs(uv.getY(i)-(.5-(mp.getZ(i)-ground.position.z)/ground.geometry.parameters.height))<1e-6);
  }
  const shader={uniforms:{},vertexShader:'#include <project_vertex>',fragmentShader:'#include <emissivemap_fragment>'};ground.material.onBeforeCompile(shader);assert.ok(shader.uniforms.pipGlowCenters);
  const polygonArea=Math.abs(level.boundary.reduce((sum,p,i)=>{const q=level.boundary[(i+1)%level.boundary.length];return sum+p.x*q.z-q.x*p.z;},0))/2;
  const g=meadow.geometry,p=g.attributes.position,indices=g.index;let triangleArea=0;
  for(let i=0;i<indices.count;i+=3){const [a,b,c]=[0,1,2].map(j=>indices.getX(i+j));triangleArea+=Math.abs((p.getX(b)-p.getX(a))*(p.getZ(c)-p.getZ(a))-(p.getZ(b)-p.getZ(a))*(p.getX(c)-p.getX(a)))/2;}
  assert.ok(Math.abs(triangleArea-polygonArea)<.05,'turf has exactly the playable polygon area, with no filled cutout');
  assert.ok(g.attributes.normal.getY(0)>.99,'turf faces upward');
  let disposed=false;g.addEventListener('dispose',()=>disposed=true);renderer.setLevel(createLevel(0));assert.ok(disposed);
});

test('minimap clips features to the shared concave playable boundary and restores the canvas',()=>{
  const renderer=setup(),level=createLevel(0);
  level.boundary=[{x:-32,z:-24},{x:30,z:-24},{x:30,z:4},{x:6,z:4},{x:6,z:24},{x:-32,z:24}];
  const operations=[];let path=[];
  const ctx={save(){operations.push('save');},restore(){operations.push('restore');},
    clearRect(){},rect(){},fillRect(){},beginPath(){path=[];},moveTo(x,y){path.push([x,y]);},lineTo(x,y){path.push([x,y]);},
    closePath(){path.push('close');},fill(){},stroke(){},arc(){},clip(){operations.push([...path]);}};
  renderer.drawMap({width:240,height:160,getContext:()=>ctx},level,level.dog);
  assert.equal(operations[0],'save');assert.equal(operations.at(-1),'restore');
  assert.deepEqual(operations[1],[]);
  const clipped=operations[3];assert.equal(clipped.length,7);assert.equal(clipped.at(-1),'close');
  const view=minimap.minimapProjection(level.bounds,level.dog,240,160,120);
  level.boundary.forEach((p,i)=>assert.deepEqual(clipped[i],[view.project(p).x,view.project(p).y]));
});

test('large minimaps follow Pip at stable local scale and clamp the viewport at the world edge',()=>{
  const renderer=setup(),level=createLevel(0);
  level.bounds={minX:-200,maxX:200,minZ:-200,maxZ:200};level.boundary=null;
  level.animals=[{x:0,z:0,type:'sheep'}];level.rivers=[];level.roads=[];level.fenceSegments=[];
  const dots=[];let circle;let saved=0,restored=0,clips=0;
  const ctx={clearRect(){},save(){saved++;},restore(){restored++;},rect(){},clip(){clips++;},fillRect(){},beginPath(){},
    moveTo(){},lineTo(){},closePath(){},stroke(){},arc(x,y,r){circle={x,y,r};},
    fill(){if(circle)dots.push({...circle,color:this.fillStyle});circle=null;}};
  const draw=dog=>{dots.length=0;renderer.drawMap({width:240,height:160,getContext:()=>ctx},level,dog);return dots.map(d=>({...d}));};
  const first=draw({x:0,z:0}),next=draw({x:20,z:0}),edge=draw({x:195,z:195});
  const pip=points=>points.find(p=>p.color==='#ffd166'),sheep=points=>points.find(p=>p.color==='#fff8e7');
  assert.equal(pip(first).x,pip(next).x);assert.equal(pip(next).x,120);
  assert.ok(Math.abs(sheep(first).x-sheep(next).x-20*minimap.minimapProjection(level.bounds,{x:0,z:0},240,160,120).scale)<1e-8,'fixed world marker scrolls at the circular map metric scale');
  assert.ok(pip(edge).x>120&&pip(edge).x<232);assert.ok(pip(edge).y>80&&pip(edge).y<152);
  assert.equal(saved,3);assert.equal(restored,3);assert.equal(clips,3);
});

test('destination introduction shrinks, fades on gameplay time and resets with each level',()=>{
  const renderer=setup(),level=createLevel(0),dog={...level.dog};renderer.setLevel(level);
  assert.equal(renderer.destinationSign.scale.x,4.5);
  level.time=4.6;renderer.update(level,dog,.05,false);
  assert.ok(Math.abs(renderer.destinationSign.material.opacity-.5)<1e-9);
  renderer.update(level,dog,0,false);
  assert.ok(Math.abs(renderer.destinationSign.material.opacity-.5)<1e-9,'pause keeps the fade frozen');
  level.time=6;renderer.update(level,dog,.05,false);
  assert.equal(renderer.destinationSign.visible,false);
  assert.equal(renderer.goal.visible,true,'the enclosure highlight remains');
  assert.equal(renderer.goalPointer.visible,true,'Pip still points toward the goal');
  renderer.setLevel(createLevel(1));
  assert.equal(renderer.destinationSign.visible,true);
  assert.equal(renderer.destinationSign.material.opacity,1);
});

test('portrait scene builds articulated instance poses and finite camera matrices',()=>{
  const renderer=setup();
  for(const index of [0,1,3,8,20,23,99]){
    const level=createLevel(index),dog={...level.dog,heading:0};renderer.setLevel(level);
    assert.equal(renderer.atmosphere,undefined,'deferred cloud atmosphere is not part of the runtime renderer');
    const weatherObjects=[];renderer.scene.traverse(o=>{if(/cloud|atmosphere|shadow/i.test(`${o.name} ${o.type}`)&&o!==renderer.sun.shadow.camera&&o!==renderer.sun.shadow&&!o.userData.bakedVegetationShadow)weatherObjects.push(`${o.type}:${o.name}`);});
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
    for(const color of [renderer.scene.background])assert.ok([color.r,color.g,color.b].every(Number.isFinite));
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
  const renderer=setup(),level=createLevel(3);renderer.setLevel(level);
  assert.deepEqual([...new Set(level.animals.map(animal=>animal.type))].sort(),['cow','sheep'],'mixed-species lifecycle fixture');
  let worldDisposed=0,animalDisposed=0,gestureDisposed=0,fenceDisposed=0,treeDisposed=0;const worldGeometries=new Set();
  renderer.fenceParts.forEach(p=>p.geometry.addEventListener('dispose',()=>fenceDisposed++));
  new Set(models.createTree(0,0).children.map(p=>p.geometry)).forEach(g=>g.addEventListener('dispose',()=>treeDisposed++));
  renderer.terrain.traverse(o=>{if(o.userData.ownedGeometry)worldGeometries.add(o.geometry);});
  worldGeometries.forEach(geometry=>geometry.addEventListener('dispose',()=>worldDisposed++));
  const animalGeometries=new Set(renderer.animalBatches.flatMap(batch=>batch.meshes.map(mesh=>mesh.geometry)));
  const wrappers=[...animalGeometries].filter(g=>g.userData.animalGestureWrapper);
  wrappers.forEach(geometry=>geometry.addEventListener('dispose',()=>gestureDisposed++));
  const cachedAnimalGeometries=new Set(['sheep','cow'].flatMap(type=>models.createAnimal(type).children.map(part=>part.geometry)));
  cachedAnimalGeometries.forEach(geometry=>geometry.addEventListener('dispose',()=>animalDisposed++));
  renderer.bark();let barkDisposed=0;renderer.barkEffects[0].mesh.material.addEventListener('dispose',()=>barkDisposed++);
  renderer.celebrate(level.target.x,level.target.z);
  let confettiDisposed=0;renderer.particles.forEach(p=>p.mesh.geometry.addEventListener('dispose',()=>confettiDisposed++));
  renderer.setLevel(createLevel(1));
  assert.equal(barkDisposed,1);assert.equal(renderer.barkEffects.length,0);
  assert.ok(worldGeometries.size>0);assert.equal(worldDisposed,worldGeometries.size);assert.equal(confettiDisposed,36);assert.equal(animalDisposed,0);assert.ok(wrappers.length>0);assert.equal(gestureDisposed,wrappers.length);assert.equal(fenceDisposed,0);assert.equal(treeDisposed,0);
  const a=models.createFlowerPatch(1,3),b=models.createFlowerPatch(7,3);
  assert.equal(a.children[0].geometry,b.children[0].geometry,'flower variants reuse bounded geometry');
});

test('trees share tubular skeleton geometry and grow varied overlapping clay crowns',()=>{
  setup();
  const geometries=new Set(),woodGeometries=new Set();
  for(let palette=0;palette<3;palette++)for(let tier=0;tier<3;tier++){
    const tree=models.createTree(palette,tier),clone=models.createTree(palette,tier+.1);
    let triangles=0;
    tree.children.forEach((part,i)=>{
      assert.equal(part.geometry,clone.children[i].geometry,'immutable geometry is shared across repeated models');
      assert.ok([...part.geometry.attributes.position.array].every(Number.isFinite));
      geometries.add(part.geometry);
      if(part.name==='tree-wood')woodGeometries.add(part.geometry);
      triangles+=(part.geometry.index?.count||part.geometry.attributes.position.count)/3;
    });
    assert.ok(triangles<2300,`compact skeleton and foliage: ${triangles}`);
    const crowns=tree.getObjectByName('tree-foliage').userData.crownProfile;
    assert.equal(crowns.length,7+tier*2);
    const central=crowns.filter(c=>c.radial<.5);
    assert.ok(central.length>=3,'center has multiple overlapping crowns');
    for(let i=1;i<central.length;i++)assert.ok(new THREE.Vector3(...central[0].position).distanceTo(new THREE.Vector3(...central[i].position))<central[0].size+central[i].size);
    assert.ok(crowns.filter(c=>c.radial>1).every(c=>c.size<Math.max(...central.map(c=>c.size))));
    assert.ok(new Set(crowns.filter(c=>c.radial>1).map(c=>c.size.toFixed(3))).size>2,'similarly radial crowns still vary');
    if(tier)assert.ok(triangles>models.createTree(palette,0).children.reduce((n,o)=>n+(o.geometry.index?.count||o.geometry.attributes.position.count)/3,0));
  }
  assert.equal(woodGeometries.size,3,'each orientation has one welded shared wood surface');
  assert.equal(geometries.size,12,'nine foliage meshes plus three shared wood geometries');
});

test('tree widths affect actual connected wood without changing branch reach or bush materials',()=>{
  const renderer=setup(),base=models.createTree(0,0),baseWood=base.getObjectByName('tree-wood');
  const material=models.createMaterials();
  assert.notEqual(material.treeWood,material.bark);
  assert.equal(material.bark.userData.treeWidth,undefined,'bush bark does not require tree shader attributes');
  assert.ok(material.bark.map&&material.bark.bumpMap);
  assert.equal(material.treeWood.map,null,'welded forks have no stretched UV bark seams');
  assert.equal(material.treeWood.bumpMap,null);
  for(const scale of [1.015,1.1,1.67,(1.015+3.1)/2,2.73,3.1]){
    const factor=.7+.2*(scale-1.015)/(3.1-1.015);
    assert.ok(Math.abs(models.treeTrunkFactor(scale)-factor)<1e-12,'width factor is continuous and linear');
    const instance=renderer.place(models.createTree(0,0),0,0,scale),wood=instance.getObjectByName('tree-wood');
    assert.equal(wood.geometry,baseWood.geometry);
    assert.notEqual(wood.material,baseWood.material,'standalone trees have independent uniforms');
    assert.ok(Math.abs(wood.material.userData.treeWidth.value-factor)<1e-12);
    assert.ok(Math.abs(wood.userData.treeWidth-factor)<1e-12);
    const deformed=models.deformTreeGeometry(wood.geometry,factor),p=deformed.attributes.position,c=wood.geometry.attributes.treeCenter;
    for(const fork of wood.geometry.userData.forks){
      const radius=(ids,center)=>ids.reduce((n,id)=>n+new THREE.Vector3().fromBufferAttribute(p,id).distanceTo(new THREE.Vector3(...center)),0)/ids.length*scale;
      const parent=radius(fork.parentRing,[c.getX(fork.parentRing[0]),c.getY(fork.parentRing[0]),c.getZ(fork.parentRing[0])]);
      const continuing=radius(fork.continuingRing,[c.getX(fork.continuingRing[0]),c.getY(fork.continuingRing[0]),c.getZ(fork.continuingRing[0])]);
      const branch=radius(fork.branchRings[0].indices,fork.branchRings[0].center);
      assert.ok(Math.abs(parent**2-continuing**2-branch**2)<parent**2*2e-6,'actual deformed cross sections obey Leonardo including the continuing trunk');
      for(const ring of fork.branchRings){
        const centroid=ring.indices.reduce((v,id)=>v.add(new THREE.Vector3().fromBufferAttribute(p,id)),new THREE.Vector3()).multiplyScalar(1/ring.indices.length);
        assert.ok(centroid.distanceTo(new THREE.Vector3(...ring.center))<1e-6,'width never changes branch reach');
      }
    }
    deformed.dispose();
  }
  assert.equal(baseWood.material.userData.treeWidth.value,1,'standalone uniforms do not leak between trees');
});

test('tree instance widths compact with visible poses, restore after culling and dispose with their batch',()=>{
  const renderer=setup();renderer.sceneryBatches=[];
  const source=models.createTree(0,0).getObjectByName('tree-wood').geometry;
  let privateDisposals=0,batchDisposals=0,sharedDisposals=0;
  source.addEventListener('dispose',()=>sharedDisposals++);
  for(const [x,scale]of [[0,1.015],[10000,1.75],[2,3.1]]){
    const tree=renderer.place(models.createTree(0,0),x,0,scale);
    tree.getObjectByName('tree-wood').material.addEventListener('dispose',()=>privateDisposals++);
  }
  renderer.batchScenery();
  assert.equal(privateDisposals,3,'temporary standalone materials are released when replaced by the shared batch material');
  const record=renderer.sceneryBatches.find(v=>v.widths),{batch,widths,matrices}=record;
  assert.equal(batch.material,models.createMaterials().treeWood);
  assert.notEqual(batch.geometry,source,'instance width buffer belongs to this level');
  assert.equal(source.attributes.treeInstanceWidth,undefined,'cached source has no mutable instance attributes');
  assert.deepEqual([...widths],[Math.fround(.7),Math.fround(models.treeTrunkFactor(1.75)),Math.fround(.9)]);
  renderer.camera.position.set(0,6,15);renderer.camera.lookAt(0,2,0);renderer.cullScenery();
  assert.equal(batch.count,2);
  assert.deepEqual([...batch.geometry.attributes.treeInstanceWidth.array.slice(0,2)],[widths[0],widths[2]]);
  assert.deepEqual([...batch.instanceMatrix.array.slice(16,32)],[...matrices.slice(32,48)]);
  renderer.camera.position.set(10000,6,15);renderer.camera.lookAt(10000,2,0);renderer.cullScenery();
  assert.equal(batch.count,1);assert.equal(batch.geometry.attributes.treeInstanceWidth.array[0],widths[1]);
  assert.deepEqual([...batch.instanceMatrix.array.slice(0,16)],[...matrices.slice(16,32)]);
  renderer.camera.position.set(0,6,15);renderer.camera.lookAt(0,2,0);renderer.cullScenery();
  assert.equal(batch.count,2);assert.equal(batch.geometry.attributes.treeInstanceWidth.array[1],widths[2]);
  batch.geometry.addEventListener('dispose',()=>batchDisposals++);
  renderer.setLevel(createLevel(0));
  assert.equal(batchDisposals,1);assert.equal(sharedDisposals,0);
});

test('trees have deterministic independent full-yaw rotations in both placement populations',()=>{
  const renderer=setup(),level=createLevel(19),capture=(renderer)=>{
    const trees=[],other=[],place=renderer.place;
    renderer.place=function(group,x,z,scale,...rest){
      if(group.name==='clay tree')trees.push({x,z,scale,yaw:group.rotation.y});
      else other.push({x,z,scale});
      return place.call(this,group,x,z,scale,...rest);
    };
    renderer.setLevel(level);renderer.place=place;return {trees,other};
  };
  const first=capture(renderer),second=capture(renderer);
  assert.deepEqual(first,second,'level rebuild repeats orientations and all placements');
  const obstacleTrees=first.trees.filter(t=>level.obstacles.some(o=>o.x===t.x&&o.z===t.z));
  const backgroundTrees=first.trees.filter(t=>!obstacleTrees.includes(t));
  for(const trees of [obstacleTrees,backgroundTrees]){
    assert.ok(trees.length>2,'both obstacle and background tree populations exist');
    assert.ok(trees.some(t=>t.yaw>Math.PI)&&trees.some(t=>t.yaw<Math.PI),'orientation covers the full yaw range');
    assert.equal(new Set(trees.map(t=>t.yaw)).size,trees.length,'orientation varies independently between trees');
  }
  const withoutYaw=capture(setup({treeYaw:false}));
  assert.deepEqual(first.other,withoutYaw.other,'tree orientation does not consume the meadow layout RNG');
  assert.deepEqual(first.trees.map(({yaw,...pose})=>pose),withoutYaw.trees.map(({yaw,...pose})=>pose),'tree positions/scales remain identical with yaw disabled');
});

test('barn roof is one pitched clay sheet with complete coverage and no stacked transparent faces',()=>{
  for(const heading of [0,.7,Math.PI/2]){
    const renderer=setup(),level=createLevel(2);level.target.heading=heading;renderer.setLevel(level);
    const roofs=renderer.cutaway.parts.filter(p=>p.mesh.userData.coverKind==='roof');
    assert.equal(roofs.length,1,'the roof has a single surface and material');
    const roof=roofs[0].mesh,g=roof.geometry,p=g.attributes.position,index=g.index;
    assert.equal(roof.material.side,THREE.FrontSide,'no second backface pass');
    assert.equal(roof.material.map,renderer.materials.roof.map,'clay texture is retained');
    const extent=targetFootprint(level.target).halfLength+.3,edges=new Map();let area=0;
    for(let i=0;i<index.count;i+=3){
      const ids=[0,1,2].map(j=>index.getX(i+j)),[a,b,c]=ids.map(v=>new THREE.Vector3().fromBufferAttribute(p,v));
      const normal=new THREE.Vector3().subVectors(b,a).cross(new THREE.Vector3().subVectors(c,a));
      assert.ok(normal.y>0,'every roof triangle faces upward');area+=normal.y/2;
      for(let j=0;j<3;j++){const key=[ids[j],ids[(j+1)%3]].sort((a,b)=>a-b).join(':');edges.set(key,(edges.get(key)||0)+1);}
    }
    assert.ok(Math.abs(area-4*extent*extent)<.0001,'projected area contains neither gaps nor overlap');
    for(const [edge,count] of edges){
      assert.ok(count===1||count===2,'the sheet has no duplicate faces');
      if(count===1){const [a,b]=edge.split(':').map(Number);
        assert.ok((Math.abs(p.getX(a))===Math.abs(p.getX(b))&&Math.abs(Math.abs(p.getX(a))-extent)<1e-5)||
          (p.getZ(a)===p.getZ(b)&&Math.abs(Math.abs(p.getZ(a))-extent)<1e-5),'only eaves and gable ends are open edges');}
    }
    roof.updateMatrixWorld(true);
    // Sample both slopes, ridge and every groove/board row, using downward and
    // oblique camera-like sightlines. Coincident triangle-edge hits count once.
    const zs=[...new Set(Array.from({length:p.count},(_,i)=>p.getZ(i)))];
    const directions=[[0,-1,0],[.35,-1,.6],[-.35,-1,-.6]].map(v=>new THREE.Vector3(...v).normalize());
    for(const row of zs.slice(1,-1))for(const x of [-extent*.97,-extent*.47,.001,extent*.47,extent*.97]){
      // Keep numerical ray intersections just off triangle edges; shared edge
      // topology above checks the exact seams without floating-point ray ties.
      const z=row+.001,localProbe=new THREE.Raycaster(new THREE.Vector3(x,30,z),new THREE.Vector3(0,-1,0));
      const localRoof=new THREE.Mesh(g,roof.material),surface=localProbe.intersectObject(localRoof)[0]?.point;
      assert.ok(surface,'the whole footprint, including grooves and ridge, has a roof');
      const world=surface.clone().applyMatrix4(roof.matrixWorld);
      for(const direction of directions){
        const worldDirection=direction.clone().transformDirection(roof.matrixWorld);
        const ray=new THREE.Raycaster(world.clone().addScaledVector(worldDirection,-40),worldDirection);
        const hits=ray.intersectObject(roof),depths=new Set(hits.map(h=>h.distance.toFixed(4)));
        assert.equal(depths.size,1,`one alpha layer at heading ${heading}, x ${x}, z ${z}, direction ${direction.toArray()}`);
        assert.ok(hits[0].point.distanceTo(world)<1e-4);
      }
    }
  }
});

test('actual barn panels reveal Pip and dispose their private materials on level replacement',()=>{
  const renderer=setup(),level=createLevel(2),target=level.target;
  const collision=JSON.stringify(level.fenceSegments);renderer.setLevel(level);
  const controller=renderer.cutaway;
  const roofPart=controller.parts.find(p=>p.mesh.userData.coverKind==='roof');
  assert.equal(roofPart.mesh.castShadow,true,'opaque roof casts its normal shadow');
  assert.ok(controller.parts.length>12,'complete roof and segmented walls exist');
  level.dog.x=target.x;level.dog.z=target.z;
  for(let i=0;i<60;i++)renderer.update(level,level.dog,1/60);
  assert.ok(controller.parts.some(p=>p.material.opacity===.7),'Pip has a visible cutaway');
  assert.ok(controller.parts.some(p=>p.material.opacity===1),'unrelated structure stays opaque');
  assert.equal(JSON.stringify(level.fenceSegments),collision,'visibility never changes collision');
  assert.equal(renderer.materials.barn.opacity,1);assert.equal(renderer.materials.roof.opacity,1);
  assert.equal(roofPart.material.opacity,.7);assert.equal(roofPart.material.depthWrite,false);assert.equal(roofPart.mesh.castShadow,false);
  controller.update(renderer.camera,[],0);assert.equal(roofPart.material.opacity,.7,'pause freezes the complete roof fade');
  for(let i=0;i<60;i++)controller.update(renderer.camera,[],1/60);
  assert.equal(roofPart.material.opacity,1);assert.equal(roofPart.material.transparent,false);
  assert.equal(roofPart.material.depthWrite,true);assert.equal(roofPart.mesh.castShadow,true,'empty barn restores its roof shadow');
  const count=controller.parts.length;let disposed=0,geometryDisposed=0;
  for(const part of controller.parts)part.material.addEventListener('dispose',()=>disposed++);
  roofPart.mesh.geometry.addEventListener('dispose',()=>geometryDisposed++);
  renderer.setLevel(createLevel(0));
  assert.equal(disposed,count);assert.equal(geometryDisposed,1);assert.equal(controller.disposed,true);assert.equal(renderer.cutaway,null);
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

test('camera keeps Pip near screen center in every travel direction and aspect',()=>{
  for(const viewport of [{width:390,height:844},{width:844,height:390}]){
    const renderer=setup(viewport),level=createLevel(0),dog={...level.dog};renderer.setLevel(level);
    // Rendering follows the controlled actor even across a level jump or a
    // flock far away. Project through the real Three.js camera, not a stub.
    for(const animal of level.animals){animal.x=500;animal.z=-500;}
    for(const [dx,dz] of [[12,0],[-12,0],[0,12],[0,-12],[9,9],[-9,-9]]){
      for(let frame=0;frame<8;frame++){
        dog.x+=dx;dog.z+=dz;renderer.update(level,dog,1/60,false);renderer.camera.updateMatrixWorld(true);
        const p=new THREE.Vector3(dog.x,.5,dog.z).project(renderer.camera);
        assert.ok(Math.abs(p.x)<.13&&Math.abs(p.y)<.16,`Pip centered ${viewport.width}x${viewport.height} ${dx}/${dz}: ${p.x},${p.y}`);
      }
    }
  }
});

test('Pip ground glow shades receiving surfaces rather than hovering meshes',()=>{
  const renderer=setup(),level=createLevel(0),dog=level.dog;
  renderer.setLevel(level);
  assert.ok(Math.abs(renderer.dog.scale.x-1.0125)<1e-9);
  for(const graphic of [renderer.dog.children.find(o=>o.isMesh&&o.geometry.type==='RingGeometry'),renderer.goalPointer]){
    assert.ok(Math.abs(graphic.scale.x-4/3)<1e-9,'guidance world size stays unchanged');
  }
  assert.equal(renderer.dogGlow,undefined,'no detached glow plane exists');
  const effect=renderer.thrusterGlow;
  assert.equal(effect.centers.value.length,4);
  assert.equal(effect.strength.value,.85*.7,'glow contribution is 30% dimmer than the previous 0.85 strength');
  for(const ground of [renderer.grass,renderer.path]){assert.equal(ground.transparent,false);assert.equal(ground.opacity,1);}
  assert.ok(Math.abs(effect.radius.value-.54*renderer.dog.scale.x)<1e-9,'diffuse footprint radius is 50% wider than before');
  assert.ok(effect.tint.value.b>effect.tint.value.r*1.5);
  for(const material of [renderer.grass,renderer.path,renderer.pathShoulder]){
    const shader={uniforms:{},vertexShader:THREE.ShaderLib.standard.vertexShader,fragmentShader:THREE.ShaderLib.standard.fragmentShader};
    material.onBeforeCompile(shader);
    assert.equal(shader.uniforms.pipGlowCenters,effect.centers,'receiving materials use live shared pod positions');
    assert.equal(shader.uniforms.pipGlowStrength,effect.strength);
    assert.match(shader.fragmentShader,/1\.0-smoothstep\(0\.0,pipGlowRadius/,'smooth falloff feathers both center and edge');
    assert.match(shader.fragmentShader,/totalEmissiveRadiance\+=pipGlowTint/,'blue illumination belongs to the surface shader');
    assert.match(shader.vertexShader,/pipSurfaceWorld=\(modelMatrix\*pipSurfacePosition\)\.xyz/);
  }
  const pods=renderer.dog.userData.parts.pods;
  for(const [x,z] of [[3,-4],[-8,6]]){
    Object.assign(dog,{x,z,heading:.73,vx:0,vz:0});renderer.update(level,dog,.1,false);
    const expected=pods.map(p=>renderer.dog.localToWorld(p.clone()));
    effect.centers.value.forEach((p,i)=>{
      assert.ok(Math.abs(p.x-expected[i].x)<1e-5&&Math.abs(p.z-expected[i].z)<1e-5);
      assert.equal(p.y,terrainHeight(level,p.x,p.z),'centers lie ON the surface with no hovering offset');
    });
  }
  const before=effect.centers.value.map(p=>p.clone());renderer.update(level,dog,0,false);
  effect.centers.value.forEach((p,i)=>assert.ok(p.distanceTo(before[i])<1e-6));
  const bridgeLevel=createLevel(5),bridge=bridgeLevel.rivers.flatMap(r=>r.bridges)[0];
  renderer.setLevel(bridgeLevel);
  Object.assign(bridgeLevel.dog,{x:bridge.x,z:bridge.z,heading:bridge.heading});
  renderer.update(bridgeLevel,bridgeLevel.dog,0,false);
  effect.centers.value.forEach(p=>{
    assert.ok(p.y>0,'glow targets raised bridge surface');
    assert.equal(p.y,terrainHeight(bridgeLevel,p.x,p.z));
  });
  const privateMaterials=new Set();
  renderer.terrain.traverse(o=>{
    if(o.isMesh&&o.userData.ownedMaterial&&o.material.customProgramCacheKey().includes('pip-ground-glow'))privateMaterials.add(o.material);
  });
  assert.ok(privateMaterials.size>0,'bridge deck has private receiving materials');
  assert.ok([...privateMaterials].some(m=>m.color.equals(renderer.materials.wood.color)||m.color.equals(renderer.materials.paleWood.color)),
    'bridge wood independently receives illumination, not just the river-bank material');
  assert.ok([...privateMaterials].some(m=>m.color.getHexString()==='6c8960'),'opaque river banks also receive the ground light');
  assert.ok(!renderer.materials.wood.customProgramCacheKey().includes('pip-ground-glow'),'fence wood remains untouched');
  let disposed=0;privateMaterials.forEach(m=>m.addEventListener('dispose',()=>disposed++));
  renderer.setLevel(createLevel(0));
  assert.equal(disposed,privateMaterials.size);
  assert.equal(renderer.thrusterGlow,effect,'new level retains the uniform owner');
  effect.centers.value.forEach(p=>assert.equal(p.y,0,'new meadow clears old bridge height'));
});


test('Buddy has independent floating pose, ground glow, pause and owned resource lifecycle',()=>{
  const renderer=setup(),level=createLevel(5),bridge=level.rivers.flatMap(r=>r.bridges)[0];
  renderer.setLevel(level);
  const h={type:'helper',x:bridge.x,z:bridge.z,heading:bridge.heading,vx:0,vz:0};level.helpers=[h];
  renderer.update(level,level.dog,1/60);
  const buddy=renderer.helperMeshes.get('helper'),parts=buddy.userData.parts;
  assert.notEqual(buddy.userData.motion,renderer.dog.userData.motion);
  assert.equal(parts.legs.length,0);assert.equal(parts.rings.flat().length,12);
  const neutral=parts.rig.position.y;
  for(let i=1;i<=30;i++){
    h.heading+=.02;h.vx=Math.sin(h.heading)*i/10;h.vz=Math.cos(h.heading)*i/10;
    renderer.update(level,level.dog,1/60);
  }
  assert.notEqual(parts.rig.position.y,neutral);
  assert.ok(parts.rig.rotation.x<0&&Math.abs(parts.rig.rotation.z)>0&&parts.head.rotation.y>0);
  assert.ok(Math.abs(parts.rig.rotation.x)<=Math.PI/18&&Math.abs(parts.rig.rotation.z)<=Math.PI/9);
  assert.equal(buddy.position.y,terrainHeight(level,h.x,h.z));
  const effect=renderer.thrusterGlow;
  parts.pods.forEach((pod,i)=>{
    const world=buddy.localToWorld(pod.clone()),glow=effect.buddyCenters.value[i];
    assert.ok(Math.hypot(world.x-glow.x,world.z-glow.z)<1e-8);
    assert.equal(glow.y,terrainHeight(level,glow.x,glow.z));
  });
  const shader={uniforms:{},vertexShader:THREE.ShaderLib.standard.vertexShader,fragmentShader:THREE.ShaderLib.standard.fragmentShader};
  renderer.grass.onBeforeCompile(shader);assert.equal(shader.uniforms.buddyGlowCenters,effect.buddyCenters);
  assert.match(shader.fragmentShader,/buddyGlowCenters\[4\]/);
  const pose=()=>[...parts.rig.position.toArray(),...parts.rig.quaternion.toArray(),parts.head.rotation.y,...parts.rings.flat().flatMap(r=>[...r.position.toArray(),r.material.opacity])];
  const paused=pose();renderer.update(level,level.dog,0);assert.deepEqual(pose(),paused);
  let disposed=0;parts.rings.flat().forEach(r=>r.material.addEventListener('dispose',()=>disposed++));
  level.helpers=[];renderer.update(level,level.dog,1/60);
  assert.equal(buddy.visible,false);assert.ok(effect.buddyCenters.value.every(p=>p.y===-1000));
  renderer.setLevel(createLevel(0));assert.equal(disposed,12);assert.equal(renderer.helperMeshes.size,0);
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
    level.helpers=[{type:'helper',x:level.dog.x+2,z:level.dog.z,heading:0,vx:0,vz:0}];
    renderer.update(level,level.dog,1/60);
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
      assert.ok(canOccupy(level,p.x,p.z,padding),'detail footprint stays inside the playable polygon');
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
      if(mesh.userData.headPart){const state=renderer.animalMeshes[index].userData,p=mesh.userData.pivot;rotation.makeTranslation(p[0],p[1]-(state.graze||0)*mesh.userData.grazeDrop+(state.herdPose?.headLift||0),p[2]).multiply(new THREE.Matrix4().makeRotationY(state.herdPose?.headYaw||0)).multiply(new THREE.Matrix4().makeRotationX(grazingAngle(state,index)));expected.multiply(rotation);}
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
    assert.deepEqual(Array.from(new Set(renderer.animalBatches.flatMap(b=>b.visibleIndices))).sort((a,b)=>a-b),near,'spawn view submits just the nearby noncontiguous flock indices');assertAnimalMatrices(renderer,level);
    assert.ok(triangles()<fullTriangles*.45,'split view submits fewer actual animal geometry triangles');
    if(aspect===390/844&&angle===0)t.diagnostic(`level 100 animal triangles: all ${fullTriangles}; split spawn view ${triangles()}; distant view 0`);
    const snapshot=renderer.animalBatches.map(b=>b.meshes.map(m=>[m.count,[...m.instanceMatrix.array.slice(0,m.count*16)]]));
    animalView(renderer,level,{x:10000,z:10000},aspect,angle);
    assert.ok(renderer.animalBatches.every(b=>b.visibleIndices.length===0&&b.meshes.every(m=>m.count===0&&!m.visible)),'distant views submit no animal triangles');
    assert.equal(triangles(),0);
    animalView(renderer,level,level.target,aspect,angle);
    assert.deepEqual(Array.from(new Set(renderer.animalBatches.flatMap(b=>b.visibleIndices))).sort((a,b)=>a-b),far,'destination view restores the other group');assertAnimalMatrices(renderer,level);
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
        if(mesh.userData.limbIndex!==undefined||mesh.userData.headPart)vertex.applyAxisAngle(new THREE.Vector3(1,0,0),gait).add(new THREE.Vector3(...mesh.userData.pivot));
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
    if(mesh.userData.headPart)world.multiply(new THREE.Matrix4().makeTranslation(...mesh.userData.pivot));
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
    const ctx={clearRect(){},save(){},restore(){},rect(){},clip(){},fillRect(){},beginPath(){path=[];},moveTo(x,y){path.push([x,y]);},lineTo(x,y){path.push([x,y]);},closePath(){path.push('close');},arc(){path.push('arc');},stroke(){},fill(){fills.push({color:this.fillStyle,path:[...path]});}};
    const canvas={width:240,height:160,getContext:()=>ctx};renderer.drawMap(canvas,level,level.dog);
    const mapGoal=fills.find(p=>p.color==='#f9e7a2');
    assert.ok(mapGoal,'minimap draws target');assert.equal(mapGoal.path.length,5);assert.equal(mapGoal.path[4],'close');
    const view=minimap.minimapProjection(level.bounds,level.dog,240,160,120);
    shape.corners.forEach((corner,i)=>{
      const projected=view.project(corner),expected=[projected.x,projected.y];
      assert.ok(mapGoal.path[i].every((n,j)=>Math.abs(n-expected[j])<1e-8),'minimap uses exact projected physical corners');
    });
    if(target.type==='barn')assert.ok(renderer.cutaway?.parts.length>12,'barn cutaway remains installed');
  }
});

test('minimap palette separates terrain features and outlines every animal marker',()=>{
  const renderer=setup(),level=createLevel(6,817);
  level.animals=[{x:0,z:0,type:'sheep',saved:false},{x:1,z:1,type:'cow',saved:true}];
  level.helpers=[{x:-1,z:-1}];
  level.fenceSegments=[...(level.fenceSegments||[]),{a:{x:-2,z:-2},b:{x:-2,z:2},material:'stone'},{a:{x:2,z:-2},b:{x:2,z:2},material:'wood',kind:'fence'}];
  level.gates=[{x:3,z:0,heading:0,width:4,operable:true,open:false}];
  const operations=[];let path=[];
  const ctx={
    clearRect(){},save(){},restore(){},rect(x,y,w,h){path.push({rect:true,x,y,w,h});},clip(){},
    fillRect(...args){operations.push({type:'background',color:this.fillStyle,args});},
    beginPath(){path=[];},moveTo(x,y){path.push([x,y]);},lineTo(x,y){path.push([x,y]);},closePath(){path.push('close');},
    arc(x,y,r){path.push({arc:true,x,y,r});},
    stroke(){operations.push({type:'stroke',color:this.strokeStyle,width:this.lineWidth,path:[...path]});},
    fill(){operations.push({type:'fill',color:this.fillStyle,path:[...path]});}
  };
  const canvas={width:240,height:160,getContext:()=>ctx};
  renderer.drawMap(canvas,level,{x:2,z:2});
  const background=operations.find(op=>op.type==='background')?.color;
  const luminance=color=>{
    const rgb=color.match(/[\da-f]{2}/gi).map(channel=>parseInt(channel,16)/255).map(channel=>channel<=.04045?channel/12.92:((channel+.055)/1.055)**2.4);
    return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];
  };
  const contrast=(first,second)=>{const values=[luminance(first),luminance(second)].sort((a,b)=>b-a);return (values[0]+.05)/(values[1]+.05);};
  assert.ok(background,'minimap paints a base field');
  const lineFeatures=operations.filter(op=>op.type==='stroke'&&op.color!=='#183027'&&!op.path.some(point=>point?.arc||point?.rect));
  assert.ok(lineFeatures.length>0,'map includes rivers, routes, barriers and the closed gate');
  for(const feature of lineFeatures)assert.ok(contrast(feature.color,background)>=3,`line feature ${feature.color} reaches 3:1 against the map field`);
  const actorOutlines=operations.filter(op=>op.type==='stroke'&&op.width===1.5&&op.path.some(point=>point?.arc||point?.rect));
  assert.ok(actorOutlines.length>=4,'each animal, Pip and helper gets a dark outline');
  const actorFills=operations.filter(op=>op.type==='fill'&&op.path.some(point=>point?.arc||point?.rect));
  assert.equal(actorFills.length,4,'two livestock, Pip and the helper have individual map markers');
  assert.ok(new Set(actorFills.map(op=>op.color)).size>=3,'livestock status and actor roles use distinguishable marker colors');
  for(const fill of actorFills){
    const fillArc=fill.path.find(point=>point?.arc||point?.rect),outline=actorOutlines.find(op=>op.path.some(point=>(point?.arc||point?.rect)&&point.x===fillArc.x&&point.y===fillArc.y&&point.r===fillArc.r));
    assert.ok(outline,`marker at ${fillArc.x}, ${fillArc.y} has a recorded outline`);
    assert.ok(contrast(fill.color,outline.color)>=3,'each bright actor marker contrasts at least 3:1 with its dark outline');
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

test('Buddy bark ring and red tail are independent of Pip and reset on level replacement',()=>{
 const renderer=setup(),level=createLevel(27);renderer.setLevel(level);
 const h={type:'helper',x:level.spawn.x,z:level.spawn.z,barking:true};level.helpers=[h];
 renderer.bark({x:h.x,z:h.z});renderer.update(level,level.dog,.05);
 const pip=renderer.dog.userData.parts.tailLight.material.color.clone();
 const dog=renderer.helperMeshes.get('helper');
 assert.equal(dog.userData.parts.tailLight.material.color.getHexString(),'ff7062');
 renderer.update(level,level.dog,.05);
 assert.equal(renderer.barkEffects[0].origin.x,h.x);assert.equal(renderer.barkEffects[0].origin.z,h.z);
 assert.ok(renderer.dog.userData.parts.tailLight.material.color.equals(pip),'Buddy does not flash Pip’s tail');
 for(let i=0;i<8;i++)renderer.update(level,level.dog,.1);
 renderer.bark();h.barking=false;renderer.update(level,level.dog,.05);
 assert.ok(!renderer.dog.userData.parts.tailLight.material.color.equals(pip),'Pip can bark independently');
 assert.equal(dog.userData.parts.tailLight.material.color.getHexString(),'9ceeff');
 renderer.setLevel(createLevel(0));assert.equal(renderer.barkEffects.length,0);assert.equal(renderer.helperMeshes.size,0);
});


test('Buddy rendering preserves simulation heading instead of snapping to tiny reversed displacements',()=>{
 const renderer=setup(),level=createLevel(23);renderer.setLevel(level);
 const h={type:'helper',x:level.spawn.x,z:level.spawn.z,heading:.4};level.helpers=[h];
 renderer.update(level,level.dog,.05);const mesh=renderer.helperMeshes.get('helper');
 assert.equal(mesh.rotation.y,.4);
 h.x-=.01;h.heading=.45;renderer.update(level,level.dog,.05);assert.equal(mesh.rotation.y,.45);
 h.x+=.01;renderer.update(level,level.dog,0);assert.equal(mesh.rotation.y,.45);
});

test('Pip has twelve hollow hover rings with movement trails, frozen pause and fresh level state',()=>{
  const renderer=setup(),level=createLevel(0);renderer.setLevel(level);
  const pip=renderer.dog,parts=pip.userData.parts;
  assert.equal(parts.rings.length,4);
  assert.equal(parts.rings.flat().length,12);
  assert.ok(parts.rings.flat().every(r=>r.geometry.type==='TorusGeometry'));
  assert.equal(parts.legs.length,0,'hover pods do not perform a walking gait');
  const buddy=models.createDog();assert.equal(buddy.userData.parts.legs.length,4,'legacy dog factory is retained independently of hover models');
  renderer.update(level,level.dog,1/60);
  const before=parts.rings[0].map(r=>r.position.y);
  level.dog.x+=.8;renderer.update(level,level.dog,1/60);
  pip.updateMatrixWorld(true);
  const anchors=parts.rings[0].map(r=>r.getWorldPosition(new THREE.Vector3()));
  const pod=pip.localToWorld(parts.pods[0].clone());
  assert.ok(Math.abs(anchors[0].x-pod.x)<1e-8,'top ring follows the pod exactly');
  assert.ok(anchors[2].x<anchors[1].x&&anchors[1].x<anchors[0].x,'third ring trails actual motion and middle lies between');
  assert.ok(parts.rings[0][1].position.y<before[1]&&parts.rings[0][2].position.y<before[2],'lower rings descend');
  assert.ok(parts.rings[0][0].position.y>parts.rings[0][1].position.y&&parts.rings[0][1].position.y>parts.rings[0][2].position.y);
  const paused=parts.rings.flat().map(r=>[...r.position.toArray(),r.material.opacity]);
  renderer.update(level,level.dog,0);
  assert.deepEqual(parts.rings.flat().map(r=>[...r.position.toArray(),r.material.opacity]),paused,'pause freezes ring animation');
  let sawFade=false,sawRecycle=false,lastOpacity=parts.rings[0][2].material.opacity;
  for(let i=0;i<60;i++){
    renderer.update(level,level.dog,1/60);
    const opacity=parts.rings[0][2].material.opacity;sawFade||=opacity<.05;sawRecycle||=opacity>lastOpacity+.3;lastOpacity=opacity;
    assert.equal(parts.rings.flat().length,12,'animation never allocates more rings');
  }
  assert.ok(sawFade&&sawRecycle,'third ring fades away and the bounded sequence renews');
  // Observe the visible pulse handoff, rather than a ring slot's identity.
  level.dog.x+=.8;renderer.update(level,level.dog,1/60);
  pip.userData.hover.time=.55-1e-6;models.updatePipHover(pip,0);
  const departing=parts.rings[0][1],oldPosition=departing.position.clone(),oldY=departing.position.y,oldAlpha=departing.material.opacity,oldScale=departing.scale.x;
  models.updatePipHover(pip,2e-6);
  const arriving=parts.rings[0][2];
  assert.ok(Math.abs(arriving.position.y-oldY)<1e-5,'middle hands off continuously to third height');
  assert.ok(arriving.position.distanceTo(oldPosition)<1e-5,'moving pulse handoff preserves its full position');
  assert.ok(Math.abs(arriving.material.opacity-oldAlpha)<1e-5,'handoff preserves brightness');
  assert.ok(Math.abs(arriving.scale.x-oldScale)<1e-5,'handoff preserves pulse radius');
  assert.ok(parts.rings[0][1].material.opacity<.001,'new pulse emerges invisibly instead of snapping upward');

  level.dog.x+=20;renderer.update(level,level.dog,1/60);
  pip.updateMatrixWorld(true);
  assert.ok(Math.abs(parts.rings[0][2].getWorldPosition(new THREE.Vector3()).x-pip.localToWorld(parts.pods[0].clone()).x)<1e-8,'teleports clear the old trail');
  let disposed=0;parts.rings.flat().forEach(r=>r.material.addEventListener('dispose',()=>disposed++));
  renderer.setLevel(createLevel(1));assert.equal(disposed,12);assert.notEqual(renderer.dog,pip);
});

test('Pip float and turn articulation preserve simulation root, ground guidance, and Buddy pose',()=>{
  const renderer=setup(),level=createLevel(0),dog=level.dog;renderer.setLevel(level);
  const pip=renderer.dog,{rig,head,rings}=pip.userData.parts;
  assert.ok(rig&&head,'Pip has independent body and head pivots');
  assert.equal(rig.parent,pip);assert.equal(head.parent,rig);
  const halo=pip.children.find(o=>o.isMesh&&o.geometry.type==='RingGeometry');
  assert.equal(halo.parent,pip);assert.equal(renderer.goalPointer.parent,pip);
  assert.ok(rings.flat().every(r=>r.parent===pip),'world-space trails stay outside the body bank');
  const h={type:'helper',x:dog.x+2,z:dog.z,heading:.4};level.helpers=[h];
  Object.assign(dog,{heading:0,vx:0,vz:0});renderer.update(level,dog,0);
  const haloY=halo.position.y,pointerY=renderer.goalPointer.position.y,heights=[];
  for(let i=1;i<=45;i++){
    const t=i/60,speed=t*4,heading=t;
    Object.assign(dog,{heading,vx:Math.sin(heading)*speed,vz:Math.cos(heading)*speed});
    renderer.update(level,dog,1/60);heights.push(rig.position.y);
    assert.equal(pip.position.x,dog.x);assert.equal(pip.position.z,dog.z);
    assert.equal(pip.position.y,terrainHeight(level,dog.x,dog.z),'only the visual rig floats');
    assert.equal(pip.rotation.y,dog.heading);assert.equal(pip.rotation.x,0);assert.equal(pip.rotation.z,0);
    assert.equal(halo.position.y,haloY);assert.equal(renderer.goalPointer.position.y,pointerY);
  }
  assert.ok(Math.max(...heights)-Math.min(...heights)>.01,'visual body floats while stationary simulation root stays grounded');
  assert.ok(rig.rotation.x<0&&rig.rotation.z<0&&head.rotation.y>0,'forward acceleration and positive turn articulate independent pivots');
  const buddy=renderer.helperMeshes.get('helper');
  assert.equal(buddy.rotation.y,h.heading);assert.equal(buddy.rotation.x,0);assert.equal(buddy.rotation.z,0);
  assert.equal(buddy.position.y,terrainHeight(level,h.x,h.z));assert.equal(buddy.userData.parts.legs.length,0);
  pip.updateMatrixWorld(true);
  const direction=new THREE.Vector3(0,1,0).applyQuaternion(renderer.goalPointer.getWorldQuaternion(new THREE.Quaternion()));
  const desired=new THREE.Vector3(level.target.x-dog.x,0,level.target.z-dog.z).normalize();
  assert.ok(direction.dot(desired)>.9999,'bank and head look do not redirect the ground goal pointer');
});

test('banked Pip pods, top rings and surface glow share transformed thruster anchors',()=>{
  const renderer=setup(),level=createLevel(0),dog=level.dog;renderer.setLevel(level);
  Object.assign(dog,{heading:0,vx:0,vz:3});renderer.update(level,dog,0);
  for(let i=1;i<=30;i++){
    const heading=i/30;Object.assign(dog,{heading,vx:3*Math.sin(heading),vz:3*Math.cos(heading)});
    renderer.update(level,dog,1/60);
  }
  const pip=renderer.dog,parts=pip.userData.parts;pip.updateMatrixWorld(true);
  assert.ok(Math.abs(parts.rig.rotation.z)>.01,'test exercises an actual body bank');
  assert.equal(parts.basePods.length,4);
  for(let i=0;i<4;i++){
    const actual=parts.rig.localToWorld(parts.basePods[i].clone());
    const published=pip.localToWorld(parts.pods[i].clone());
    assert.ok(actual.distanceTo(published)<1e-8,'published root-local anchor matches visual nozzle');
    const top=parts.rings[i][0].getWorldPosition(new THREE.Vector3());
    assert.ok(Math.hypot(top.x-actual.x,top.z-actual.z)<1e-8,'top ring originates beneath transformed nozzle');
    const glow=renderer.thrusterGlow.centers.value[i];
    assert.ok(Math.hypot(glow.x-actual.x,glow.z-actual.z)<1e-8,'ground glow follows transformed pod footprint');
    assert.equal(glow.y,terrainHeight(level,glow.x,glow.z));
  }
});

test('Pip pause freezes articulated pose and level replacement clears motion history',()=>{
  const renderer=setup(),level=createLevel(0),dog=level.dog;renderer.setLevel(level);
  Object.assign(dog,{heading:0,vx:0,vz:0});renderer.update(level,dog,0);
  for(let i=1;i<=20;i++){
    const heading=i/20;Object.assign(dog,{heading,vx:i/5*Math.sin(heading),vz:i/5*Math.cos(heading)});
    renderer.update(level,dog,1/60);
  }
  const pip=renderer.dog,parts=pip.userData.parts;
  const pose=()=>[...parts.rig.position.toArray(),...parts.rig.quaternion.toArray(),...parts.head.quaternion.toArray(),...parts.rings.flat().flatMap(r=>[...r.position.toArray(),r.material.opacity])];
  const before=pose();renderer.update(level,dog,0);assert.deepEqual(pose(),before);
  renderer.update(level,dog,-.1);assert.deepEqual(pose(),before,'invalid negative frame cannot rewind the pose');
  dog.x+=20;dog.heading=-2;dog.vx=0;dog.vz=0;renderer.update(level,dog,1/60);
  assert.equal(parts.rig.rotation.x,0);assert.equal(parts.rig.rotation.z,0);assert.equal(parts.head.rotation.y,0);
  renderer.setLevel(createLevel(1));
  const fresh=renderer.dog.userData.parts;
  assert.notEqual(renderer.dog,pip);assert.equal(fresh.rig.rotation.x,0);assert.equal(fresh.rig.rotation.z,0);assert.equal(fresh.head.rotation.y,0);
});

test('four cow sizes share batches and scale body, moving hips and culling bounds uniformly',()=>{
  const renderer=setup(),level=createLevel(19),sizes=[1,13/12,7/6,1.25];
  level.animals=sizes.map((scale,i)=>({...level.animals[0],type:'cow',scale,x:level.spawn.x+i,z:level.spawn.z,vx:2,vz:1,heading:0}));
  renderer.setLevel(level);renderer.update(level,level.dog,.2,false);
  assert.equal(renderer.animalBatches.filter(batch=>batch.coatVariant===undefined).length,1,'sizes share a single anatomy batch family');
  assert.ok(renderer.animalBatches.length<=5,'only torso patterns add batches');
  const batch=renderer.animalBatches[0],matrix=new THREE.Matrix4(),scale=new THREE.Vector3(),position=new THREE.Vector3(),quaternion=new THREE.Quaternion();
  assertAnimalMatrices(renderer,level);
  for(const mesh of batch.meshes)batch.visibleIndices.forEach((index,slot)=>{
    mesh.getMatrixAt(slot,matrix);matrix.decompose(position,quaternion,scale);
    scale.toArray().forEach(value=>assert.ok(Math.abs(value-sizes[index])<1e-6));
    if(mesh.userData.pivot){
      const expected=new THREE.Vector3(...mesh.userData.pivot).applyMatrix4(renderer.animalMeshes[index].matrix);
      assert.ok(position.distanceTo(expected)<1e-5,'animated hip translation includes the same uniform scale as its body');
    }
  });
  // Isolate an edge plane just beyond the small cow's conservative sphere.
  // Equal positions must cull the small cow and keep its larger sibling.
  const x=-(batch.radius*1.125+3);
  level.animals.forEach((a,i)=>{a.x=x;a.z=0;const pose=renderer.animalMeshes[i];pose.position.set(x,0,0);pose.updateMatrix();});
  renderer.sceneryFrustum.planes=[new THREE.Plane(new THREE.Vector3(1,0,0),0)];
  renderer.updateAnimalBatches(level,Math.floor(renderer.time*12)/12);
  assert.deepEqual(Array.from(batch.visibleIndices),[2,3],'culling expands per cow size without new batches');
  assertAnimalMatrices(renderer,{...level});
});

test('coat torso batches retain identity after culling, scale edits, reorder and restart',()=>{
  const renderer=setup(),level=createLevel(19);
  level.animals=Array.from({length:32},(_,id)=>({...level.animals[0],id,type:'cow',scale:1+(id%4)/12,x:level.spawn.x+id*.1,z:level.spawn.z}));
  renderer.setLevel(level);
  const assignment=()=>new Map(renderer.animalBatches.filter(b=>b.coatVariant!==undefined).flatMap(b=>b.indices.map(index=>[level.animals[index].id,b.coatVariant])));
  const before=assignment(),coats=renderer.animalBatches.filter(b=>b.coatVariant!==undefined);
  const originalPlanes=renderer.sceneryFrustum.planes;
  assert.equal(coats.length,4);
  assert.equal(new Set(coats.map(b=>b.meshes[0].geometry)).size,1,'all torso patterns share one geometry');
  assert.equal(coats.flatMap(b=>b.indices).length,32,'one torso per cow');
  renderer.sceneryFrustum.planes=[new THREE.Plane(new THREE.Vector3(1,0,0),0)];
  renderer.animalMeshes.forEach((pose,index)=>{pose.position.x=index%3===0?0:-100;pose.updateMatrix();});
  renderer.updateAnimalBatches(level,0);
  for(const batch of coats)batch.visibleIndices.forEach((index,slot)=>{
    assert.equal(batch.coatVariant,before.get(level.animals[index].id));
    const actual=new THREE.Matrix4();batch.meshes[0].getMatrixAt(slot,actual);
    assert.ok(actual.elements.every((value,i)=>Math.abs(value-renderer.animalMeshes[index].matrix.elements[i])<1e-5),'compacted slot contains its own animal pose');
  });
  const qaSource=readFileSync(new URL('../src/qa.js',import.meta.url),'utf8').replace(/^import .*;\s*$/gm,'').replace(/^export /gm,'');
  // Read only the tint helper's definition; QA UI initialization is unrelated.
  const tintContext={};vm.runInNewContext(qaSource.slice(0,qaSource.indexOf('/** QA 0'))+';globalThis.tint=applyQAWanderTints;',tintContext);
  level.time=1;level.animals.forEach(animal=>{animal.wander={bolting:animal.id%2===0};animal.nextWanderCheck=10;});
  tintContext.tint(renderer,level,true);
  for(const batch of coats)batch.visibleIndices.forEach((index,slot)=>{
    const color=new THREE.Color();batch.meshes[0].getColorAt(slot,color);
    assert.ok(Math.abs(color.g-(level.animals[index].id%2===0?.10:.88))<1e-6,'QA tint resolves original animal after torso compaction');
  });
  tintContext.tint(renderer,level,false);
  for(const batch of coats)assert.ok([...batch.meshes[0].instanceColor.array].every(value=>value===1),'disabling QA restores neutral coat colors');
  renderer.sceneryFrustum.planes=originalPlanes;
  level.animals.reverse();level.animals.forEach(animal=>animal.scale=1.25);
  renderer.setLevel(level);assert.deepEqual(assignment(),before,'pattern follows ID rather than size or array slot');
  renderer.setLevel(level);assert.deepEqual(assignment(),before,'restart preserves assignments');
});

test('stationary herd turns animate instanced legs and freeze when paused',()=>{
  const renderer=setup(),level=createLevel(0),dog={...level.dog};
  level.animals.forEach(a=>{a.heading=0;a.vx=0;a.vz=0;});renderer.setLevel(level);
  const a=level.animals[0];a.heading=Math.PI/2;renderer.update(level,dog,.1,false);
  const pose=renderer.animalMeshes[0];assert.ok(Math.abs(pose.rotation.y-Math.PI*.1)<1e-10);
  const batch=renderer.animalBatches.find(b=>b.indices.includes(0)),index=batch.visibleIndices.indexOf(0);
  assert.ok(index>=0);
  const mesh=batch.meshes.find(m=>m.userData.limbIndex!==undefined),matrix=new THREE.Matrix4();mesh.getMatrixAt(index,matrix);
  const idle=pose.matrix.clone().multiply(new THREE.Matrix4().makeTranslation(...mesh.userData.pivot));
  assert.ok(matrix.elements.some((v,i)=>Math.abs(v-idle.elements[i])>1e-5),'pivot has a real leg swing');
  const frozen=matrix.clone(),heading=pose.rotation.y;renderer.update(level,dog,0,false);mesh.getMatrixAt(index,matrix);
  assert.equal(pose.rotation.y,heading);assert.deepEqual(matrix.elements,frozen.elements);
});

test('both species lower complete instanced heads near grass, freeze, lift on paths and reset',()=>{
  const renderer=setup(),level=createLevel(0);
  level.roads=[];level.rivers=[];level.obstacles=[];level.fenceSegments=[];
  level.animals=[{...level.animals[0],x:level.spawn.x,z:level.spawn.z,type:'sheep',vx:0,vz:0,heading:0},
    {...level.animals[1],x:level.spawn.x+2,z:level.spawn.z,type:'cow',scale:1.25,vx:0,vz:0,heading:0}];
  renderer.setLevel(level);
  for(let i=0;i<80;i++)renderer.update(level,level.dog,.1);
  for(let index=0;index<2;index++){
    const batch=renderer.animalBatches.find(b=>b.coatVariant===undefined&&b.indices.includes(index));
    const heads=batch.meshes.filter(m=>m.userData.headPart);assert.ok(heads.length>=3,'eyes, muzzle and head materials articulate together');
    assert.equal(renderer.animalMeshes[index].userData.graze,1);
    let bottom=Infinity;const v=new THREE.Vector3(),matrix=new THREE.Matrix4();
    for(const m of heads){m.getMatrixAt(batch.visibleIndices.indexOf(index),matrix);const p=m.geometry.attributes.position;for(let j=0;j<p.count;j++){v.fromBufferAttribute(p,j).applyMatrix4(matrix);bottom=Math.min(bottom,v.y);}}
    assert.ok(bottom>=-.025&&bottom<.22,`species ${index} lowest head point is near grass, not underground: ${bottom}`);
  }
  const snapshot=renderer.animalBatches.flatMap(b=>b.meshes.map(m=>[...m.instanceMatrix.array]));
  renderer.update(level,level.dog,0);
  assert.deepEqual(renderer.animalBatches.flatMap(b=>b.meshes.map(m=>[...m.instanceMatrix.array])),snapshot);
  level.roads=[{width:5,points:[{x:level.spawn.x-10,z:level.spawn.z},{x:level.spawn.x+10,z:level.spawn.z}]}];
  renderer.update(level,level.dog,.1);assert.ok(renderer.animalMeshes.every(m=>m.userData.graze===0));
  renderer.setLevel(level);assert.ok(renderer.animalMeshes.every(m=>m.userData.graze===undefined));
});


test('presentation settings reach the real renderer budget, exposure and camera projection',()=>{
  const settings=structuredClone(presentationSettings);
  settings.renderer.pixelRatioCap.value=.9;
  settings.renderer.exposure.value=1.3;
  settings.camera.playLandscapeHeight.value=40;
  const renderer=setup({width:844,height:390,settings}),level=createLevel(0);
  renderer.setLevel(level);renderer.update(level,level.dog,0,false);
  assert.equal(renderer.renderer.pixelRatio,.9);
  assert.equal(renderer.renderer.toneMappingExposure,1.3);
  assert.equal(renderer.camera.top-renderer.camera.bottom,40);
});

test('environment saturation preserves actor materials and existing surface hooks', () => {
  const renderer = setup();
  renderer.setLevel(createLevel(3, 201));
  assert.equal(renderer.scene.fog, null, 'distance haze must not wash out the upper field');
  assert.equal(renderer.grass.userData.environmentVibrancy, 1.125);
  const shader = { uniforms: {}, vertexShader: '#include <begin_vertex>', fragmentShader: '#include <emissivemap_fragment>\n#include <tonemapping_fragment>' };
  renderer.grass.onBeforeCompile(shader);
  assert.match(shader.fragmentShader, /mix\(vec3\(environmentLuma\), gl_FragColor.rgb, 1\.125\)/);
  assert.ok(shader.uniforms.pipGlowCenters, 'existing ground glow hook survives');
  const actorMaterials = new Set();
  renderer.actors.traverse(object => { for (const material of Array.isArray(object.material) ? object.material : [object.material]) if (material) actorMaterials.add(material); });
  for (const material of actorMaterials) assert.equal(material.userData.environmentVibrancy, undefined);
  renderer.setLevel(createLevel(4, 202));
  const next = { uniforms: {}, vertexShader: '#include <begin_vertex>', fragmentShader: '#include <emissivemap_fragment>\n#include <tonemapping_fragment>' };
  renderer.grass.onBeforeCompile(next);
  assert.equal((next.fragmentShader.match(/float environmentLuma/g) || []).length, 1, 'level changes never stack the saturation adjustment');
});

test('shared actor materials get one owned environment clone with their shader behavior retained', () => {
  const source = readFileSync(new URL('../src/render.js', import.meta.url), 'utf8');
  const start = source.indexOf('function boostEnvironmentVibrancy(');
  const end = source.indexOf('function label(', start);
  const context = {};
  vm.runInNewContext(source.slice(start, end) + ';this.boost=boostEnvironmentVibrancy;', context);
  const material = new THREE.MeshStandardMaterial({color:'#79a551'});
  material.onBeforeCompile = shader => {shader.uniforms.originalSurface = {value:7};};
  const terrain = new THREE.Group(), actors = new THREE.Group();
  const a = new THREE.Mesh(new THREE.BoxGeometry(), material);
  const b = new THREE.Mesh(a.geometry, material);
  terrain.add(a,b);actors.add(new THREE.Mesh(a.geometry, material));
  context.boost(terrain, actors, 1.25);
  assert.notEqual(a.material, material);
  assert.equal(a.material,b.material,'environment reuse keeps a single cloned material');
  assert.equal(a.userData.ownedMaterial,true);
  assert.equal(material.userData.environmentVibrancy,undefined);
  const shader={uniforms:{},fragmentShader:'#include <tonemapping_fragment>'};
  a.material.onBeforeCompile(shader);
  assert.equal(shader.uniforms.originalSurface.value,7);
  assert.match(shader.fragmentShader,/environmentLuma/);
  const clone = a.material;
  context.boost(terrain,actors,1.25);
  assert.equal(a.material,clone,'install is idempotent');
});

test('zero environment saturation remains idempotent across reused surfaces and level replacement', () => {
  const settings = structuredClone(presentationSettings);
  settings.renderer.environmentSaturation.value = 0;
  const renderer = setup({settings});
  const source = readFileSync(new URL('../src/render.js', import.meta.url), 'utf8');
  const start = source.indexOf('function boostEnvironmentVibrancy(');
  const context = {};
  vm.runInNewContext(source.slice(start, source.indexOf('function label(', start)) + ';this.boost=boostEnvironmentVibrancy;', context);
  for (const index of [2, 3, 2]) {
    const level = createLevel(index, 401);
    renderer.setLevel(level);
    const sharedSurfaces = [];
    renderer.terrain.traverse(object => {
      if (object.material === renderer.grass) sharedSurfaces.push(object);
    });
    assert.ok(sharedSurfaces.length > 0);
    renderer.terrain.add(new THREE.Mesh(sharedSurfaces[0].geometry, renderer.grass));
    context.boost(renderer.terrain, renderer.actors, 0);
    context.boost(renderer.terrain, renderer.actors, 0);
    const shader = {
      uniforms: {},
      vertexShader: '#include <begin_vertex>',
      fragmentShader: '#include <emissivemap_fragment>\n#include <tonemapping_fragment>',
    };
    renderer.grass.onBeforeCompile(shader);
    assert.equal(renderer.grass.userData.environmentVibrancy, 0);
    assert.equal((shader.fragmentShader.match(/float environmentLuma/g) || []).length, 1,
      'zero gain must not install duplicate declarations per surface or level');
    assert.match(shader.fragmentShader, /mix\(vec3\(environmentLuma\), gl_FragColor.rgb, 0\.0\)/);
    assert.ok(shader.uniforms.pipGlowCenters, 'the original surface hook remains installed');
  }
});


test('landing camera retains original scale and scans occupied points slowly without zooming to map bounds', () => {
  for(const viewport of [{width:390,height:844},{width:844,height:390}]) {
    const renderer=setup(viewport), {level,dog}=createShowcase(defaultProfile(),725);
    renderer.setLevel(level);
    const height=viewport.width/viewport.height < presentationSettings.camera.portraitAspect.value ? presentationSettings.camera.previewPortraitHeight.value : presentationSettings.camera.previewLandscapeHeight.value;
    assert.equal(height, viewport.width < viewport.height ? 50 : 44);
    assert.equal(renderer.camera.top-renderer.camera.bottom,height);
    const start=renderer.center.clone();
    for(let i=0;i<600;i++) {
      const before=renderer.center.clone();renderer.update(level,dog,.1,true);
      assert.ok(renderer.center.distanceTo(before)<=.065+1e-8);
      assert.equal(height, viewport.width < viewport.height ? 50 : 44);
    assert.equal(renderer.camera.top-renderer.camera.bottom,height);
    }
    assert.ok(renderer.center.distanceTo(start)>1);
    const frozen=renderer.center.clone();renderer.update(level,dog,0,true);assert.ok(renderer.center.equals(frozen));
  }
});


test('grass and bank reeds remain shadow-free through camera travel and level replacement', () => {
  const renderer = setup();
  for (const index of [23, 0]) {
    renderer.setLevel(createLevel(index, 201));
    for (const x of [-30, 0, 30]) {
      renderer.camera.position.x = x;
      renderer.camera.lookAt(x, 0, 0);
      renderer.camera.updateMatrixWorld(true);
      renderer.cullScenery();
      const plants = renderer.sceneryBatches.filter(({ batch }) => batch.userData.decorativeGrass || batch.userData.bankReeds);
      assert.ok(plants.length > 0);
      for (const { batch } of plants) {
        assert.equal(batch.castShadow, false);
        assert.equal(batch.receiveShadow, false);
      }
      renderer.scene.traverse(mesh => assert.equal(Boolean(mesh.userData.bakedVegetationShadow), false));
    }
  }
});
