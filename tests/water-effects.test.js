import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { WaterEffects, puddleGrowthSeconds } from '../src/water-effects.js';
import { createLevel } from '../src/simulation.js';

test('rain accumulates wetness gradually, dries in sun, and ignores zero-dt and pause',()=>{
  const scene=new THREE.Scene(),effects=new WaterEffects(scene),level=createLevel(0);
  const grass=new THREE.MeshStandardMaterial({color:0x78a85c,roughness:.95}),path=new THREE.MeshStandardMaterial({color:0xa98c69,roughness:.9});
  const original=grass.color.clone();effects.setLevel(level,{grassMaterials:[grass],pathMaterials:[path]});
  effects.update(10,{weather:{type:'rain',rainIntensity:.8}});const wet=effects.wetness;assert.ok(wet>0&&wet<.2);assert.notDeepEqual(grass.color,original);
  effects.update(5,{weather:{type:'rain',rainIntensity:.8},paused:true});assert.equal(effects.wetness,wet);
  effects.update(0,{weather:{type:'rain',rainIntensity:1}});assert.equal(effects.wetness,wet);
  effects.update(10,{weather:{type:'sun'}});assert.ok(effects.wetness<wet);
  effects.dispose();assert.ok(grass.color.equals(original));assert.equal(grass.roughness,.95);assert.equal(path.roughness,.9);
});

test('grass is unchanged before rain and darkens in proportion to accumulated wetness',()=>{
  const effects=new WaterEffects(new THREE.Scene()),level=createLevel(0),grass=new THREE.MeshStandardMaterial({color:0x78a85c}),original=grass.color.clone();
  effects.setLevel(level,{grassMaterials:[grass]});effects.update(.1,{weather:{type:'sun'}});assert.ok(grass.color.equals(original));
  effects.update(10,{weather:{type:'rain',rainIntensity:1}});const slight=grass.color.clone();assert.ok(!slight.equals(original));assert.ok(slight.r>new THREE.Color(0x42634a).r);
  effects.update(20,{weather:{type:'rain',rainIntensity:1}});assert.ok(grass.color.r<slight.r);effects.dispose();
});

test('setLevel restores owned surface state and resets accumulated wetness',()=>{
  const effects=new WaterEffects(new THREE.Scene()),a=createLevel(0),b=createLevel(1),grass=new THREE.MeshStandardMaterial({color:0x779955});
  const original=grass.color.clone();effects.setLevel(a,{grassMaterials:[grass]});effects.update(10,{weather:{type:'rain',rainIntensity:1}});assert.ok(effects.wetness>0);
  effects.setLevel(b,{grassMaterials:[grass]});assert.equal(effects.wetness,0);assert.ok(grass.color.equals(original));effects.dispose();
});

test('moving wet-weather actors create only bounded splash and safe-land puddle effects',()=>{
  const effects=new WaterEffects(new THREE.Scene(),{maxSplashes:3,maxPuddles:2}),level=createLevel(0);effects.setLevel(level);
  assert.equal(effects.puddles.length,2);assert.ok(effects.puddles.every(p=>!level.rivers.some(r=>r.points.some((a,i)=>i&&Math.hypot(p.site.x-a.x,p.site.z-a.z)<r.width/2+.8))));
  const site=effects.puddles[0].site;
  for(let i=0;i<800;i++)effects.update(.1,{weather:{type:'rain',rainIntensity:1}});
  assert.ok(effects.puddles[0].depth>.28);
  for(let i=0;i<40;i++)effects.update(.016,{weather:{type:'rain',rainIntensity:1},movers:[{id:'dog',x:site.x+(i%2)*.04,z:site.z,previousX:site.x+((i+1)%2)*.04,previousZ:site.z}]});
  assert.ok(effects.splashes.some(s=>s.mesh.visible));assert.equal(effects.splashes.length,3);assert.ok(effects.splashes.filter(s=>s.mesh.visible).length<=3);
  assert.ok(effects.puddles.every(p=>!p.mesh.visible||Number.isFinite(p.mesh.position.y)));
  effects.update(.016,{weather:{type:'rain',rainIntensity:1},movers:[{id:'other',x:site.x+10,z:site.z,previousX:site.x+9.99,previousZ:site.z}]});assert.equal(effects.lastSplashAt.has('other'),false);
  effects.dispose();assert.equal(effects.root.parent,null);
});

