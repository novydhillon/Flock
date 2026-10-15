import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createWeatherState, stepWeather, weatherForLevel } from '../src/weather.js';
import { Atmosphere, cloudTexture } from '../src/atmosphere.js';
const level = { index: 9, seed: 45, bounds: { minX: -80, maxX: 80, minZ: -80, maxZ: 80 }, rivers: [], roads: [] };
const fields = ['rainIntensity', 'snowIntensity', 'windIntensity', 'severity', 'cloudCoverage', 'daylight', 'lightningFlash'];
test('weather follows deterministic simulation time, bounded smoothly changing episodes', () => {
  const a = createWeatherState({ ...level, weather: 'rain' }), b = createWeatherState({ ...level, weather: 'rain' });
  for (let i = 0; i < 990; i++) stepWeather(a, .1);
  stepWeather(b, 99);
  for (const key of fields) assert.ok(Math.abs(a[key] - b[key]) < 1e-10, key);
  assert.ok(a.severity > .35 && a.severity < .92);
  let previous = a.severity;
  for (let i = 0; i < 20000; i++) {
    assert.equal(stepWeather(a, .1), a);
    for (const key of fields) assert.ok(a[key] >= 0 && a[key] <= 1, key);
    assert.ok(Math.abs(a.severity - previous) < .006); previous = a.severity;
  }
  const snapshot = { ...a }; stepWeather(a, 0); stepWeather(a, NaN); stepWeather(a, -1);
  assert.deepEqual(a, snapshot);
  assert.deepEqual(weatherForLevel(level), weatherForLevel(level));
});
test('first five levels stay sunny and snow/storm wait until after level eight', () => {
  for (let index = 0; index < 8; index++) {
    const weather = createWeatherState({ ...level, index, weather: 'storm' });
    for (let t = 0; t < 1500; t++) {
      stepWeather(weather, 1);
      assert.equal(weather.snowIntensity, 0); assert.equal(weather.lightningFlash, 0);
      if (index < 5) { assert.equal(weather.type, 'sun'); assert.equal(weather.severity, 0); }
    }
  }
});
test('lightning is one bounded event with delayed thunder data and deterministic replay', () => {
  const weather = createWeatherState({ ...level, weather: 'storm' });
  stepWeather(weather, 30); assert.ok(weather.lightningId); assert.equal(weather.lightningFlash, .38);
  const id = weather.lightningId;
  stepWeather(weather, .1); assert.equal(weather.lightningId, id); assert.ok(weather.lightningFlash < .38);
  stepWeather(weather, .2); assert.equal(weather.lightningFlash, 0);
  assert.ok(weather.thunderDelay >= .8 && weather.thunderDelay <= 1.6);
  stepWeather(weather, 23.7); assert.notEqual(weather.lightningId, id);
  const replay = createWeatherState({ ...level, weather: 'storm' }); stepWeather(replay, 54);
  assert.equal(replay.lightningId, weather.lightningId);
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
  assert.equal(atmosphere.root.children.length, 2); assert.equal(atmosphere.cloudMesh.count, 10);
  const resources = [...atmosphere.resources], counts = new Map(resources.map(r => [r, 0]));
  for (const r of resources) r.addEventListener('dispose', () => counts.set(r, counts.get(r) + 1));
  const before = atmosphere.clouds[0].x;
  atmosphere.update(1, { weather: { cloudCoverage: 1, windIntensity: 1 }, camera: new THREE.PerspectiveCamera() });
  assert.ok(atmosphere.clouds[0].x > before);
  assert.ok(atmosphere.cloudMesh.material.opacity >= .1 && atmosphere.cloudMesh.material.opacity <= .25);
  assert.ok(1 - (1 - atmosphere.cloudMesh.material.opacity) ** 2 <= .25);
  assert.ok([...atmosphere.cloudMesh.instanceMatrix.array].every(Number.isFinite));
  const snapshot = JSON.stringify(atmosphere.clouds); atmosphere.update(10, { paused: true });
  assert.equal(JSON.stringify(atmosphere.clouds), snapshot);
  atmosphere.setLevel(level); assert.ok([...counts.values()].every(n => n === 1));
  assert.equal(atmosphere.resources.size, resources.length);
  atmosphere.dispose(); atmosphere.dispose(); assert.equal(scene.children.length, 0); assert.equal(atmosphere.resources.size, 0);
});
