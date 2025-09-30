/* This file is responsible for hydrating the raw AST from the parser into a
 * rich AST of Node objects. */

const { Node } = require('./node')

const hydrate = (rawAst) => {
  const walk = (raw, parent) => {
    if (Array.isArray(raw)) {
      if (raw[0] === ':macro')
        return Node({
          type: 'macro',
          parent,
          ast: raw.slice(1),
          children: [walk(raw[2], parent)],
        })
      const node = Node({ type: 'expression', parent, ast: raw })
      node.children = raw.map((childRaw) => walk(childRaw, node))
      return node
    } else if (typeof raw === 'object' && raw.type === 'string') {
      return Node({ type: 'string', value: raw.value, parent })
    } else {
      return Node({ type: 'atom', value: raw, parent })
    }
  }

  const root = Node({ type: 'root' })
  root.children = rawAst.map((raw) => walk(raw, root))
  return root
}

module.exports = { hydrate }
