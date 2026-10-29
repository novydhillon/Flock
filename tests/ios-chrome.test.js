import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

test('installed app requests an opaque status bar with consistent flat launch chrome', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const document = new JSDOM(html).window.document;
  const manifest = JSON.parse(readFileSync(new URL('../public/site.webmanifest', import.meta.url), 'utf8'));
  const meta = name => {
    const matches = document.querySelectorAll(`meta[name="${name}"]`);
    assert.equal(matches.length, 1, `${name} must have one unambiguous value`);
    return matches[0].content;
  };

  assert.equal(meta('apple-mobile-web-app-capable'), 'yes');
  assert.equal(meta('apple-mobile-web-app-status-bar-style'), 'default');
  assert.equal(meta('theme-color'), manifest.theme_color);
  assert.equal(manifest.theme_color, manifest.background_color);
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.scope, './');
  assert.equal(manifest.start_url, './');
  assert.match(meta('viewport'), /viewport-fit=cover/);
  const css = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8');
  assert.match(css, /env\(safe-area-inset-top\)/);
  assert.match(css, /env\(safe-area-inset-bottom\)/);
});
