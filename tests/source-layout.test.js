import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseAst } from 'rollup/parseAst';
import { JSDOM } from 'jsdom';
import { execFileSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const sourceRoot = path.join(root, 'src');

function filesUnder(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(filename) : [filename];
  });
}

function visit(node, callback) {
  if (!node || typeof node !== 'object') return;
  if (typeof node.type === 'string') callback(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach((child) => visit(child, callback));
    else if (value && typeof value === 'object') visit(value, callback);
  }
}

function literalString(node) {
  if (node?.type === 'Literal' && typeof node.value === 'string') return node.value;
  if (node?.type === 'TemplateLiteral' && node.expressions.length === 0) {
    return node.quasis[0].value.cooked;
  }
  return null;
}

function isImportMetaUrl(node) {
  return (
    node?.type === 'MemberExpression' &&
    !node.computed &&
    node.property.name === 'url' &&
    node.object.type === 'MetaProperty' &&
    node.object.meta.name === 'import' &&
    node.object.property.name === 'meta'
  );
}

function assertLocalFile(importer, specifier, allowBare = false) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(specifier)) return;
  if (!allowBare && !specifier.startsWith('.') && !specifier.startsWith('/')) return;
  const pathname = decodeURIComponent(specifier.split(/[?#]/, 1)[0]);
  if (!pathname) return;
  const candidates = pathname.startsWith('/')
    ? [path.join(root, pathname.slice(1)), path.join(root, 'public', pathname.slice(1))]
    : [path.resolve(path.dirname(importer), pathname)];
  assert.ok(
    candidates.some((filename) => existsSync(filename) && statSync(filename).isFile()),
    `${path.relative(root, importer)} references missing local file ${specifier}`,
  );
}

test('source and development-tool modules parse and their local static dependencies exist', () => {
  const modules = [...filesUnder(sourceRoot), ...filesUnder(path.join(root, 'scripts'))].filter((filename) =>
    /\.[cm]?js$/.test(filename),
  );
  assert.ok(modules.length > 0, 'the source tree contains JavaScript modules');
  for (const filename of modules) {
    const ast = parseAst(readFileSync(filename, 'utf8'));
    visit(ast, (node) => {
      if (
        ['ImportDeclaration', 'ExportNamedDeclaration', 'ExportAllDeclaration', 'ImportExpression'].includes(node.type)
      ) {
        const specifier = literalString(node.source);
        if (specifier !== null) assertLocalFile(filename, specifier);
      }
      if (
        node.type === 'NewExpression' &&
        node.callee.type === 'Identifier' &&
        node.callee.name === 'URL' &&
        isImportMetaUrl(node.arguments[1])
      ) {
        const specifier = literalString(node.arguments[0]);
        if (specifier !== null) assertLocalFile(filename, specifier, true);
      }
    });
  }
});

test('chokepoint measurement starts from the organized source and completes a seeded meadow', () => {
  const output = execFileSync(process.execPath, ['scripts/measure-chokepoints.mjs', '1', 'default'], {
    cwd: root,
    encoding: 'utf8',
    timeout: 30000,
  });
  const measurement = JSON.parse(output.trim());
  assert.equal(measurement.publicLevel, 1);
  assert.equal(measurement.completed, true);
  assert.equal(measurement.saved, measurement.animals);
});

test('the HTML module entry exists inside app and source modules live in folders', () => {
  const document = new JSDOM(readFileSync(path.join(root, 'index.html'), 'utf8')).window.document;
  const entries = [...document.querySelectorAll('script[type="module"][src]')];
  assert.ok(entries.length > 0, 'index.html has a module entry');
  for (const entry of entries) {
    const specifier = entry.getAttribute('src');
    assert.match(specifier, /^(?:\.\/|\/)src\/app\/.+\.[cm]?js(?:[?#].*)?$/);
    assertLocalFile(path.join(root, 'index.html'), specifier);
  }
  const looseModules = readdirSync(sourceRoot).filter((name) => /\.[cm]?js$/.test(name));
  assert.deepEqual(looseModules, [], 'src has no loose top-level JavaScript modules');
});

test('source stylesheets retain existing local URL and import dependencies', () => {
  const stylesheets = filesUnder(sourceRoot).filter((filename) => filename.endsWith('.css'));
  for (const filename of stylesheets) {
    const css = readFileSync(filename, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    for (const match of css.matchAll(/url\(\s*(?:"([^\"]*)"|'([^']*)'|([^\s)]*))\s*\)/gi)) {
      assertLocalFile(filename, match[1] ?? match[2] ?? match[3], true);
    }
    for (const match of css.matchAll(/@import\s+(?:"([^\"]*)"|'([^']*)')/gi)) {
      assertLocalFile(filename, match[1] ?? match[2], true);
    }
  }
});
