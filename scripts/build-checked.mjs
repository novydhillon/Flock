#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
const [environment] = process.argv.slice(2);
if (process.argv.length !== 3 || !['dev', 'production'].includes(environment)) throw Error('Usage: node scripts/build-checked.mjs dev|production');
const npmCLI=process.env.npm_execpath;
const run = (...args) => execFileSync(npmCLI?process.execPath:'npm', npmCLI?[npmCLI,...args]:args, { stdio: 'inherit' });
run('run', 'docs:check');
run('test');
run('run', 'build');
execFileSync(process.execPath, ['scripts/check-build-mode.mjs', 'release'], { stdio: 'inherit' });
if (environment === 'dev') {
  run('run', 'build:dev');
  execFileSync(process.execPath, ['scripts/check-build-mode.mjs', 'development'], { stdio: 'inherit' });
}
