import test from 'node:test';
import assert from 'node:assert/strict';
import {createLevel,randomSource,tickLevel,isBlocked} from './world.js';
import {COMPANION_LEVELS,companionAvailable,updateHelpers} from './helpers.js';

test('Buddy Bot unlocks at level 10 and drone unlocks at level 20',()=>{
  assert.deepEqual(COMPANION_LEVELS,{buddy:10,drone:20});
  for(let n=1;n<10;n++)assert.equal(companionAvailable('buddy',n),false);
  for(let n=1;n<20;n++)assert.equal(companionAvailable('drone',n),false);
  assert.equal(companionAvailable('buddy',10),true);
  assert.equal(companionAvailable('drone',20),true);
  assert.equal(companionAvailable('speed',1),true);
});
test('Buddy Bot actively chases and herds a straggler rather than idling by the player',()=>{
  const withHelper=createLevel(1),withoutHelper=createLevel(1);
  const dog={x:-10000,y:-10000};
  const h={kind:'buddy',x:180,y:withHelper.flockStart.y,vx:0,vy:0,angle:0,phase:0,active:true};
  const startX=h.x;
  for(let i=0;i<260;i++){
    updateHelpers(withHelper,dog,[h],.05);
    tickLevel(withHelper,dog,[h],.05,{});
    tickLevel(withoutHelper,dog,[],.05,{});
  }
  assert.ok(h.x>startX+100,'buddy should travel across the meadow');
  assert.ok(!isBlocked(withHelper,h.x,h.y,21),'buddy respects terrain');
  const progress=l=>l.delivered*1000+l.animals.reduce((total,a)=>total+a.x,0);
  assert.ok(progress(withHelper)>progress(withoutHelper)+50,'buddy should make forward herding progress');
});
test('a drone moves quickly to stragglers beyond a river',()=>{
  const l=createLevel(3),r=l.river;
  l.animals.forEach((a,i)=>{a.x=r.x+r.width/2+235+i*2;a.y=r.bridgeY+30;});
  const dog={x:180,y:r.bridgeY},h={kind:'drone',x:200,y:r.bridgeY,vx:0,vy:0,active:true,phase:0};
  for(let i=0;i<170;i++)updateHelpers(l,dog,[h],.05);
  assert.ok(h.x>r.x+r.width/2+20,'drone crosses river to help far animals');
  assert.ok(Math.hypot(h.vx,h.vy)<350,'drone has a capped movement speed');
});
