/* This file contains unit tests for the Wisp linker. */

const { link } = require('./linker')
const { compile } = require('./compile')
const { parse } = require('./parse')

// A mock jscorelib for testing code generation
const jscorelib = {
  functions: {
    '+': (args) => `(${args.join(' + ')})`,
    '-': (args) => `(${args.join(' - ')})`,
    'Math.max': (args) => `Math.max(${args.join(', ')})`,
  }
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
    it('should evaluate a simple function call from a library', () => {
      expectWisp('(+ 1 2)').toBe(3)
    })

    it('should evaluate a nested function call', () => {
      expectWisp('(+ 1 (- 5 2))').toBe(4)
    })

    it('should handle JS interop for unbound functions', () => {
      // This test uses a mock Math.max, but in a real scenario
      // it would call the global Math.max function.
      expectWisp('(Math.max 10 5 20)').toBe(20)
    })
  })
})