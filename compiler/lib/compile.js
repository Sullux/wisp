/* This file contains the core logic for compiling a hydrated AST into
 * JavaScript code. */

const findAndStoreDeclarations = node => {
  if (!node.children) return

  const declarationsToProcess = []
  for (const child of node.children) {
    if (
      child.type === 'expression' &&
      child.children[0]?.compiledOutput === ':macro'
    ) {
      declarationsToProcess.push(child)
    }
  }

  for (const declNode of declarationsToProcess) {
    // Validate structure: (':macro', name, (ecma '...'))
    if (declNode.children.length !== 3) {
      throw new Error(
        '`:macro` declaration requires a name and an (ecma ...) body.',
      )
    }
    const nameNode = declNode.children[1]
    const bodyWrapperNode = declNode.children[2]

    if (nameNode.type !== 'atom') {
      throw new Error('Macro name must be an atom.')
    }
    if (
      bodyWrapperNode.type !== 'expression' ||
      bodyWrapperNode.children[0]?.compiledOutput !== 'ecma'
    ) {
      throw new Error('Macro body must be an (ecma ...) expression.')
    }
    if (
      bodyWrapperNode.children.length !== 2 ||
      bodyWrapperNode.children[1].type !== 'string'
    ) {
      throw new Error(
        'The (ecma ...) body of a macro must contain exactly one string literal.',
      )
    }

    const name = nameNode.compiledOutput
    const jsFuncString = bodyWrapperNode.children[1].value

    let macroFn
    try {
      // Using eval to turn the user's string into a function.
      // We wrap it in parentheses to ensure it's treated as an expression.
      macroFn = eval(`(${jsFuncString})`)
    } catch (e) {
      throw new Error(`Syntax error in macro body for '${name}': ${e.message}`)
    }

    if (typeof macroFn !== 'function') {
      throw new Error(`Macro body for '${name}' did not evaluate to a function.`)
    }

    // Store the macro on the parent's (the current scope's) declaration map.
    node.declarations.set(name, { type: 'macro', implementation: macroFn })
  }

  // Recurse to find declarations in nested scopes
  for (const child of node.children) {
    findAndStoreDeclarations(child)
  }
}

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

  // Handle the primitive 'ecma' macro
  if (
    node.type === 'expression' &&
    node.children[0]?.compiledOutput === 'ecma'
  ) {
    if (node.children.length !== 2) {
      throw new Error('`ecma` macro expects exactly one argument.')
    }
    const argNode = node.children[1]
    if (argNode.type !== 'string') {
      throw new Error('Argument to `ecma` macro must be a string literal.')
    }
    // The compiled output is the raw, unquoted string value.
    node.compiledOutput = argNode.value
    return node.compiledOutput
  }

  // Post-order traversal: compile children first for standard expressions.
  const compiledChildren = node.children.map(compileNode)

  // For now, we only handle basic function calls.
  // The first child is the function, the rest are arguments.
  const func = compiledChildren[0]
  const args = compiledChildren.slice(1).join(', ')

  node.compiledOutput = `${func}(${args})`
  return node.compiledOutput
}

const Compile = rootNode => {
  // 1. Pre-pass to find and store all macro definitions.
  findAndStoreDeclarations(rootNode)

  // 2. Compile all top-level expressions, filtering out declarations.
  const compiledExpressions = rootNode.children
    .filter(
      child =>
        child.type !== 'expression' ||
        child.children[0]?.compiledOutput !== ':macro',
    )
    .map(compileNode)

  // Join them with semicolons for the final output.
  return compiledExpressions.join(';\n')
}

module.exports = { Compile }
