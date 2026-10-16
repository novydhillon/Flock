import * as THREE from 'three';
import { targetFootprint, targetWorldPoint } from './world.js';

// World-space vertices keep the floor, highlight and map on the same physical
// enclosure corners without relying on plane/Euler rotation conventions.
export function goalSurface(target,y=.033) {
  const geometry=new THREE.BufferGeometry(),corners=targetFootprint(target).corners;
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(corners.flatMap(p=>[p.x,y,p.z]),3));
  geometry.setAttribute('uv',new THREE.Float32BufferAttribute([0,0,1,0,1,1,0,1],2));
  geometry.setIndex([0,1,2,0,2,3]);geometry.computeVertexNormals();
  return geometry;
}

export function goalOutline(target,width=.26,y=.04) {
  const shape=targetFootprint(target),u=Math.max(0,shape.halfLength-width),v=Math.max(0,shape.halfWidth-width);
  const inner=[[-u,-v],[u,-v],[u,v],[-u,v]].map(([a,b])=>targetWorldPoint(target,a,b));
  const geometry=new THREE.BufferGeometry(),indices=[];
  geometry.setAttribute('position',new THREE.Float32BufferAttribute([...shape.corners,...inner].flatMap(p=>[p.x,y,p.z]),3));
  for(let i=0;i<4;i++){const j=(i+1)%4;indices.push(i,j,j+4,i,j+4,i+4);}
  geometry.setIndex(indices);geometry.computeVertexNormals();
  return geometry;
}

export function drawGoalMap(ctx,target,project) {
  const corners=targetFootprint(target).corners;
  ctx.fillStyle='#f9e7a2';ctx.strokeStyle='#fff0b5';ctx.lineWidth=1;
  ctx.beginPath();
  corners.forEach((p,i)=>{const q=project(p);if(i)ctx.lineTo(q.x,q.y);else ctx.moveTo(q.x,q.y);});
  ctx.closePath();ctx.fill();ctx.stroke();
}
