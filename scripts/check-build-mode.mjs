#!/usr/bin/env node
// Inspect real compiled artifacts; development tooling must not ship in release.
import {readFileSync,readdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
const [mode,directory='dist']=process.argv.slice(2);
if(!['release','development'].includes(mode))throw Error('Usage: node scripts/check-build-mode.mjs release|development [build-directory]');
const root=resolve(directory),files=[];
function walk(dir){for(const entry of readdirSync(dir,{withFileTypes:true})){const path=join(dir,entry.name);if(entry.isDirectory())walk(path);else files.push(path);}}
walk(root);
const text=files.filter(p=>/\.(js|html|css)$/.test(p)).map(p=>readFileSync(p,'utf8')).join('\n');
const qaFiles=files.filter(p=>/[\\/]qa-[^\\/]+\.(?:js|css)$/.test(p));
const signatures=['qa-toggle','qa-panel','flock-qa-scenario-v1','Development QA'];
if(mode==='release'&&(qaFiles.length||signatures.some(s=>text.includes(s))))throw Error('Release artifact contains development QA code or assets.');
if(mode==='development'&&(!qaFiles.some(p=>p.endsWith('.js'))||!qaFiles.some(p=>p.endsWith('.css'))||!signatures.every(s=>text.includes(s))))throw Error('Development artifact is missing QA code or assets.');
console.log(`Verified ${mode} artifact: ${files.length} files; ${qaFiles.length} QA assets.`);
