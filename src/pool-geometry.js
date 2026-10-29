import * as THREE from 'three';

const SEGMENTS = 32, RINGS = 8, GROWTH_STEPS = 128;

/** A shallow horizontal pool, cut against bare ground rather than tilted or
 * scaled over it. Fixed buffers and quantized area growth bound rain updates. */
export class HorizontalPoolGeometry extends THREE.BufferGeometry {
  constructor({ x, z, radius, height, groundHeight }) {
    super();
    this.site = { x, z, radius, height };
    this.groundHeight = groundHeight;
    this.growth = -1;
    this.samples = new Float64Array((1 + SEGMENTS * RINGS) * 3);
    this.triangles = [];
    for (let ring = 0; ring < RINGS; ring++) for (let sector = 0; sector < SEGMENTS; sector++) {
      const next = (sector + 1) % SEGMENTS;
      const outer = 1 + ring * SEGMENTS, inner = outer - SEGMENTS;
      if (!ring) this.triangles.push(0, outer + sector, outer + next);
      else this.triangles.push(inner + sector, outer + sector, outer + next,
        inner + sector, outer + next, inner + next);
    }
    // One clipped triangle has at most four corners, hence two output triangles.
    const positions = new Float32Array(this.triangles.length * 6);
    this.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    this.corners = Array.from({ length: 4 }, () => ({ x: 0, z: 0 }));
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius);
    this.setDrawRange(0, 0);
  }

  setGrowth(fraction) {
    const growth = Math.floor(Math.max(0, Math.min(1, fraction)) * GROWTH_STEPS) / GROWTH_STEPS;
    if (growth === this.growth) return;
    this.growth = growth;
    if (!growth) { this.setDrawRange(0, 0); return; }
    const { x, z, radius, height } = this.site, samples = this.samples;
    const size = radius * Math.sqrt(growth);
    const sample = (index, px, pz) => {
      samples[index * 3] = px; samples[index * 3 + 1] = pz;
      samples[index * 3 + 2] = this.groundHeight(x + px, z + pz) - height;
    };
    sample(0, 0, 0);
    for (let ring = 1; ring <= RINGS; ring++) for (let sector = 0; sector < SEGMENTS; sector++) {
      const angle = sector * Math.PI * 2 / SEGMENTS, distance = size * ring / RINGS;
      sample(1 + (ring - 1) * SEGMENTS + sector, Math.cos(angle) * distance, Math.sin(angle) * distance * .62);
    }
    const positions = this.attributes.position.array, corners = this.corners;
    let written = 0;
    for (let i = 0; i < this.triangles.length; i += 3) {
      let count = 0;
      for (let edge = 0; edge < 3; edge++) {
        const a = this.triangles[i + edge] * 3, b = this.triangles[i + (edge + 1) % 3] * 3;
        const wetA = samples[a + 2] <= 0, wetB = samples[b + 2] <= 0;
        if (wetA) { corners[count].x = samples[a]; corners[count++].z = samples[a + 1]; }
        if (wetA !== wetB) {
          // Retain the wet side of the root: the shoreline meets the actual
          // smooth field rather than its linear endpoint-height approximation.
          let wet = wetA ? 0 : 1, dry = 1 - wet;
          for (let iteration = 0; iteration < 12; iteration++) {
            const t = (wet + dry) / 2;
            const px = samples[a] + (samples[b] - samples[a]) * t;
            const pz = samples[a + 1] + (samples[b + 1] - samples[a + 1]) * t;
            if (this.groundHeight(x + px, z + pz) <= height) wet = t; else dry = t;
          }
          corners[count].x = samples[a] + (samples[b] - samples[a]) * wet;
          corners[count++].z = samples[a + 1] + (samples[b + 1] - samples[a + 1]) * wet;
        }
      }
      for (let corner = 1; corner + 1 < count; corner++) for (let vertex = 0; vertex < 3; vertex++) {
        const index = vertex === 0 ? 0 : vertex === 1 ? corner : corner + 1;
        positions[written++] = corners[index].x;
        positions[written++] = 0;
        positions[written++] = corners[index].z;
      }
    }
    this.setDrawRange(0, written / 3);
    this.attributes.position.needsUpdate = true;
  }

  /** Match splashes to the drawn triangles, including dry shoreline cutouts. */
  contains(x, z) {
    const positions = this.attributes.position.array;
    for (let i = 0; i < this.drawRange.count * 3; i += 9) {
      const area = (positions[i + 3] - positions[i]) * (positions[i + 8] - positions[i + 2])
        - (positions[i + 6] - positions[i]) * (positions[i + 5] - positions[i + 2]);
      if (Math.abs(area) < 1e-10) continue;
      let positive = false, negative = false;
      for (let edge = 0; edge < 3; edge++) {
        const a = i + edge * 3, b = i + (edge + 1) % 3 * 3;
        const cross = (positions[b] - positions[a]) * (z - positions[a + 2])
          - (positions[b + 2] - positions[a + 2]) * (x - positions[a]);
        positive ||= cross > 1e-8; negative ||= cross < -1e-8;
      }
      if (!(positive && negative)) return true;
    }
    return false;
  }
}
