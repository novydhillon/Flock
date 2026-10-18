import * as THREE from 'three';

/** Shade the receiving surface itself: no hovering planes or extra lights. */
export class ThrusterGroundGlow {
  constructor(){
    this.centers={value:Array.from({length:4},()=>new THREE.Vector3(0,-1000,0))};
    this.buddyCenters={value:Array.from({length:4},()=>new THREE.Vector3(0,-1000,0))};
    this.buddyRadius={value:.4};
    this.radius={value:.54};
    this.strength={value:.85*.7};
    this.tint={value:new THREE.Color('#39bfff')};
  }
  install(material){
    const previousCompile=material.onBeforeCompile;
    const previousKey=material.customProgramCacheKey.bind(material);
    const baseKey=previousKey();
    material.onBeforeCompile=(shader,renderer)=>{
      previousCompile.call(material,shader,renderer);
      Object.assign(shader.uniforms,{pipGlowCenters:this.centers,pipGlowRadius:this.radius,pipGlowTint:this.tint,pipGlowStrength:this.strength});
      Object.assign(shader.uniforms,{buddyGlowCenters:this.buddyCenters,buddyGlowRadius:this.buddyRadius});
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
        uniform vec3 buddyGlowCenters[4];
        uniform float buddyGlowRadius;
        uniform float pipGlowRadius;
        uniform float pipGlowStrength;
        uniform vec3 pipGlowTint;\n`+shader.fragmentShader;
      shader.fragmentShader=shader.fragmentShader.replace('#include <emissivemap_fragment>',`#include <emissivemap_fragment>
        float pipGlowAmount=0.0;
        for(int pipPod=0;pipPod<4;pipPod++){
          vec3 pipOffset=pipSurfaceWorld-pipGlowCenters[pipPod];
          float pipFalloff=1.0-smoothstep(0.0,pipGlowRadius,length(pipOffset.xz));
          pipGlowAmount+=pipFalloff*pipFalloff*(1.0-smoothstep(0.07,0.12,abs(pipOffset.y)));
        }
        for(int buddyPod=0;buddyPod<4;buddyPod++){
          vec3 buddyOffset=pipSurfaceWorld-buddyGlowCenters[buddyPod];
          float buddyFalloff=1.0-smoothstep(0.0,buddyGlowRadius,length(buddyOffset.xz));
          pipGlowAmount+=buddyFalloff*buddyFalloff*(1.0-smoothstep(0.07,0.12,abs(buddyOffset.y)));
        }
        vec3 pipWorldNormal=inverseTransformDirection(normal,viewMatrix);
        totalEmissiveRadiance+=pipGlowTint*min(pipGlowAmount,1.0)*pipGlowStrength*smoothstep(0.45,0.9,pipWorldNormal.y);`);
    };
    material.customProgramCacheKey=()=>baseKey+'|pip-ground-glow-v3';
    material.needsUpdate=true;
    return material;
  }
  update(pip,heightAt,buddy=null){
    this.radius.value=.54*pip.scale.x;
    pip.userData.parts.pods.forEach((pod,i)=>{
      const center=this.centers.value[i];
      center.copy(pod);pip.localToWorld(center);center.y=heightAt(center.x,center.z);
    });
    this.buddyRadius.value=.54*(buddy?.scale.x||.75);
    this.buddyCenters.value.forEach((center,i)=>{
      if(!buddy){center.set(0,-1000,0);return;}
      center.copy(buddy.userData.parts.pods[i]);buddy.localToWorld(center);center.y=heightAt(center.x,center.z);
    });
  }
}
