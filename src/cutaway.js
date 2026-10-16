import * as THREE from 'three';

// Visual only: world collision and delivery continue to use world.js geometry.
export class StructureCutaway {
  constructor(target, meshes, {halfExtent=target.radius+1.4, opacity=.7}={}) {
    this.target=target;this.halfExtent=halfExtent;this.opacity=opacity;
    this.covered=new Set();this.disposed=false;
    this.parts=meshes.map(mesh=>{
      const original=mesh.material,material=original.clone();
      mesh.material=material;
      mesh.geometry.computeBoundingBox();
      return {mesh,original,material,shadow:mesh.castShadow,alpha:1};
    });
    this.cameraLocal=new THREE.Vector3();this.cameraDirection=new THREE.Vector3();this.up=new THREE.Vector3(0,1,0);
  }
  update(camera, actors, dt) {
    // A paused frame neither advances fades nor changes cover membership.
    if(this.disposed||!Number.isFinite(dt)||dt<=0)return;
    camera.updateMatrixWorld(true);
    // Orthographic cameras have parallel sightlines, so select the wall from
    // view direction rather than camera-to-barn position. Roof always opens.
    camera.getWorldDirection(this.cameraDirection).negate();
    this.cameraLocal.copy(this.cameraDirection).applyAxisAngle(this.up,-(this.target.heading||0));
    const sides=new Set();
    if(Math.abs(this.cameraLocal.x)>.02)sides.add(this.cameraLocal.x>=0?'+x':'-x');
    if(Math.abs(this.cameraLocal.z)>.02)sides.add(this.cameraLocal.z>=0?'+z':'-z');
    const heading=this.target.heading||0,c=Math.cos(heading),s=Math.sin(heading),inside=[];
    const present=new Set(actors);
    for(const actor of this.covered)if(!present.has(actor))this.covered.delete(actor);
    for(const actor of actors){
      const dx=actor.x-this.target.x,dz=actor.z-this.target.z;
      const x=dx*c-dz*s,z=dx*s+dz*c;
      const radius=actor.type==='cow'?.65:.4;
      const extent=this.halfExtent+radius+(this.covered.has(actor)?.18:0);
      if(Math.abs(x)<=extent&&Math.abs(z)<=extent){this.covered.add(actor);inside.push({actor,radius});}
      else this.covered.delete(actor);
    }
    const blend=-Math.expm1(-12*Math.min(dt,.25));
    for(const part of this.parts){
      const {mesh,material}=part;
      const occludes=inside.length>0&&(mesh.userData.coverKind==='roof'||sides.has(mesh.userData.coverSide));
      const target=occludes?this.opacity:1;
      part.alpha+=(target-part.alpha)*blend;
      if(Math.abs(part.alpha-target)<.001)part.alpha=target;
      material.opacity=part.original.opacity*part.alpha;
      const faded=part.alpha<1;
      if(material.transparent!==(faded||part.original.transparent)){material.transparent=faded||part.original.transparent;material.needsUpdate=true;}
      material.depthWrite=faded?false:part.original.depthWrite;
      mesh.castShadow=faded?false:part.shadow;
    }
  }
  dispose(){
    if(this.disposed)return;this.disposed=true;
    for(const {mesh,original,material,shadow} of this.parts){mesh.material=original;mesh.castShadow=shadow;material.dispose();}
    this.parts=[];this.covered.clear();
  }
}
