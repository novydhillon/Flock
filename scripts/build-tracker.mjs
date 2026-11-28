#!/usr/bin/env node
import { build } from 'vite';
import { resolve } from 'node:path';
import { validateBuild } from './validate-build.mjs';

// The tracker has its own root, dependencies and output. Never touches dist/.
await build({
  configFile: false,
  root: resolve('tracker'),
  publicDir: false,
  base: './',
  build: { outDir: resolve('dist-tracker'), emptyOutDir: true },
});
validateBuild(resolve('dist-tracker'));
