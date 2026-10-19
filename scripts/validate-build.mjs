import { existsSync, readdirSync, lstatSync, readFileSync } from 'node:fs';
import { join, resolve, dirname, relative, extname, isAbsolute, sep } from 'node:path';
import { parseAst } from 'rollup/parseAst';
export function validateBuild(build) {
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
      // Inspect syntax, never prose/HTML strings containing words such as
      // "Export scenario". The QA bundle contains those labels legitimately.
      const walkSyntax = node => {
        if (!node || typeof node !== 'object') return;
        if (['ImportDeclaration', 'ExportNamedDeclaration', 'ExportAllDeclaration', 'ImportExpression'].includes(node.type) && typeof node.source?.value === 'string') references.push(node.source.value);
        if (node.type === 'NewExpression' && node.callee?.type === 'Identifier' && node.callee.name === 'URL' && typeof node.arguments[0]?.value === 'string') {
          const base = node.arguments[1];
          if (base?.type === 'MemberExpression' && base.object?.type === 'MetaProperty' && base.object.meta?.name === 'import' && base.object.property?.name === 'meta' && base.property?.name === 'url') references.push(node.arguments[0].value);
        }
        for (const value of Object.values(node)) if (Array.isArray(value)) value.forEach(walkSyntax); else if (value && typeof value === 'object') walkSyntax(value);
      };
      walkSyntax(parseAst(content));
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
  // Vite may preload a lazy stylesheet through a generated dependency table.
  for (const file of files) if (extname(file) === '.css') visit(file);
  if (!scripts || !styles) throw new Error('Build entry must reference local JavaScript and CSS assets.');
}

