/* This file is the entry point for the Wisp compiler. */

const { parse } = require('./parse')
const { compile, compileNode } = require('./compile')
const { Environment } = require('./environment')
const { link } = require('./linker')
const { corelib, specialForms, functions } = require('./corelib')

module.exports = {
  parse,
  compile,
  compileNode,
  Environment,
  link,
  corelib,
  specialForms,
  functions,
}
