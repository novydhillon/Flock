import * as THREE from 'three';

// One fixed-size sun map covers the current view, irrespective of map size or
// aspect ratio. These are renderer scratch objects, never simulation state.
export class ViewShadows {
  constructor(){this.point=new THREE.Vector3();this.ray=new THREE.Vector3();this.lightPoint=new THREE.Vector3();this.bounds=new THREE.Box3();this.maxHeight=12;this.minHeight=-1;this.reach=0;this.sunX=0;this.sunZ=0;}
  fit(camera,sun){
    camera.updateMatrixWorld(true);sun.target.updateMatrixWorld(true);
    // Keep the entire fitted volume in front of the light's near plane even
    // when landscape framing is wider than the original 35-unit sun height.
    this.lightPoint.copy(sun.position).sub(sun.target.position).normalize();
    sun.position.copy(sun.target.position).addScaledVector(this.lightPoint,Math.max(50,Math.hypot(camera.right-camera.left,camera.top-camera.bottom)*2/camera.zoom+this.maxHeight*2));
    sun.updateMatrixWorld(true);
    sun.shadow.updateMatrices(sun);
    const lightCamera=sun.shadow.camera,view=lightCamera.matrixWorldInverse;
    this.ray.setFromMatrixColumn(camera.matrixWorld,2).negate();
    this.bounds.makeEmpty();
    for(const y of [this.minHeight,this.maxHeight])for(const x of [-1,1])for(const z of [-1,1]){
      this.point.set(x,z,0).unproject(camera);
      this.point.addScaledVector(this.ray,(y-this.point.y)/this.ray.y);
      this.lightPoint.copy(this.point).applyMatrix4(view);this.bounds.expandByPoint(this.lightPoint);
    }
    const direction=this.lightPoint.copy(sun.position).sub(sun.target.position),vertical=Math.max(.01,direction.y);
    this.reach=Math.hypot(direction.x,direction.z)/vertical;
    this.sunX=direction.x/vertical;this.sunZ=direction.z/vertical;
    // Upstream occluders have identical light-space XY to their ground shadow.
    // Extend depth toward the light so a tall tree outside the screen survives.
    const upstream=(this.maxHeight-this.minHeight)*direction.length()/vertical;
    const b=this.bounds,pad=1;
    Object.assign(lightCamera,{left:b.min.x-pad,right:b.max.x+pad,bottom:b.min.y-pad,top:b.max.y+pad,near:Math.max(.1,-b.max.z-upstream-pad),far:Math.max(2,-b.min.z+pad)});
    lightCamera.updateProjectionMatrix();
  }
  margin(y,radius){return Math.max(0,y+radius-this.minHeight)*this.reach;}
  intersects(planes,x,y,z,radius){
    const height=Math.max(0,y-this.minHeight),sx=x-this.sunX*height,sz=z-this.sunZ*height,r=radius*Math.hypot(1,this.reach);
    // A swept sphere includes raised receivers as well as the final ground
    // projection, including the vertical drop of a small elevated crown.
    return !planes.some(p=>Math.max(p.normal.x*x+p.normal.y*y+p.normal.z*z+p.constant,p.normal.x*sx+p.normal.y*(y-height)+p.normal.z*sz+p.constant)<-r);
  }
}

// The depth pass must use the same per-instance trunk width as its visible
// material. A normal MeshDepthMaterial would cast the undeformed wide trunk.
export function treeDepthMaterial(){
  const material=new THREE.MeshDepthMaterial({depthPacking:THREE.RGBADepthPacking});
  material.onBeforeCompile=shader=>{
    shader.vertexShader='attribute vec3 treeCenter;\nattribute float treeInstanceWidth;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','vec3 transformed = treeCenter + treeInstanceWidth * (position - treeCenter);');
  };
  material.customProgramCacheKey=()=> 'tree-depth-width-v1';
  return material;
}
