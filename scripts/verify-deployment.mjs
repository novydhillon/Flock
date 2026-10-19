#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const plan = JSON.parse(readFileSync(process.argv[2] || 'deployment.json', 'utf8'));
for (const file of plan.files) {
  const relative = file.path.slice(plan.prefix.length);
  const url = new URL(relative, plan.url);
  url.searchParams.set('revision', plan.sourceSha);
  const response = await fetch(url, { signal: AbortSignal.timeout(30000), cache: 'no-store' });
  if (!response.ok) throw Error(`${file.path}: HTTP ${response.status}`);
  const hash = createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex');
  if (hash !== file.sha256) throw Error(`Live hash mismatch: ${file.path}`);
}
console.log(`Verified ${plan.files.length} live files for ${plan.sourceSha}`);
