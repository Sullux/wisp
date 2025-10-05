/* This file contains the purity analysis logic for the Wisp linker. */

const checkPurity = (node, env) => {
  if (!node) return true
  const type = Object.keys(node)[0]

  switch (type) {
    case 'num':
    case 'str':
    case 'bool':
    case 'atom':
      return true

    case 'list': {
      const [fnNode, ...argNodes] = node.list
      // Dynamic function calls, e.g. ((=> x x) 1), are complex to analyze statically.
      // For now, we assume purity and rely on the called function's own analysis.
      if (!fnNode.atom) {
        return argNodes.every(arg => checkPurity(arg, env))
      }

      const fnName = fnNode.atom

      // Base case: :set is the root of all impurity.
      if (fnName === ':set') return false

      // Special forms that are pure if their contents are pure.
      if ([':if', ':do', ':se', ':fn', ':mut', ':get', ':eq', ':dr'].includes(fnName)) {
        return argNodes.every(arg => checkPurity(arg, env))
      }

      // Check the purity of the function being called.
      const fnBinding = env.find(fnName)
      if (fnBinding && fnBinding.isPure === false) {
        return false // Calling a known impure function.
      }

      // If the function is not found or has no purity info, we assume it's pure by default.
      // Then, we check its arguments for impurity.
      return argNodes.every(arg => checkPurity(arg, env))
    }

    case 'seq':
      return node.seq.every(item => checkPurity(item, env))
    case 'map':
      return node.map.every(label => checkPurity(label.label.value, env))

    default:
      return true // Comments, etc., are considered pure.
  }
}

module.exports = { checkPurity }
