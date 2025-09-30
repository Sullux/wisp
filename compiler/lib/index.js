/* This file is the entry point for the Wisp compiler. */

const fs = require('fs')
const path = require('path')

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

const stdLibPath = path.resolve(__dirname, '..', 'std', 'std.wisp')
const stdLibContent = fs.readFileSync(stdLibPath, 'utf8')
const stdLibAst = hydrate(parse(stdLibContent))
// Compile the stdlib once to populate its declarations map
compileAst(stdLibAst)

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

    // Inject stdlib macros into the root scope
    stdLibAst.declarations.forEach((value, key) => {
      hydratedAST.declarations.set(key, value)
    })

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
