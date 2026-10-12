import {clamp,distance,lerp,nextWaypoint,resolveMotion} from './world.js';

export const COMPANION_LEVELS=Object.freeze({buddy:10,drone:20});
export function companionAvailable(kind,level){return !(kind in COMPANION_LEVELS)||level>=COMPANION_LEVELS[kind];}

/** Choose targets and flank the stragglers rather than simply following Pip. */
export function updateHelpers(level,dog,helpers,dt){
  const roaming=level.animals.filter(a=>!a.delivered);
  const center=roaming.reduce((p,a)=>({x:p.x+a.x,y:p.y+a.y}),{x:0,y:0});
  center.x/=roaming.length||1;center.y/=roaming.length||1;
  const priority=roaming.sort((a,b)=>{
    const score=a=>distance(a,nextWaypoint(level,a))+.3*distance(a,center);
    return score(b)-score(a);
  });
  for(let i=0;i<helpers.length;i++){
    const h=helpers[i];if(!h.active)continue;
    h.phase=(h.phase||0)+dt;
    const target=priority[i%Math.max(1,priority.length)];
    let tx,ty;
    if(target){
      const wp=nextWaypoint(level,target),dx=wp.x-target.x,dy=wp.y-target.y;
      const length=Math.hypot(dx,dy)||1,fx=dx/length,fy=dy/length;
      const behind=h.kind==='drone'?124:112;
      const flank=(h.kind==='drone'?-1:1)*(30+Math.sin(h.phase*1.45)*13);
      tx=target.x-fx*behind-fy*flank;
      ty=target.y-fy*behind+fx*flank;
    }else{
      tx=dog.x-65+Math.sin(h.phase)*35;
      ty=dog.y+(h.kind==='drone'?-80:80);
    }
    // Buddy needs to use the real bridge and gate. The drone can fly over both.
    if(h.kind==='buddy' && level.river){
      const r=level.river,left=r.x-r.width/2-43,right=r.x+r.width/2+43;
      if(h.x<left && tx>right) {
        if(Math.abs(h.y-r.bridgeY)>27){tx=left;ty=r.bridgeY;}
        else {tx=right;ty=r.bridgeY;}
      }else if(h.x<=right && h.x>=left && tx>right){tx=right+30;ty=r.bridgeY;}
      else if(h.x>right && tx<left){tx=right;ty=r.bridgeY;}
    }
    if(h.kind==='buddy' && level.gate && h.x<level.gate.x-35 && tx>level.gate.x+35){
      const gy=level.gate.y;
      if(Math.abs(h.y-gy)>30){tx=level.gate.x-45;ty=gy;}
      else{tx=level.gate.x+58;ty=gy;}
    }
    tx=clamp(tx,65,level.width-65);ty=clamp(ty,65,level.height-65);
    const dx=tx-h.x,dy=ty-h.y,dist=Math.hypot(dx,dy),speed=h.kind==='drone'?320:280;
    const desiredX=dist>6?dx/dist*speed:0,desiredY=dist>6?dy/dist*speed:0;
    const vx=lerp(h.vx||0,desiredX,Math.min(1,dt*8));
    const vy=lerp(h.vy||0,desiredY,Math.min(1,dt*8));
    const nx=h.x+vx*dt,ny=h.y+vy*dt,oldX=h.x,oldY=h.y;
    if(h.kind==='drone'){h.x=clamp(nx,35,level.width-35);h.y=clamp(ny,35,level.height-35);}
    else resolveMotion(level,h,nx,ny,21);
    h.vx=(h.x-oldX)/dt;h.vy=(h.y-oldY)/dt;
    if(Math.hypot(h.vx,h.vy)>5)h.angle=Math.atan2(h.vy,h.vx);
  }
}
