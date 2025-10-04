/* This file contains unit tests for the Wisp parser. */

// NOTE: For simplicity, source location strings in these tests are placeholders
// and do not reflect the exact line/column numbers. The focus is on ensuring
// the :src wrapper is structurally correct.

const { parse } = require('./parse')

const s = (node) => [':src', expect.any(String), node]

describe('Wisp Parser with Source Mapping', () => {
  describe('Atoms and Literals', () => {
    it('should parse a single atom', () => {
      expect(parse('foo')).toEqual([s('foo')])
    })

    it('should parse a quoted atom', () => {
      expect(parse('"4xyz"')).toEqual([s('"4xyz"')])
    })

    it('should parse a number literal', () => {
      expect(parse('42')).toEqual([s(42)])
    })

    it('should parse boolean literals', () => {
      expect(parse(':t')).toEqual([s(':t')])
    })

    it('should parse a string literal (shortcut)', () => {
      expect(parse("'hello'")).toEqual([s([':str', 'hello'])])
    })
  })

  describe('Structural Primitives', () => {
    it('should parse an empty list', () => {
      expect(parse('()')).toEqual([s([])])
    })

    it('should parse a list of atoms and literals', () => {
      const expected = [s(['foo', 42, ':t'].map(s))]
      expect(parse('(foo 42 :t)')).toEqual(expected)
    })

    it('should parse nested lists', () => {
      const expected = [s([s('a'), s([s('b'), s([s('c')])])])]
      expect(parse('(a (b (c)))')).toEqual(expected)
    })

    it('should parse a sequence (shortcut)', () => {
      const expected = [s([':seq', s(1), s(2), s(3)])]
      expect(parse('[1 2 3]')).toEqual(expected)
    })

    it('should parse a map (shortcut)', () => {
      const expected = [s([':map', s('a'), s(1), s('b'), s(2)])]
      expect(parse('{ a 1 b 2 }')).toEqual(expected)
    })
  })

  describe('Comments', () => {
    it('should ignore single-line comments', () => {
      expect(parse('; comment\nfoo')).toEqual([s('foo')])
    })

    it('should parse a block comment', () => {
      const expected = [s([':comment', s('foo'), s(1)])]
      expect(parse('(; foo 1)')).toEqual(expected)
    })

    it('should parse an inline block comment', () => {
      const expected = [s([s('a'), s([':comment', s('b')]), s('c')])]
      expect(parse('(a (; b) c)')).toEqual(expected)
    })
  })

  describe('Error Handling', () => {
    it('should throw an error for unbalanced parentheses', () => {
      expect(() => parse('(a b')).toThrow('Unbalanced expression')
    })
  })
})
