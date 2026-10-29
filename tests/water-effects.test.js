import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { WaterEffects, puddleGrowthSeconds } from '../src/water-effects.js';
import { ribbon } from '../src/surfaces.js';
import { riverSurfaceContains } from '../src/river-details.js';
import { createWeatherState } from '../src/weather.js';
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
  const positions=overlay.geometry.attributes.position,uvs=overlay.geometry.attributes.uv;
  for(const [x,z,u,v] of [[0,0,0,0],[0,8,0,2],[8,8,0,4]]){let found=false;for(let i=0;i<positions.count;i++)if(positions.getX(i)===x&&positions.getZ(i)===z){found=true;assert.equal(uvs.getX(i),u);assert.equal(uvs.getY(i),v);}assert.ok(found);}
  assert.deepEqual([...overlay.material.map.repeat],[1,1]);
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


function riverFixture(level){
  const river=level.rivers[0],mesh=new THREE.Mesh(ribbon(river.points,river.width,{y:.018}),new THREE.MeshStandardMaterial());
  return {...river,mesh};
}

test('water preserves sunny color, darkens across real weather tiers and transitions smoothly',()=>{
  const effects=new WaterEffects(new THREE.Scene()),level=createLevel(23),water=new THREE.MeshStandardMaterial({color:0x43adc4,roughness:.45}),original=water.color.clone();
  const weather=kind=>createWeatherState({...level,weather:kind});
  effects.setLevel(level,{waterMaterial:water,weather:weather('sun')});
  advance(effects,2,weather('sun'));assert.ok(water.color.equals(original));
  let previous=original.r;
  for(const kind of ['wind','rain','heavy-rain','storm']){
    effects.setLevel(level,{waterMaterial:water,weather:weather(kind)});
    assert.ok(water.color.r<previous,kind);previous=water.color.r;
  }
  effects.setLevel(level,{waterMaterial:water,weather:weather('sun')});effects.update(.05,{weather:weather('storm')});
  assert.ok(water.color.r<original.r&&water.color.r>previous);
  const activity=effects.waterActivity,color=water.color.clone();effects.update(.1,{weather:weather('sun'),paused:true});assert.equal(effects.waterActivity,activity);assert.ok(water.color.equals(color));
  advance(effects,12,weather('sun'));assert.ok(water.color.equals(original));effects.dispose();assert.ok(water.color.equals(original));
});

test('storm current and obstacle wakes strengthen together while pause freezes both clocks',()=>{
  const level=createLevel(23),river=riverFixture(level),effects=new WaterEffects(new THREE.Scene());effects.setLevel(level,{rivers:[river]});
  const flow=effects.root.children.find(c=>c.name==='River flow'),detail=effects.riverDetails[0],u=detail.wakes.material.uniforms;
  const offset=flow.material.map.offset.y;effects.update(.1,{weather:{type:'sun'}});const sunnyStep=flow.material.map.offset.y-offset,sunnyStrength=u.strength.value,sunnyOpacity=flow.material.opacity;
  advance(effects,4,createWeatherState({...level,weather:'storm'}));const before=flow.material.map.offset.y;effects.update(.1,{weather:createWeatherState({...level,weather:'storm'})});
  assert.ok((flow.material.map.offset.y-before+1)%1>sunnyStep*2);assert.ok(u.strength.value>sunnyStrength);assert.ok(flow.material.opacity>sunnyOpacity);
  const clock=u.time.value,frozen=flow.material.map.offset.y;effects.update(.1,{weather:{type:'sun'},paused:true});assert.equal(u.time.value,clock);assert.equal(flow.material.map.offset.y,frozen);effects.dispose();
});

test('obstacle wake phase tracks each river current without jumping when weather changes',()=>{
  const level=createLevel(23),river=riverFixture(level),effects=new WaterEffects(new THREE.Scene());
  river.flowSpeed=.24;
  effects.setLevel(level,{rivers:[river]});
  const detail=effects.riverDetails[0],u=detail.wakes.material.uniforms;
  effects.update(.1,{weather:{type:'sun'}});
  assert.ok(Math.abs(u.time.value-.14)<1e-6);
  const before=u.time.value;
  effects.update(.1,{weather:{type:'sun'}});
  assert.ok(Math.abs(u.time.value-before-.14)<1e-6);
  const steady=u.time.value;
  effects.update(.1,{weather:{type:'rain',rainIntensity:1,cloudCoverage:1,severity:1}});
  assert.ok(u.time.value>steady+.14);
  assert.equal(u.speed.value,1);
  effects.dispose();
});

test('seeded rocks and clipped wakes use actual curved river banks and bridge crossings',()=>{
  for(const index of [1,23,47,99]){
    const level=createLevel(index),river=riverFixture(level),effects=new WaterEffects(new THREE.Scene()),original=JSON.stringify(level.rivers);
    effects.setLevel(level,{rivers:[river]});const detail=effects.riverDetails[0],sites=JSON.stringify(detail.sites),rocks=detail.sites.filter(p=>p.kind==='rock'),footings=detail.sites.filter(p=>p.kind==='footing');
    assert.ok(rocks.length>0);assert.equal(footings.length,river.bridges.length*4);
    for(const p of rocks)assert.ok(riverSurfaceContains(river.mesh.geometry,p.x,p.z));
    for(const p of footings){assert.ok(riverSurfaceContains(river.mesh.geometry,p.x,p.z));assert.ok(!riverSurfaceContains(river.mesh.geometry,p.x+p.direction.z*.03,p.z-p.direction.x*.03)||!riverSurfaceContains(river.mesh.geometry,p.x-p.direction.z*.03,p.z+p.direction.x*.03));}
    const positions=detail.wakes.geometry.attributes.position;
    assert.ok(positions.count>0);for(let i=0;i<positions.count;i++)assert.ok(riverSurfaceContains(river.mesh.geometry,positions.getX(i),positions.getZ(i)),`level ${index}: wake vertex ${i}`);
    assert.equal(JSON.stringify(level.rivers),original);
    const rockMesh=detail.root.children.find(o=>o.isInstancedMesh);assert.ok(rockMesh.castShadow&&rockMesh.receiveShadow);let instanceDisposals=0;rockMesh.addEventListener('dispose',()=>instanceDisposals++);
    const resources=detail.resources.slice();let disposed=0;for(const r of resources)r.addEventListener('dispose',()=>disposed++);
    effects.setLevel(level,{rivers:[river]});assert.equal(disposed,resources.length);assert.equal(instanceDisposals,1,'rock instance buffers release on level replacement');assert.equal(JSON.stringify(effects.riverDetails[0].sites),sites);effects.dispose();
  }
});


test('running-water ripple texture tiles seamlessly with short broken cross-current crests',()=>{
  const effects=new WaterEffects(new THREE.Scene()),{data,width,height}=effects.flowMap.image;
  const alpha=(x,y)=>data[(y*width+x)*4+3];
  for(let i=0;i<width;i++){assert.equal(alpha(i,0),alpha(i,height-1));assert.equal(alpha(0,i),alpha(width-1,i));}
  let crossings=0;for(let y=1;y<height;y++)if(alpha(0,y)>30&&alpha(0,y-1)<=30)crossings++;
  assert.ok(crossings>=7,'short repeated ripples remain visible in the current');
  let broken=0;for(let y=0;y<height;y++)if(Math.abs(alpha(0,y)-alpha(16,y))>35)broken++;
  assert.ok(broken>10,'crests vary across the river rather than forming uniform parallel bars');effects.dispose();
});
