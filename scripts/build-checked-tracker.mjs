#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { npmCommand } from './npm-command.mjs';
const run = (...args) => {
  const npm = npmCommand(args);
  execFileSync(npm.command, npm.args, { stdio: 'inherit' });
};
run('run', 'format:check', '--', 'tracker');
run('run', 'test:tracker');
run('run', 'build:tracker');
