import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { mountDogPreview } from '../src/rendering/dog-preview.js';

const pip = { id: 'pip', model: 'pip', coat: 'black-white' };
const fern = { id: 'fern', model: 'pip', coat: 'auburn-white' };
const buddy = { id: 'buddy', model: 'buddy', coat: 'buddy-original' };

function fixture(solo) {
  const { window } = new JSDOM('<main></main>', { pretendToBeVisual: true });
  const stage = window.document.querySelector('main');
  Object.defineProperties(stage, { clientWidth: { value: 360 }, clientHeight: { value: 160 } });
  const preference = { matches: false };
  window.WebGL2RenderingContext = true;
  window.matchMedia = () => preference;
  let nextFrame;
  let now = 0;
  window.requestAnimationFrame = (callback) => {
    nextFrame = callback;
    return 1;
  };
  window.cancelAnimationFrame = () => (nextFrame = undefined);
  let dogs;
  let disposalCount = 0;
  const preview = mountDogPreview(stage, {
    solo,
    createRenderer: () => ({
      setPixelRatio() {},
      setSize() {},
      render(scene) {
        dogs = scene.children.filter((child) => child.userData.motion);
      },
      dispose() {
        disposalCount++;
      },
      forceContextLoss() {},
    }),
  });
  return {
    stage,
    preference,
    preview,
    get dogs() {
      return dogs;
    },
    get active() {
      return Boolean(nextFrame);
    },
    get disposalCount() {
      return disposalCount;
    },
    tick(frames = 1) {
      for (let i = 0; i < frames; i++) nextFrame((now += 34));
    },
  };
}

test('solo preview runs the old dog off right and brings the latest selection in from the left', () => {
  const stage = fixture(true);
  stage.preview.show([pip]);
  stage.tick();
  const first = stage.dogs[0];
  stage.preview.show([fern]);
  stage.tick(4);
  assert.ok(first.position.x > 0);
  assert.ok(first.userData.motion.speed > 0);
  stage.preview.show([buddy]);
  stage.tick(22);
  assert.equal(stage.dogs.length, 1);
  assert.ok(stage.dogs[0].userData.motion.puppy);
  assert.ok(stage.dogs[0].position.x < 0);
  stage.preference.matches = true;
  stage.tick();
  assert.ok(Math.abs(stage.dogs[0].rotation.y) <= Math.PI / 6);
  assert.equal(stage.dogs[0].position.x, 0);
  stage.preview.dispose();
  assert.equal(stage.active, false);
});

test('crew preview keeps independent rigs, and WebGL loss cleans up and restores portrait fallback', () => {
  const stage = fixture(false);
  stage.preview.show([pip, fern, buddy]);
  stage.tick();
  const [first, second, third] = stage.dogs;
  assert.equal(stage.dogs.length, 3);
  assert.ok(first.position.x < second.position.x && second.position.x < third.position.x);
  assert.ok(third.scale.x < first.scale.x);
  stage.tick(10);
  assert.ok(first.userData.motion.time > 0);
  stage.preference.matches = true;
  stage.tick();
  assert.equal(first.userData.motion.time, 0);
  const event = new stage.stage.ownerDocument.defaultView.Event('webglcontextlost');
  stage.stage.querySelector('canvas').dispatchEvent(event);
  assert.equal(stage.stage.classList.contains('dog-preview-active'), false);
  assert.equal(stage.active, false);
  stage.preview.show([pip]);
  stage.preview.dispose();
  assert.equal(stage.disposalCount, 1);
});
