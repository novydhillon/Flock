#!/usr/bin/env node
import { readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function suiteFiles(suite, directory = 'tests') {
  if (!['game', 'tracker', 'all'].includes(suite)) throw Error('Unknown test suite');
  return readdirSync(directory)
    .filter((name) => name.endsWith('.test.js'))
    .filter((name) => suite === 'all' || (suite === 'tracker') === name.startsWith('tracker-'))
    .sort()
    .map((name) => `${directory}/${name}`);
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [suite] = process.argv.slice(2);
  const files = suiteFiles(suite);
  if (!files.length) throw Error(`No tests found for ${suite}`);
  execFileSync(process.execPath, ['--test', ...files], { stdio: 'inherit' });
}
