import test from 'node:test';
import assert from 'node:assert/strict';
import {createPipMotionState,updatePipMotion} from '../src/pip-motion.js';

const radians=degrees=>degrees*Math.PI/180;
const sample=(speed=0,heading=0,x=0,z=0)=>({x,z,heading,vx:Math.sin(heading)*speed,vz:Math.cos(heading)*speed});
const channels=state=>[state.hover,state.headYaw,state.roll,state.pitch,state.time];
function start(speed=0,heading=0){const state=createPipMotionState();updatePipMotion(state,sample(speed,heading),0);return state;}
function run(state,seconds,pose,dt=1/60){
  for(let i=1;i<=Math.round(seconds/dt);i++)updatePipMotion(state,pose(i*dt),dt);
  return state;
}
function bounded(state){
  assert.ok(channels(state).every(Number.isFinite),'pose channels remain finite');
  assert.ok(Math.abs(state.roll)<=radians(20)+1e-10,'bank is capped at 20 degrees');
  assert.ok(Math.abs(state.pitch)<=radians(10)+1e-10,'pitch is capped at 10 degrees');
}

test('idle Pip keeps a small smooth float while remaining level',()=>{
  const state=start(),heights=[];
  for(let i=0;i<600;i++){
    updatePipMotion(state,sample(),1/60);bounded(state);heights.push(state.hover);
    assert.equal(state.pitch,0);assert.equal(state.roll,0);assert.equal(state.headYaw,0);
  }
  const range=Math.max(...heights)-Math.min(...heights);
  assert.ok(range>.01&&range<.2,`visible slight idle hover, range=${range}`);
  assert.ok(heights.some((y,i)=>i>0&&y>heights[i-1])&&heights.some((y,i)=>i>0&&y<heights[i-1]),'hover rises and falls continuously');
  const differences=heights.slice(1).map((y,i)=>y-heights[i]);
  assert.ok(Math.max(...differences.map(Math.abs))<.01,'no steps in floating height');
  // A sine sampled at constant intervals has constant second-difference / value.
  const mean=(Math.max(...heights)+Math.min(...heights))/2;
  const estimates=heights.slice(1,-1).flatMap((y,i)=>Math.abs(y-mean)>.02?[((heights[i]+heights[i+2]-2*y)/(y-mean))]:[]);
  assert.ok(estimates.length>20);
  assert.ok(Math.max(...estimates)-Math.min(...estimates)<.0002,'float follows a sine rather than random or stepped bobbing');
});

test('turn anticipation leads into the turn and banking scales with tightness',()=>{
  const turn=(rate)=>{
    const state=start(4);run(state,.5,t=>sample(4,rate*t));bounded(state);return state;
  };
  const gentle=turn(.25),tight=turn(1.5),left=turn(-1.5),extreme=turn(40);
  assert.ok(gentle.headYaw>0&&tight.headYaw>0,'head points into positive yaw');
  assert.ok(gentle.roll<0&&tight.roll<0,'body top leans into the turn');
  assert.ok(Math.abs(tight.roll)>Math.abs(gentle.roll)*1.5,'tighter turns create stronger banks');
  assert.ok(left.headYaw<0&&left.roll>0,'opposite turn mirrors anticipation and bank');
  assert.ok(Math.abs(tight.roll+left.roll)<1e-8);
  assert.ok(Math.abs(tight.headYaw+left.headYaw)<1e-8);
  assert.ok(Math.abs(extreme.roll)>radians(10),'large turn input exercises the cap');
});

test('acceleration leans back proportional to rate, cruise levels in about two seconds, and stopping leans forward',()=>{
  const accelerate=rate=>run(start(),.5,t=>sample(rate*t,0,0,rate*t*t/2));
  const mild=accelerate(1),strong=accelerate(6);
  bounded(mild);bounded(strong);
  assert.ok(mild.pitch<0&&strong.pitch<0,'acceleration raises the forward-facing nose');
  assert.ok(Math.abs(strong.pitch)>Math.abs(mild.pitch)*1.5,'pitch responds to acceleration rather than speed alone');
  const peak=Math.abs(strong.pitch);
  run(strong,2,t=>sample(3,0,0,.75+3*t));
  assert.ok(Math.abs(strong.pitch)<radians(1)&&Math.abs(strong.pitch)<peak*.1,'cruising is effectively level after two seconds');
  run(strong,.5,t=>sample(3-6*t,0,0,6.75+3*t-3*t*t));bounded(strong);
  assert.ok(strong.pitch>0,'braking lowers the forward-facing nose');
  run(strong,2,()=>sample(0,0,0,7.5));
  assert.ok(Math.abs(strong.pitch)<radians(1),'stopped Pip returns to level');
  for(const rate of [100,-100]){
    const state=start(rate<0?50:0);
    run(state,.2,t=>sample(rate<0?50+rate*t:rate*t));bounded(state);
  }
});

