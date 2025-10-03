/* This file is the entry point for the Wisp compiler. */

const fs = require('fs')
const path = require('path')
const { parse } = require('./parse')
const { hydrate } = require('./hydrate')
const { analyze } = require('./analyze')
const { compile: compileAst } = require('./compile')

// --- Standard Library Loading ---
const stdLibPath = path.resolve(__dirname, '..', 'std', 'std.wisp')
const stdLibContent = fs.readFileSync(stdLibPath, 'utf8')
const stdLibAst = hydrate(parse(stdLibContent))
// The 'compileAst' function populates the declarations map via side effects.
compileAst(stdLibAst)

const injectStdLib = (ast) => {
  stdLibAst.declarations.forEach((value, key) => {
    ast.declarations.set(key, value)
  })
  return ast
}

// --- Public API ---
const compile = (wispCode) => {
  const rawAST = parse(wispCode)
  const hydratedAST = injectStdLib(hydrate(rawAST))
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
    if (typeof code === 'undefined') {
      // This can happen for imports of JS files, etc.
      // For now, we just ignore them.
      processing.delete(path)
      return
    }

    const rawAST = parse(code)
    const hydratedAST = injectStdLib(hydrate(rawAST))
    const { imports } = analyze(hydratedAST)

    console.log('IMPORTS', imports)
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
