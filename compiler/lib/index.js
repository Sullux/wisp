/* This file is the entry point for the Wisp compiler. */

const { parse } = require('./parse')
const { hydrate } = require('./hydrate')
const { analyze } = require('./analyze')
const { compile: compileAst } = require('./compile')
const { stdLibAst } = require('../std')
const { Module } = require('./module')

// --- Public API ---
const compile = (wispCode) => {
  const rawAST = parse(wispCode)
  const hydratedAST = hydrate(rawAST, stdLibAst)
  const jsCode = compileAst(hydratedAST)
  return jsCode
}

const compileModule = (entryPath, existingModule) =>
  Module(entryPath, existingModule).jsCode

module.exports = {
  parse,
  hydrate,
  compileAst,
  compile,
  compileModule,
  Module,
}
