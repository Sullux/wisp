/* This file is the entry point for the Wisp compiler. */

const { parse } = require('./parse')
const { Hydrate } = require('./hydrate')
const { Compile } = require('./compile')

const compile = wispCode => {
  const rawAST = parse(wispCode)
  const hydratedAST = Hydrate(rawAST)
  const jsCode = Compile(hydratedAST)
  return jsCode
}

module.exports = {
  parse,
  Hydrate,
  Compile,
  compile,
}