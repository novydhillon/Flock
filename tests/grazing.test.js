import test from 'node:test';
import assert from 'node:assert/strict';
import {canGrazeAt,updateGrazing} from '../src/grazing.js';
import {targetWorldPoint,segmentDistance} from '../src/world.js';

const meadow=()=>({bounds:{minX:-50,maxX:50,minZ:-50,maxZ:50},rivers:[],roads:[],fenceSegments:[],obstacles:[]});
test('grass and bush ground allow grazing; paths, rotated decks, water and barn floors exclude it',()=>{
  const level=meadow();assert.ok(canGrazeAt(level,{x:0,z:0}));
  level.roads=[{width:4,points:[{x:-10,z:0},{x:10,z:0}]}];
  assert.equal(canGrazeAt(level,{x:0,z:2.4}),false);assert.ok(canGrazeAt(level,{x:0,z:3}));
  level.roads=[];const bridge={x:0,z:0,heading:Math.PI/4,width:4,length:10};
  level.rivers=[{width:3,points:[{x:-20,z:0},{x:20,z:0}],bridges:[bridge]}];
  assert.equal(canGrazeAt(level,{x:2,z:2}),false);assert.equal(canGrazeAt(level,{x:12,z:0}),false);
  level.rivers=[];level.target={x:0,z:0,radius:5,heading:Math.PI/3,type:'barn'};
  assert.equal(canGrazeAt(level,targetWorldPoint(level.target,6,5)),false);
  level.target.type='pen';assert.ok(canGrazeAt(level,{x:0,z:0}));
  level.target.type='field';assert.ok(canGrazeAt(level,{x:0,z:0}));
});
test('calm animals graze after settling, lift for motion and pressure, freeze and reject mouth over path',()=>{
  for(const type of ['sheep','cow']){
    const level=meadow(),a={x:0,z:0,vx:0,vz:0,type},pose={rotation:{y:0},userData:{}};
    for(let i=0;i<120;i++)updateGrazing(pose,a,level,1/60);
    assert.equal(pose.userData.graze,1);const frozen={...pose.userData};
    updateGrazing(pose,a,level,0);assert.deepEqual(pose.userData,frozen);
    a.vx=2;for(let i=0;i<30;i++)updateGrazing(pose,a,level,1/60);assert.equal(pose.userData.graze,0);
    a.vx=0;a.alert=1;for(let i=0;i<120;i++)updateGrazing(pose,a,level,1/60);assert.equal(pose.userData.graze,0);
    a.alert=0;pose.userData.graze=1;level.roads=[{width:.1,points:[{x:-10,z:.8},{x:10,z:.8}]}];
    assert.ok(canGrazeAt(level,a));updateGrazing(pose,a,level,.1);assert.equal(pose.userData.graze,0);
  }
});

test('large cow hooves straddling barn and rotated deck edges prevent grazing',()=>{
  const level=meadow(),a={x:0,z:-6.5,vx:0,vz:0,type:'cow',scale:1.25};
  const pose={rotation:{y:Math.PI},userData:{}};
  level.target={x:0,z:0,radius:5,heading:0,type:'barn'};
  assert.ok(canGrazeAt(level,a),'center is on grass outside barn');
  for(let i=0;i<120;i++)updateGrazing(pose,a,level,1/60);
  assert.equal(pose.userData.graze,0,'front/rear feet must also be off the barn floor');
  level.target=null;
  const heading=Math.PI/4,bridge={x:0,z:0,heading,width:4,length:10};
  level.rivers=[{width:1,points:[{x:-20,z:0},{x:20,z:0}],bridges:[bridge]}];
  a.x=Math.sin(heading)*5.3;a.z=Math.cos(heading)*5.3;pose.rotation.y=heading;
  assert.ok(canGrazeAt(level,a),'center is beyond the deck end');
  for(let i=0;i<120;i++)updateGrazing(pose,a,level,1/60);
  assert.equal(pose.userData.graze,0,'rear feet on deck prevent feeding');
});

test('indexed road exclusion matches exact polyline queries across grid boundaries',()=>{
  const level=meadow();level.roads=[
    {width:4,points:[{x:-40,z:-30},{x:0,z:4},{x:40,z:30}]},
    {width:2,points:[{x:-38,z:31},{x:10,z:-20},{x:39,z:-20}]}
  ];
  for(let x=-39;x<=39;x+=1.3)for(let z=-39;z<=39;z+=1.7){
    const p={x,z},onRoad=level.roads.some(r=>r.points.slice(1).some((b,i)=>segmentDistance(p,r.points[i],b)<=r.width/2+.5));
    assert.equal(canGrazeAt(level,p),!onRoad);
  }
});
