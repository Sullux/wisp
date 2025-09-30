/* This file is the entry point for the Wisp compiler. */

const { parse } = require('./parse')
const { hydrate } = require('./hydrate')
const { compile: compileAst } = require('./compile')

const compile = (wispCode) => {
  const rawAST = parse(wispCode)
  const hydratedAST = hydrate(rawAST)
  const jsCode = compileAst(hydratedAST)
  return jsCode
}

module.exports = {
  parse,
  hydrate,
  compileAst,
  compile,
}
