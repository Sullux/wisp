/* This file contains the Wisp linker (transpiler). */

const UNBOUND_VARIABLE = 'Unbound variable: $1'
const NOT_A_FUNCTION = 'Attempted to call a non-function: $1'

const error = (node, message, ...args) => {
  const err = new Error(
    message.replace(/\$(\d+)/g, (_, i) => args[i - 1] ?? ''),
  )
  err.stack = node.src ? `${node.src}\n${err.message}` : err.message
  return err
}

const { Environment } = require('./environment')

const linkNode = (node, env) => {
  if (!node || !node.src) {
    if (node.atom) return node.atom
    if (node.num) return String(node.num)
  }

  const type = Object.keys(node)[0]

  switch (type) {
    case 'num':
      return String(node.num)
    case 'str':
      return `'${node.str}'`
    case 'bool':
      return String(node.bool)
    case 'atom': {
      const value = env.find(node.atom)
      return value === null ? node.atom : value
    }
    case 'list': {
      const [fnNode, ...argNodes] = node.list
      const fnName = fnNode.atom
      const fn = env.find(fnName)
      const linkedArgs = argNodes.map(arg => linkNode(arg, env))

      if (typeof fn === 'function') {
        // It's a special form or a library function
        // Library functions expect transpiled strings
        if (fnName.startsWith(':')) {
          // Special forms expect AST nodes
          return fn(argNodes, env, linkNode)
        }
        return fn(linkedArgs)
      }
      
      // Assume it's a JS function call
      return `${fnName}(${linkedArgs.join(', ')})`
    }
    default:
      return '' // Ignore comments, etc.
  }
}

const link = (richAst, library) => {
  const globalEnv = Environment(library)
  const linkedNodes = richAst.map(node => linkNode(node, globalEnv))
  
  if (linkedNodes.length > 1) {
    const lastIndex = linkedNodes.length - 1
    linkedNodes[lastIndex] = `return ${linkedNodes[lastIndex]}`
    return `(() => {\n  ${linkedNodes.join(';\n  ')};\n})()`
  }

  return linkedNodes[0] || ''
}

module.exports = { link }
