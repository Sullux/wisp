/* This file is responsible for hydrating the raw AST from the parser into a
 * rich AST of Node objects. */

const { Node } = require('./node')

const hydrate = (rawAst, rootParent) => {
  const walk = (raw, parent) => {
    if (Array.isArray(raw)) {
      const head = raw[0]
      if (head === ':macro')
        return Node({
          type: 'macro',
          parent,
          ast: raw.slice(1),
          children: [walk(raw[2], parent)],
        })
      if (head === '{') {
        const pairs = raw.slice(1)
        return Node({
          type: 'object',
          parent,
          ast: pairs,
          children: pairs.map((element) => walk(element, parent)),
        })
      }
      if (head === '[') {
        const elements = raw.slice(1)
        return Node({
          type: 'array',
          parent,
          ast: elements,
          children: elements.map((element) => walk(element, parent)),
        })
      }
      if (head === 'import') {
        return Node({
          type: 'import',
          parent,
          ast: raw,
          value: raw[1].value, // must be a string
        })
      }
      if (head === 'export') {
        return Node({
          type: 'export',
          parent,
          ast: raw,
          children: [walk(raw.slice(1), parent)],
        })
      }
      const node = Node({ type: 'expression', parent, ast: raw })
      node.children = raw.map((childRaw) => walk(childRaw, node))
      return node
    } else if (typeof raw === 'object' && raw.type === 'string') {
      return Node({ type: 'string', value: raw.value, parent })
    } else {
      return Node({ type: 'atom', value: raw, parent })
    }
  }

  const root = Node({ type: 'root', parent: rootParent })
  root.children = rawAst.map((raw) => walk(raw, root))
  return root
}

module.exports = { hydrate }
