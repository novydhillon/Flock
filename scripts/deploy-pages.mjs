#!/usr/bin/env node
// Prepare a reviewable Pages change. This script never commits or pushes.
import { existsSync, mkdirSync, rmSync, cpSync, writeFileSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const argument = process.argv[2];
if (!argument || process.argv.length !== 3) {
  console.error('Usage: node scripts/deploy-pages.mjs /absolute/path/to/new-pages-worktree');
  process.exit(1);
}
const destination = resolve(argument);
const build = join(root, 'dist');
if (!existsSync(join(build, 'index.html'))) {
  console.error('Build output is missing: run npm run build first.');
  process.exit(1);
}
if (existsSync(destination)) {
  console.error('Destination already exists; choose a new worktree path.');
  process.exit(1);
}
const git = (args, cwd = root) => execFileSync('git', args, { cwd, stdio: 'inherit' });
// Use the locally fetched gh-pages reference; fetching is a separate explicit step.
git(['rev-parse', '--verify', 'origin/gh-pages']);
mkdirSync(dirname(destination), { recursive: true });
git(['worktree', 'add', '--detach', destination, 'origin/gh-pages']);
const target = join(destination, 'flock', 'dev2');
rmSync(target, { recursive: true, force: true });
mkdirSync(dirname(target), { recursive: true });
cpSync(build, target, { recursive: true });
writeFileSync(join(destination, '.nojekyll'), '');
git(['add', '--', 'flock/dev2', '.nojekyll'], destination);
git(['diff', '--cached', '--stat'], destination);
console.log(`Prepared ${destination}. Review the staged changes before publishing.`);
