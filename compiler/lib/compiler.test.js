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
          ({ raw: [n] }) => ["+", n, n]
        '))
        (twice 5)
      `
      expect(compile(wispCode)).toBe('+(5, 5)')
    })

    it('should handle macros expanding into other macros', () => {
      const wispCode = `
        (:macro add-one (ecma '({ raw: [n] }) => ["+", n, 1]'))
        (:macro add-two (ecma '({ raw: [n] }) => ["add-one", ["add-one", n]]'))
        (add-two 10)
      `
      expect(compile(wispCode)).toBe('+(+(10, 1), 1)')
    })
  })

  describe('Special Forms', () => {
    it('should handle variable declaration with ":"', () => {
      const wispCode = `
        (: x 10)
        (: y (+ 5 5))
      `
      expect(compile(wispCode)).toBe('const x = 10;\nconst y = +(5, 5)')
    })
  })

  describe('Module System', () => {
    it('should compile a project with imports and exports', () => {
      const { compileProject } = require('./index')
      const files = {
        './math.wisp': `(export (: pi 3.14))`,
        './main.wisp': `
          (import [pi] from './math.wisp')
          pi
        `,
      }
      const fileProvider = (path) => files[path]
      const compiled = compileProject('./main.wisp', fileProvider)
      const mainJs = compiled.get('./main.wisp')
      const mathJs = compiled.get('./math.wisp')

      expect(mathJs.trim()).toBe(
        'const pi = 3.14;\nmodule.exports.pi = pi;',
      )
      expect(mainJs.trim()).toBe(
        `const { pi } = require('./math.wisp');\npi`,
      )
    })
  })
})
