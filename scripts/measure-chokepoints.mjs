#!/usr/bin/env node
// Measure herd behaviour at bridges, gates and the destination entrance.
// Usage: node scripts/measure-chokepoints.mjs [publicLevel[,publicLevel...]] [seed[,seed...]] [srcDir]
// Prints one JSON line per run. A scripted player herds the rearmost animal
// (the herding-journey policy) with route gates pre-opened. Counts are
// directional evidence for tuning, not human playtesting or device results.
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [levelArg = '6,10,13,16,21,31,46,61,81', seedArg = 'default', srcArg = 'src'] = process.argv.slice(2);
const src = pathToFileURL(resolve(srcArg)).href;
const W = await import(`${src}/world.js`);
const { stepSimulation } = await import(`${src}/simulation.js`);
const { upgradeEffects } = await import(`${src}/progression.js`);
const { animalRadius } = await import(`${src}/animal-size.js`);
const { createLevel, routeProgress, nextNavigationPoint, navigationTarget, destinationApproach, canOccupy, hasClearPlayerSignal, hasClearGroundPath, distance, targetFootprint } = W;
const unit = (x, z) => { const l = Math.hypot(x, z) || 1; return { x: x / l, z: z / l }; };
const yaw = h => ({ x: Math.sin(h), z: Math.cos(h) });
const DT = .05, SECONDS = 600, routeId = 'route-0', upgrades = { speed: 3, flock: 3, drone: 3 };

// Pip circles the destination rather than pushing through its walls.
function aroundDestination(level, desired) {
  const t = level.target, extent = t.radius + 1.4, f = yaw(t.heading), outside = extent + 2;
  const point = (u, v) => ({ x: t.x + u * f.x + v * f.z, z: t.z + u * f.z - v * f.x });
  const nodes = [level.dog, desired, ...[[-outside, -outside], [-outside, outside], [outside, -outside], [outside, outside], [-outside, 0], [-extent + 2, 0], [0, 0]].map(([u, v]) => point(u, v))];
  const costs = nodes.map(() => Infinity), previous = [], visited = new Set(); costs[0] = 0;
  for (let step = 0; step < nodes.length; step++) {
    let near = -1; for (let i = 0; i < nodes.length; i++) if (!visited.has(i) && (near < 0 || costs[i] < costs[near])) near = i;
    if (near < 0 || !Number.isFinite(costs[near]) || near === 1) break;
    visited.add(near);
    for (let i = 0; i < nodes.length; i++) {
      if (visited.has(i) || !hasClearGroundPath(level, nodes[near], nodes[i], .62)) continue;
      const cost = costs[near] + distance(nodes[near], nodes[i]); if (cost < costs[i]) { costs[i] = cost; previous[i] = near; }
    }
  }
  if (!Number.isFinite(costs[1])) return navigationTarget(level, level.dog, desired);
  let first = 1; while (previous[first] !== 0 && previous[first] !== undefined) first = previous[first];
  return nodes[first];
}

function measure(index, seed) {
  const level = createLevel(index, seed), route = level.routes.find(r => r.id === routeId);
  const speed = 7.8 + upgradeEffects(upgrades, index + 1).speedBoost;
  const onRoute = o => route.points.some(p => Math.hypot(p.x - o.x, p.z - o.z) < o.width);
  for (const g of level.gates) if (g.operable && !g.open && onRoute(g)) { g.open = true; level.geometryRevision = (level.geometryRevision || 0) + 1; }
  const shape = targetFootprint(level.target);
  const chokes = [
    ...level.rivers.flatMap(r => r.bridges).map(b => ({ kind: 'bridge', x: b.x, z: b.z, f: yaw(b.heading), width: b.width, half: b.length / 2 })),
    ...level.gates.map(g => ({ kind: 'gate', x: g.x, z: g.z, f: yaw(g.heading), width: g.width, half: .2 })),
    { kind: 'entrance', x: shape.entrance.x, z: shape.entrance.z, f: yaw(level.target.heading), width: shape.openingWidth, half: .2 },
  ].filter(onRoute).map(c => ({ ...c, stall: 0, flips: 0, side: new Map(), dir: new Map() }));
  let desired;
  for (let frame = 0; frame < SECONDS / DT && !level.completed; frame++) {
    if (frame % 6 === 0) {
      const { animal, info } = level.animals.filter(a => !a.saved).map(animal => ({ animal, info: routeProgress(level, animal, routeId) }))
        .sort((a, b) => (a.info.progress - a.info.distance) - (b.info.progress - b.info.distance))[0];
      const nearDestination = info.progress > info.length - 20, radius = animalRadius(animal);
      const aim = nearDestination ? destinationApproach(level, animal) : navigationTarget(level, animal, nextNavigationPoint(level, animal, routeId), radius);
      const forward = unit(aim.x - animal.x, aim.z - animal.z);
      desired = { x: animal.x - forward.x * 3.3, z: animal.z - forward.z * 3.3 };
      if (!canOccupy(level, desired.x, desired.z, .62) || !hasClearPlayerSignal(level, animal, desired)) {
        search: for (const angle of [0, Math.PI / 6, -Math.PI / 6, Math.PI / 3, -Math.PI / 3, Math.PI / 2, -Math.PI / 2]) {
          const d = { x: forward.x * Math.cos(angle) - forward.z * Math.sin(angle), z: forward.x * Math.sin(angle) + forward.z * Math.cos(angle) };
          for (const o of [2, 1, .5, .15]) { const c = { x: animal.x - d.x * o, z: animal.z - d.z * o }; if (canOccupy(level, c.x, c.z, .62) && hasClearPlayerSignal(level, animal, c)) { desired = c; break search; } }
        }
      }
      if (distance(animal, level.target) < level.target.radius - radius * .5) desired = { x: level.target.x, z: level.target.z };
      desired = nearDestination ? aroundDestination(level, desired) : navigationTarget(level, level.dog, desired);
    }
    const x = desired.x - level.dog.x, z = desired.z - level.dog.z, div = Math.max(speed * .1 > 1 ? 1.3 : 1, Math.hypot(x, z));
    stepSimulation(level, level.dog, { x: x / div, z: z / div }, DT, upgrades);
    for (const c of chokes) for (const a of level.animals) {
      if (a.saved) continue;
      const s = (a.x - c.x) * c.f.x + (a.z - c.z) * c.f.z, l = (a.x - c.x) * c.f.z - (a.z - c.z) * c.f.x;
      if (Math.abs(s) >= c.half + 7 || Math.abs(l) >= c.width / 2 + 4) continue;
      const v = a.vx * c.f.x + a.vz * c.f.z;
      if (a.alert > .03 && Math.hypot(a.vx, a.vz) < .3) c.stall += DT;
      if (Math.abs(v) > .35) { const d = Math.sign(v), p = c.dir.get(a.id); if (p && p !== d) c.flips++; c.dir.set(a.id, d); }
    }
  }
  const n = level.animals.length;
  return { publicLevel: index + 1, seed: level.seed, animals: n, cows: level.animals.filter(a => a.type === 'cow').length,
    completed: !!level.completed, time: +level.time.toFixed(1), saved: level.animals.filter(a => a.saved).length,
    chokes: chokes.map(c => ({ kind: c.kind, width: +c.width.toFixed(2), reversalsPerAnimal: +(c.flips / n).toFixed(2), stallSecondsPerAnimal: +(c.stall / n).toFixed(2) })) };
}

for (const publicLevel of levelArg.split(',').map(Number)) for (const seed of seedArg.split(',')) {
  console.log(JSON.stringify(measure(publicLevel - 1, seed === 'default' ? undefined : Number(seed))));
}
