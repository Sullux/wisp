/* This file contains unit tests for the Wisp Core Library. */

const { link } = require('./linker')
const { compile } = require('./compile')
const { parse } = require('./parse')
const { corelib } = require('./corelib')

const transpile = (code) => link(compile(parse(code)), corelib)

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
      // Mock '+' function for the test
      corelib['+'] = (args) => `(${args.join(' + ')})`
      const wisp = `
        (:se 
          [ (:asn x 10)
            (:asn y 20) ]
          (+ x y))
      `
      expectWisp(wisp).toBe(30)
      delete corelib['+'] // Clean up mock
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
      corelib['+'] = (args) => `(${args.join(' + ')})`
      const wisp = `
        (:se
          [ (:asn x 10) ]
          (+
            (:se [ (:asn y 20) ] y)
            x
          ))
      `
      expectWisp(wisp).toBe(30)
      delete corelib['+']
    })
  })
})
