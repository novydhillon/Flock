import * as THREE from 'three';

const BODY_SAMPLES=[[0,0],[-1,0],[1,0],[0,-1],[0,1]];

// Visual only: world collision and delivery continue to use world.js geometry.
export class StructureCutaway {
  constructor(target, meshes, {halfExtent=target.radius+1.4, opacity=.14}={}) {
    this.target=target;this.halfExtent=halfExtent;this.opacity=opacity;
    this.covered=new Set();this.disposed=false;
    this.parts=meshes.map(mesh=>{
      const original=mesh.material,material=original.clone();
      mesh.material=material;
      mesh.geometry.computeBoundingBox();
      return {mesh,original,material,shadow:mesh.castShadow,alpha:1};
    });
    this.direction=new THREE.Vector3();this.origin=new THREE.Vector3();
    this.inverse=new THREE.Matrix4();this.ray=new THREE.Ray();this.hit=new THREE.Vector3();
  }
  update(camera, actors, dt) {
    // A paused frame neither advances fades nor changes cover membership.
    if(this.disposed||!Number.isFinite(dt)||dt<=0)return;
    camera.updateMatrixWorld(true);camera.getWorldDirection(this.direction).negate();
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
      const {mesh,material}=part;mesh.updateWorldMatrix(true,false);this.inverse.copy(mesh.matrixWorld).invert();
      let occludes=false;
      for(const {actor,radius} of inside){
        // Body-width samples retain a cutaway through partial doorway entry.
        for(const [x,z] of BODY_SAMPLES){
          this.origin.set(actor.x+x*radius,(actor.y||0)+(actor.type==='cow'?1:.7),actor.z+z*radius);
          this.ray.set(this.origin,this.direction).applyMatrix4(this.inverse);
          if(this.ray.intersectBox(mesh.geometry.boundingBox,this.hit)){occludes=true;break;}
        }
        if(occludes)break;
      }
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
