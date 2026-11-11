import * as THREE from 'three';

const installedMaterials = new WeakMap();

function movingEnvironmentPart(object, root) {
  for (let part = object; part && part !== root; part = part.parent) {
    if (part.name === 'gate-panel' || part.userData.dynamicShadow) return true;
  }
  return false;
}

/** One immutable, world-space depth bake per level. The ordinary sun map is
 * reserved for moving actors/panels after capture. Map size stays bounded even
 * on the largest meadow; camera travel never changes its projection or pixels.
 */
export class StaticShadows {
  constructor({ mapSize = 4096, depthBias = 0.005, normalBias = 0.03 } = {}) {
    if (!Number.isInteger(mapSize) || mapSize < 128 || mapSize > 4096 || (mapSize & (mapSize - 1)) !== 0) {
      throw new RangeError('static shadow map size must be a power of two from 128 to4096');
    }
    this.mapSize = mapSize;
    if (!Number.isFinite(depthBias) || depthBias < 0 || depthBias > 0.05)
      throw new RangeError('static shadow depth bias must be from0 to.05 world units');
    this.depthBias = depthBias;
    this.normalBias = normalBias;
    this.uniforms = {
      bakedShadowEnabled: { value: 0 },
      bakedShadowMap: { value: null },
      bakedShadowMatrix: { value: new THREE.Matrix4() },
      bakedShadowTexel: { value: new THREE.Vector2(1 / mapSize, 1 / mapSize) },
      bakedShadowBias: { value: 0 },
      bakedShadowOffset: { value: new THREE.Vector3() },
    };
    this.light = null;
    this.staticCasters = new Set();
    this.bakes = 0;
  }

  install(material) {
    if (
      !material ||
      !(material.isMeshStandardMaterial || material.isMeshPhongMaterial || material.isMeshLambertMaterial)
    )
      return;
    const existing = installedMaterials.get(material);
    if (existing) {
      existing.source = this.uniforms;
      return;
    }
    // Stable holders let cached programs follow a replacement level without
    // retaining every shader ever compiled by a shared source material.
    const state = { source: this.uniforms, uniforms: {} };
    for (const name of Object.keys(this.uniforms)) {
      state.uniforms[name] = Object.defineProperty({}, 'value', {
        enumerable: true,
        get: () => state.source[name].value,
        set: (value) => {
          state.source[name].value = value;
        },
      });
    }
    installedMaterials.set(material, state);
    const compile = material.onBeforeCompile;
    const cacheKey = material.customProgramCacheKey;
    material.onBeforeCompile = function (shader, renderer) {
      compile.call(this, shader, renderer);
      Object.assign(shader.uniforms, state.uniforms);
      // createRoadMaterial and other wrappers deliberately call the source
      // hook. A clone can therefore already contain this projection; retarget
      // its uniform holders above, but never inject duplicate GLSL symbols.
      if (shader.vertexShader.includes('// FLOCK_STATIC_SHADOW_BAKE_V1')) return;
      shader.vertexShader =
        `// FLOCK_STATIC_SHADOW_BAKE_V1
        varying vec4 vBakedShadowCoord;
        uniform mat4 bakedShadowMatrix;
        uniform vec3 bakedShadowOffset;
        ` +
        shader.vertexShader.replace(
          '#include <project_vertex>',
          `
        #include <project_vertex>
        vec4 bakedWorldPosition = vec4(transformed, 1.0);
        #ifdef USE_BATCHING
          bakedWorldPosition = batchingMatrix * bakedWorldPosition;
        #endif
        #ifdef USE_INSTANCING
          bakedWorldPosition = instanceMatrix * bakedWorldPosition;
        #endif
        bakedWorldPosition = modelMatrix * bakedWorldPosition;
        bakedWorldPosition.xyz += bakedShadowOffset;
        vBakedShadowCoord = bakedShadowMatrix * bakedWorldPosition;
      `,
        );
      shader.fragmentShader =
        `varying vec4 vBakedShadowCoord;
        uniform float bakedShadowEnabled;
        uniform sampler2D bakedShadowMap;
        uniform vec2 bakedShadowTexel;
        uniform float bakedShadowBias;
        float bakedStaticVisibility() {
          if (bakedShadowEnabled < 0.5) return 1.0;
          vec3 p = vBakedShadowCoord.xyz / vBakedShadowCoord.w;
          if (p.x < 0.0 || p.x > 1.0 || p.y < 0.0 || p.y > 1.0 || p.z < 0.0 || p.z > 1.0) return 1.0;
          float visible = 0.0;
          for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
            vec4 depthTexel = texture2D(bakedShadowMap, p.xy + vec2(float(x), float(y)) * bakedShadowTexel);
            float depth = dot(depthTexel, vec4(0.99609375, 0.0038909912109375, 0.00001519918441772461, 0.000000059604644775390625));
            visible += step(p.z + bakedShadowBias, depth);
          }
          return visible / 9.0;
        }
        ` +
        shader.fragmentShader.replace(
          '#include <lights_fragment_end>',
          `
          #include <lights_fragment_end>
          float bakedVisibility = bakedStaticVisibility();
          reflectedLight.directDiffuse *= bakedVisibility;
          reflectedLight.directSpecular *= bakedVisibility;
        `,
        );
    };
    material.customProgramCacheKey = function () {
      return cacheKey.call(this) + ':static-shadow-bake-v1';
    };
    material.needsUpdate = true;
  }