test('puddles reject bridge decks and independent splash opacity stays per effect',()=>{
  const effects=new WaterEffects(new THREE.Scene(),{maxSplashes:2,maxPuddles:2}),level=createLevel(7);effects.setLevel(level);
  const bridges=level.rivers.flatMap(r=>r.bridges);for(const p of effects.puddles)for(const b of bridges){const dx=p.site.x-b.x,dz=p.site.z-b.z,along=dx*Math.sin(b.heading)+dz*Math.cos(b.heading),across=dx*Math.cos(b.heading)-dz*Math.sin(b.heading);assert.ok(Math.abs(along)>=b.length/2+.45||Math.abs(across)>=b.width/2+.45);}
  effects.spawnSplash({x:0,z:0});effects.spawnSplash({x:1,z:1});effects.splashes[0].age=.1;effects.splashes[1].age=.8;
  effects.update(.01,{weather:{type:'rain',rainIntensity:1}});assert.notEqual(effects.splashes[0].material.opacity,effects.splashes[1].material.opacity);effects.dispose();
});

test('river overlays share source geometry without disposing it and dispose owned flow resources',()=>{
  const scene=new THREE.Scene(),effects=new WaterEffects(scene),level=createLevel(0),geometry=new THREE.PlaneGeometry(2,8),mesh=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial());scene.add(mesh);
  let disposed=0;geometry.addEventListener('dispose',()=>disposed++);effects.setLevel(level,{rivers:[{mesh,heading:Math.PI/4}]});assert.equal(effects.root.children.filter(c=>c.name==='River flow').length,1);
  effects.dispose();assert.equal(disposed,0);assert.ok(mesh.parent===scene);
});

test('river flow follows heading in world-coordinate ribbon UVs',()=>{
  const scene=new THREE.Scene(),effects=new WaterEffects(scene),level=createLevel(0),mesh=new THREE.Mesh(new THREE.PlaneGeometry(2,8),new THREE.MeshBasicMaterial());
  effects.setLevel(level,{rivers:[{mesh,heading:Math.PI/2,flowSpeed:.5}]});const overlay=effects.root.children.find(c=>c.name==='River flow'),before=overlay.material.map.offset.clone();
  effects.update(.1,{weather:{type:'sun'}});assert.ok(overlay.material.map.offset.x>before.x);assert.ok(Math.abs(overlay.material.map.offset.y-before.y)<1e-8);effects.dispose();
});

test('persistent puddles still splash after rainfall stops',()=>{
  const effects=new WaterEffects(new THREE.Scene()),level=createLevel(7);effects.setLevel(level);
  for(let i=0;i<800;i++)effects.update(.1,{weather:{type:'rain',rainIntensity:1}});
  const p=effects.puddles[0];effects.update(.016,{weather:{type:'sun'},movers:[{id:'dry-sky',x:p.site.x,z:p.site.z,previousX:p.site.x-.025,previousZ:p.site.z}]});
  assert.ok(effects.lastSplashAt.has('dry-sky'));effects.dispose();
});

test('river arc-length flow follows a bend and owns its UV geometry',()=>{
  const level=createLevel(0),geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,0,0,8,8,0,8],3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute([0,0,0,2,2,2],2));
  const mesh=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial()),effects=new WaterEffects(new THREE.Scene());
  effects.setLevel(level,{rivers:[{mesh,points:[{x:0,z:0},{x:0,z:8},{x:8,z:8}],width:4}]});
  const overlay=effects.root.children.find(c=>c.name==='River flow');assert.notEqual(overlay.geometry,geometry);
  assert.deepEqual([...overlay.geometry.attributes.uv.array],[0,0,0,2,0,4]);assert.deepEqual([...overlay.material.map.repeat],[1,1]);
  effects.update(.1,{weather:{type:'sun'}});assert.equal(overlay.material.map.offset.x,0);assert.ok(overlay.material.map.offset.y>0);
  let disposed=0;overlay.geometry.addEventListener('dispose',()=>disposed++);effects.dispose();assert.equal(disposed,1);assert.deepEqual([...geometry.attributes.uv.array],[0,0,0,2,2,2]);
});

test('fixed rainy levels begin with wet surfaces and only small seeded puddles, then restart dry',()=>{
 const effects=new WaterEffects(new THREE.Scene()),level=createLevel(23),grass=new THREE.MeshStandardMaterial({color:'#ffffff'}),original=grass.color.clone();
 effects.setLevel(level,{grassMaterials:[grass],weather:{kind:'storm',type:'rain',rainIntensity:.9,cloudCoverage:.85}});
 assert.equal(effects.elapsed,0);assert.equal(effects.wetness,.6);assert.ok(!grass.color.equals(original));assert.ok(effects.puddles.every(p=>p.depth<=.2));
 const snapshot=effects.wetness;effects.update(1,{weather:{type:'rain',rainIntensity:.9},paused:true});assert.equal(effects.wetness,snapshot);
 effects.setLevel(level,{grassMaterials:[grass],weather:{kind:'rain',type:'rain',rainIntensity:.3}});assert.equal(effects.wetness,.03);assert.ok(effects.puddles.every(p=>p.depth<=.2));
 effects.setLevel(createLevel(0),{grassMaterials:[grass],weather:{kind:'sun',type:'sun'}});assert.equal(effects.wetness,0);assert.ok(grass.color.equals(original));effects.dispose();
});

