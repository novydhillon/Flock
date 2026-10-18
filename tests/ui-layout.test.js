import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const document = new JSDOM(readFileSync(new URL('../index.html', import.meta.url), 'utf8')).window.document;

test('real HUD keeps weather beside the accessible livestock count and active countdown below', () => {
  for (const id of ['weather-status', 'saved', 'total', 'countdown', 'stick', 'bark', 'pause', 'toggle-tip']) {
    assert.equal(document.querySelectorAll(`[id="${id}"]`).length, 1, `${id} must have one controller target`);
  }
  const mission = document.getElementById('mission');
  const weather = document.getElementById('weather-status');
  const counter = mission.querySelector('.counter');
  assert.equal(weather.nextElementSibling, counter, 'weather immediately precedes the livestock count');
  assert.equal(counter.getAttribute('role'), 'group');
  assert.match(counter.getAttribute('aria-label'), /livestock.*delivered/i);
  assert.equal(counter.textContent, '0/5');
  assert.ok(counter.contains(document.getElementById('saved')));
  assert.ok(counter.contains(document.getElementById('total')));
  const countdown = document.getElementById('countdown');
  assert.equal(weather.parentElement.nextElementSibling, countdown, 'countdown follows the weather/count row');
  assert.ok(countdown.classList.contains('hidden'));
  assert.equal(countdown.getAttribute('role'), 'timer');
  for (const id of ['level-name', 'objective', 'mission-score', 'progress']) {
    assert.equal(document.getElementById(id), null, `${id} is removed`);
  }
  assert.equal(mission.querySelector('.stat-label, .score-stat, .progress'), null);
});

test('level introduction contains only the level number as its single heading', () => {
  const introduction = document.getElementById('level-introduction');
  assert.equal(introduction.children.length, 1);
  assert.equal(introduction.firstElementChild.tagName, 'H1');
  assert.equal(introduction.firstElementChild.id, 'level-number');
  assert.equal(introduction.textContent, 'Level 1');
  assert.equal(document.querySelectorAll('#level-number').length, 1);
  assert.equal(introduction.getAttribute('aria-live'), 'polite');
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
