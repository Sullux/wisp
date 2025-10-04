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

const Environment = (bindings = {}, outer = null) => ({
  bindings,
  outer,
  find(name) {
    if (Object.prototype.hasOwnProperty.call(this.bindings, name)) {
      return this.bindings[name]
    }
    if (this.outer) {
      return this.outer.find(name)
    }
    return null
  },
  set(name, value) {
    this.bindings[name] = value
  },
})

const linkNode = (node, env) => {
  if (!node || !node.src) {
    // This can happen with parts of labels, etc.
    // The parent node will have the src.
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
      if (value === null) {
        // For now, assume unbound variables are global JS variables
        return node.atom
      }
      return value
    }
    case 'list': {
      const [fnNode, ...argNodes] = node.list
      const fnName = fnNode.atom

      // Handle special forms first
      if (fnName === ':se') {
        const localEnv = Environment({}, env)
        const [bindingsNode, returnExpression] = argNodes
        
        const linkedBindings = bindingsNode.seq.map(b => {
          const name = b.list[1].atom
          const valueNode = b.list[2]
          const value = linkNode(valueNode, localEnv)
          localEnv.set(name, name) // Bind the name to itself for lookup
          return `const ${name} = ${value}`
        })

        const linkedReturn = linkNode(returnExpression, localEnv)

        return `(() => {\n  ${linkedBindings.join(';\n  ')};\n  return ${linkedReturn};\n})()`
      }

      const fn = env.find(fnName)

      if (!fn) {
        // Assume it's a JS function call
        const args = argNodes.map(arg => linkNode(arg, env))
        return `${fnName}(${args.join(', ')})`
      }
      
      if (typeof fn !== 'function') {
        throw error(fnNode, NOT_A_FUNCTION, fnName)
      }

      const args = argNodes.map(arg => linkNode(arg, env))
      return fn(args)
    }
    // The :se case is now handled within the :list logic,
    // as it appears as a list with ':se' at the head.
    default:
      return '' // Ignore comments, etc.
  }
}

const link = (richAst, library) => {
  const globalEnv = Environment(library)
  return richAst.map(node => linkNode(node, globalEnv)).join(';\n')
}

module.exports = { link }
