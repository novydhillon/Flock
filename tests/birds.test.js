import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { MeadowNature } from '../src/nature.js';
import { birdLandingPositionSafe, stepWildlife } from '../src/wildlife.js';
import { wildlifeParts } from '../src/wildlife-models.js';

const meadow = () => ({ index:0, seed:42, bounds:{minX:-40,maxX:40,minZ:-40,maxZ:40}, dog:{x:-35,z:-35}, animals:[], roads:[], rivers:[], obstacles:[], fenceSegments:[] });
const bird = () => ({ kind:'bird', slot:0, x:0, z:0, homeX:0, homeZ:0, phase:.3, heading:0, visible:true });
const dt = 1 / 60;
const matrix = (batch, slot) => { const m = new THREE.Matrix4(); batch.getMatrixAt(slot,m); return m; };

test('seeded birds forage, hop, peck, gain height, fly and decelerate to dry ground', () => {
  const run = () => {
    const level=meadow(), a=bird(), states=new Set(); let hop=false, peck=false, height=0, landingSpeed=Infinity, landingFrames=0;
    for(let i=0;i<3600;i++) {
      const old={...a}; stepWildlife(level,a,dt,[],i*dt,{severity:0}); states.add(a.birdState);
      hop ||= a.hopHeight>0; peck ||= a.peck>0; height=Math.max(height,a.altitude);
      assert.ok(Number.isFinite(a.x+a.z+a.altitude+a.heading));
      assert.ok(Math.abs((old.altitude||0)-a.altitude)<.13,'vertical transitions do not teleport');
      if(a.birdState==='forage') assert.equal(birdLandingPositionSafe(level,a),true);
      if(old.birdState==='landing'&&a.birdState==='landing') {
        const speed=Math.hypot(a.x-old.x,a.z-old.z)/dt;
        assert.ok(speed<=landingSpeed+.00001,'landing slows toward its surface'); landingSpeed=speed; landingFrames++;
      } else landingSpeed=Infinity;
    }
    assert.deepEqual([...states].sort(),['flight','forage','landing','takeoff']);
    assert.ok(hop&&peck&&height>2.6&&landingFrames>30);
    return a;
  };
  assert.deepEqual(run(),run(),'restarting preserves the independent bird schedule');
});

test('water and bridge water cannot become landing sites; failed searches stay bounded in flight', () => {
  const level=meadow(); level.rivers=[{points:[{x:-200,z:0},{x:200,z:0}],width:200,bridges:[{x:0,z:0,width:4,length:220,heading:0}]}];
  assert.equal(birdLandingPositionSafe(level,{x:0,z:0},[],()=>true),false);
  const a={...bird(),birdState:'flight',altitude:3,cruiseAltitude:3,flightRemaining:0,clearTime:3};let searches=0;
  for(let i=0;i<1200;i++) stepWildlife(level,a,dt,[],i*dt,{severity:0},()=>{searches++;return true;});
  assert.equal(a.birdState,'flight'); assert.ok(a.altitude>2.9);
  assert.ok(searches>0&&searches<=24*14,'at most 24 sites per retry, with a quiet interval after failure');
});

test('a threat interrupts pecking or landing and does not repeatedly restart airborne takeoff', () => {
  const level=meadow(), a=bird(); stepWildlife(level,a,dt,[],0,{severity:0});
  Object.assign(a,{peck:1,peckElapsed:.2});
  stepWildlife(level,a,dt,[{x:0,z:-1}],dt,{severity:0});
  assert.equal(a.birdState,'takeoff');assert.equal(a.peck,0);
  for(let i=0;i<60;i++) stepWildlife(level,a,dt,[{x:a.x,z:a.z-1}],i*dt,{severity:0});
  assert.equal(a.birdState,'flight');assert.ok(a.altitude>2.6);
  for(let i=0;i<2000&&a.birdState!=='landing';i++) stepWildlife(level,a,dt,[],i*dt,{severity:0});
  assert.equal(a.birdState,'landing');
  for(let i=0;i<20;i++) stepWildlife(level,a,dt,[],i*dt,{severity:0});
  const altitude=a.altitude;
  stepWildlife(level,a,dt,[{x:a.x,z:a.z-1}],0,{severity:0});
  assert.equal(a.birdState,'takeoff');assert.equal(a.altitude,altitude);assert.equal(a.landingX,undefined);
});

