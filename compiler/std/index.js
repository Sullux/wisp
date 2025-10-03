// --- Standard Library Loading ---
const { FileLoader } = require('../lib/fileLoader')
const { parse } = require('../lib/parse')
const { hydrate } = require('../lib/hydrate')
const { compile } = require('../lib/compile')
const loader = FileLoader(__dirname)
const stdLibContent = loader('std.wisp')
const stdLibAst = hydrate(parse(stdLibContent))
// The 'compile' function populates the declarations map via side effects.
compile(stdLibAst)

const injectStdLib = (ast) => {
  stdLibAst.declarations.forEach((value, key) => {
    ast.declarations.set(key, value)
  })
  return ast
}

module.exports = {
  injectStdLib,
  stdLibAst,
}
