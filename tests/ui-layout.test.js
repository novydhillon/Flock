import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const document = new JSDOM(readFileSync(new URL('../index.html', import.meta.url), 'utf8')).window.document;

test('real HUD markup keeps unique controller hooks and distinct readable mission metrics', () => {
  for (const id of ['level-name', 'objective', 'weather-status', 'saved', 'total', 'mission-score', 'countdown', 'progress', 'stick', 'bark', 'pause', 'toggle-tip']) {
    assert.equal(document.querySelectorAll(`[id="${id}"]`).length, 1, `${id} must have one controller target`);
  }
  const delivered = document.querySelector('.delivered-stat');
  const score = document.querySelector('.score-stat');
  assert.equal(delivered.querySelector('.stat-label').textContent, 'Delivered');
  assert.ok(delivered.contains(document.getElementById('saved')));
  assert.ok(delivered.contains(document.getElementById('total')));
  assert.equal(score.querySelector('.stat-label').textContent, 'Score');
  assert.ok(score.contains(document.getElementById('mission-score')));
  assert.ok(!score.contains(document.getElementById('countdown')));
  assert.ok(document.getElementById('countdown').classList.contains('hidden'));
  assert.equal(document.getElementById('countdown').getAttribute('role'), 'timer');
});

test('HUD controls retain accessible names and tip dismissal while decorative instructions are removed', () => {
  for (const id of ['bark', 'pause', 'toggle-tip', 'dismiss-tip']) {
    assert.ok(document.getElementById(id).getAttribute('aria-label'), `${id} needs an accessible name`);
  }
  assert.equal(document.getElementById('weather-status').getAttribute('role'), 'img');
  assert.ok(document.getElementById('weather-status').getAttribute('aria-label'));
  assert.ok(document.querySelector('#tip .tip-number'), 'tip sequencing hook remains available');
  assert.ok(!document.getElementById('controls').textContent.includes('DRAG TO ROAM'));
  assert.ok(!document.getElementById('bark').textContent.includes('double tap'));
});
