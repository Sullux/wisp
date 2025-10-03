/* This file contains tests for the new scoped expression features. */

const { compile } = require('./index')

describe('Scoped Expressions', () => {
  it('should handle a simple -> block', () => {
    const wisp = `(-> x 42 x)`
    const expected = `(() => { const x = 42;
 return x })()`
    expect(compile(wisp)).toBe(expected)
  })

  it('should handle multiple bindings in a -> block', () => {
    const wisp = `(-> x 40 y 2 (+ x y))`
    const expected = `(() => { const x = 40;
const y = 2;
 return +(x, y) })()`
    expect(compile(wisp)).toBe(expected)
  })

  it('should handle the "let" alias', () => {
    const wisp = `(let x 42 x)`
    const expected = `(() => { const x = 42;
 return x })()`
    expect(compile(wisp)).toBe(expected)
  })

  it('should compile a => function with arguments', () => {
    const wisp = `(=> (x y) (+ x y))`
    const expected = `(x, y) => +(x, y)`
    expect(compile(wisp)).toBe(expected)
  })

  it('should compile a => function with no arguments', () => {
    const wisp = `(=> (+ 1 2))`
    const expected = `() => +(1, 2)`
    expect(compile(wisp)).toBe(expected)
  })

  it('should compile a do/:: block', () => {
    const wisp = `(do (log 1) (log 2))`
    const expected = `(() => { log(1);log(2) })()`
    expect(compile(wisp)).toBe(expected)
  })
})
