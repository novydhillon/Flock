import * as THREE from 'three';

/** Shade the receiving surface itself: no hovering planes or extra lights. */
export class ThrusterGroundGlow {
  constructor(){
    this.centers={value:Array.from({length:4},()=>new THREE.Vector3(0,-1000,0))};
    this.radius={value:.36};
    this.tint={value:new THREE.Color('#39bfff')};
  }
  install(material){
    const previousCompile=material.onBeforeCompile;
    const previousKey=material.customProgramCacheKey.bind(material);
    const baseKey=previousKey();
    material.onBeforeCompile=(shader,renderer)=>{
      previousCompile.call(material,shader,renderer);
      Object.assign(shader.uniforms,{pipGlowCenters:this.centers,pipGlowRadius:this.radius,pipGlowTint:this.tint});
      shader.vertexShader='varying vec3 pipSurfaceWorld;\n'+shader.vertexShader;
      shader.vertexShader=shader.vertexShader.replace('#include <project_vertex>',`#include <project_vertex>
        vec4 pipSurfacePosition=vec4(transformed,1.0);
        #ifdef USE_BATCHING
          pipSurfacePosition=batchingMatrix*pipSurfacePosition;
        #endif
        #ifdef USE_INSTANCING
          pipSurfacePosition=instanceMatrix*pipSurfacePosition;
        #endif
        pipSurfaceWorld=(modelMatrix*pipSurfacePosition).xyz;`);
      shader.fragmentShader=`varying vec3 pipSurfaceWorld;
        uniform vec3 pipGlowCenters[4];
        uniform float pipGlowRadius;
        uniform vec3 pipGlowTint;\n`+shader.fragmentShader;
      shader.fragmentShader=shader.fragmentShader.replace('#include <emissivemap_fragment>',`#include <emissivemap_fragment>
        float pipGlowAmount=0.0;
        for(int pipPod=0;pipPod<4;pipPod++){
          vec3 pipOffset=pipSurfaceWorld-pipGlowCenters[pipPod];
          float pipFalloff=max(0.0,1.0-length(pipOffset.xz)/pipGlowRadius);
          pipGlowAmount+=pipFalloff*pipFalloff*(1.0-smoothstep(0.07,0.12,abs(pipOffset.y)));
        }
        vec3 pipWorldNormal=inverseTransformDirection(normal,viewMatrix);
        totalEmissiveRadiance+=pipGlowTint*min(pipGlowAmount,1.0)*1.7*smoothstep(0.45,0.9,pipWorldNormal.y);`);
    };
    material.customProgramCacheKey=()=>baseKey+'|pip-ground-glow-v1';
    material.needsUpdate=true;
    return material;
  }
  update(pip,heightAt){
    this.radius.value=.36*pip.scale.x;
    pip.userData.parts.pods.forEach((pod,i)=>{
      const center=this.centers.value[i];
      center.copy(pod);pip.localToWorld(center);center.y=heightAt(center.x,center.z);
    });
  }
}
