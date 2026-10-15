#!/usr/bin/env node
// Prepare a reviewable Pages change. This script never fetches, commits or pushes.
import { existsSync, mkdirSync, rmSync, cpSync, writeFileSync, readFileSync, readdirSync, lstatSync } from 'node:fs';
import { resolve, join, dirname, relative, extname, isAbsolute, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const canonical = 'https://novydhillon.github.io/Flock/dev2/';
const git = (args, cwd = root) => execFileSync('git', args, { cwd, stdio: 'inherit' });

// Check the entry point and the local dependency graph before changing a Pages tree.
// Vite emits HTML src/href attributes, CSS url()/@import, and JS module imports.
function validateBuild(build) {
  const files = new Set();
  function walk(directory) {
    for (const entry of readdirSync(directory)) {
      const path = join(directory, entry);
      const stat = lstatSync(path);
      if (stat.isSymbolicLink()) throw new Error(`Build contains a symlink: ${path}`);
      if (stat.isDirectory()) walk(path);
      else if (stat.isFile()) files.add(path);
      else throw new Error(`Unsupported build entry: ${path}`);
    }
  }
  if (!existsSync(join(build, 'index.html'))) throw new Error('Build output is missing: run npm run build first.');
  walk(build);
  const visited = new Set();
  let scripts = 0;
  let styles = 0;
  function visit(path) {
    if (visited.has(path)) return;
    visited.add(path);
    const extension = extname(path);
    if (!['.html', '.css', '.js', '.mjs'].includes(extension)) return;
    const content = readFileSync(path, 'utf8');
    const references = [];
    const collect = (regex) => { for (const match of content.matchAll(regex)) references.push(match[1]); };
    if (extension === '.html') collect(/\b(?:src|href)\s*=\s*["']([^"']+)["']/gi);
    if (extension === '.css') {
      collect(/url\(\s*["']?([^"')\s]+)["']?\s*\)/gi);
      collect(/@import\s+["']([^"']+)["']/gi);
    }
    if (extension === '.js' || extension === '.mjs') {
      collect(/\b(?:import|export)\s*(?:[^;"']*?\sfrom\s*)?["']([^"']+)["']/g);
      collect(/\bimport\s*\(\s*["']([^"']+)["']\s*\)/g);
      collect(/new\s+URL\(\s*["']([^"']+)["']\s*,\s*import\.meta\.url\s*\)/g);
    }
    for (const reference of references) {
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(reference)) continue;
      const pathname = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
      if (!pathname) continue;
      if (pathname.startsWith('/')) throw new Error(`Build asset must be relative: ${reference}`);
      const asset = resolve(dirname(path), pathname);
      const local = relative(build, asset);
      if (isAbsolute(local) || local === '..' || local.startsWith(`..${sep}`) || !files.has(asset)) {
        throw new Error(`Missing or unsafe build asset: ${reference} (from ${relative(build, path)})`);
      }
      if (path === join(build, 'index.html')) {
        if (['.js', '.mjs'].includes(extname(asset))) scripts++;
        if (extname(asset) === '.css') styles++;
      }
      visit(asset);
    }
  }
  visit(join(build, 'index.html'));
  if (!scripts || !styles) throw new Error('Build entry must reference local JavaScript and CSS assets.');
}

try {
  const argument = process.argv[2];
  if (!argument || process.argv.length !== 3 || !isAbsolute(argument)) {
    throw new Error('Usage: node scripts/deploy-pages.mjs /absolute/path/to/new-pages-worktree');
  }
  const destination = resolve(argument);
  const build = join(root, 'dist');
  const buildDestination = relative(build, destination);
  if (!isAbsolute(buildDestination) && buildDestination !== '..' && !buildDestination.startsWith(`..${sep}`)) {
    throw new Error('Destination must be outside the build directory.');
  }
  validateBuild(build);
  if (existsSync(destination)) throw new Error('Destination already exists; choose a new worktree path.');
  // Use the locally fetched gh-pages reference; fetching is a separate explicit step.
  git(['rev-parse', '--verify', 'origin/gh-pages']);
  mkdirSync(dirname(destination), { recursive: true });
  git(['worktree', 'add', '--detach', destination, 'origin/gh-pages']);
  // Never follow a legacy Pages symlink into unrelated content.
  const legacyParent = join(destination, 'flock');
  if (existsSync(legacyParent) && (lstatSync(legacyParent).isSymbolicLink() || !lstatSync(legacyParent).isDirectory())) {
    throw new Error('Pages flock path must be a regular directory; review this tree manually.');
  }
  const target = join(destination, 'dev2');
  const legacy = join(legacyParent, 'dev2');
  rmSync(target, { recursive: true, force: true });
  cpSync(build, target, { recursive: true });
  rmSync(legacy, { recursive: true, force: true });
  mkdirSync(legacy, { recursive: true });
  writeFileSync(join(legacy, 'index.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Flock has moved</title>
<link rel="canonical" href="${canonical}">
<script>location.replace(${JSON.stringify(canonical)} + location.search + location.hash);</script>
</head>
<body><p>Flock has moved to <a id="destination" href="${canonical}">its new home</a>.</p>
<script>document.getElementById('destination').href = ${JSON.stringify(canonical)} + location.search + location.hash;</script>
</body>
</html>
`);
  // Existing bytes (including a nonempty marker) belong to the Pages root.
  const nojekyll = join(destination, '.nojekyll');
  const paths = ['dev2', 'flock/dev2'];
  if (!existsSync(nojekyll)) {
    writeFileSync(nojekyll, '');
    paths.push('.nojekyll');
  }
  git(['add', '--', ...paths], destination);
  git(['diff', '--cached', '--stat'], destination);
  console.log(`Prepared ${destination} for ${canonical}. Review the staged changes before publishing.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
