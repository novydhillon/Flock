import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createLevel, canOccupy, hasClearGroundPath, moveBody } from '../src/world.js';
import { PASTURE, roughPastureEnabled, pastureGrassSites } from '../src/pasture.js';
import { pastureClumpGeometry, pastureRockGeometry } from '../src/pasture-view.js';
import { animalRadius, COW_SCALES } from '../src/animal-size.js';

const segmentDistance=(p,a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-a.x-t*dx,p.z-a.z-t*dz);};

test('rough pasture rocks are deterministic real blockers with clear routes, starts, structures and water',()=>{
  let count=0;
  const largestCow=animalRadius({type:'cow',scale:COW_SCALES.at(-1)});
  for(let index=5;index<100;index++)for(const seed of [undefined,200,201]){
    const level=createLevel(index,seed), rocks=level.obstacles.filter(o=>o.kind==='rock');
    assert.ok(rocks.length<=PASTURE.roughRocks&&level.obstacles.length<=260);
    if(!roughPastureEnabled(level))assert.equal(rocks.length,0);
    for(const rock of rocks){
      count++;
      assert.ok(Math.hypot(rock.x-level.spawn.x,rock.z-level.spawn.z)>=rock.radius+18);
      assert.ok(Math.hypot(rock.x-level.target.x,rock.z-level.target.z)>=rock.radius+level.target.radius+12);
      for(const animal of level.animals)assert.ok(Math.hypot(rock.x-animal.x,rock.z-animal.z)>=rock.radius+4);
      for(const road of level.roads)for(let j=1;j<road.points.length;j++)assert.ok(segmentDistance(rock,road.points[j-1],road.points[j])>=road.width/2+rock.radius+3);
      for(const river of level.rivers)for(let j=1;j<river.points.length;j++)assert.ok(segmentDistance(rock,river.points[j-1],river.points[j])>=river.width/2+rock.radius+4);
      for(const wall of level.fenceSegments)assert.ok(segmentDistance(rock,wall.a,wall.b)>=rock.radius+4);
      for(const radius of [.42,.55,largestCow])assert.equal(canOccupy(level,rock.x,rock.z,radius),false);
    }
    if(!rocks.length)continue;
    for(const gate of level.gates)gate.open=true;
    for(const route of level.routes)for(let i=1;i<route.points.length;i++)assert.ok(hasClearGroundPath(level,route.points[i-1],route.points[i],largestCow),`route preserved ${index}/${seed}/${route.id}/${i}`);
  }
  assert.ok(count>300,'many layouts exercise physical boulders');
  const first=createLevel(5);assert.deepEqual(first.obstacles,createLevel(5).obstacles);
});

test('every body radius stops at a rock and can pass safely outside its physical disk',()=>{
  const rock={x:0,z:0,radius:1.8,kind:'rock'}, level={bounds:{minX:-20,maxX:20,minZ:-20,maxZ:20},obstacles:[rock]};
  for(const radius of [.42,.55,...COW_SCALES.map(scale=>animalRadius({type:'cow',scale}))]){
    const body={x:-5,z:0};moveBody(level,body,10,0,radius);
    assert.ok(body.x<=-rock.radius-radius&&body.x>-rock.radius-radius-.26,'movement cannot tunnel through the boulder');
    assert.equal(hasClearGroundPath(level,{x:-5,z:0},{x:5,z:0},radius),false);
    const outside={x:-5,z:rock.radius+radius+.05};moveBody(level,outside,10,0,radius);
    assert.ok(Math.abs(outside.x-5)<1e-9,'outside edge remains traversable');
  }
});

test('grass uses dense dimensional folded leaves and a varied small fringe, never an underlying disc',()=>{
  const level=createLevel(5),sites=pastureGrassSites(level,()=>true);
  assert.equal(sites.length,PASTURE.roughClumps);assert.deepEqual(sites,pastureGrassSites(level,()=>true));
  assert.ok(sites.some(site=>site.scale<.7)&&sites.some(site=>site.scale>1),'soft fringe has smaller clumps than the core');
  const geometry=pastureClumpGeometry(),position=geometry.attributes.position,color=geometry.attributes.color;
  geometry.computeBoundingBox();
  assert.ok(geometry.boundingBox.max.y>.55&&geometry.boundingBox.max.x-geometry.boundingBox.min.x>.65,'geometry has meaningful height and spread');
  assert.ok(position.count<150&&geometry.index.count/3<200,'one bounded rosette serves all instances');
  let low=Infinity,high=-Infinity;for(let i=0;i<color.count;i++){low=Math.min(low,color.getY(i));high=Math.max(high,color.getY(i));}
  assert.ok(high-low>.15,'root and tip have distinct illumination colors');
  geometry.dispose();
  const rock=pastureRockGeometry(),p=rock.attributes.position;
  for(let i=0;i<p.count;i++)assert.ok(Math.hypot(p.getX(i),p.getZ(i))<=1,'visual rock stays inside the shared collision radius');
  rock.dispose();
});
