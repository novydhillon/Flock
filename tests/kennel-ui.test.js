import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { defaultProfile } from '../src/progression/profile.js';
import { buyKennelSlot } from '../src/progression/kennel.js';
import { mountKennel } from '../src/ui/kennel-ui.js';

function kennelFixture(profile = defaultProfile()) {
  const { window } = new JSDOM('<main></main>');
  const root = window.document.querySelector('main');
  const changes = [];
  const previews = [];
  mountKennel(root, {
    profile,
    onChange: (changed) => changes.push(structuredClone(changed)),
    mountPreview: (stage, options) => ({
      show: (dogs) => previews.push({ stage, options, dogs }),
      dispose() {},
    }),
  });
  return { window, root, changes, previews };
}

test('kennel defaults to Pip and keyboard browsing exposes unavailable dogs without changing the profile', () => {
  const { root, window, changes, previews } = kennelFixture();
  const cards = Array.from(root.querySelectorAll('[data-kennel-catalog]'));
  assert.equal(cards.length, 10);
  assert.equal(previews.at(-1).dogs[0].id, 'pip');
  assert.equal(previews.at(-1).options.solo, true);
  assert.equal(cards[0].textContent, 'Pip1 owned');
  assert.equal(cards[0].getAttribute('aria-pressed'), 'true');
  assert.equal(cards.at(-1).classList.contains('kennel-unavailable'), true);
  cards[0].focus();
  cards[0].dispatchEvent(new window.KeyboardEvent('keydown', { key: 'End', bubbles: true }));
  assert.equal(root.ownerDocument.activeElement, cards.at(-1));
  assert.deepEqual(previews.at(-1).dogs, [{ id: 'dog-10', model: 'buddy', coat: 'black-auburn-white' }]);
  assert.equal(cards.at(-1).getAttribute('aria-pressed'), 'true');
  assert.match(
    root.querySelector('.kennel-adoption-state').textContent,
    /second position at meadow entry and reach meadow 60/,
  );
  assert.equal(root.querySelector('form button').disabled, true);
  assert.deepEqual(changes, []);
});

test('Buddy explains the meadow entry grant and has no position or standalone purchase controls', () => {
  const profile = { ...defaultProfile(), highestLevel: 19, points: 600 };
  const { root, changes } = kennelFixture(profile);
  root.querySelector('[data-kennel-catalog="buddy"]').click();
  assert.match(
    root.querySelector('.kennel-adoption-state').textContent,
    /Buddy joins.*second position at meadow entry.*meadow 20/,
  );
  assert.equal(root.querySelector('form').hidden, true);
  assert.equal(root.querySelector('.kennel-training').hidden, true);
  assert.equal(root.querySelector('[data-kennel-buy-slot], [data-kennel-assign-slot], [data-kennel-apply-slot]'), null);
  assert.deepEqual(changes, []);
});

test('adopted copies retain separate names, coats and training and announce purchases', () => {
  const profile = { ...defaultProfile(), highestLevel: 59, points: 3000 };
  buyKennelSlot(profile, 2);
  const { root, window, changes, previews } = kennelFixture(profile);
  root.querySelector('[data-kennel-catalog="dog-3"]').click();
  const form = root.querySelector('form');
  const name = form.querySelector('input');
  const coat = form.querySelector('select');
  name.value = '<em>Fern</em>';
  coat.value = 'auburn-white';
  form.querySelector('button').click();
  name.value = '<em>Fern</em>';
  coat.value = 'blonde-white';
  form.querySelector('button').click();
  assert.equal(profile.points, 1200);
  assert.equal(root.querySelector('.kennel-owned em'), null);
  const [first, second] = profile.kennel.dogs.filter((dog) => dog.catalogId === 'dog-3');
  const picker = root.querySelector('.kennel-owned');
  assert.deepEqual(
    [...picker.options].map((option) => option.textContent),
    ['<em>Fern</em> (dog 1)', '<em>Fern</em> (dog 2)'],
  );
  assert.equal(picker.value, second.id);
  picker.value = first.id;
  picker.dispatchEvent(new window.Event('change'));
  assert.match(root.querySelector('.kennel-owned-coat').textContent, /Auburn and white/);
  assert.equal(root.querySelectorAll('[data-kennel-train]').length, 4);
  const purchase = root.querySelector('[data-kennel-train="influence"]');
  purchase.click();
  purchase.click();
  assert.equal(profile.points, 1080);
  assert.equal(profile.kennel.dogs.find((dog) => dog.id === first.id).training.influence, 1);
  assert.equal(profile.kennel.dogs.find((dog) => dog.id === second.id).training.influence, 0);
  assert.equal(picker.value, first.id);
  assert.equal(previews.at(-1).dogs[0].coat, 'auburn-white');
  coat.focus();
  assert.equal(previews.at(-1).dogs[0].coat, 'blonde-white');
  assert.match(root.querySelector('[role="status"]').textContent, /Fern.*tier 1/i);
  assert.deepEqual(changes.at(-1), profile);
  assert.equal(changes.length, 3);
});

test('training shows the next gate, bolt shortfall and maximum tier', () => {
  const inspect = (profile) => kennelFixture(profile).root.querySelector('[data-kennel-train="influence"]');
  const gated = inspect(defaultProfile());
  assert.equal(gated.disabled, true);
  assert.match(gated.parentElement.textContent, /Reach meadow 7/);
  const profile = { ...defaultProfile(), highestLevel: 19, points: 119 };
  const unaffordable = inspect(profile);
  assert.equal(unaffordable.disabled, true);
  assert.match(unaffordable.parentElement.textContent, /Need 1 more bolt/);
  profile.kennel.dogs[0].training.influence = 3;
  const maxed = inspect(profile);
  assert.equal(maxed.disabled, true);
  assert.match(maxed.textContent, /Maximum tier/);
});
