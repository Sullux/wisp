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

const link = (richAst, library) => {
  const env = Environment(library)
  const linkedNodes = richAst.map(node => linkNode(node, env))
  
  if (linkedNodes.length > 1) {
    const lastIndex = linkedNodes.length - 1
    linkedNodes[lastIndex] = `return ${linkedNodes[lastIndex]}`
    return `(() => {\n  ${linkedNodes.join(';\n  ')};\n})()`
  }

  return linkedNodes[0] || ''
}

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
      const binding = env.find(node.atom)
      if (!binding) {
        return node.atom.replace(/-/g, '__') // Sanitize unbound variables for JS interop
      }
      return typeof binding === 'string' ? binding : binding.jsName
    }
    case 'list': {
      const [fnNode, ...argNodes] = node.list
      const fnName = fnNode.atom
      
      const specialForm = env.findSpecialForm(fnName)
      if (specialForm) {
        return specialForm(argNodes, env, linkNode)
      }

      const libraryFn = env.findFunction(fnName)
      if (libraryFn) {
        const linkedArgs = argNodes.map(arg => linkNode(arg, env))
        return libraryFn(linkedArgs)
      }
      
      const fnBinding = fnName ? env.find(fnName) : null
      const isPureCall = fnBinding ? fnBinding.isPure !== false : true // Default to pure

      const linkedArgs = argNodes.map(arg => {
        if (isPureCall && arg.atom) {
          const argBinding = env.find(arg.atom)
          if (argBinding && argBinding.isMutable) {
            return `${argBinding.jsName}.value`
          }
        }
        return linkNode(arg, env)
      })
      
      const linkedFnName = linkNode(fnNode, env)
      return `${linkedFnName}(${linkedArgs.join(', ')})`
    }
    default:
      return '' // Ignore comments, etc.
  }
}

const { Environment } = require('./environment')



module.exports = { link }
