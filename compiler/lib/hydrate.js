/* This file is responsible for hydrating the raw AST from the parser into a
 * rich Unified Context Tree, establishing parent-child relationships. */

const Hydrate = rawNode => {
  const walk = (raw, parent) => {
    const node = {
      type: Array.isArray(raw)
        ? 'expression'
        : typeof raw === 'object'
        ? raw.type // Use the type from the parser's object
        : 'atom',
      parent,
      children: [],
      declarations: new Map(),
      source: {}, // Placeholder for future source mapping
      compiledOutput: null,
    }

    if (node.type === 'expression') {
      node.children = raw.map(childRaw => walk(childRaw, node))
    } else if (node.type === 'string') {
      // For strings, we store the raw value and will quote it in the compiler
      node.value = raw.value
    } else {
      // For atoms, the raw value is the compiled output
      node.compiledOutput = raw
    }

    return node
  }

  // The top-level AST is a list of expressions. We wrap them in a root node.
  const root = {
    type: 'root',
    parent: null,
    children: [],
    declarations: new Map(),
    source: {},
    compiledOutput: null,
  }

  root.children = rawNode.map(raw => walk(raw, root))

  return root
}

module.exports = { Hydrate }
