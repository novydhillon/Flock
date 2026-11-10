import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {StaticShadows} from '../src/static-shadows.js';
import {createRoadMaterial} from '../src/surfaces.js';

function fixture() {
  const scene = new THREE.Scene(), terrain = new THREE.Group();
  scene.add(terrain);
  const material = new THREE.MeshStandardMaterial();
  const make = parent => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 4, 2), material);
    mesh.castShadow = mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };
  const bridge = make(terrain), fence = make(terrain), barn = make(terrain);
  bridge.position.set(-90, 3, 10); fence.position.set(110, 1, -20); barn.position.set(3, 4, 50);
  const panel = new THREE.Group();panel.name = 'gate-panel';terrain.add(panel);
  const movingGate = make(panel), actor = make(scene);
  const grass = make(terrain);grass.castShadow = false;
  const sun = new THREE.DirectionalLight();sun.position.set(-18, 35, 20);sun.castShadow = true;
  scene.add(sun, sun.target);
  const camera = new THREE.OrthographicCamera(-20, 20, 20, -20, .1, 100);
  let renders = 0, capture;
  const renderer = {render(scene) {
    renders++;scene.updateMatrixWorld(true);
    const light = scene.children.find(o => o.isDirectionalLight && o !== sun);
    capture = {static: [bridge, fence, barn].every(o => o.castShadow), actor: actor.castShadow, gate: movingGate.castShadow, grass: grass.castShadow, sun: sun.castShadow};
    if (light) {
      light.shadow.updateMatrices(light);
      light.shadow.map = new THREE.WebGLRenderTarget(32, 32);
    }
  }};
  return {scene,terrain,material,bridge,fence,barn,movingGate,actor,grass,sun,camera,renderer,get renders(){return renders;},get capture(){return capture;}};
}

test('static bake captures complete static geometry once and reserves live sun for actors and moving panels', () => {
  const f = fixture(), baked = new StaticShadows({mapSize: 1024});
  baked.bake(f.renderer,f.scene,f.camera,f.sun,f.terrain);
  assert.deepEqual(f.capture,{static:true,actor:false,gate:false,grass:false,sun:false});
  assert.equal(f.renders,1);
  assert.equal(baked.uniforms.bakedShadowEnabled.value,1);
  assert.equal(baked.light.shadow.autoUpdate,false);
  assert.equal(baked.light.castShadow,false);
  assert.equal(baked.light.parent,null,'bake light cannot enter subsequent render passes');
  for(const object of [f.bridge,f.fence,f.barn])assert.equal(object.castShadow,false);
  assert.equal(f.actor.castShadow,true);assert.equal(f.movingGate.castShadow,true);
  const depthRange=baked.light.shadow.camera.far-baked.light.shadow.camera.near;
  assert.ok(Math.abs(baked.uniforms.bakedShadowBias.value*depthRange+.005)<1e-12,'thin rails retain a5mm world-depth bias at every map size');
  const matrix=baked.uniforms.bakedShadowMatrix.value.clone();
  f.camera.position.set(500,30,-400);
  baked.bake(f.renderer,f.scene,f.camera,f.sun,f.terrain);
  assert.equal(f.renders,1,'camera travel does not rebake');
  assert.deepEqual(baked.uniforms.bakedShadowMatrix.value,matrix);
  const box=new THREE.Box3().setFromObject(f.terrain),p=new THREE.Vector3();
  for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z]) {
    p.set(x,y,z).applyMatrix4(matrix);
    assert.ok(p.x>=0&&p.x<=1&&p.y>=0&&p.y<=1&&p.z>=0&&p.z<=1,'full-world receivers fit, independent of the view');
  }
  f.barn.castShadow=true;baked.enforceStaticCasters();assert.equal(f.barn.castShadow,false,'cutaway cannot restore real-time static casting');
  let disposals=0;baked.light.shadow.map.addEventListener('dispose',()=>disposals++);
  baked.dispose();baked.dispose();assert.equal(disposals,1);assert.equal(baked.uniforms.bakedShadowEnabled.value,0);
});

