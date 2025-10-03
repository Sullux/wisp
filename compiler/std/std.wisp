(:macro => (ecma '({ raw, compileRaw }) => {
  const hasArgs = (raw.length > 1) && Array.isArray(raw[0])
  const args = hasArgs ? raw[0] : []
  const body = hasArgs ? raw.slice(1) : raw

  const argNames = args.join(", ")
  const bodyJs = body.map(compileRaw)

  if (bodyJs.length === 1) {
    return `(${argNames}) => ${bodyJs[0]}`
  }

  return `(${argNames}) => { ${bodyJs.join(";")} }`
}'))

(:macro if (ecma '({ raw: [condition, thenExpr, elseExpr], compileRaw }) => {
  const condJs = compileRaw(condition)
  const thenJs = compileRaw(thenExpr)
  const elseJs = elseExpr ? compileRaw(elseExpr) : "undefined"
  return `(${condJs} ? ${thenJs} : ${elseJs})`
}'))

(:macro -> (ecma '({ raw, compileRaw }) => {
  const bindings = raw.slice(0, -1)
  const body = raw[raw.length - 1]

  let bindingsJs = ""
  for (let i = 0; i < bindings.length; i += 2) {
    const name = bindings[i]
    const value = bindings[i+1]
    bindingsJs += `const ${name} = ${compileRaw(value)};\n`
  }

  const bodyJs = compileRaw(body)

  return `(() => { ${bindingsJs} return ${bodyJs} })()`
}'))

(:macro let (ecma '({ raw, compileRaw }) => {
  const bindings = raw.slice(0, -1)
  const body = raw[raw.length - 1]

  let bindingsJs = ""
  for (let i = 0; i < bindings.length; i += 2) {
    const name = bindings[i]
    const value = bindings[i+1]
    bindingsJs += `const ${name} = ${compileRaw(value)};\n`
  }

  const bodyJs = compileRaw(body)

  return `(() => { ${bindingsJs} return ${bodyJs} })()`
}'))

(:macro do (ecma '({ raw, compileRaw }) => {
  const statements = raw.map(compileRaw).join(";")
  return `(() => { ${statements} })()`
}'))

(:macro :: (ecma '({ raw, compileRaw }) => {
  const statements = raw.map(compileRaw).join(";")
  return `(() => { ${statements} })()`
}'))
