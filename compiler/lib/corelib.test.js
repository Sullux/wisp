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
    '*': (args) => `(${args.join(' * ')})`,
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
        (:se [(:asn x (:mut 10))]
          (:do
            (:set x (+ (:get x) 1))
            (:set x (+ (:get x) 1))
            (:get x)))
      `
      expectWisp(wisp).toBe(12)
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

  describe('State Primitives', () => {
    it('should create and retrieve a value from a mutable container', () => {
      const wisp = `
        (:se [(:asn my-mut (:mut 10))]
          (:get my-mut))
      `
      expectWisp(wisp).toBe(10)
    })

    it('should set a new value in a mutable container', () => {
      const wisp = `
        (:se [(:asn my-mut (:mut 10))]
          (:do
            (:set my-mut 20)
            (:get my-mut)))
      `
      expectWisp(wisp).toBe(20)
    })

    it('should return the new value from a :set operation', () => {
      const wisp = `
        (:se [(:asn my-mut (:mut 10))]
          (:set my-mut 20))
      `
      expectWisp(wisp).toBe(20)
    })

    it('should fail to reassign a binding', () => {
      const wisp = `
        (:se [(:asn x 10)]
          (:asn x 20))
      `
      const js = transpile(wisp)
      // This should throw a "Assignment to constant variable" error
      expect(() => eval(js)).toThrow()
    })
  })

  describe('Purity Analysis', () => {
    it('should identify a pure function', () => {
      const wisp = `
        (:se [(:asn square (:fn [(:asn x (:dr :args 0))] (* x x)))]
          square)
      `
      const square = eval(transpile(wisp))
      expect(square.isPure).toBe(true)
    })

    it('should identify an impure function due to :set', () => {
      const wisp = `
        (:se [(:asn impure-fn (:fn [(:asn x (:dr :args 0))] (:set x 10)))]
          impure-fn)
      `
      const impureFn = eval(transpile(wisp))
      expect(impureFn.isPure).toBe(false)
    })

    it('should identify an impure function due to calling another impure function', () => {
      const wisp = `
        (:se [
          (:asn impure-fn (:fn [(:asn x (:dr :args 0))] (:set x 10)))
          (:asn another-fn (:fn [] (impure-fn 5)))
        ]
        another-fn)
      `
      const anotherFn = eval(transpile(wisp))
      expect(anotherFn.isPure).toBe(false)
    })

    it('should automatically unwrap a mutable argument for a pure function', () => {
      const wisp = `
        (:se [
          (:asn my-mut (:mut 10))
          (:asn add-one (:fn [(:asn x (:dr :args 0))] (+ x 1)))
        ]
        (add-one my-mut))
      `
      expectWisp(wisp).toBe(11)
    })

    it('should NOT unwrap a mutable argument for an impure function', () => {
      const wisp = `
        (:se [
          (:asn my-mut (:mut 10))
          (:asn set-to-20 (:fn [(:asn x (:dr :args 0))] (:set x 20)))
        ]
        (:do
          (set-to-20 my-mut)
          (:get my-mut)))
      `
      expectWisp(wisp).toBe(20)
    })
  })
})