const rainWeather={type:'rain',kind:'storm',rainIntensity:.9};
function advance(effects,seconds,weather=rainWeather){for(let i=0;i<Math.ceil(seconds*10);i++)effects.update(.1,{weather});}

test('seeded rainy starts vary between none and small puddles and restart identically',()=>{
  const effects=new WaterEffects(new THREE.Scene());let empty=0,small=0;
  for(let seed=0;seed<20;seed++){
    const level=createLevel(seed);effects.setLevel(level,{weather:rainWeather});
    const start=effects.puddles.map(p=>({depth:p.depth,scale:p.mesh.scale.x}));
    assert.ok(start.every(p=>p.depth>=0&&p.depth<=.2));
    if(start.some(p=>p.depth>0))small++;else empty++;
    advance(effects,15);effects.setLevel(level,{weather:rainWeather});
    assert.deepEqual(effects.puddles.map(p=>({depth:p.depth,scale:p.mesh.scale.x})),start);
  }
  assert.ok(empty>0&&small>0);effects.dispose();
});

test('puddle area and opacity grow throughout expected level duration and remain bounded',()=>{
  const effects=new WaterEffects(new THREE.Scene()),level=createLevel(7);effects.setLevel(level,{weather:rainWeather});
  const p=effects.puddles[0],initial=p.mesh.scale.x,duration=puddleGrowthSeconds(level);
  assert.ok(duration>=45&&duration<=240);advance(effects,duration/2);
  const halfway=p.mesh.scale.x;assert.ok(halfway>initial&&halfway<p.site.radius);assert.ok(p.mesh.visible&&p.material.opacity>.18);
  const depth=p.depth;effects.update(.1,{weather:rainWeather,paused:true});effects.update(0,{weather:rainWeather});assert.equal(p.depth,depth);
  advance(effects,duration);assert.equal(p.depth,1);assert.equal(p.mesh.scale.x,p.site.radius);
  advance(effects,duration);assert.equal(p.depth,1);effects.dispose();
});

test('light rain grows puddles on level pacing while dry levels have no puddles or growth',()=>{
  const effects=new WaterEffects(new THREE.Scene()),level=createLevel(0),dry={type:'sun',kind:'sun'};
  effects.setLevel(level,{weather:dry});advance(effects,60,dry);assert.ok(effects.puddles.every(p=>p.depth===0&&!p.mesh.visible));
  const rain={type:'rain',kind:'rain',rainIntensity:.2};effects.setLevel(level,{weather:rain});advance(effects,puddleGrowthSeconds(level),rain);
  assert.ok(effects.puddles.every(p=>p.depth>.99&&p.mesh.visible));effects.dispose();
});

function portraitSeesPuddle(p,point){
  const half=19.5,aspect=9/16,camera=new THREE.OrthographicCamera(-half*aspect,half*aspect,half,-half,.1,180);
  camera.position.set(point.x+2,36,point.z+30);camera.lookAt(point.x+2,0,point.z-1);camera.updateMatrixWorld(true);
  const center=new THREE.Vector3(p.site.x,.024,p.site.z).project(camera);
  return Math.abs(center.x)<.95&&Math.abs(center.y)<.95&&Math.abs(center.z)<1;
}

test('portrait players see accumulating puddles along large level routes, including seeded spawn puddles',()=>{
  const effects=new WaterEffects(new THREE.Scene());
  // These six levels previously placed every puddle outside every route camera.
  for(const index of [47,67,71,83,87,99]){
    const level=createLevel(index);effects.setLevel(level,{weather:rainWeather});advance(effects,puddleGrowthSeconds(level));
    const routePoints=level.routes.flatMap(r=>r.points);
    assert.ok(effects.puddles.filter(p=>p.mesh.visible&&routePoints.some(point=>portraitSeesPuddle(p,point))).length>=4,`level ${index+1}: visible journey puddles`);
    assert.ok(effects.puddles.some(p=>portraitSeesPuddle(p,level.spawn)),`level ${index+1}: near spawn`);
  }
  for(let index=0;index<100;index++){
    const level=createLevel(index);effects.setLevel(level,{weather:rainWeather});
    const visible=effects.puddles.filter(p=>p.mesh.visible);
    if(visible.length)assert.ok(visible.some(p=>portraitSeesPuddle(p,level.spawn)),`level ${index+1}: seeded small puddle visible at spawn`);
  }
  effects.dispose();
});
