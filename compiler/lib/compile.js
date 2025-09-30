/* This file contains the core logic for compiling a hydrated AST into
 * JavaScript code. */

const compileNode = node => {
  // If the node is already compiled (e.g., it's an atom), return it.
  if (node.compiledOutput !== null) {
    return node.compiledOutput
  }

  // Handle strings by quoting their value
  if (node.type === 'string') {
    node.compiledOutput = `'${node.value}'`
    return node.compiledOutput
  }

  // Post-order traversal: compile children first.
  const compiledChildren = node.children.map(compileNode)

  // For now, we only handle basic function calls.
  // The first child is the function, the rest are arguments.
  const func = compiledChildren[0]
  const args = compiledChildren.slice(1).join(', ')

  node.compiledOutput = `${func}(${args})`
  return node.compiledOutput
}

const Compile = rootNode => {
  // Compile all top-level expressions in the root node.
  const compiledExpressions = rootNode.children.map(compileNode)

  // Join them with semicolons for the final output.
  return compiledExpressions.join(';\n')
}

module.exports = { Compile }
