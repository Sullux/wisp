/* This file contains the Wisp Core Library. */

const { Environment } = require('./environment')

const corelib = {
  ':se': (argNodes, env, linkNode) => {
    const localEnv = Environment({}, env)
    const [bindingsNode, returnExpression] = argNodes

    const linkedBindings = bindingsNode.seq.map(b => {
      // b is a :src wrapped list: [':src', '...', [':asn', name, value]]
      const asnNode = b.list
      const name = asnNode[1].atom
      const valueNode = asnNode[2]
      const value = linkNode(valueNode, localEnv)
      localEnv.set(name, name) // Bind the name to itself for lookup
      return `const ${name} = ${value}`
    })

    const linkedReturn = linkNode(returnExpression, localEnv)

    return `(() => {\n  ${linkedBindings.join(';\n  ')};\n  return ${linkedReturn};\n})()`
  },
}

module.exports = { corelib }
