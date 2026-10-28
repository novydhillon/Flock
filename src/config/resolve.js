/** Resolve documented JSON settings once; runtime modules receive immutable values. */
export function resolveConfig(document, name = 'configuration', contract) {
  const fail = (path, message) => { throw new TypeError(`${path}: ${message}`); };
  const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  function checkShape(node, expected, path) {
    if (!object(node)) fail(path, 'expected a documented setting or namespace');
    if (typeof expected === 'string' || Array.isArray(expected)) {
      if (!Object.hasOwn(node, 'value')) fail(path, 'required setting is missing value');
      const checkValue = (value, shape, valuePath) => {
        if (Array.isArray(shape)) {
          if (!Array.isArray(value) || value.length !== shape.length) fail(valuePath, `expected an array of length ${shape.length}`);
          value.forEach((item, index) => checkValue(item, shape[index], `${valuePath}[${index}]`));
        } else if (shape === 'integer' ? !Number.isInteger(value) : typeof value !== shape) fail(valuePath, `expected ${shape}`);
      };
      checkValue(node.value, expected, path);
      return;
    }
    for (const key of Object.keys(expected)) {
      if (!Object.hasOwn(node, key)) fail(`${path}.${key}`, 'required setting is missing');
      checkShape(node[key], expected[key], `${path}.${key}`);
    }
    for (const key of Object.keys(node)) if (!Object.hasOwn(expected, key)) fail(`${path}.${key}`, 'unknown setting');
  }
  if (contract !== undefined) checkShape(document, contract, name);
  function setting(node, path) {
    if (!object(node)) fail(path, 'expected a setting descriptor or namespace');
    if (Object.hasOwn(node, 'value')) {
      if (typeof node._comment !== 'string' || !node._comment.trim()) fail(path, 'requires a nonempty _comment');
      for (const key of Object.keys(node)) if (!['value', '_comment', 'min', 'max'].includes(key)) fail(path, `unknown descriptor field ${key}`);
      for (const key of ['min', 'max']) if (Object.hasOwn(node, key) && !Number.isFinite(node[key])) fail(path, `${key} must be finite`);
      if (node.min !== undefined && node.max !== undefined && node.min > node.max) fail(path, 'min exceeds max');
      const bounded = node.min !== undefined || node.max !== undefined;
      const copy = (value, indexPath) => {
        if (Array.isArray(value)) return Object.freeze(value.map((item, index) => copy(item, `${indexPath}[${index}]`)));
        if (!['number', 'string', 'boolean'].includes(typeof value)) fail(indexPath, 'value must be a primitive or array of primitives');
        if (typeof value === 'number') {
          if (!Number.isFinite(value)) fail(indexPath, 'value must be finite');
          if (node.min !== undefined && value < node.min) fail(indexPath, `value is below min ${node.min}`);
          if (node.max !== undefined && value > node.max) fail(indexPath, `value exceeds max ${node.max}`);
        } else if (bounded) fail(indexPath, 'numeric bounds require numeric values');
        return value;
      };
      return copy(node.value, path);
    }
    const entries = Object.entries(node);
    if (!entries.length) fail(path, 'namespace must contain settings');
    // Metadata belongs only to leaf descriptors: a misspelled value is an error.
    if (entries.some(([key]) => key.startsWith('_') || ['min', 'max'].includes(key))) fail(path, 'descriptor is missing value');
    return Object.freeze(Object.fromEntries(entries.map(([key, value]) => [key, setting(value, `${path}.${key}`)])));
  }
  return setting(document, name);
}
