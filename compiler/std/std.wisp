(:macro => (ecma '({ raw, compileRaw }) => {
  const args = raw.slice(0, -1)
  const body = raw[raw.length - 1]
  const argNames = args.join(", ")
  const bodyJs = compileRaw(body)
  return `(${argNames}) => ${bodyJs}`
}'))

(:macro if (ecma '({ raw: [condition, thenExpr, elseExpr], compileRaw }) => {
  const condJs = compileRaw(condition)
  const thenJs = compileRaw(thenExpr)
  const elseJs = elseExpr ? compileRaw(elseExpr) : "undefined"
  return `(${condJs} ? ${thenJs} : ${elseJs})`
}'))

(:macro :: (ecma '({ ast, compile }) => {
  const statements = ast.map(compile).join(";\n")
  return `(() => { ${statements} })()`
}'))
