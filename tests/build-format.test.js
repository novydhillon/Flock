import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';
import { build } from 'vite';
import viteConfig from '../vite.config.js';

for (const mode of ['qa', 'development', 'production', 'release', undefined]) {
  const readable = mode === 'qa' || mode === 'development';
  test(`${mode ?? 'default'} build preserves its readability and QA contract`, async (t) => {
    const config = viteConfig({ mode, command: 'build' });
    assert.equal(config.build.minify, readable ? false : 'esbuild');
    assert.equal(JSON.parse(config.define.__FLOCK_QA__), readable);

    const root = mkdtempSync(join(tmpdir(), 'flock-build-format-'));
    t.after(() => rmSync(root, { recursive: true, force: true }));
    const entry = join(root, 'entry.js');
    writeFileSync(
      entry,
      `globalThis.buildFormatProbe = (function readableCalculation(input) {
        const readableCalculationResult = input * 2;
        return { value: readableCalculationResult, qa: __FLOCK_QA__ ? 'qa-only-probe' : 'release-probe' };
      })(21);`,
    );
    const result = await build({
      ...config,
      configFile: false,
      root,
      publicDir: false,
      logLevel: 'silent',
      build: {
        ...config.build,
        write: false,
        rollupOptions: { input: entry, output: { format: 'iife' } },
      },
    });
    const code = result.output.find((output) => output.type === 'chunk' && output.isEntry).code;
    const sandbox = {};
    runInNewContext(code, sandbox);
    assert.equal(sandbox.buildFormatProbe.value, 42);
    assert.equal(sandbox.buildFormatProbe.qa, readable ? 'qa-only-probe' : 'release-probe');
    // Inspect a retained local identifier rather than line counts or whitespace:
    // development preserves it, while esbuild shortens it in the live artifact.
    assert.equal(code.includes('readableCalculationResult'), readable);
    assert.equal(code.includes('qa-only-probe'), readable);
  });
}
