( :macro
  =>
  ( ecma
    '({ raw, compileRaw }) => { const args = raw.slice(0, -1); const body = raw[raw.length - 1]; const argNames = args.join(", "); const bodyJs = compileRaw(body); return `(${argNames}) => ${bodyJs}` }'))
