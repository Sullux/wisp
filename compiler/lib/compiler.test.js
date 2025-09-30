/* This file contains integration tests for the Wisp compiler pipeline. */

const { compile } = require('./index')

describe('Wisp Compiler', () => {
  describe('Basic Compilation', () => {
    it('should compile a simple function call', () => {
      expect(compile('(add 1 2)')).toBe('add(1, 2)')
    })
  })

  describe('Macros', () => {
    it('should expand a macro that returns a new Node', () => {
      const wispCode = `
        (:macro twice (ecma '
          (n) => ["+", n, n]
        '))
        (twice 5)
      `
      expect(compile(wispCode)).toBe('+(5, 5)')
    })

    it('should handle macros expanding into other macros', () => {
      const wispCode = `
        (:macro add-one (ecma '(n) => ["+", n, 1]'))
        (:macro add-two (ecma '(n) => ["add-one", ["add-one", n]]'))
        (add-two 10)
      `
      expect(compile(wispCode)).toBe('+(+(10, 1), 1)')
    })
  })
})
