/** Deterministic, navigable little worlds for Flock. No external assets required. */
export function randomSource(seed) {
  let n = seed >>> 0;
  return () => { n += 0x6D2B79F5; let t = n; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
export const distance = (a,b) => Math.hypot(a.x-b.x,a.y-b.y);
export const lerp = (a,b,t) => a+(b-a)*t;
const names=['First Steps','Over the Hill','The River Run','Barnyard Bound','Pastures New','The Great Crossing','Meadow Mischief','Robot Roundup'];
const destinations=['pen','pen','pen','barn','field'];

export function createLevel(number=1) {
  const n = Math.max(1,number|0), random=randomSource(29041+n*7349);
  const width= n===1 ? 1720 : Math.min(3400,1750+n*170);
  const height= n===1 ? 1270 : Math.min(2200,1230+n*75);
  const goalY = Math.round(height*(.48+(random()-.5)*.19));
  const river = n>=3 ? {x:Math.round(width*.52), width:120+Math.min(45,n*4), bridgeY:Math.round(height*(.49+(random()-.5)*.12)), bridgeWidth:170} : null;
  const goal={x:width-300,y:goalY,type:n<=3?'pen':destinations[(n-1)%destinations.length]};
  const start={x:180,y:height*.54};
  const flockStart={x:475,y:height*.53};
  const count=n===1?4:Math.min(26,4+n*2);
  const animals=Array.from({length:count},(_,i)=>{
    const isCow = n>=4 && i%5===4;
    const x=flockStart.x+(i%4)*45+random()*25;
    const y=flockStart.y+(Math.floor(i/4)-Math.floor(count/8))*51+(random()-.5)*24;
    return {id:i,x,y,vx:0,vy:0,angle:0,kind:isCow?'cow':'sheep',delivered:false,blink:random()*4,phase:random()*7,energy:0,step:random()*6,spot:random()*Math.PI*2};
  });
  const fields=Array.from({length:32+Math.min(40,n*3)},()=>({x:random()*width,y:random()*height,rx:95+random()*260,ry:75+random()*185,tint:random(),angle:random()*Math.PI}));
  const trees=Array.from({length:90+Math.min(90,n*8)},(_,i)=>({x:65+random()*(width-130),y:65+random()*(height-130),s:.65+random()*.8,variant:i%3})).filter(t=>distance(t,start)>160 && distance(t,goal)>210 && distance(t,flockStart)>200 && (!river||Math.abs(t.x-river.x)>river.width/2+60));
  const shrubs=Array.from({length:140+Math.min(150,n*12)},(_,i)=>({x:random()*width,y:random()*height,r:6+random()*12,variant:i%4}));
  const flowers=Array.from({length:390+Math.min(400,n*35)},(_,i)=>({x:random()*width,y:random()*height,size:1.8+random()*3,color:i%4,phase:random()*5}));
  const fences=[];
  for(let k=0;k<2+n%3;k++) {
    const x=width*(.22+k*.21)+(random()-.5)*60;
    if(Math.abs(x-goal.x)<250 || river&&Math.abs(x-river.x)<190) continue;
    fences.push({x,y:height*(.12+random()*.18),length:110+random()*190});
  }
  const gate=n>=2?{x:river?river.x+275:width*.62,y:river?river.bridgeY:lerp(flockStart.y,goal.y,.68),open:false,openness:0}:null;
  const roadPoints=[{x:80,y:flockStart.y+165},{x:flockStart.x,y:flockStart.y+140},...(river?[{x:river.x-180,y:river.bridgeY},{x:river.x+170,y:river.bridgeY}]:[]),{x:goal.x-160,y:goal.y+105},{x:width-65,y:goal.y+110}];
  return {number,name:names[(n-1)%names.length]+(n>names.length?' '+Math.ceil(n/names.length):''),width,height,goal,start,flockStart,animals,river,gate,roadPoints,fields,trees,shrubs,flowers,fences,time:0,delivered:0,particleSeed:random(),tutorial:n===1};
}

export function isBlocked(level,x,y,radius=18) {
  if(x<35+radius||x>level.width-35-radius||y<35+radius||y>level.height-35-radius) return true;
  const r=level.river;
  if(r && Math.abs(x-r.x)<r.width*.5+radius && Math.abs(y-r.bridgeY)>r.bridgeWidth*.5-radius) return true;
  const gate=level.gate;
  if(gate && gate.openness<.75 && Math.abs(x-gate.x)<16+radius && Math.abs(y-gate.y)<75+radius) return true;
  return false;
}
export function resolveMotion(level,thing,nx,ny,radius) {
  if(!isBlocked(level,nx,ny,radius)){thing.x=nx;thing.y=ny;return true;}
  if(!isBlocked(level,nx,thing.y,radius)) {thing.x=nx;return false;}
  if(!isBlocked(level,thing.x,ny,radius)) {thing.y=ny;return false;}
  return false;
}
export function nextWaypoint(level,animal) {
  const river=level.river;
  if(river && animal.x<river.x+river.width*.5+52) {
    // Head to the safe middle of the bridge before crossing the water.
    return {x:river.x+river.width*.5+95,y:river.bridgeY};
  }
  const gate=level.gate;
  if(gate && animal.x<gate.x+85 && Math.abs(animal.y-gate.y)>48) return {x:gate.x+100,y:gate.y};
  return level.goal;
}
const norm=(x,y)=>{const d=Math.hypot(x,y)||1;return {x:x/d,y:y/d};};
export function tickLevel(level,dog,helpers,dt,upgrades={}) {
  level.time+=dt;
  if(level.gate){
    const close=distance(dog,level.gate)<220 || helpers.some(h=>distance(h,level.gate)<155);
    level.gate.open=close||level.gate.open&&level.animals.some(a=>Math.abs(a.x-level.gate.x)<95 && Math.abs(a.y-level.gate.y)<110);
    level.gate.openness=lerp(level.gate.openness,level.gate.open?1:0,Math.min(1,dt*3.5));
  }
  const alive=level.animals.filter(a=>!a.delivered);
  let cx=0,cy=0;
  alive.forEach(a=>{cx+=a.x;cy+=a.y;});
  cx/=alive.length||1;cy/=alive.length||1;
  const herdRange=174+(upgrades.bark||0)*29;
  for(const a of alive){
    a.phase+=dt;a.step+=dt*Math.hypot(a.vx,a.vy)*.026;
    const wp=nextWaypoint(level,a);
    const dir=norm(wp.x-a.x,wp.y-a.y);
    const dogDistance=distance(a,dog);
    const dronePressure=helpers.some(h=>h.active&&distance(h,a)<140 && h.kind==='drone');
    const buddyPressure=helpers.some(h=>h.active&&distance(h,a)<175 && h.kind==='buddy');
    const dogPressure=clamp((herdRange-dogDistance)/herdRange,0,1);
    a.energy=clamp(Math.max(a.energy-dt*.28,dogPressure*.95,dronePressure?.7:0,buddyPressure?.55:0),0,1);
    const cohesion=norm(cx-a.x,cy-a.y);
    const dogAway=norm(a.x-dog.x,a.y-dog.y);
    const distanceToFlock=Math.hypot(cx-a.x,cy-a.y);
    const pressure=dogPressure;
    const forward= .32 + a.energy*1.7;
    const flee=dogPressure*2.15;
    let sx=dir.x*forward+dogAway.x*flee+cohesion.x*(distanceToFlock>130?.75:.12);
    let sy=dir.y*forward+dogAway.y*flee+cohesion.y*(distanceToFlock>130?.75:.12);
    // Align animals to the bridge so the flock does not become trapped along a riverbank.
    if(level.river && a.x<level.river.x+level.river.width*.5+50){
      const bank=Math.abs(a.x-level.river.x)<level.river.width*.5+105;
      if(bank){sy+=(level.river.bridgeY-a.y)*.019;sx+=a.x<level.river.x?1.1:.1;}
    }
    if(level.gate && Math.abs(a.x-level.gate.x)<165 && level.gate.openness<.76) {
      sy+=(level.gate.y-a.y)*.009;
      sx*=.35;
    }
    const v=norm(sx,sy);
    const maxSpeed=(a.kind==='cow'?78:99)*(a.energy>.05?1:.17);
    const intended=Math.min(1,Math.hypot(sx,sy))*maxSpeed;
    a.vx=lerp(a.vx,v.x*intended,Math.min(1,dt*3.2));
    a.vy=lerp(a.vy,v.y*intended,Math.min(1,dt*3.2));
    const oldX=a.x,oldY=a.y;
    resolveMotion(level,a,a.x+a.vx*dt,a.y+a.vy*dt,a.kind==='cow'?23:17);
    if(Math.abs(a.x-oldX)+Math.abs(a.y-oldY)<.2 && a.energy>.1){a.vx*=.2;a.vy*=.2;}
    if(Math.hypot(a.vx,a.vy)>6)a.angle=Math.atan2(a.vy,a.vx);
    // Pen has a broad inviting opening and gently pulls in nearby arrivals.
    const close=Math.hypot(a.x-level.goal.x,a.y-level.goal.y);
    if(close<93 || (a.x>level.goal.x-100 && a.x<level.goal.x+92 && Math.abs(a.y-level.goal.y)<74)){
      a.delivered=true;a.vx=0;a.vy=0;level.delivered++;
    }
  }
  return level.delivered>=level.animals.length;
}
