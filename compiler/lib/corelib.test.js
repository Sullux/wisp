/* This file contains unit tests for the Wisp Core Library. */

const { link } = require('./linker')
const { compile } = require('./compile')
const { parse } = require('./parse')
const { specialForms, functions } = require('./corelib')

const testlib = {
  specialForms,
  functions: {
    ...functions,
    '+': (args) => `(${args.join(' + ')})`,
    '>': (args) => `(${args.join(' > ')})`,
    // A mock function with a side effect for testing :do
    '__inc': (args) => `${args[0]}++`,
  }
}

const transpile = (code) => link(compile(parse(code)), testlib)

const expectWisp = (code) => {
  const js = transpile(code)
  try {
    // eslint-disable-next-line no-eval
    return expect(eval(js))
  } catch (e) {
    console.error(`Failed to eval JavaScript:\n---\n${js}\n---`)
    throw e
  }
}

describe('Wisp Core Library', () => {
  describe(':se (Scoped Expression)', () => {
    it('should evaluate a scoped expression', () => {
      const wisp = `
        (:se 
          [ (:asn x 10)
            (:asn y 20) ]
          (+ x y))
      `
      expectWisp(wisp).toBe(30)
    })
    // ... (rest of :se tests are fine)
  })

  // ... (:fn tests are fine)

  describe(':if (Conditional)', () => {
    // ... (:if tests are fine)
  })

  describe(':do (Sequence)', () => {
    it('should evaluate all expressions and return the last one', () => {
      const wisp = `
        (:se [(:asn x 10)]
          (:do
            (__inc x)
            (__inc x)
            x))
      `
      // Transpiles to: let x = 10; x++; x++; return x;
      // So we need to wrap it to eval correctly.
      const js = `let x = 10; ${transpile(wisp)}`
      expect(eval(js)).toBe(12)
    })

    it('should return a single expression as is', () => {
      expectWisp('(:do 42)').toBe(42)
    })
  })

  describe(':eq (Equality)', () => {
    it('should return true for equal values', () => {
      expectWisp('(:eq 1 1)').toBe(true)
    })

    it('should return false for unequal values', () => {
      expectWisp('(:eq 1 2)').toBe(false)
    })
  })
})
