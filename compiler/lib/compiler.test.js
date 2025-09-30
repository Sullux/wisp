/* This file contains integration tests for the Wisp compiler pipeline. */

const { compile } = require('./index')

describe('compile', () => {
  it('should compile a simple function call', () => {
    const wispCode = '(add 1 2)'
    const expectedJsCode = 'add(1, 2)'
    expect(compile(wispCode)).toBe(expectedJsCode)
  })

  it('should compile nested function calls', () => {
    const wispCode = '(add 1 (multiply 2 3))'
    const expectedJsCode = 'add(1, multiply(2, 3))'
    expect(compile(wispCode)).toBe(expectedJsCode)
  })

  it('should handle multiple top-level expressions', () => {
    const wispCode = `
      (log 'hello')
      (log 'world')
    `
    const expectedJsCode = `log('hello');\nlog('world')`
    expect(compile(wispCode)).toBe(expectedJsCode)
  })
})

describe('ecma macro', () => {
  it('should compile a simple ecma expression', () => {
    const wispCode = `(ecma '1 + 1')`
    const expectedJsCode = '1 + 1'
    expect(compile(wispCode)).toBe(expectedJsCode)
  })

  it('should compile inside a function call', () => {
    const wispCode = `(add (ecma '1 + 1') 2)`
    const expectedJsCode = 'add(1 + 1, 2)'
    expect(compile(wispCode)).toBe(expectedJsCode)
  })

  it('should throw an error with no arguments', () => {
    const wispCode = '(ecma)'
    expect(() => compile(wispCode)).toThrow(
      '`ecma` macro expects exactly one argument.',
    )
  })

  it('should throw an error with too many arguments', () => {
    const wispCode = `(ecma '1' '2')`
    expect(() => compile(wispCode)).toThrow(
      '`ecma` macro expects exactly one argument.',
    )
  })

  it('should throw an error with a non-string argument', () => {
    const wispCode = '(ecma 123)'
    expect(() => compile(wispCode)).toThrow(
      'Argument to `ecma` macro must be a string literal.',
    )
  })
})

describe(':macro primitive', () => {
  it('should produce no output for a valid macro definition', () => {
    const wispCode = `
      (:macro my-noop (ecma '(contextNode) => contextNode'))
      (add 1 2)
    `
    const expectedJsCode = 'add(1, 2)'
    expect(compile(wispCode)).toBe(expectedJsCode)
  })

  it('should throw an error for a macro without a name', () => {
    const wispCode = `(:macro (ecma '() => {}'))`
    expect(() => compile(wispCode)).toThrow(
      '`:macro` declaration requires a name and an (ecma ...) body.',
    )
  })

  it('should throw an error for a macro with a non-atom name', () => {
    const wispCode = `(:macro 'my-macro' (ecma '() => {}'))`
    expect(() => compile(wispCode)).toThrow('Macro name must be an atom.')
  })

  it('should throw an error for a macro without an ecma body', () => {
    const wispCode = `(:macro my-macro (=> ()))`
    expect(() => compile(wispCode)).toThrow(
      'Macro body must be an (ecma ...) expression.',
    )
  })

  it('should throw an error for a macro with a non-function body', () => {
    const wispCode = `(:macro my-macro (ecma '123'))`
    expect(() => compile(wispCode)).toThrow(
      "Macro body for 'my-macro' did not evaluate to a function.",
    )
  })

  it('should throw an error for a macro with syntax errors in the body', () => {
    const wispCode = `(:macro my-macro (ecma 'function () {'))` // unclosed brace
    expect(() => compile(wispCode)).toThrow(/Syntax error in macro body/)
  })
})