test('heading wrap takes the short turn and stationary yaw does not bank like a moving turn',()=>{
  const wrapped=start(4,Math.PI-.01),plain=start(4,-.01);
  updatePipMotion(wrapped,sample(4,-Math.PI+.01),1/60);
  updatePipMotion(plain,sample(4,.01),1/60);
  assert.ok(wrapped.headYaw>0&&wrapped.roll<0);
  assert.ok(Math.abs(wrapped.headYaw-plain.headYaw)<1e-9);
  assert.ok(Math.abs(wrapped.roll-plain.roll)<1e-9,'crossing +/-pi does not create a full-turn spike');
  const stationary=run(start(),.5,t=>sample(0,t));
  assert.ok(Math.abs(stationary.roll)<radians(.1),'yaw in place has no lateral bank');
});

test('pause and negative frame deltas freeze pose and derivative history',()=>{
  const state=run(start(),.4,t=>sample(t*4,t,0,t*t*2));
  const snapshot=structuredClone(state);
  updatePipMotion(state,sample(80,-2,100,-100),0);
  assert.deepEqual(state,snapshot,'zero dt is a true freeze');
  updatePipMotion(state,sample(80,-2,100,-100),-.5);
  assert.deepEqual(state,snapshot,'negative dt cannot rewind phase or poison previous sample');
});

test('teleports clear turn and acceleration transients; fresh state has no inherited pose',()=>{
  const state=run(start(),.4,t=>sample(8*t,2*t,0,t*t*4));
  assert.ok(Math.abs(state.roll)>0&&Math.abs(state.pitch)>0);
  updatePipMotion(state,sample(0,-2,100,100),1/60);bounded(state);
  assert.equal(state.pitch,0);assert.equal(state.roll,0);assert.equal(state.headYaw,0);
  updatePipMotion(state,sample(0,-2,100,100),1/60);
  assert.equal(state.pitch,0);assert.equal(state.roll,0);
  const fresh=start();assert.equal(fresh.pitch,0);assert.equal(fresh.roll,0);assert.equal(fresh.headYaw,0);assert.equal(fresh.time,0);
});

test('pose is stable across common frame sizes and a long frame remains bounded',()=>{
  const trace=dt=>run(start(),2,t=>sample(t<1?t*3:3,.7*t,.25*t*t,t*t),dt);
  const states=[1/30,1/60,1/120].map(trace);
  for(const state of states)bounded(state);
  for(const key of ['hover','pitch','roll','headYaw']){
    assert.ok(Math.max(...states.map(s=>s[key]))-Math.min(...states.map(s=>s[key]))<.025,`${key} converges at 30/60/120 Hz`);
  }
  const state=start();updatePipMotion(state,sample(100,2,1,1),.75);bounded(state);
});

test('step starts and step stops have a visible brief pitch response',()=>{
  const state=start(),acceleration=[],braking=[];
  for(let i=0;i<120;i++){updatePipMotion(state,sample(5,0,0,(i+1)*5/60),1/60);acceleration.push(state.pitch);bounded(state);}
  assert.ok(Math.min(...acceleration)<-radians(2),'a start has a visible backward lean');
  assert.ok(Math.abs(state.pitch)<radians(1),'step start settles within two seconds');
  for(let i=0;i<120;i++){updatePipMotion(state,sample(0,0,0,10),1/60);braking.push(state.pitch);bounded(state);}
  assert.ok(Math.max(...braking)>radians(2),'a stop has a visible forward lean');
  assert.ok(Math.abs(state.pitch)<radians(1),'step stop settles within two seconds');
});
