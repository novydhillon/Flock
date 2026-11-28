// Run at repository root: node scripts/generate-pip-icons.mjs
// Requires Inkscape and Python 3 with Pillow for deterministic PNG exports.
import { JSDOM } from 'jsdom';
import * as THREE from 'three';
import { SVGRenderer } from 'three/addons/renderers/SVGRenderer.js';
import { createPip } from '../src/rendering/models.js';
import { mkdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const dom = new JSDOM('<!doctype html><html><body></body></html>');
globalThis.document = dom.window.document;
// SVGRenderer does not sample textures. Supply only the canvas API required by
// model construction; geometry and material colours still come from createPip.
dom.window.HTMLCanvasElement.prototype.getContext = function () {
  return {
    createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }),
    putImageData() {},
    fillRect() {},
    beginPath() {},
    moveTo() {},
    lineTo() {},
    stroke() {},
    arc() {},
    fill() {},
  };
};
const scene = new THREE.Scene();
scene.add(new THREE.AmbientLight(0xffffff, 0.65));
const key = new THREE.DirectionalLight(0xfff4e6, 0.85);
key.position.set(-3, 5, 5);
scene.add(key);
const fill = new THREE.DirectionalLight(0xa6e6ff, 0.25);
fill.position.set(4, 2, 1);
scene.add(fill);
const pip = createPip();
// Frame the articulated head itself so changes in body proportions do not shift the crop.
const head = pip.userData.parts.head;
scene.attach(head);
// SVGRenderer uses the first vertex colour for an entire face. Average the three
// samples to keep the collie's blaze and ear markings continuous in the portrait.
head.traverse((mesh) => {
  if (!mesh.isMesh || !mesh.geometry.attributes.color) return;
  if (mesh.geometry.index) mesh.geometry = mesh.geometry.toNonIndexed();
  const colors = mesh.geometry.attributes.color;
  for (let i = 0; i < colors.count; i += 3) {
    const r = (colors.getX(i) + colors.getX(i + 1) + colors.getX(i + 2)) / 3;
    const g = (colors.getY(i) + colors.getY(i + 1) + colors.getY(i + 2)) / 3;
    const b = (colors.getZ(i) + colors.getZ(i + 1) + colors.getZ(i + 2)) / 3;
    colors.setXYZ(i, r, g, b);
  }
});
const bounds = new THREE.Box3().setFromObject(head);
const center = bounds.getCenter(new THREE.Vector3());
const extent = bounds.getSize(new THREE.Vector3());
const half = Math.max(extent.x, extent.y, extent.z) * 0.59;
const camera = new THREE.OrthographicCamera(-half, half, half, -half, 0.01, 20);
camera.position.copy(center).add(new THREE.Vector3(0.24, 0.12, 1).normalize().multiplyScalar(half * 4));
camera.lookAt(center);
const renderer = new SVGRenderer();
renderer.setSize(512, 512);
renderer.setPrecision(2);
renderer.render(scene, camera);
const svg = renderer.domElement;
svg.removeAttribute('style');
svg.setAttribute('role', 'img');
svg.setAttribute('aria-label', 'Pip the border collie');
const backdrop = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
for (const [key, value] of Object.entries({ x: -256, y: -256, width: 512, height: 512, fill: '#779c4d' }))
  backdrop.setAttribute(key, String(value));
svg.prepend(backdrop);
mkdirSync('public/icons', { recursive: true });
writeFileSync('public/icons/pip.svg', svg.outerHTML + '\n');

execFileSync(
  'inkscape',
  ['public/icons/pip.svg', '--export-type=png', '--export-filename=public/icons/pip-512.png', '--export-width=512'],
  { stdio: 'pipe' },
);
execFileSync(
  'python3',
  [
    '-c',
    `
from PIL import Image
im=Image.open('public/icons/pip-512.png').convert('RGBA')
for size in [16,32,48,96,120,152,167,180,192,512]:
    im.resize((size,size),Image.Resampling.LANCZOS).save(f'public/icons/pip-{size}.png')
`,
  ],
  { stdio: 'inherit' },
);
