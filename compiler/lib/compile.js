/* This file contains the core logic for compiling a hydrated AST into
 * JavaScript code using the Visitor pattern. */

const { hydrate } = require('./hydrate')

const findInScope = (name, { declarations, parent }) =>
  declarations.get(name) || (parent && findInScope(name, parent))

const exists = (v) => !!v

const compile = (rootNode) => {
  const visit = (node) => {
    switch (node.type) {
      case 'macro':
        return visitMacro(node)
      case 'expression':
        return visitExpression(node)
      case 'atom':
        return visitAtom(node)
      case 'string':
        return visitString(node)
      case 'import':
        return visitImport(node)
      case 'export':
        return visitExport(node)
      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  }

  const visitImport = (node) => {
    const { names, path } = node.value
    const namesStr = names.join(', ')
    return `const { ${namesStr} } = require('${path}')`
  }

  const visitExport = (node) => {
    const exportedNode = node.children[0]
    if (
      exportedNode.type === 'expression' &&
      exportedNode.children[0].value === ':'
    ) {
      const name = exportedNode.children[1].value
      const value = visit(exportedNode.children[2])
      node.parent.declarations.set(name, { type: 'variable', value })
      return `const ${name} = ${value};\nmodule.exports.${name} = ${name};`
    }

    if (exportedNode.type === 'atom') {
      const name = exportedNode.value
      return `module.exports.${name} = ${name};`
    }

    return '' // Unsupported export form
  }


  const visitMacro = (node) => {
    const [name] = node.ast
    const [expr] = node.children
    const ecma = visit(expr)
    node.parent.declarations.set(name, { ...node, value: eval(ecma) })
    return ''
  }

  const expandMacro = (node, macro) => {
    if (typeof macro !== 'function') return macro

    const compileRaw = (rawAst) => {
      const hydratedNode = hydrate([rawAst]).children[0]
      hydratedNode.parent = node.parent
      return visit(hydratedNode)
    }

    // invoke the macro
    const transformed = macro({
      compile: visit,
      compileRaw,
      raw: node.ast.slice(1),
      ast: node.children.slice(1),
    })

    // depending on return type, process the transformed result
    // if string, treat as compiled JavaScript
    if (typeof transformed === 'string') return transformed
    // if array, treat as raw AST
    if (Array.isArray(transformed)) {
      const newNode = hydrate([transformed])
      newNode.source = node.source
      newNode.declarations = node.declarations
      newNode.parent = node.parent
      return compile(newNode)
    }
    // if plain object, treat as rich AST
    if (transformed?.constructor === Object)
      return visit({ ...type, parent: node.parent, source: node.source })
    return ''
  }

  const visitExpression = (node) => {
    const head = node.children[0]

    if (head.type === 'atom') {
      if (head.value === 'ecma') return node.children[1].value
      if (head.value === ':') {
        const name = node.children[1].value
        const value = visit(node.children[2])
        node.parent.declarations.set(name, { type: 'variable', value })
        return `const ${name} = ${value}`
      }
      const target = findInScope(head.value, node)
      if (target?.type === 'macro') return expandMacro(node, target.value)
    }

    const func = visit(head)
    if (!func) return ''
    const args = node.children
      .slice(1)
      .map((child) => visit(child))
      .join(', ')
    return `${func}(${args})`
  }

  const visitAtom = (node) => {
    return node.value
  }

  const visitString = (node) => {
    return `'${node.value}'`
  }

  return rootNode.children.map(visit).filter(exists).join(';\n')
}

module.exports = { compile }
