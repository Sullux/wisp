/* This file contains unit tests for the Wisp parser. */

const { parse } = require('./parse')

describe('parse', () => {
  it('should parse an empty string', () => {
    expect(parse('')).toEqual([])
  })

  it('should parse a single atom', () => {
    expect(parse('foo')).toEqual(['foo'])
  })

  it('should parse a list of atoms', () => {
    expect(parse('(+ 1 2)')).toEqual([['+', '1', '2']])
  })

  it('should parse a string literal', () => {
    expect(parse("'hello'")).toEqual([{ type: 'string', value: 'hello' }])
  })

  it('should parse a list containing a string', () => {
    expect(parse("(log 'hello')")).toEqual([
      ['log', { type: 'string', value: 'hello' }],
    ])
  })

  it('should parse nested lists', () => {
    expect(parse('(+ 1 (* 2 3))')).toEqual([['+', '1', ['*', '2', '3']]])
  })

  it('should handle multiple top-level expressions', () => {
    expect(parse("(: x 1) (: y 2) (+ x y)")).toEqual([
      [':', 'x', '1'],
      [':', 'y', '2'],
      ['+', 'x', 'y'],
    ])
  })

  it('should handle whitespace', () => {
    expect(parse('  ( +   1   2 )  ')).toEqual([['+', '1', '2']])
  })

  it('should parse an empty bracket list', () => {
    expect(parse('[]')).toEqual([['[']])
  })

  it('should parse a bracket list of atoms', () => {
    expect(parse('[1 2 3]')).toEqual([['[', '1', '2', '3']])
  })

  it('should parse an empty brace list', () => {
    expect(parse('{}')).toEqual([['{']])
  })

  it('should parse a brace list of atoms', () => {
    expect(parse('{foo bar}')).toEqual([['{', 'foo', 'bar']])
  })

  it('should parse mixed, nested lists', () => {
    const code = '(a [b {c 1}] d)'
    const expected = [['a', ['[', 'b', ['{', 'c', '1']], 'd']]
    expect(parse(code)).toEqual(expected)
  })

  it('should throw an error for unbalanced parentheses', () => {
    expect(() => parse('(a b')).toThrow('Unbalanced expression')
  })

  it('should throw an error for unbalanced brackets', () => {
    expect(() => parse('[a b')).toThrow('Unbalanced expression')
  })

  it('should throw an error for unbalanced braces', () => {
    expect(() => parse('{a b')).toThrow('Unbalanced expression')
  })
})

describe('quasiquote parsing', () => {
  it('should parse a quasiquoted atom', () => {
    expect(parse('`foo')).toEqual([['quasiquote', 'foo']])
  })

  it('should parse a quasiquoted list', () => {
    expect(parse('`(a b)')).toEqual([['quasiquote', ['a', 'b']]])
  })

  it('should parse an unquoted atom', () => {
    expect(parse('~foo')).toEqual([['unquote', 'foo']])
  })

  it('should parse an unquote-spliced atom', () => {
    expect(parse('~@foo')).toEqual([['unquote-splicing', 'foo']])
  })

  it('should parse a complex nested structure', () => {
    const code = '`(a ~b ~@(c d) e)'
    const expected = [
      [
        'quasiquote',
        [
          'a',
          ['unquote', 'b'],
          ['unquote-splicing', ['c', 'd']],
          'e',
        ],
      ],
    ]
    expect(parse(code)).toEqual(expected)
  })

  it('should parse multiple levels of quasiquoting', () => {
    const code = '`(a `(b ~c))'
    const expected = [
      [
        'quasiquote',
        [
          'a',
          ['quasiquote', ['b', ['unquote', 'c']]],
        ],
      ],
    ]
    expect(parse(code)).toEqual(expected)
  })
})
