#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
const [environment] = process.argv.slice(2);
if (process.argv.length !== 3 || !['dev', 'production'].includes(environment)) throw Error('Usage: node scripts/build-checked.mjs dev|production');
const run = (...args) => execFileSync('npm', args, { stdio: 'inherit' });
run('run', 'docs:check');
run('test');
run('run', 'build');
execFileSync(process.execPath, ['scripts/check-build-mode.mjs', 'release'], { stdio: 'inherit' });
if (environment === 'dev') {
  run('run', 'build:dev');
  execFileSync(process.execPath, ['scripts/check-build-mode.mjs', 'development'], { stdio: 'inherit' });
}
