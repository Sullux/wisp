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

