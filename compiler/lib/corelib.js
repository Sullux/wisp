/* This file contains the Wisp Core Library. */

const { Environment } = require('./environment')
const { checkPurity } = require('./purity')

const sanitize = (name) => name.replace(/-/g, '__')

const processBindings = (bindingsNode, localEnv, linkNode) =>
  bindingsNode.seq.map(b => {
    const asnNode = b.list
    const name = asnNode[1].atom
    const valueNode = asnNode[2]

    const binding = {
      isMutable: valueNode.list && valueNode.list[0].atom === ':mut',
      isFn: valueNode.list && valueNode.list[0].atom === ':fn',
    }

    if (binding.isFn) {
      const [fnBindings, fnReturn] = valueNode.list.slice(1)
      const fnBody = { list: [':do', ...fnBindings.seq, fnReturn] }
      // Create a temporary environment for the function body analysis that includes
      // the function's own potential bindings.
      const tempFnEnv = Environment({}, localEnv)
      fnBindings.seq.forEach(b => {
        const n = b.list[1].atom
        tempFnEnv.set(n, {}) // Just need to register the name for the purity check
      })
      binding.isPure = checkPurity(fnBody, tempFnEnv)
    }

    const value = linkNode(valueNode, localEnv)
    const sanitizedName = sanitize(name)
    binding.jsName = sanitizedName
    
    localEnv.set(name, binding)
    return `const ${sanitizedName} = ${value}`
  })

const specialForms = {
  ':se': (argNodes, env, linkNode) => {
    const localEnv = Environment({}, env)
    const [bindingsNode, returnExpression] = argNodes

    const linkedBindings = processBindings(bindingsNode, localEnv, linkNode)
    const linkedReturn = linkNode(returnExpression, localEnv)

    return `(() => {
  ${linkedBindings.join(';\n  ')};
  return ${linkedReturn};
})()`
  },

  ':fn': (argNodes, env, linkNode) => {
    const localEnv = Environment({}, env)
    localEnv.set(':args', { jsName: '_args' })

    const [bindingsNode, returnExpression] = argNodes

    const linkedBindings = processBindings(bindingsNode, localEnv, linkNode)
    const linkedReturn = linkNode(returnExpression, localEnv)

    const fnBody = { list: [':do', ...bindingsNode.seq, returnExpression] }
    const isPure = checkPurity(fnBody, localEnv)

    const fnString = `((..._args) => {
  ${linkedBindings.join(';\n  ')};
  return ${linkedReturn};
})`
    
    return `Object.assign(${fnString}, { isPure: ${isPure} })`
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
    return `(() => {
  ${linkedNodes.join(';\n  ')};
})()`
  },

  // Note: :ecma is not part of corelib, but is included here for testing :pure
  ':ecma': (argNodes) => argNodes.map(a => a.str).join(''),
  ':pure': (argNodes, env, linkNode) => linkNode(argNodes[0], env),
}

const functions = {
  ':dr': (args) => `${args[0]}[${args[1]}]`,
  ':eq': (args) => `(${args.join(' === ')})`,
  ':mut': (args) => `({ value: ${args[0]} })`,
  ':get': (args) => `${args[0]}.value`,
  ':set': (args) => `(${args[0]}.value = ${args[1]})`,
  // Compiler API - assumes runtime functions are available
  ':parse': (args) => `parse(${args[0]})`,
  ':compile': (args) => `compile(${args[0]})`,
  ':link': (args) => `link(${args[0]}, ${args[1]})`,
}

const corelib = { ...specialForms, ...functions }

module.exports = { corelib, specialForms, functions }

