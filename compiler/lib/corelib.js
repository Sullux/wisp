/* This file contains the Wisp Core Library. */

const { Environment } = require('./environment')

const sanitize = (name) => name.replace(/-/g, '__')

const specialForms = {
  ':se': (argNodes, env, linkNode) => {
    const localEnv = Environment({}, env)
    const [bindingsNode, returnExpression] = argNodes

    const linkedBindings = bindingsNode.seq.map(b => {
      const asnNode = b.list
      const name = asnNode[1].atom
      const valueNode = asnNode[2]
      const value = linkNode(valueNode, localEnv)
      const sanitizedName = sanitize(name)
      localEnv.set(name, sanitizedName)
      return `let ${sanitizedName} = ${value}`
    })

    const linkedReturn = linkNode(returnExpression, localEnv)

    return `(() => {\n  ${linkedBindings.join(';\n  ')};\n  return ${linkedReturn};\n})()`
  },

  ':fn': (argNodes, env, linkNode) => {
    const localEnv = Environment({}, env)
    localEnv.set(':args', '_args')

    const [bindingsNode, returnExpression] = argNodes

    const linkedBindings = bindingsNode.seq.map(b => {
      const asnNode = b.list
      const name = asnNode[1].atom
      const valueNode = asnNode[2]
      const value = linkNode(valueNode, localEnv)
      const sanitizedName = sanitize(name)
      localEnv.set(name, sanitizedName)
      return `let ${sanitizedName} = ${value}`
    })

    const linkedReturn = linkNode(returnExpression, localEnv)

    return `((..._args) => {\n  ${linkedBindings.join(';\n  ')};\n  return ${linkedReturn};\n})`
  },

  ':if': (argNodes, env, linkNode) => {
    const [condition, thenExpr, elseExpr] = argNodes
    const linkedCondition = linkNode(condition, env)
    const linkedThen = linkNode(thenExpr, env)
    const linkedElse = elseExpr ? linkNode(elseExpr, env) : 'undefined'
    return `(${linkedCondition} ? ${linkedThen} : ${linkedElse})`
  },

  ':do': (argNodes, env, linkNode) => {
    const linkedNodes = argNodes.map(node => linkNode(node, env))
    if (linkedNodes.length === 1) {
      return linkedNodes[0]
    }
    const lastIndex = linkedNodes.length - 1
    linkedNodes[lastIndex] = `return ${linkedNodes[lastIndex]}`
    return `(() => {\n  ${linkedNodes.join(';\n  ')};\n})()`
  },
}

const functions = {
  ':dr': (args) => `${args[0]}[${args[1]}]`,
  ':eq': (args) => `(${args.join(' === ')})`,
  ':mut': (args) => `({ value: ${args[0]} })`,
  ':get': (args) => `${args[0]}.value`,
  ':set': (args) => `(${args[0]}.value = ${args[1]})`,
}

const corelib = { ...specialForms, ...functions }

module.exports = { corelib, specialForms, functions }