  prepare(scene, terrain) {
    const capture = (object) => {
      if (!object.isMesh || !object.castShadow || movingEnvironmentPart(object, terrain)) return;
      object.userData.bakedStaticShadow = true;
      this.staticCasters.add(object);
    };
    terrain.traverse(capture);
    scene.traverse((object) => {
      // RiverDetails owns fixed rocks under the water-effects root, separate
      // from terrain. Explicit tags include these without capturing wildlife.
      if (object.userData.staticEnvironment) capture(object);
      if (!object.isMesh || !object.receiveShadow) return;
      for (const material of Array.isArray(object.material) ? object.material : [object.material])
        this.install(material);
    });
  }

  bake(renderer, scene, camera, sun, terrain) {
    if (this.light) return;
    scene.updateMatrixWorld(true);
    this.prepare(scene, terrain);
    const light = new THREE.DirectionalLight(0xffffff, 0);
    this.light = light;
    light.castShadow = true;
    const hardwareLimit = renderer.capabilities?.maxTextureSize ?? this.mapSize;
    const mapSize = Math.min(this.mapSize, 2 ** Math.floor(Math.log2(hardwareLimit)));
    light.shadow.mapSize.set(mapSize, mapSize);
    this.uniforms.bakedShadowTexel.value.set(1 / mapSize, 1 / mapSize);
    light.shadow.normalBias = this.normalBias;
    const bounds = new THREE.Box3().setFromObject(terrain);
    for (const object of this.staticCasters) bounds.expandByObject(object);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const radius = Math.max(1, size.length() / 2 + 2);
    const direction = sun.position.clone().sub(sun.target.position).normalize();
    light.target.position.copy(center);
    light.position.copy(center).addScaledVector(direction, radius * 2 + 2);
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = radius * 4 + 4;
    light.shadow.camera.left = light.shadow.camera.bottom = -radius;
    light.shadow.camera.right = light.shadow.camera.top = radius;
    light.shadow.camera.updateProjectionMatrix();
    light.shadow.autoUpdate = false;
    light.shadow.needsUpdate = true;
    scene.add(light, light.target);
    scene.updateMatrixWorld(true);
    light.shadow.updateMatrices(light);
    const lightBounds = bounds.clone().applyMatrix4(light.shadow.camera.matrixWorldInverse);
    Object.assign(light.shadow.camera, {
      left: lightBounds.min.x - 1,
      right: lightBounds.max.x + 1,
      bottom: lightBounds.min.y - 1,
      top: lightBounds.max.y + 1,
      near: Math.max(0.1, -lightBounds.max.z - 1),
      far: -lightBounds.min.z + 1,
    });
    light.shadow.camera.updateProjectionMatrix();
    // Bias is specified in world units, then normalized to the fitted depth
    // interval. Reusing the live map's normalized bias would erase thin rails
    // on a large meadow, whose light depth interval is hundreds of metres.
    this.uniforms.bakedShadowBias.value = -this.depthBias / (light.shadow.camera.far - light.shadow.camera.near);
    const originalSunCasting = sun.castShadow;
    const flags = [];
    scene.traverse((object) => {
      if (!object.isMesh) return;
      flags.push([object, object.castShadow]);
      object.castShadow = this.staticCasters.has(object);
    });
    sun.castShadow = false;
    let captured = false;
    try {
      renderer.render(scene, camera);
      this.bakes++;
      light.shadow.updateMatrices(light);
      this.uniforms.bakedShadowMatrix.value.copy(light.shadow.matrix);
      this.uniforms.bakedShadowOffset.value.copy(direction).multiplyScalar(this.normalBias);
      this.uniforms.bakedShadowMap.value = light.shadow.map?.texture ?? null;
      this.uniforms.bakedShadowEnabled.value = light.shadow.map ? 1 : 0;
      captured = true;
    } finally {
      sun.castShadow = originalSunCasting;
      for (const [object, castShadow] of flags)
        object.castShadow = captured && this.staticCasters.has(object) ? false : castShadow;
      scene.remove(light, light.target);
      light.castShadow = false;
      light.shadow.needsUpdate = false;
      if (!captured) {
        light.shadow.dispose();
        this.light = null;
      }
    }
  }

  enforceStaticCasters() {
    for (const object of this.staticCasters) object.castShadow = false;
  }

  dispose() {
    this.uniforms.bakedShadowEnabled.value = 0;
    this.uniforms.bakedShadowMap.value = null;
    this.light?.shadow.dispose();
    this.light = null;
    this.staticCasters.clear();
  }
}
