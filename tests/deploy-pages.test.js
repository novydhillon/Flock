import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, cpSync, existsSync, readdirSync, rmSync, symlinkSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import vm from 'node:vm';

const helper = new URL('../scripts/deploy-pages.mjs', import.meta.url);
const canonical = 'https://novydhillon.github.io/Flock/dev2/';
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
function fixture(t, { marker = true } = {}) {
  const directory = mkdtempSync(join(tmpdir(), 'flock-pages-'));
  const repo = join(directory, 'source');
  mkdirSync(repo);
  const git = (...args) => execFileSync('git', args, { cwd: repo, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  const put = (name, bytes) => { const path = join(repo, name); mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, bytes); };
  git('init');
  git('config', 'user.name', 'Fixture');
  git('config', 'user.email', 'fixture@example.invalid');
  const preserved = {
    'index.html': '<h1>Unrelated root</h1>',
    'flock/dev/index.html': 'older independent game',
    'flock/shared.bin': Buffer.from([0, 255, 41, 10]),
    'other/site.txt': 'Keep me\r\n',
  };
  if (marker) preserved['.nojekyll'] = 'existing marker bytes\r\n';
  for (const [path, content] of Object.entries(preserved)) put(path, content);
  put('flock/dev2/index.html', '<h1>Old build</h1>');
  put('flock/dev2/assets/stale.js', 'stale nested game');
  put('dev2/stale.js', 'stale canonical build');
  git('add', '.');
  git('commit', '-m', 'Pages fixture');
  git('update-ref', 'refs/remotes/origin/gh-pages', 'HEAD');
  mkdirSync(join(repo, 'scripts'));
  cpSync(helper, join(repo, 'scripts/deploy-pages.mjs'));
  symlinkSync(new URL('../node_modules', import.meta.url), join(repo, 'node_modules'), 'dir');
  git('add', 'scripts/deploy-pages.mjs');
  git('commit', '-m', 'Independent source branch commit');
  put('dist/index.html', '<script type="module" src="./assets/game.js"></script><link rel="stylesheet" href="./assets/game.css">');
  put('dist/assets/game.js', 'import "./chunk.js";');
  put('dist/assets/chunk.js', 'export const ready = true;');
  put('dist/assets/game.css', '@font-face {src:url("./font.woff2")} body {background:url(./grass.png)}');
  put('dist/assets/font.woff2', Buffer.from([1, 2, 3]));
  put('dist/assets/grass.png', Buffer.from([4, 5, 6]));
  const destination = join(directory, 'pages');
  const run = (path = destination) => spawnSync(process.execPath, [join(repo, 'scripts/deploy-pages.mjs'), path], { cwd: repo, encoding: 'utf8' });
  t.after(() => { rmSync(directory, { recursive: true, force: true }); });
  return { repo, directory, git, put, preserved, destination, run };
}

function fileHashes(directory, prefix = '') {
  const result = {};
  for (const entry of readdirSync(join(directory, prefix), { withFileTypes: true })) {
    const path = join(prefix, entry.name);
    if (entry.isDirectory()) Object.assign(result, fileHashes(directory, path));
    else result[path] = hash(readFileSync(join(directory, path)));
  }
  return result;
}

test('prepares exact canonical build and redirect on detached latest local Pages tree, preserving unrelated blobs', (t) => {
  const f = fixture(t);
  const head = f.git('rev-parse', 'HEAD');
  const pagesHead = f.git('rev-parse', 'origin/gh-pages');
  assert.notEqual(head, pagesHead);
  const result = f.run();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.git('-C', f.destination, 'rev-parse', 'HEAD'), pagesHead);
  assert.equal(spawnSync('git', ['-C', f.destination, 'symbolic-ref', '-q', 'HEAD']).status, 1);
  assert.deepEqual(fileHashes(join(f.destination, 'dev2')), fileHashes(join(f.repo, 'dist')));
  for (const [path, content] of Object.entries(f.preserved)) {
    assert.equal(hash(readFileSync(join(f.destination, path))), hash(content), path);
    assert.equal(f.git('-C', f.destination, 'rev-parse', `HEAD:${path}`), f.git('-C', f.destination, 'rev-parse', `:${path}`), path);
  }
  assert.deepEqual(readdirSync(join(f.destination, 'flock/dev2')), ['index.html']);
  const html = readFileSync(join(f.destination, 'flock/dev2/index.html'), 'utf8');
  assert.match(html, new RegExp(`href="${canonical.replaceAll('.', '\\.') }"`));
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
  assert.equal(scripts.length, 2);
  for (const [search, fragment] of [['?level=8&seed=a%20b', '#resume'], ['', ''], ['?return=%23x', '#a?b']]) {
    let redirected;
    const anchor = {};
    const context = { location: { search, hash: fragment, replace: (url) => { redirected = url; } }, document: { getElementById: (id) => { assert.equal(id, 'destination'); return anchor; } } };
    scripts.forEach((script) => vm.runInNewContext(script, context));
    assert.equal(redirected, canonical + search + fragment);
    assert.equal(anchor.href, redirected);
  }
  const changed = f.git('-C', f.destination, 'diff', '--cached', '--name-only').split('\n');
  assert.ok(changed.every((path) => path.startsWith('dev2/') || path.startsWith('flock/dev2/')));
  assert.equal(f.git('rev-parse', 'HEAD'), head, 'source HEAD unchanged');
  assert.equal(f.git('rev-parse', 'origin/gh-pages'), pagesHead, 'Pages ref unchanged');
});

