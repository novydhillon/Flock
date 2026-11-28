import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, symlinkSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { deploymentPlan } from '../scripts/deploy-pages.mjs';
function fixture(t) {
  const cwd = process.cwd(),
    dir = mkdtempSync(join(tmpdir(), 'flock-deploy-'));
  t.after(() => {
    process.chdir(cwd);
    rmSync(dir, { recursive: true, force: true });
  });
  mkdirSync(join(dir, 'assets'));
  const put = (name, text) => writeFileSync(join(dir, name), text);
  put('index.html', '<script src="./assets/game.js"></script><link href="./assets/game.css" rel="stylesheet">');
  put('assets/game.js', 'import "./chunk.js";');
  put('assets/chunk.js', 'export const a=1;');
  put('assets/game.css', 'body{color:green}');
  return {
    dir,
    put,
    plan: (environment = 'dev', branch = 'feature/test') =>
      deploymentPlan({ environment, branch, sourceSha: 'a'.repeat(40), directory: dir }),
  };
}
test('dev and production plans preserve exact bytes and route to canonical destinations', (t) => {
  const f = fixture(t);
  const dev = f.plan();
  assert.equal(dev.url, 'https://novydhillon.github.io/Flock/dev/');
  assert.ok(dev.files.every((file) => file.path.startsWith('dev/') && file.sha256.length === 64));
  assert.equal(
    Buffer.from(dev.files.find((file) => file.path === 'dev/assets/chunk.js').content, 'base64').toString(),
    'export const a=1;',
  );
  const prod = f.plan('production', 'main');
  assert.equal(prod.prefix, '');
  assert.equal(prod.url, 'https://novydhillon.github.io/Flock/');
});
test('rejects wrong branch/environment combinations', (t) => {
  const f = fixture(t);
  assert.throws(() => f.plan('production'));
  assert.throws(() => f.plan('dev', 'main'));
  assert.throws(() => f.plan('other'));
});
for (const [name, mutate] of [
  ['missing dependency', (f) => f.put('assets/game.js', 'import "./missing.js";')],
  ['escaping dependency', (f) => f.put('assets/game.js', 'import "../../escape.js";')],
  ['absolute URL', (f) => f.put('assets/game.css', 'body{background:url(/wrong.png)}')],
  ['lazy CSS dependency', (f) => f.put('assets/lazy.css', 'body{background:url(./missing.png)}')],
  ['symlink', (f) => symlinkSync(join(f.dir, 'index.html'), join(f.dir, 'assets/link.html'))],
  [
    'protected tracker',
    (f) => {
      mkdirSync(join(f.dir, 'tracker'));
      f.put('tracker/index.html', 'unrelated');
    },
  ],
])
  test(`rejects ${name}`, (t) => {
    const f = fixture(t);
    try {
      mutate(f);
    } catch (error) {
      if (name === 'symlink' && ['EPERM', 'EACCES'].includes(error.code)) {
        t.skip('Host does not permit creating symlinks');
        return;
      }
      throw error;
    }
    assert.throws(() => f.plan());
  });
test('syntax validator ignores import words in strings', (t) => {
  const f = fixture(t);
  f.put('assets/game.js', 'export const a = "import missing";');
  assert.equal(f.plan().files.length, 4);
});

for (const environment of ['production', 'tracker'])
  test(`publisher preserves unrelated tree entries and refuses a changed Pages head (${environment})`, async (t) => {
    const { createRequire } = await import('node:module');
    const { cpSync, readFileSync } = await import('node:fs');
    const publish = createRequire(import.meta.url)('../scripts/publish-pages.cjs');
    const f = fixture(t),
      cwd = process.cwd(),
      oldEnv = process.env.DEPLOY_ENV;
    mkdirSync(join(f.dir, 'scripts'));
    cpSync(new URL('../scripts/check-build-mode.mjs', import.meta.url), join(f.dir, 'scripts/check-build-mode.mjs'));
    // Move the fixture distribution into its own working directory.
    const distribution = environment === 'tracker' ? 'dist-tracker' : 'dist';
    mkdirSync(join(f.dir, distribution));
    for (const name of ['index.html', 'assets'])
      cpSync(join(f.dir, name), join(f.dir, distribution, name), { recursive: true });
    process.chdir(f.dir);
    process.env.DEPLOY_ENV = environment;
    t.after(() => {
      process.chdir(cwd);
      if (oldEnv === undefined) delete process.env.DEPLOY_ENV;
      else process.env.DEPLOY_ENV = oldEnv;
    });
    let reads = 0,
      changed = false,
      updated = false,
      planned;
    const github = {
      rest: {
        git: {
          getRef: async () => ({ data: { object: { sha: ++reads > 1 && changed ? 'concurrent' : 'parent' } } }),
          getCommit: async () => ({ data: { tree: { sha: 'existing-tree' } } }),
          getTree: async () => ({
            data: {
              truncated: false,
              tree: [
                { path: 'dev', type: 'tree', sha: 'preserved' },
                { path: 'tracker', type: 'tree', sha: 'preserved' },
                { path: 'dev_performance', type: 'tree', sha: 'preserved' },
                { path: '.nojekyll', type: 'blob', sha: 'preserved' },
              ],
            },
          }),
          createBlob: async () => ({ data: { sha: 'blob' } }),
          createTree: async (args) => {
            planned = args;
            return { data: { sha: 'new-tree' } };
          },
          createCommit: async (args) => {
            assert.deepEqual(args.parents, ['parent']);
            return { data: { sha: 'new-commit' } };
          },
          updateRef: async (args) => {
            assert.equal(args.force, false);
            updated = true;
          },
        },
      },
    };
    const core = {
      setOutput() {},
      summary: {
        addHeading() {
          return this;
        },
        addRaw() {
          return this;
        },
        async write() {},
      },
    };
    const context = { ref: 'refs/heads/main', sha: 'a'.repeat(40), repo: { owner: 'fixture', repo: 'fixture' } };
    await publish({ github, context, core });
    assert.ok(updated);
    assert.equal(planned.base_tree, 'existing-tree');
    assert.ok(
      planned.tree.some((entry) => entry.path === (environment === 'tracker' ? 'tracker/index.html' : 'index.html')),
    );
    assert.ok(planned.tree.every((entry) => !['dev', 'dev_performance', 'tracker', '.nojekyll'].includes(entry.path)));
    assert.equal(JSON.parse(readFileSync('deployment.json')).pagesSha, 'new-commit');
    reads = 0;
    changed = true;
    updated = false;
    await assert.rejects(publish({ github, context, core }), /Pages changed/);
    assert.equal(updated, false);
  });

test('performance builds have their own prefix and production cannot overwrite it', (t) => {
  const f = fixture(t);
  const performance = f.plan('dev_performance');
  assert.equal(performance.url, 'https://novydhillon.github.io/Flock/dev_performance/');
  assert.ok(performance.files.every((file) => file.path.startsWith('dev_performance/')));
  assert.throws(() => f.plan('dev_performance', 'main'));
  mkdirSync(join(f.dir, 'dev_performance'));
  f.put('dev_performance/index.html', 'protected');
  assert.throws(() => f.plan('production', 'main'), /Protected output path/);
});
