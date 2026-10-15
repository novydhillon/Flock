import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createWeatherState, stepWeather, weatherForLevel } from '../src/weather.js';
import { Atmosphere, cloudTexture } from '../src/atmosphere.js';
const level = { index: 9, seed: 45, bounds: { minX: -80, maxX: 80, minZ: -80, maxZ: 80 }, rivers: [], roads: [] };
const fields = ['rainIntensity', 'snowIntensity', 'windIntensity', 'severity', 'cloudCoverage', 'daylight', 'lightningFlash'];
test('weather stays fixed for many minutes, independent of frame sizes and paused frames', () => {
  for (const kind of ['sun', 'wind', 'rain', 'heavy-rain', 'storm']) {
    const input = { ...level, index: 23, weather: kind };
    const a = createWeatherState(input), b = createWeatherState(input);
    const fixedKeys = ['type', 'kind', 'intensity', 'rainIntensity', 'snowIntensity', 'windIntensity', 'severity', 'cloudCoverage', 'daylight'];
    const fixed = Object.fromEntries(fixedKeys.map(key => [key, a[key]]));
    for (let i = 0; i < 20000; i++) {
      assert.equal(stepWeather(a, .1), a);
      assert.deepEqual(Object.fromEntries(fixedKeys.map(key => [key, a[key]])), fixed);
      for (const key of fields) assert.ok(a[key] >= 0 && a[key] <= 1, key);
    }
    stepWeather(b, 2000);
    for (const key of fields) assert.ok(Math.abs(a[key] - b[key]) < 1e-8, key);
    assert.equal(a.lightningId, b.lightningId);
    const snapshot = { ...a }; stepWeather(a, 0); stepWeather(a, NaN); stepWeather(a, -1);
    assert.deepEqual(a, snapshot);
  }
  assert.deepEqual(weatherForLevel(level), weatherForLevel(level));
});
test('seeded selection respects public unlock gates and fixtures with no snow', () => {
  const seen = new Set();
  for (let seed = 0; seed < 32; seed++) {
    for (let index = 0; index < 80; index++) {
      const input = { index, seed }, weather = createWeatherState(input);
      assert.deepEqual(weather, createWeatherState(input));
      assert.equal(weather.snowIntensity, 0);
      assert.ok(['sun', 'wind', 'rain'].includes(weather.type));
      assert.ok(['sun', 'wind', 'rain', 'heavy-rain', 'storm'].includes(weather.kind));
      if (index < 5) assert.equal(weather.kind, 'sun');
      if (index < 8) assert.equal(weather.rainIntensity, 0);
      if (index < 15) assert.ok(!['heavy-rain', 'storm'].includes(weather.kind));
      if (index < 23) assert.notEqual(weather.kind, 'storm');
      if (index === 8) assert.equal(weather.kind, 'rain');
      if (index === 15) assert.equal(weather.kind, 'heavy-rain');
      if (index === 23) assert.equal(weather.kind, 'storm');
      if (index === 30) seen.add(weather.kind);
    }
  }
  assert.ok(seen.size > 1, 'seed affects selection at the same level');
});
test('explicit weather aliases obey unlock gates and legacy snow becomes safe rain', () => {
  const cases = [
    [4, 'storm', 'sun'], [7, 'rain', 'sun'], [7, 'snow', 'sun'],
    [8, 'light-rain', 'rain'], [8, 'heavy-rain', 'rain'], [8, 'storm', 'rain'],
    [15, 'heavy-rain', 'heavy-rain'], [15, 'storm', 'heavy-rain'],
    [23, 'storm', 'storm'], [23, 'snow', 'rain'], [23, 'sun', 'sun'], [23, 'wind', 'wind'],
  ];
  for (const [index, alias, expected] of cases) {
    for (const weather of [alias, { type: alias }, { kind: alias }]) {
      const state = createWeatherState({ ...level, index, weather });
      assert.equal(state.kind, expected, `${index + 1}: ${alias}`);
      stepWeather(state, 7200); assert.equal(state.kind, expected); assert.equal(state.snowIntensity, 0);
    }
  }
});
test('storm starts wet and lightning is bounded, spaced, delayed and replayable', () => {
  const input = { ...level, index: 23, weather: 'storm' };
  const weather = createWeatherState(input);
  assert.equal(weather.kind, 'storm'); assert.equal(weather.type, 'rain');
  assert.ok(weather.rainIntensity >= .8); assert.equal(weather.lightningId, null);
  assert.ok(weather.lightningStart >= 8 && weather.lightningStart <= 12);
  assert.ok(weather.lightningInterval >= 20);
  stepWeather(weather, weather.lightningStart); assert.ok(weather.lightningId); assert.equal(weather.lightningFlash, .38);
  const id = weather.lightningId;
  stepWeather(weather, .1); assert.equal(weather.lightningId, id); assert.ok(weather.lightningFlash < .38);
  stepWeather(weather, .13); assert.equal(weather.lightningFlash, 0);
  assert.ok(weather.thunderDelay >= .8 && weather.thunderDelay <= 1.6);
  stepWeather(weather, weather.lightningInterval - .23); assert.notEqual(weather.lightningId, id);
  const replay = createWeatherState(input); stepWeather(replay, weather.elapsed);
  assert.equal(replay.lightningId, weather.lightningId); assert.equal(replay.lightningFlash, weather.lightningFlash);
  stepWeather(weather, 10000); assert.equal(weather.lightningFlash, 0);
});
test('soft cloud texture has transparent borders and bounded nonbinary alpha', () => {
  const texture = cloudTexture(), { width, height, data } = texture.image;
  assert.equal(width, 64); assert.equal(height, 64);
  assert.ok(data.some((v, i) => i % 4 === 3 && v > 0 && v < 255));
  assert.equal(data[3], 0); assert.equal(data.at(-1), 0); texture.dispose();
});
test('atmosphere uses two bounded draws, never raises opacity in storms and disposes once', () => {
  const scene = new THREE.Scene(), atmosphere = new Atmosphere(scene);
  atmosphere.setLevel(level, createWeatherState(level));
  assert.equal(atmosphere.root.children.length, 2); assert.equal(atmosphere.cloudMesh.count, 48);
  const resources = [...atmosphere.resources], counts = new Map(resources.map(r => [r, 0]));
  for (const r of resources) r.addEventListener('dispose', () => counts.set(r, counts.get(r) + 1));
  const camera=new THREE.OrthographicCamera(-12,12,20,-20,.1,180);camera.position.set(0,36,29);camera.lookAt(0,0,-2);camera.updateMatrixWorld(true);
  atmosphere.update(0,{weather:{cloudCoverage:1,windIntensity:1},camera});const before=[...atmosphere.cloudMesh.instanceMatrix.array];
  atmosphere.update(1, { weather: { cloudCoverage: 1, windIntensity: 1 }, camera });
  assert.notDeepEqual([...atmosphere.cloudMesh.instanceMatrix.array],before);
  assert.ok(atmosphere.cloudMesh.material.opacity >= .1 && atmosphere.cloudMesh.material.opacity <= .25);
  // Each soft puff obeys the requested opacity; scene overlap is tested in viewport probes.
  assert.ok(atmosphere.cloudMesh.material.depthWrite===false);
  assert.ok([...atmosphere.cloudMesh.instanceMatrix.array].every(Number.isFinite));
  const snapshot = JSON.stringify(atmosphere.clouds); atmosphere.update(10, { paused: true });
  assert.equal(JSON.stringify(atmosphere.clouds), snapshot);
  atmosphere.setLevel(level); assert.ok([...counts.values()].every(n => n === 1));
  assert.equal(atmosphere.resources.size, resources.length);
  atmosphere.dispose(); atmosphere.dispose(); assert.equal(scene.children.length, 0); assert.equal(atmosphere.resources.size, 0);
});