test('creates missing nojekyll marker without touching root content', (t) => {
  const f = fixture(t, { marker: false });
  const result = f.run();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(readFileSync(join(f.destination, '.nojekyll'), 'utf8'), '');
  assert.match(f.git('-C', f.destination, 'diff', '--cached', '--name-only'), /^\.nojekyll$/m);
});

for (const [name, change] of [
  ['missing entry point', (f) => rmSync(join(f.repo, 'dist/index.html'))],
  ['missing script', (f) => rmSync(join(f.repo, 'dist/assets/game.js'))],
  ['missing imported chunk', (f) => rmSync(join(f.repo, 'dist/assets/chunk.js'))],
  ['missing stylesheet', (f) => rmSync(join(f.repo, 'dist/assets/game.css'))],
  ['missing dynamic import', (f) => f.put('dist/assets/game.js', 'import("./missing.js");')],
  ['missing URL asset', (f) => f.put('dist/assets/game.js', 'new URL("./missing.png", import.meta.url);')],
  ['missing font', (f) => rmSync(join(f.repo, 'dist/assets/font.woff2'))],
  ['missing image', (f) => rmSync(join(f.repo, 'dist/assets/grass.png'))],
  ['absolute asset path', (f) => f.put('dist/assets/game.css', 'body{background:url(/wrong.png)}')],
  ['escaping asset path', (f) => f.put('dist/assets/game.js', 'import "../../outside.js";')],
  ['build symlink', (f) => symlinkSync(join(f.repo, 'index.html'), join(f.repo, 'dist/assets/external.html'))],
  ['empty entry point', (f) => f.put('dist/index.html', '<h1>Not a game build</h1>')],
]) {
  test(`rejects ${name} before creating a worktree`, (t) => {
    const f = fixture(t);
    change(f);
    const result = f.run();
    assert.notEqual(result.status, 0);
    assert.equal(existsSync(f.destination), false);
  });
}

test('refuses an existing destination and leaves its bytes intact', (t) => {
  const f = fixture(t);
  mkdirSync(f.destination);
  writeFileSync(join(f.destination, 'keep.txt'), 'untouched');
  assert.notEqual(f.run().status, 0);
  assert.equal(readFileSync(join(f.destination, 'keep.txt'), 'utf8'), 'untouched');
});

test('refuses a legacy parent symlink before replacing either game directory', (t) => {
  const f = fixture(t);
  rmSync(join(f.repo, 'flock'), { recursive: true });
  symlinkSync('other', join(f.repo, 'flock'));
  f.git('add', 'flock');
  f.git('commit', '-m', 'Symlink fixture');
  f.git('update-ref', 'refs/remotes/origin/gh-pages', 'HEAD');
  const result = f.run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /regular directory/);
  assert.equal(f.git('-C', f.destination, 'status', '--porcelain'), '');
  assert.equal(readFileSync(join(f.destination, 'other/site.txt'), 'utf8'), 'Keep me\r\n');
  assert.equal(readFileSync(join(f.destination, 'dev2/stale.js'), 'utf8'), 'stale canonical build');
});


test('refuses a destination inside dist before creating a recursively copied worktree', (t) => {
  const f = fixture(t);
  const destination = join(f.repo, 'dist/pages');
  const result = f.run(destination);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /outside the build directory/);
  assert.equal(existsSync(destination), false);
});


test('JavaScript syntax validation ignores import/export words inside QA markup, strings and comments', t => {
  const f=fixture(t);
  f.put('dist/assets/chunk.js', `const panel = '<button id="qa-export">Export scenario JSON</button><button id="qa-resume">Resume</button>';
// import "./not-a-dependency.js"
/* export { fake } from "./also-not-a-dependency.js" */
export const ready = panel;`);
  const result=f.run();assert.equal(result.status,0,result.stderr);
});

test('lazy stylesheet dependencies are validated even when referenced by a Vite dependency table', t => {
  const f=fixture(t);f.put('dist/assets/qa.css', 'body {background:url(./missing-qa-image.png)}');
  const result=f.run();assert.notEqual(result.status,0);assert.match(result.stderr,/missing-qa-image/);assert.equal(existsSync(f.destination),false);
});
