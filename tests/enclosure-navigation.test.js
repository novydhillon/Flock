import test from 'node:test';
import assert from 'node:assert/strict';
import {createLevel,targetFootprint,targetWorldPoint,navigationTarget,openingSteer,hasClearGroundPath,moveBody,distance,canOccupy} from '../src/world.js';

test('local enclosure navigation walks around solid far and side walls with each moving body radius',()=>{
  for(const seed of [200,201,202,203])for(const radius of [.55,.62,.78])for(const side of [-1,0,1]){
    const level=createLevel(23,seed),shape=targetFootprint(level.target),extent=shape.halfLength;
    const body=side?targetWorldPoint(level.target,0,side*(extent+1.5)):targetWorldPoint(level.target,extent+1.5,0),entrance=shape.entrance;
    assert.ok(canOccupy(level,body.x,body.z,radius));
    assert.equal(hasClearGroundPath(level,body,entrance,radius),false);
    for(let i=0;i<650&&distance(body,entrance)>.08;i++){
      const waypoint=navigationTarget(level,body,entrance,radius),dx=waypoint.x-body.x,dz=waypoint.z-body.z,d=Math.hypot(dx,dz)||1,step=Math.min(.12,d);
      assert.ok(hasClearGroundPath(level,body,waypoint,radius),'local waypoint has actual body clearance');
      moveBody(level,body,dx/d*step,dz/d*step,radius);
      assert.ok(canOccupy(level,body.x,body.z,radius));
    }
    assert.ok(distance(body,entrance)<.1,'walks around an open corner to the physical entrance');
  }
});

test('pressure at the enclosure far wall receives a safe corner direction; no incoming motion gives no steering',()=>{
  for(const seed of [200,201,202,203])for(const radius of [.55,.78]){
    const level=createLevel(23,seed),shape=targetFootprint(level.target),body=targetWorldPoint(level.target,shape.halfLength+1.1,0),f=shape.forward;
    assert.equal(hasClearGroundPath(level,body,{x:body.x-f.x*2,z:body.z-f.z*2},radius),false);
    const steer=openingSteer(level,body,-f.x*2,-f.z*2,radius);
    assert.ok(Math.hypot(steer.x,steer.z)>.5);
    assert.ok(Math.abs(steer.x*f.z-steer.z*f.x)>.5,'steering heads around a corner instead of pressing the far wall');
    assert.ok(hasClearGroundPath(level,body,{x:body.x+steer.x*.1,z:body.z+steer.z*.1},radius));
    assert.deepEqual(openingSteer(level,body,0,0,radius),{x:0,z:0});
  }
});

test('route fallback does not accept a straight path that only a smaller body can fit',()=>{
  const level={bounds:{minX:-20,maxX:20,minZ:-20,maxZ:20},rivers:[],fenceSegments:[],obstacles:[{x:2,z:1.3,radius:.55}],routes:[{id:'route-0',points:[{x:0,z:0},{x:1,z:0},{x:2,z:0},{x:3,z:0},{x:4,z:0},{x:8,z:0}],length:8}]},body={x:0,z:0},desired={x:8,z:0};
  assert.equal(hasClearGroundPath(level,body,desired,.6),true);
  assert.equal(hasClearGroundPath(level,body,desired,.78),false);
  const waypoint=navigationTarget(level,body,desired,.78);
  assert.notDeepEqual(waypoint,desired);
  assert.ok(hasClearGroundPath(level,body,waypoint,.78));
});
