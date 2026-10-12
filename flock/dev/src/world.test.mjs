import test from 'node:test';
import assert from 'node:assert/strict';
import {createLevel,isBlocked,randomSource,nextWaypoint,tickLevel} from './world.js';
test('tutorial starts with exactly four robotic sheep and an reachable pen',()=>{const level=createLevel(1);assert.equal(level.animals.length,4);assert.equal(level.goal.type,'pen');assert.equal(level.river,null);assert.equal(isBlocked(level,level.goal.x,level.goal.y),false);});
test('worlds are deterministic and progression increases difficulty',()=>{const a=createLevel(7),b=createLevel(7);assert.deepEqual(a.animals,b.animals);assert.ok(createLevel(2).animals.length>createLevel(1).animals.length);assert.ok(createLevel(8).width>createLevel(2).width);});
test('river is impassable outside the bridge',()=>{const l=createLevel(3);assert.ok(isBlocked(l,l.river.x,l.river.bridgeY+250));assert.ok(!isBlocked(l,l.river.x,l.river.bridgeY));assert.equal(nextWaypoint(l,l.animals[0]).y,l.river.bridgeY);});
test('levels complete when all animals reach the pen',()=>{const l=createLevel(1);for(const a of l.animals){a.x=l.goal.x;a.y=l.goal.y;}assert.equal(tickLevel(l,{x:0,y:0},[],.016,{}),true);assert.equal(l.delivered,l.animals.length);});
test('PRNG produces values in unit interval',()=>{const rng=randomSource(20);for(let i=0;i<30;i++)assert.ok(rng()>=0&&rng()<1);});
test('the first eight herding routes can be navigated by a trailing dog',()=>{
  for(let n=1;n<=8;n++){
    const l=createLevel(n),dog={x:l.start.x,y:l.start.y};let done=false;
    for(let step=0;step<3600&&!done;step++){
      const remaining=l.animals.filter(a=>!a.delivered).sort((a,b)=>a.x-b.x);
      if(remaining.length){const a=remaining[0],waypoint=nextWaypoint(l,a);dog.x=a.x-95;dog.y=a.y-Math.sign(waypoint.y-a.y)*35;}
      done=tickLevel(l,dog,[],.05,{});
    }
    assert.equal(done,true,`level ${n} was not navigable`);
  }
});

test('new flocks spawn with personal space rather than overlapping sprites',()=>{
  for(const n of [1,5,10,20]){
    const l=createLevel(n);
    for(let i=0;i<l.animals.length;i++)for(let j=i+1;j<l.animals.length;j++){
      const a=l.animals[i],b=l.animals[j];
      assert.ok(Math.hypot(a.x-b.x,a.y-b.y)>96,`level ${n} starts with an overlap (${a.id}, ${b.id})`);
    }
  }
});
test('separation pushes overlapping animals apart without leaving navigable terrain',()=>{
  const l=createLevel(1),a=l.animals[0],b=l.animals[1];
  a.x=b.x=750;a.y=b.y=610;
  for(let step=0;step<25;step++)tickLevel(l,{x:100,y:610},[],.05,{});
  assert.ok(Math.hypot(a.x-b.x,a.y-b.y)>=65,'sheep recover spacing after overlap');
  for(const animal of l.animals){assert.ok(Number.isFinite(animal.x)&&Number.isFinite(animal.y));assert.equal(isBlocked(l,animal.x,animal.y),false);}
});
