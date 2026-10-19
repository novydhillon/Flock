import test from 'node:test';
import assert from 'node:assert/strict';
import {buddyRecoveryTarget,moveBuddy,resetBuddyRecovery} from '../src/buddy-navigation.js';
import {canOccupy,hasClearGroundPath} from '../src/world.js';
const meadow=()=>({time:0,bounds:{minX:-20,maxX:20,minZ:-20,maxZ:20},rivers:[],obstacles:[],fenceSegments:[],gates:[],routes:[]});
function step(level,buddy,goal,options={}){
 level.time+=.05;
 const target=buddyRecoveryTarget(level,buddy,goal,.05,{taskKey:'herd:1',...options});
 moveBuddy(level,buddy,target,.05,7);
 return target;
}
test('blocked Buddy backs out through clear physical edges and never crosses a closed wall',()=>{
 const level=meadow(),buddy={x:0,z:0,heading:0},goal={x:0,z:8};
 level.fenceSegments=[{a:{x:-20,z:1},b:{x:20,z:1},material:'stone'}];
 let recovered=false,maxStep=0;
 for(let i=0;i<600;i++){
  const before={x:buddy.x,z:buddy.z};step(level,buddy,goal);
  recovered ||= Boolean(buddy.buddyRecovery?.escape);
  maxStep=Math.max(maxStep,Math.hypot(buddy.x-before.x,buddy.z-before.z));
  assert.ok(canOccupy(level,buddy.x,buddy.z,.6));assert.ok(buddy.z<1);
  if(buddy.buddyRecovery?.escape)assert.ok(hasClearGroundPath(level,buddy,buddy.buddyRecovery.escape,.6));
 }
 assert.ok(recovered);assert.ok(maxStep<=7*.05+1e-8);
});
test('no feasible backout waits, retries after delay, and keeps a finite attempt budget',()=>{
 const level=meadow(),buddy={x:0,z:0},goal={x:0,z:8};
 level.fenceSegments=[{a:{x:-1,z:1},b:{x:1,z:1}},{a:{x:-1,z:-1},b:{x:1,z:-1}},{a:{x:-1,z:-1},b:{x:-1,z:1}},{a:{x:1,z:-1},b:{x:1,z:1}}];
 let waited=false;
 for(let i=0;i<200;i++){step(level,buddy,goal);waited ||= Boolean(buddy.buddyRecovery.waitUntil);assert.ok(buddy.buddyRecovery.attempts<=3);}
 assert.ok(waited);assert.ok(Math.hypot(buddy.x,buddy.z)<.4);
});
test('slow clear pursuit and deliberate wait never enter obstacle recovery',()=>{
 const level=meadow(),buddy={x:0,z:0,heading:0};
 for(let i=0;i<200;i++){level.time+=.05;const target=buddyRecoveryTarget(level,buddy,{x:0,z:2+level.time*.1},.05,{taskKey:'slow'});moveBuddy(level,buddy,target,.05,.1);assert.equal(buddy.buddyRecovery.attempts,0);}
 for(const options of [{active:false},{yielding:true}]){buddy.navigationBlocked=true;step(level,buddy,{x:0,z:8},options);assert.equal(buddy.buddyRecovery,undefined);}
});
test('task, level and pause changes discard stale recovery paths without advancing clocks',()=>{
 const level=meadow(),buddy={x:0,z:0};step(level,buddy,{x:0,z:8});
 buddy.buddyRecovery.attempts=3;buddy.buddyNavigation={goal:{x:0,z:8},until:99,path:[{x:8,z:0}]};
 step(level,buddy,{x:0,z:8},{taskKey:'retrieve:2'});assert.equal(buddy.buddyRecovery.attempts,0);
 const previous=buddy.buddyRecovery.elapsed;
 buddyRecoveryTarget(level,buddy,{x:0,z:8},0,{taskKey:'retrieve:2'});assert.equal(buddy.buddyRecovery.elapsed,previous);
 buddy.buddyRecovery.attempts=3;step(meadow(),buddy,{x:0,z:8},{taskKey:'retrieve:2'});assert.equal(buddy.buddyRecovery.attempts,0);
 resetBuddyRecovery(buddy);assert.equal(buddy.buddyNavigation,undefined);assert.equal(buddy.buddyRecovery,undefined);
});
test('a futile clear-route oscillation triggers bounded replanning without collision',()=>{
 const level=meadow(),buddy={x:0,z:0},goal={x:0,z:8};
 let escaped=false;
 for(let i=0;i<140;i++){
  level.time+=.05;buddy.x=Math.sin(i*.2)*.15;
  buddyRecoveryTarget(level,buddy,goal,.05,{taskKey:'herd:1'});
  escaped ||= Boolean(buddy.buddyRecovery.escape);
 }
 assert.ok(escaped);
});
test('arrival at a valid substitute beside an obstructed work goal settles without false escapes',()=>{
 const level=meadow(),buddy={x:0,z:-10,heading:0},goal={x:0,z:-4.2};
 level.obstacles=[{x:0,z:-4.2,radius:1.4}];
 let escaped=false,settled;
 for(let i=0;i<800;i++){
  step(level,buddy,goal);
  escaped ||= Boolean(buddy.buddyRecovery?.escape);
  assert.ok(canOccupy(level,buddy.x,buddy.z,.6));
  if(i===400)settled={x:buddy.x,z:buddy.z};
 }
 assert.equal(escaped,false,'the valid replacement is intentional arrival, not failure to enter the trunk');
 assert.ok(Math.hypot(buddy.x-settled.x,buddy.z-settled.z)<.01);
 assert.ok(Math.hypot(buddy.x-goal.x,buddy.z-goal.z)>2);
});
test('very slow monotonic progress toward fixed work is never treated as oscillation',()=>{
 const level=meadow(),buddy={x:0,z:0,heading:0},goal={x:0,z:8};
 for(let i=0;i<800;i++){
  level.time+=.05;
  const target=buddyRecoveryTarget(level,buddy,goal,.05,{taskKey:'slow'});
  moveBuddy(level,buddy,target,.05,.04);
  assert.equal(buddy.buddyRecovery.attempts,0);
 }
 assert.ok(buddy.z>1.5);
});
test('recovery backs away from a short wall and resumes its original task around the end',()=>{
 const level=meadow(),buddy={x:0,z:0,heading:0},goal={x:0,z:8};
 level.fenceSegments=[{a:{x:-1,z:1},b:{x:1,z:1},material:'stone'}];
 let escaped=false;
 for(let i=0;i<600;i++){
  const before={x:buddy.x,z:buddy.z};step(level,buddy,goal);
  escaped ||= Boolean(buddy.buddyRecovery?.escape);
  assert.ok(canOccupy(level,buddy.x,buddy.z,.6));
  assert.ok(Math.hypot(buddy.x-before.x,buddy.z-before.z)<=.35+1e-8);
 }
 assert.ok(escaped,'a real blocked approach requires recovery');
 assert.ok(Math.hypot(buddy.x-goal.x,buddy.z-goal.z)<.1,'the same work point is reached using physical movement');
 assert.equal(buddy.buddyRecovery,undefined,'arrival clears recovery');
});
