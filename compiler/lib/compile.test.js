/* This file contains unit tests for the Wisp compiler. */

const { compile } = require('./compile')

const s = (node, src = expect.any(String)) => [':src', src, node]
const withSrc = (node, src = expect.any(String)) => ({ ...node, src })

describe('Wisp Compiler with Source Mapping', () => {
  describe('Atoms and Literals', () => {
    it('should compile a single atom', () => {
      const raw = [s('foo')]
      const rich = [withSrc({ atom: 'foo' })]
      expect(compile(raw)).toEqual(rich)
    })

    it('should compile a number literal', () => {
      const raw = [s(42)]
      const rich = [withSrc({ num: 42 })]
      expect(compile(raw)).toEqual(rich)
    })

    it('should compile boolean literals', () => {
      const raw = [s(':t'), s(':f')]
      const rich = [withSrc({ bool: true }), withSrc({ bool: false })]
      expect(compile(raw)).toEqual(rich)
    })

    it('should compile a string literal', () => {
      const raw = [s([':str', 'hello'])]
      const rich = [withSrc({ str: 'hello' })]
      expect(compile(raw)).toEqual(rich)
    })
  })

  describe('Structural Primitives', () => {
    it('should compile an empty list', () => {
      const raw = [s([])]
      const rich = [withSrc({ list: [] })]
      expect(compile(raw)).toEqual(rich)
    })

    it('should compile a list of atoms and literals', () => {
      const raw = [s([s('foo'), s(42), s(':t')])]
      const rich = [withSrc({
        list: [
          withSrc({ atom: 'foo' }),
          withSrc({ num: 42 }),
          withSrc({ bool: true }),
        ],
      })]
      expect(compile(raw)).toEqual(rich)
    })

    it('should compile a sequence', () => {
      const raw = [s([':seq', s(1), s(':t')])]
      const rich = [withSrc({
        seq: [
          withSrc({ num: 1 }),
          withSrc({ bool: true }),
        ],
      })]
      expect(compile(raw)).toEqual(rich)
    })

    it('should compile a map with implicit labels', () => {
      const raw = [s([':map', s('a'), s(1)])]
      const rich = [withSrc({
        map: [
          { label: { 
            name: withSrc({ atom: 'a' }), 
            value: withSrc({ num: 1 }) 
          } },
        ],
      })]
      expect(compile(raw)).toEqual(rich)
    })
  })

  describe('Error Handling', () => {
    it('should throw on a malformed map', () => {
      const raw = [s([':map', s('a')])]
      expect(() => compile(raw)).toThrow('Malformed map expression')
    })
  })
})