import { navigationTarget, hasClearGroundPath, canOccupy, segmentDistance, moveBody } from './world.js';

const distance = (a,b) => Math.hypot(a.x-b.x,a.z-b.z);

/** Follow physical route/crossing waypoints, adding a cached visibility detour
 * around circular tree footprints. Every edge uses the moving body's radius. */
export function buddyNavigationTarget(level, body, desired, radius = .6) {
  let aim = navigationTarget(level, body, desired, radius);
  // A road projection can land on a trunk or behind us. Where trees are
  // the only blockers, detour toward the actual work position directly.
  if(hasClearGroundPath({...level,obstacles:[]},body,desired,radius))aim=desired;
  const cache = body.buddyNavigation;
  if (cache && distance(cache.goal, aim) < 3 && level.time < cache.until) {
    while (cache.path.length && distance(body, cache.path[0]) < .45) cache.path.shift();
    if (cache.path.length && hasClearGroundPath(level,body,cache.path[0],radius)) return cache.path[0];
  }
  if (hasClearGroundPath(level,body,aim,radius)) { delete body.buddyNavigation; return aim; }
  const trees = (level.obstacles || []).filter(t => distance(body,t) < Math.min(24,distance(body,aim)+6) &&
    segmentDistance(t,body,aim) < t.radius+radius+4)
    .sort((a,b) => distance(body,a)-distance(body,b)).slice(0,6);
  if (!trees.length) return aim;
  const nodes = [body,aim];
  for (const tree of trees) {
    // Inflate for the straight chords between sampled points, not just vertices.
    const reach = (tree.radius + radius + .16) / Math.cos(Math.PI/12);
    for (let i=0;i<12;i++) {
      const angle=i*Math.PI/6,point={x:tree.x+Math.cos(angle)*reach,z:tree.z+Math.sin(angle)*reach};
      if(canOccupy(level,point.x,point.z,radius))nodes.push(point);
    }
  }
  const costs=nodes.map(()=>Infinity),previous=[],visited=new Set();costs[0]=0;
  for(let step=0;step<nodes.length;step++){
    let nearest=-1;
    for(let i=0;i<nodes.length;i++)if(!visited.has(i)&&(nearest<0||costs[i]<costs[nearest]))nearest=i;
    if(nearest<0||!Number.isFinite(costs[nearest]))break;
    if(nearest===1)break;
    visited.add(nearest);
    for(let i=1;i<nodes.length;i++){
      if(visited.has(i))continue;
      const cost=costs[nearest]+distance(nodes[nearest],nodes[i]);
      if(cost>=costs[i]||!hasClearGroundPath(level,nodes[nearest],nodes[i],radius))continue;
      costs[i]=cost;previous[i]=nearest;
    }
  }
  if(!Number.isFinite(costs[1]))return aim;
  const path=[];
  for(let i=1;i!==0;i=previous[i])path.unshift({x:nodes[i].x,z:nodes[i].z});
  body.buddyNavigation={goal:{x:aim.x,z:aim.z},path,until:level.time+2};
  return path[0];
}

export const angleDifference = (to, from) => Math.atan2(Math.sin(to-from),Math.cos(to-from));
export function turnToward(current, target, rate, dt) {
  const change=angleDifference(target,current),limit=rate*dt;
  return current+Math.max(-limit,Math.min(limit,change));
}

/** Turn before reversing. Slow near the waypoint rather than shuttling through it. */
export function moveBuddy(level, buddy, waypoint, dt, speed) {
  const dx=waypoint.x-buddy.x,dz=waypoint.z-buddy.z,d=Math.hypot(dx,dz);
  const old={x:buddy.x,z:buddy.z};
  if(d>.22){
    const target=Math.atan2(dx,dz);
    buddy.heading=turnToward(buddy.heading??target,target,2.8,dt);
    const alignment=Math.max(0,Math.cos(angleDifference(target,buddy.heading)));
    const travel=Math.min(Math.max(0,d-.15),dt*speed*alignment);
    moveBody(level,buddy,Math.sin(buddy.heading)*travel,Math.cos(buddy.heading)*travel,.6);
  }
  buddy.vx=(buddy.x-old.x)/dt;buddy.vz=(buddy.z-old.z)/dt;
}
