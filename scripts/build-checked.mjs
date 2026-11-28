#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deploymentTarget } from './deployment-targets.cjs';
import { npmCommand } from './npm-command.mjs';

export function checkedGameBuild(environment, execute = execFileSync, npmCLI = process.env.npm_execpath) {
  const target = deploymentTarget(environment);
  if (target.application !== 'game') throw Error('Use build:checked:tracker for tracker');
  const run = (...args) => {
    const npm = npmCommand(args, npmCLI);
    execute(npm.command, npm.args, { stdio: 'inherit' });
  };
  run('run', 'format:check', '--', 'game');
  run('run', 'docs:check');
  run('run', 'test:game');
  run('run', 'build');
  execute(process.execPath, ['scripts/check-build-mode.mjs', 'release'], { stdio: 'inherit' });
  if (target.mode === 'development') {
    run('run', 'build:dev');
    execute(process.execPath, ['scripts/check-build-mode.mjs', 'development'], { stdio: 'inherit' });
  }
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.length !== 3) throw Error('Usage: node scripts/build-checked.mjs dev|dev_performance|production');
  checkedGameBuild(process.argv[2]);
}
