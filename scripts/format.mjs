#!/usr/bin/env node
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
const [mode = '--check', scope = 'all'] = process.argv.slice(2);
if (!['--write', '--check'].includes(mode) || !['game', 'tracker', 'all'].includes(scope) || process.argv.length > 4) {
  throw Error('Usage: node scripts/format.mjs [--write|--check] [game|tracker|all]');
}
const files = scope === 'tracker' ? [] : ['vite.config.js'];
function collect(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) collect(path);
    else if (/\.(?:js|mjs|cjs)$/.test(path)) {
      if (directory === 'tests' && scope !== 'all' && entry.name.startsWith('tracker-') !== (scope === 'tracker'))
        continue;
      files.push(path);
    }
  }
}
for (const directory of [
  'scripts',
  'tests',
  ...(scope === 'tracker' ? ['tracker'] : scope === 'game' ? ['src'] : ['src', 'tracker']),
])
  collect(directory);
execFileSync(process.execPath, [resolve('node_modules/prettier/bin/prettier.cjs'), mode, ...files.sort()], {
  stdio: 'inherit',
});
