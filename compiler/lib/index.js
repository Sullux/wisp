/* This file is the entry point for the Wisp compiler. */

const { parse } = require('./parse')
const { hydrate } = require('./hydrate')
const { analyze } = require('./analyze')
const { compile: compileAst } = require('./compile')

const compile = (wispCode) => {
  const rawAST = parse(wispCode)
  const hydratedAST = hydrate(rawAST)
  const jsCode = compileAst(hydratedAST)
  return jsCode
}

const compileProject = (entryPath, fileProvider) => {
  const compiledFiles = new Map()
  const processing = new Set()

  const compileFile = (path) => {
    if (compiledFiles.has(path)) return
    if (processing.has(path))
      throw new Error(`Circular dependency detected: ${path}`)

    processing.add(path)

    const code = fileProvider(path)
    const rawAST = parse(code)
    const hydratedAST = hydrate(rawAST)
    const { imports } = analyze(hydratedAST)

    imports.forEach((imp) => {
      compileFile(imp.path)
    })

    const jsCode = compileAst(hydratedAST)
    compiledFiles.set(path, jsCode)
    processing.delete(path)
  }

  compileFile(entryPath)
  return compiledFiles
}

module.exports = {
  parse,
  hydrate,
  compileAst,
  compile,
  compileProject,
}
