import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createLevel, distance, segmentDistance, hasClearGroundPath, canOccupy,
  targetFootprint, targetLocalPoint, targetWorldPoint, containsTarget,
} from '../src/world.js';

const directions = [200, 201, 202, 203];

test('every crossing is perpendicular to its sampled river and its straight road approaches share the deck axis', () => {
  for (let index = 1; index < 100; index++) for (const seed of directions) {
    const level = createLevel(index, seed);
    for (const river of level.rivers) for (const [routeIndex, bridge] of river.bridges.entries()) {
      const forward = { x: Math.sin(bridge.heading), z: Math.cos(bridge.heading) };
      const label = `level ${index + 1}, seed ${seed}, ${routeIndex}`;
      const riverSegments = river.points.slice(1).map((b, i) => [river.points[i], b])
        .filter(([a, b]) => segmentDistance(bridge, a, b) < .000002);
      assert.ok(riverSegments.length, `deck centered on sampled stream: ${label}`);
      assert.ok(riverSegments.some(([a, b]) => Math.abs(((b.x-a.x)*forward.x+(b.z-a.z)*forward.z)/distance(a,b)) < .000002), `perpendicular: ${label}`);
      const road = level.roads[routeIndex];
      assert.equal(bridge.width, road.width * 1.25, `usable deck/path ratio: ${label}`);
      const crossing = road.points.findIndex(p => p.kind === 'bridge' && distance(p, bridge) < .000002);
      assert.ok(crossing > 1 && crossing < road.points.length - 2, label);
      for (const offset of [-2, -1, 1, 2]) {
        const p = road.points[crossing + offset], dx = p.x - bridge.x, dz = p.z - bridge.z;
        assert.ok(Math.abs(dx*forward.z-dz*forward.x) < .000002, `aligned approach/departure: ${label}`);
      }
      assert.ok(hasClearGroundPath(level, road.points[crossing-2], road.points[crossing+2], .8), `solid cow crossing: ${label}`);
    }
  }
});

test('rotated custom-seed routes keep cow clearance through every crossing, branch turn and enclosure gate', () => {
  for (let index = 0; index < 100; index++) for (const seed of directions) {
    const level = createLevel(index, seed);
    for (const route of level.routes) for (let i = 1; i < route.points.length; i++) {
      assert.ok(hasClearGroundPath(level, route.points[i-1], route.points[i], .8), `cow route ${index}/${seed}/${route.id}/${i}`);
    }
  }
});

test('target admission includes rectangular corners and requires the complete body footprint inside each edge', () => {
  for (const heading of [0, Math.PI/2, Math.PI, Math.PI*1.5, .37]) {
    const target = { x: 12, z: -7, radius: 5, heading }, shape = targetFootprint(target);
    assert.equal(shape.halfLength, 6.4);
    assert.equal(shape.halfWidth, 6.4);
    assert.equal(shape.openingWidth, 7);
    assert.ok(distance(shape.entrance, targetWorldPoint(target, -6.4, 0)) < 1e-10);
    for (const radius of [.55, .78]) for (const u of [-1, 1]) for (const v of [-1, 1]) {
      const inside = targetWorldPoint(target, u*(shape.halfLength-radius-.01), v*(shape.halfWidth-radius-.01));
      assert.ok(distance(inside,target)>target.radius, 'rectangle corners extend beyond the former admission circle');
      assert.ok(containsTarget(target, inside, radius));
      for (const [forward,lateral] of [[u*(shape.halfLength-radius+.01),0],[0,v*(shape.halfWidth-radius+.01)]]) {
        assert.equal(containsTarget(target,targetWorldPoint(target,forward,lateral),radius),false);
      }
      const local = targetLocalPoint(target, inside);
      assert.ok(Math.abs(local.forward-u*(shape.halfLength-radius-.01))<1e-10);
      assert.ok(Math.abs(local.lateral-v*(shape.halfWidth-radius-.01))<1e-10);
    }
  }
});

test('shared target corners and opening match every visible physical enclosure across target types and headings', () => {
  for (const index of [0, 1, 2, 5, 15, 99]) for (const seed of directions) {
    const level = createLevel(index, seed), target = level.target, shape = targetFootprint(target);
    const walls = level.fenceSegments.filter(segment => segment.kind === 'target');
    for (const corner of shape.corners) {
      assert.ok(walls.some(wall => distance(corner,wall.a)<.000002 || distance(corner,wall.b)<.000002));
      assert.equal(containsTarget(target,corner,.55),false,'a body cannot be admitted with its center on a wall');
    }
    for (const radius of [.55,.78]) {
      assert.ok(hasClearGroundPath(level,targetWorldPoint(target,-shape.halfLength-2,0),target,radius),'front opening permits entry');
      for (const u of [-1,1]) for (const v of [-1,1]) {
        const point = targetWorldPoint(target,u*(shape.halfLength-radius-.2),v*(shape.halfWidth-radius-.2));
        assert.ok(containsTarget(target,point,radius));
        assert.ok(canOccupy(level,point.x,point.z,radius),'admitted corner has physical wall clearance');
      }
    }
  }
});
