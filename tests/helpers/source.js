import { parseAst } from 'rollup/parseAst';

// VM fixtures inject module dependencies explicitly. Use parsed ranges so
// multiline imports and module-looking strings/comments keep their meaning.
export function stripModuleSyntax(source) {
  const edits = [];
  for (const node of parseAst(source).body) {
    if (node.type === 'ImportDeclaration' || node.type === 'ExportAllDeclaration') {
      edits.push([node.start, node.end, '']);
    } else if (node.type === 'ExportNamedDeclaration') {
      edits.push([node.start, node.declaration?.start ?? node.end, '']);
    } else if (node.type === 'ExportDefaultDeclaration') {
      const declaration = node.declaration;
      if (['FunctionDeclaration', 'ClassDeclaration'].includes(declaration.type) && declaration.id) {
        edits.push([node.start, declaration.start, '']);
      } else {
        edits.push([node.start, declaration.start, 'void ('], [declaration.end, declaration.end, ')']);
      }
    }
  }
  for (const [start, end, replacement] of edits.sort((a, b) => b[0] - a[0])) {
    source = source.slice(0, start) + replacement + source.slice(end);
  }
  return source;
}
