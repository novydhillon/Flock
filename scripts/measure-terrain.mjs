#!/usr/bin/env node
// Reproducible source-level terrain measurements, not rendered/device evidence.
import { createLevel, groundHeight, terrainSlope, bridgeSurfaceHeight } from '../src/world.js';
import { TERRAIN, compactBankRegion } from '../src/terrain.js';

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const i = args.indexOf(name);
  return i < 0 ? fallback : args[i + 1];
};
const numbers = input => input.split(',').flatMap(part => {
  const match = part.match(/^(\d+)-(\d+)$/);
  return match ? Array.from({length: Number(match[2]) - Number(match[1]) + 1}, (_, i) => Number(match[1]) + i) : [Number(part)];
});
const levels = numbers(option('--levels', '6,20,50,100'));
const spacing = Number(option('--spacing', '2'));
const seeds = option('--seeds', 'campaign') === 'campaign' ? [undefined] : numbers(option('--seeds', 'campaign'));
if (!(spacing > 0 && Number.isFinite(spacing)) || levels.some(n => !Number.isInteger(n) || n < 1 || n > 100)
    || seeds.some(n => n !== undefined && (!Number.isSafeInteger(n) || n < 0))) {
  throw Error('Usage: node scripts/measure-terrain.mjs --levels 1-100 --spacing 2 --seeds campaign (or comma-separated integer seeds)');
}
const degrees = value => value * 180 / Math.PI;
const results = [];
for (const publicLevel of levels) for (const seed of seeds) {
  const level = createLevel(publicLevel - 1, seed), b = level.bounds;
  let minimum = Infinity, maximum = -Infinity, maxGroundGrade = 0, maxPastureGrade = 0, maxBankGrade = 0, maxSupportGrade = 0, elevatedCrossings = 0, maximumBankSetback = 0, squares = 0, samples = 0;
  const ground = (x, z) => {
    const height = groundHeight(level, x, z), grade = terrainSlope(level, x, z);
    minimum = Math.min(minimum, height); maximum = Math.max(maximum, height);
    maxGroundGrade = Math.max(maxGroundGrade, grade);
    if (compactBankRegion(level, x, z)) maxBankGrade = Math.max(maxBankGrade, grade);
    else maxPastureGrade = Math.max(maxPastureGrade, grade);
    squares += grade * grade; samples++;
  };
  for (let x = b.minX; x <= b.maxX; x += spacing) for (let z = b.minZ; z <= b.maxZ; z += spacing) ground(x, z);
  for (const point of [level.spawn, level.target, ...level.boundary]) ground(point.x, point.z);
  for (const river of level.rivers) for (const bridge of river.bridges) {
    if (bridge.elevated) {
      elevatedCrossings++;
      maximumBankSetback = Math.max(maximumBankSetback, (bridge.length - river.width) / 2);
    }
    const f = {x: Math.sin(bridge.heading), z: Math.cos(bridge.heading)};
    const steps = Math.ceil(bridge.length / Math.min(spacing, .25));
    for (let step = 0; step <= steps; step++) {
      const along = -bridge.length / 2 + bridge.length * step / steps;
      for (let side = 0; side <= 8; side++) {
        const lateral = -bridge.width / 2 + .02 + (bridge.width - .04) * side / 8;
        const x = bridge.x + f.x * along + f.z * lateral, z = bridge.z + f.z * along - f.x * lateral;
        const height = bridgeSurfaceHeight(level, bridge, x, z), h = .0001;
        const dx = (bridgeSurfaceHeight(level, bridge, x + h, z) - bridgeSurfaceHeight(level, bridge, x - h, z)) / (2 * h);
        const dz = (bridgeSurfaceHeight(level, bridge, x, z + h) - bridgeSurfaceHeight(level, bridge, x, z - h)) / (2 * h);
        maxSupportGrade = Math.max(maxSupportGrade, Math.atan(Math.hypot(dx, dz)));
        minimum = Math.min(minimum, height); maximum = Math.max(maximum, height);
      }
    }
  }
  const relief = maximum - minimum;
  results.push({publicLevel, seed: level.seed, rolling: level.terrain.enabled, samples, minimum, maximum, relief,
    elevatedCrossings, maximumBankSetback,
    maximumGroundSlopeDegrees: degrees(maxGroundGrade), maximumPastureSlopeDegrees: degrees(maxPastureGrade), maximumBankSlopeDegrees: degrees(maxBankGrade), maximumSupportSlopeDegrees: degrees(maxSupportGrade), rmsGroundSlopeDegrees: degrees(Math.sqrt(squares / samples)),
    withinLimits: relief <= TERRAIN.maximumRelief + 1e-6 && degrees(Math.max(maxPastureGrade, maxSupportGrade)) <= TERRAIN.maximumSlopeDegrees + 1e-6 && degrees(maxBankGrade) <= TERRAIN.maximumBankSlopeDegrees + 1e-6});
}
console.log(JSON.stringify({method: 'Bounds grid plus spawn/goal/boundary; bridge grades from finite differences at nine lateral positions including inset edges, with exact longitudinal endpoints. Sampling is evidence, not an analytic proof.',
  spacing, limits: {relief: TERRAIN.maximumRelief, slopeDegrees: TERRAIN.maximumSlopeDegrees, compactBankSlopeDegrees: TERRAIN.maximumBankSlopeDegrees}, results}, null, 2));
if (results.some(result => !result.withinLimits)) process.exitCode = 1;
