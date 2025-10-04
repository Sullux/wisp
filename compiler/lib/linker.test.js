/* This file contains unit tests for the Wisp linker. */

const { link } = require('./linker')
const { compile } = require('./compile')
const { parse } = require('./parse')

// A mock jscorelib for testing code generation
const jscorelib = {
  '+': (args) => `(${args.join(' + ')})`,
  '-': (args) => `(${args.join(' - ')})`,
  // For testing JS interop
  'Math.max': (args) => `Math.max(${args.join(', ')})`,
}

const transpile = (code) => link(compile(parse(code)), jscorelib)

const expectWisp = (code) => {
  const js = transpile(code)
  try {
    // eslint-disable-next-line no-eval
    return expect(eval(js))
  } catch (e) {
    // Log the generated JS to help debug syntax errors
    console.error(`Failed to eval JavaScript:\n---\n${js}\n---`)
    throw e
  }
}

describe('Wisp Linker (Behavioral)', () => {
  describe('Literals', () => {
    it('should evaluate a number', () => {
      expectWisp('42').toBe(42)
    })

    it('should evaluate a string', () => {
      expectWisp("'hello'").toBe('hello')
    })

    it('should evaluate a boolean', () => {
      expectWisp(':t').toBe(true)
      expectWisp(':f').toBe(false)
    })
  })

  describe('Function Calls', () => {
    it('should evaluate a simple function call', () => {
      expectWisp('(+ 1 2)').toBe(3)
    })

    it('should evaluate a nested function call', () => {
      expectWisp('(+ 1 (- 5 2))').toBe(4)
    })

    it('should handle JS interop', () => {
      expectWisp('(Math.max 10 5 20)').toBe(20)
    })
  })

  describe('Scoping', () => {
    it('should evaluate a scoped expression (:se)', () => {
      const wisp = `
        (:se 
          [ (:asn x 10)
            (:asn y 20) ]
          (+ x y))
      `
      expectWisp(wisp).toBe(30)
    })

    it('should handle shadowing', () => {
      const wisp = `
        (:se 
          [ (:asn x 10) ]
          (:se 
            [ (:asn x 20) ]
            x))
      `
      expectWisp(wisp).toBe(20)
    })

    it('should not leak variables from inner scopes', () => {
      // We define x=10. Then we create an inner scope where y=20.
      // We add the result of the inner scope (20) to the outer x (10).
      // This proves that the outer scope's bindings are available to the
      // inner scope, and that the inner scope can be used as an expression.
      const wisp = `
        (:se
          [ (:asn x 10) ]
          (+
            (:se [ (:asn y 20) ] y)
            x
          ))
      `
      expectWisp(wisp).toBe(30)
    })
  })
})