test('baked receiver shader composes previous hooks, applies only direct-light visibility and supports instancing', () => {
  const baked=new StaticShadows(),material=new THREE.MeshStandardMaterial();
  let previous=0;
  material.onBeforeCompile=shader=>{previous++;shader.uniforms.old={value:7};};
  baked.install(material);
  const shader={uniforms:{},vertexShader:THREE.ShaderLib.standard.vertexShader,fragmentShader:THREE.ShaderLib.standard.fragmentShader};
  material.onBeforeCompile(shader);
  assert.equal(previous,1);assert.equal(shader.uniforms.old.value,7);
  assert.match(shader.vertexShader,/instanceMatrix \* bakedWorldPosition/);
  assert.match(shader.vertexShader,/batchingMatrix \* bakedWorldPosition/);
  assert.match(shader.fragmentShader,/reflectedLight.directDiffuse \*= bakedVisibility/);
  assert.match(shader.fragmentShader,/reflectedLight.directSpecular \*= bakedVisibility/);
  assert.doesNotMatch(shader.fragmentShader,/outgoingLight \*=/);
  const replacement=new StaticShadows();replacement.install(material);
  const nextTexture = new THREE.Texture();replacement.uniforms.bakedShadowMap.value=nextTexture;
  assert.equal(shader.uniforms.bakedShadowMap.value,nextTexture,'cached materials point at the replacement level map');
  assert.match(material.customProgramCacheKey(),/static-shadow-bake-v1/);
});


test('failed capture restores live flags and releases the failed target for a retry', () => {
  const f=fixture(),baked=new StaticShadows();
  const bad={render(){throw Error('GPU capture failed');}};
  assert.throws(()=>baked.bake(bad,f.scene,f.camera,f.sun,f.terrain),/GPU capture failed/);
  assert.equal(baked.light,null);
  assert.equal(f.bridge.castShadow,true);assert.equal(f.actor.castShadow,true);assert.equal(f.sun.castShadow,true);
  baked.bake(f.renderer,f.scene,f.camera,f.sun,f.terrain);
  assert.equal(baked.bakes,1);
});


test('road clones of installed sources inject one static projection and follow level replacement without retaining shader objects', () => {
  const source = new THREE.MeshStandardMaterial(), first = new StaticShadows();
  first.install(source);
  const compile = material => {
    const shader = {uniforms:{},vertexShader:THREE.ShaderLib.standard.vertexShader,fragmentShader:THREE.ShaderLib.standard.fragmentShader};
    material.onBeforeCompile(shader);return shader;
  };
  for (const bake of [first, new StaticShadows()]) {
    bake.install(source);
    const road = createRoadMaterial(source);
    bake.install(road);
    const shader = compile(road);
    assert.equal((shader.vertexShader.match(/varying vec4 vBakedShadowCoord/g)||[]).length,1);
    assert.equal((shader.vertexShader.match(/vec4 bakedWorldPosition =/g)||[]).length,1);
    assert.equal((shader.fragmentShader.match(/float bakedStaticVisibility\(\)/g)||[]).length,1);
    assert.equal((shader.fragmentShader.match(/reflectedLight.directDiffuse \*= bakedVisibility/g)||[]).length,1);
    assert.match(shader.vertexShader,/attribute float roadOpacity/);
    const texture = new THREE.Texture();bake.uniforms.bakedShadowMap.value=texture;
    assert.equal(shader.uniforms.bakedShadowMap.value,texture);
    bake.dispose();assert.equal(shader.uniforms.bakedShadowEnabled.value,0);
    road.dispose();texture.dispose();
  }
});


test('explicit static water-effect rocks join the bake and bounds without capturing external wildlife', () => {
  const f=fixture(),baked=new StaticShadows();
  const waterEffects=new THREE.Group();f.scene.add(waterEffects);
  const rock=new THREE.Mesh(new THREE.BoxGeometry(4,4,4),new THREE.MeshStandardMaterial());
  rock.name='Seeded river rocks';rock.position.set(350,2,-90);
  rock.castShadow=rock.receiveShadow=true;rock.userData.staticEnvironment=true;waterEffects.add(rock);
  const bird=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial());
  bird.position.set(10000,5,0);bird.castShadow=bird.receiveShadow=true;f.scene.add(bird);
  const render=f.renderer.render;
  f.renderer.render=scene=>{
    assert.equal(rock.castShadow,true,'external tagged static rock participates in the depth bake');
    assert.equal(bird.castShadow,false,'live wildlife is excluded from the baked map');
    render(scene);
  };
  baked.bake(f.renderer,f.scene,f.camera,f.sun,f.terrain);
  assert.ok(baked.staticCasters.has(rock));
  assert.equal(rock.castShadow,false);assert.equal(bird.castShadow,true);
  const position=new THREE.Vector3();rock.getWorldPosition(position);
  position.applyMatrix4(baked.uniforms.bakedShadowMatrix.value);
  assert.ok(position.x>0&&position.x<1&&position.y>0&&position.y<1&&position.z>0&&position.z<1,'bake projection includes an external fixed rock');
  bird.getWorldPosition(position);position.applyMatrix4(baked.uniforms.bakedShadowMatrix.value);
  assert.ok(position.x>1||position.x<0||position.y>1||position.y<0,'distant moving wildlife cannot inflate the static bake bounds');
  baked.dispose();
});
