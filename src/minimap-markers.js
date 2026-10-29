import { flockGroups } from './buddy.js';

export const GOAL_POINTER_COLOR='#be8652';
const markerGutter=16;

// Equal-size components keep a deterministic primary flock, regardless of array order.
export function minimapLivestockStates(level){
  const groups=flockGroups(level,level.animals.filter(a=>!a.saved));
  const firstId=group=>Math.min(...group.map(a=>a.id));
  groups.sort((a,b)=>b.length-a.length||firstId(a)-firstId(b));
  const main=new Set(groups[0]||[]);
  return new Map(level.animals.map(a=>[a,a.saved?'delivered':main.has(a)?'undelivered':'separated']));
}

export function minimapProjection(bounds,dog,width,height,viewDepth){
  const radius=Math.min(width,height)/2-markerGutter,innerRadius=radius-8;
  const span=Math.min(viewDepth,Math.max(bounds.maxX-bounds.minX,bounds.maxZ-bounds.minZ));
  const center=(p,min,max)=>max-min<=span?(min+max)/2:Math.max(min+span/2,Math.min(max-span/2,p));
  let x=center(dog.x,bounds.minX,bounds.maxX),z=center(dog.z,bounds.minZ,bounds.maxZ);
  const scale=innerRadius*2/span,dx=dog.x-x,dz=dog.z-z,d=Math.hypot(dx,dz),safe=(innerRadius-8)/scale;
  // A rectangular world corner must never push Pip outside the circular frame.
  if(d>safe){x+=dx*(1-safe/d);z+=dz*(1-safe/d);}
  const project=p=>({x:width/2+(p.x-x)*scale,y:height/2+(p.z-z)*scale});
  return {radius,innerRadius,scale,project,center:{x:width/2,y:height/2}};
}

export function clipMinimap(ctx,width,height){
  ctx.clearRect(0,0,width,height);ctx.save();ctx.beginPath();
  ctx.arc(width/2,height/2,Math.min(width,height)/2-markerGutter,0,Math.PI*2);ctx.clip();
}

export function drawLivestockMarker(ctx,point,animal,state){
  const r=animal.type==='cow'?4:3.4;
  ctx.fillStyle=state==='delivered'?'#8be0b4':state==='separated'?'#ff987f':'#fff8e7';
  ctx.strokeStyle='#183027';ctx.lineWidth=1.5;ctx.beginPath();
  if(state==='delivered')ctx.rect(point.x-r,point.y-r,r*2,r*2);
  else if(state==='separated'){
    const d=r+1.2;ctx.moveTo(point.x,point.y-d);ctx.lineTo(point.x+d,point.y);
    ctx.lineTo(point.x,point.y+d);ctx.lineTo(point.x-d,point.y);ctx.closePath();
  }else ctx.arc(point.x,point.y,r,0,Math.PI*2);
  ctx.fill();ctx.stroke();
}

export function drawGoalDirection(ctx,target,view){
  const p=view.project(target),dx=p.x-view.center.x,dy=p.y-view.center.y,d=Math.hypot(dx,dy);
  if(d<=view.innerRadius)return;
  const ux=dx/d,uy=dy/d,x=view.center.x+ux*(view.radius+7),y=view.center.y+uy*(view.radius+7);
  ctx.beginPath();ctx.moveTo(x+ux*4,y+uy*4);
  ctx.lineTo(x-ux*4-uy*4,y-uy*4+ux*4);ctx.lineTo(x-ux*4+uy*4,y-uy*4-ux*4);ctx.closePath();
  ctx.fillStyle=GOAL_POINTER_COLOR;ctx.strokeStyle='#183027';ctx.lineWidth=1.5;ctx.fill();ctx.stroke();
}
