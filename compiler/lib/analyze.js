/* This file is responsible for analyzing a hydrated AST to find module
 * import and export declarations. */

const analyze = (hydratedAst) => {
  const imports = []
  const exports = []

  const visit = (node) => {
    if (node.children?.length) {
      node.children.forEach(visit)
    }
    if (node.type === 'import') {
      imports.push(node.value)
    }
    if (node.type === 'export') {
      const exportChild = node.children[0]
      if (
        exportChild.type === 'expression'
        && exportChild.children[0].value === ':'
      ) {
        const name = exportChild.children[1].value
        exports.push(name)
      } else if (exportChild.type === 'atom') {
        exports.push(exportChild.value)
      }
    }
  }

  hydratedAst.children.forEach(visit)

  return { imports, exports }
}

module.exports = { analyze }
