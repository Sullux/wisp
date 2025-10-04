/* This file contains unit tests for the Wisp parser. */

const { parse } = require('./parse')

describe('Wisp Parser', () => {
  describe('Atoms and Literals', () => {
    it('should parse a single atom', () => {
      expect(parse('foo')).toEqual(['foo'])
    })

    it('should parse atoms with special characters', () => {
      expect(parse('_?+')).toEqual(['_?+'])
    })

    it('should parse a quoted atom', () => {
      expect(parse('"4xyz"')).toEqual(['"4xyz"'])
    })

    it('should parse a number literal', () => {
      expect(parse('42')).toEqual([42])
      expect(parse('3.14')).toEqual([3.14])
    })

    it('should parse boolean literals', () => {
      expect(parse(':t')).toEqual([':t'])
      expect(parse(':f')).toEqual([':f'])
    })

    it('should parse a string literal (shortcut)', () => {
      expect(parse("'hello'")).toEqual([[':str', 'hello']])
    })

    it('should parse a string literal (canonical)', () => {
      expect(parse("(:str 'hello')")).toEqual([[':str', [':str', 'hello']]]) // Note: parser sees 'hello' as a string primitive
    })
  })

  describe('Structural Primitives', () => {
    it('should parse an empty list', () => {
      expect(parse('()')).toEqual([[]])
    })

    it('should parse a list of atoms and literals', () => {
      expect(parse('(foo 42 :t)')).toEqual([['foo', 42, ':t']])
    })

    it('should parse nested lists', () => {
      expect(parse('(a (b (c)))')).toEqual([['a', ['b', ['c']]]])
    })

    it('should parse an empty sequence (shortcut)', () => {
      expect(parse('[]')).toEqual([[':seq']])
    })

    it('should parse a sequence of literals (shortcut)', () => {
      expect(parse('[1 2 3]')).toEqual([[':seq', 1, 2, 3]])
    })

    it('should parse a sequence (canonical)', () => {
      expect(parse('(:seq 1 2 3)')).toEqual([[':seq', 1, 2, 3]])
    })

    it('should parse an empty map (shortcut)', () => {
      expect(parse('{}')).toEqual([[':map']])
    })

    it('should parse a map with implicit labels (shortcut)', () => {
      expect(parse('{ a 1 b 2 }')).toEqual([[':map', 'a', 1, 'b', 2]])
    })

    it('should parse a map (canonical)', () => {
      expect(parse('(:map a 1 b 2)')).toEqual([[':map', 'a', 1, 'b', 2]])
    })

    it('should parse a map with explicit labels', () => {
      const code = '(:map (:label foo 42) (:label bar "baz"))'
      const expected = [
        [
          ':map',
          [':label', 'foo', 42],
          [':label', 'bar', '"baz"'],
        ],
      ]
      expect(parse(code)).toEqual(expected)
    })
  })

  describe('Whitespace and Comments', () => {
    it('should handle various whitespace', () => {
      expect(parse('  ( +   1   2 )  ')).toEqual([['+', 1, 2]])
    })

    it('should ignore single-line comments', () => {
      const code = `
        ; this is a comment
        (foo bar) ; another comment
      `
      expect(parse(code)).toEqual([['foo', 'bar']])
    })

  })

  describe('Complex and Nested Structures', () => {
    it('should handle multiple top-level expressions', () => {
      expect(parse("(foo 1) (bar 2)")).toEqual([
        ['foo', 1],
        ['bar', 2],
      ])
    })

    it('should parse mixed, nested structures', () => {
      const code = '(a [b {c 1}] d)'
      const expected = [['a', [':seq', 'b', [':map', 'c', 1]], 'd']]
      expect(parse(code)).toEqual(expected)
    })
  })

  describe('Error Handling', () => {
    it('should throw an error for unbalanced parentheses', () => {
      expect(() => parse('(a b')).toThrow('Unbalanced expression')
    })

    it('should throw an error for unbalanced brackets', () => {
      expect(() => parse('[a b')).toThrow('Unbalanced expression')
    })

    it('should throw an error for unbalanced braces', () => {
      expect(() => parse('{a b')).toThrow('Unbalanced expression')
    })

    it('should throw an error for an unclosed string', () => {
      expect(() => parse("'hello")).toThrow('Unbalanced expression')
    })

    it('should throw an error for an unclosed quoted atom', () => {
      expect(() => parse('"hello')).toThrow('Unbalanced expression')
    })
  })
})