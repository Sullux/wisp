; This file contains the Wisp standard library.

(:macro lambda (ecma '({ raw: [args, body], compileRaw }) => { const argNames = (args || []).map(arg => arg).join(", "); const bodyJs = compileRaw(body); return `((${argNames}) => ${bodyJs})` }'))
