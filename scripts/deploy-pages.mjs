#!/usr/bin/env node
// Pure deployment planning: no Git, credentials, network, or filesystem mutation.
import { readdirSync, readFileSync, lstatSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { validateBuild } from './validate-build.mjs';
export function deploymentPlan({ environment, branch, sourceSha, directory = 'dist' }) {
  if (!['dev', 'production'].includes(environment)) throw Error('Unknown environment');
  if (!branch || (environment === 'production') !== (branch === 'main')) throw Error('Only main may deploy production; all other branches deploy dev');
  if (!/^[a-f0-9]{40}$/.test(sourceSha)) throw Error('An immutable source SHA is required');
  const root = resolve(directory);
  validateBuild(root);
  const prefix = environment === 'dev' ? 'dev/' : '';
  const files = [];
  function walk(path, relative = '') {
    for (const name of readdirSync(path).sort()) {
      const file = join(path, name), key = relative + name, stat = lstatSync(file);
      if (stat.isDirectory()) walk(file, key + '/');
      else {
        if (['dev', 'dev2', 'flock', 'tracker', '.nojekyll', '.flock-deployment.json'].includes(key.split('/')[0])) throw Error(`Protected output path: ${key}`);
        const bytes = readFileSync(file);
        files.push({ path: prefix + key, content: bytes.toString('base64'), sha256: createHash('sha256').update(bytes).digest('hex') });
      }
    }
  }
  walk(root);
  return { environment, branch, sourceSha, prefix, url: 'https://novydhillon.github.io/Flock/' + prefix, files };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.error('Use the Deploy Flock Actions workflow; this module only exports deploymentPlan.');
  process.exitCode = 1;
}