test('wings flap about attached shoulder hinges, fold at rest, and pecking keeps feet supported', () => {
  const nature=new MeadowNature(new THREE.Scene());nature.setLevel(meadow());
  const a=nature.wildlife.find(a=>a.kind==='bird'), parts=wildlifeParts.bird;
  Object.assign(a,{x:0,z:0,heading:1.2,birdState:'forage',altitude:0,hopHeight:0,peck:0,shelter:0,phase:0});
  nature.poseBird(a,0);
  const folded=matrix(nature.batches.birdWing,a.slot*2+1),beakIndex=parts.findIndex(p=>p.part==='beak');
  const beakBefore=new THREE.Vector3().setFromMatrixPosition(matrix(nature.batches.birdBody,a.slot*parts.length+beakIndex));
  const feet=parts.flatMap((p,i)=>p.part==='foot'?[i]:[]).map(i=>matrix(nature.batches.birdBody,a.slot*parts.length+i).elements.slice());
  nature.poseBird(a,20);assert.deepEqual(matrix(nature.batches.birdWing,a.slot*2+1).elements,folded.elements,'resting wings do not beat');
  a.peck=1;nature.poseBird(a,20);
  const beakAfter=new THREE.Vector3().setFromMatrixPosition(matrix(nature.batches.birdBody,a.slot*parts.length+beakIndex));
  assert.ok(beakBefore.y-beakAfter.y>.25,'the beak lowers to forage');
  for(const [j,i] of parts.flatMap((p,i)=>p.part==='foot'?[i]:[]).entries()) assert.deepEqual(matrix(nature.batches.birdBody,a.slot*parts.length+i).elements,feet[j]);
  Object.assign(a,{birdState:'flight',altitude:3,peck:0});
  const tips=[];
  for(const time of [Math.PI/26,3*Math.PI/26]) {
    nature.poseBird(a,time);const pair=[];
    for(let j=0;j<2;j++) {
      const m=matrix(nature.batches.birdWing,a.slot*2+j),root=new THREE.Vector3().setFromMatrixPosition(m);
      assert.ok(m.determinant()>0,'wing instances use supported positive scales');
      const shoulder=new THREE.Vector3((j?1:-1)*.105,.28,0).applyMatrix4(nature.birdRoot);
      assert.ok(root.distanceTo(shoulder)<1e-6,'wing root stays at its body-local shoulder');
      pair.push(new THREE.Vector3(.4,0,0).applyMatrix4(m).y-root.y);
    }
    assert.ok(Math.abs(pair[0]-pair[1])<1e-6,'both wings rise and fall together');tips.push(pair[0]);
  }
  assert.ok(tips[0]>.25&&tips[1]<-.15,'bounded strokes lift and lower the tips');
  assert.equal(Object.keys(nature.batches).length,8,'bird detail reuses the existing draw budget');
  nature.dispose();
});

test('bird states and matrices freeze on pause, all hidden anatomy clears, and replacement resets birds', () => {
  const nature=new MeadowNature(new THREE.Scene()), level=meadow();nature.setLevel(level);
  const a=nature.wildlife.find(a=>a.kind==='bird');
  for(const state of ['forage','takeoff','flight','landing']) {
    Object.assign(a,{birdState:state,birdStateTime:.2,landingDuration:2,altitude:state==='forage'?0:2});nature.update(0,{});
    const before=JSON.stringify(nature.wildlife),matrices=Object.values(nature.batches).map(b=>b.instanceMatrix.array.slice());
    nature.update(.1,{paused:true});assert.equal(JSON.stringify(nature.wildlife),before);
    Object.values(nature.batches).forEach((b,i)=>assert.deepEqual(b.instanceMatrix.array,matrices[i]));
  }
  a.visible=false;nature.update(0,{});
  for(let i=0;i<wildlifeParts.bird.length;i++) assert.equal(new THREE.Vector3().setFromMatrixScale(matrix(nature.batches.birdBody,a.slot*wildlifeParts.bird.length+i)).lengthSq(),0);
  for(let i=0;i<2;i++) assert.equal(new THREE.Vector3().setFromMatrixScale(matrix(nature.batches.birdWing,a.slot*2+i)).lengthSq(),0);
  nature.setLevel(level);assert.ok(nature.wildlife.filter(a=>a.kind==='bird').every(a=>a.birdState===undefined&&a.landingX===undefined));
  nature.dispose();
});
