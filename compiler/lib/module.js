const { parse } = require('./parse')
const { hydrate } = require('./hydrate')
const { analyze } = require('./analyze')
const { compile } = require('./compile')
const { stdLibAst } = require('../std')
const { FileLoader } = require('./fileLoader')

const defaultLoader = FileLoader()

const Module = (entryPath, { fileCache = {}, loader = defaultLoader } = {}) => {
  const processing = new Set()

  const compileFile = (path) => {
    const existing = fileCache[path]
    if (existing != undefined) return existing
    if (processing.has(path))
      throw new Error(`Circular dependency detected: ${path}`)

    processing.add(path)

    const code = loader(path)
    if (typeof code === 'undefined') {
      // This can happen for imports of JS files, etc.
      // For now, we just ignore them.
      processing.delete(path)
      return
    }

    const rawAST = parse(code)
    const hydratedAST = hydrate(rawAST, stdLibAst)
    const { imports } = analyze(hydratedAST)

    console.log('IMPORTS', imports)
    imports.forEach((imp) => {
      compileFile(imp.path)
    })

    processing.delete(path)
    return compile(hydratedAST)
  }

  const jsCode = compileFile(entryPath)

  return {
    entryPath,
    jsCode,
    fileCache: {
      ...fileCache,
      [entryPath]: jsCode,
    },
  }
}

module.exports = { Module }
