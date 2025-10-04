/* This file contains unit tests for the Wisp compiler. */

const { compile } = require('./compile')

describe('Wisp Compiler', () => {
  describe('Atoms and Literals', () => {
    it('should compile a single atom', () => {
      expect(compile(['foo'])).toEqual([{ atom: 'foo' }])
    })

    it('should compile a quoted atom', () => {
      expect(compile(['"4xyz"'])).toEqual([{ atom: '4xyz' }])
    })

    it('should compile a number literal', () => {
      expect(compile([42])).toEqual([{ num: 42 }])
    })

    it('should compile boolean literals', () => {
      expect(compile([':t', ':f'])).toEqual([{ bool: true }, { bool: false }])
    })

    it('should compile a string literal', () => {
      expect(compile([[':str', 'hello']])).toEqual([{ str: 'hello' }])
    })
  })

  describe('Structural Primitives', () => {
    it('should compile an empty list', () => {
      expect(compile([[]])).toEqual([{ list: [] }])
    })

    it('should compile a list of atoms and literals', () => {
      const raw = [['foo', 42, ':t']]
      const rich = [{
        list: [
          { atom: 'foo' },
          { num: 42 },
          { bool: true },
        ],
      }]
      expect(compile(raw)).toEqual(rich)
    })

    it('should compile a sequence', () => {
      const raw = [[':seq', 1, ':t']]
      const rich = [{
        seq: [
          { num: 1 },
          { bool: true },
        ],
      }]
      expect(compile(raw)).toEqual(rich)
    })

    it('should compile a map with implicit labels', () => {
      const raw = [[':map', 'a', 1, 'b', [':str', 'B']]]
      const rich = [{
        map: [
          { label: { name: { atom: 'a' }, value: { num: 1 } } },
          { label: { name: { atom: 'b' }, value: { str: 'B' } } },
        ],
      }]
      expect(compile(raw)).toEqual(rich)
    })

    it('should compile a map with explicit labels', () => {
      const raw = [[':map', [':label', 'a', 1]]]
      const rich = [{
        map: [
          { label: { name: { atom: 'a' }, value: { num: 1 } } },
        ],
      }]
      expect(compile(raw)).toEqual(rich)
    })

    it('should compile a comment block', () => {
      const raw = [[':comment', 'foo', 42]]
      const rich = [{
        comment: [
          { atom: 'foo' },
          { num: 42 },
        ],
      }]
      expect(compile(raw)).toEqual(rich)
    })
  })

  describe('Complex and Nested Structures', () => {
    it('should compile a complex nested structure', () => {
      const raw = [['a', [':seq', 'b', [':map', 'c', 1]], 'd']]
      const rich = [{
        list: [
          { atom: 'a' },
          {
            seq: [
              { atom: 'b' },
              {
                map: [
                  { label: { name: { atom: 'c' }, value: { num: 1 } } },
                ],
              },
            ],
          },
          { atom: 'd' },
        ],
      }]
      expect(compile(raw)).toEqual(rich)
    })
  })

  describe('Error Handling', () => {
    it('should throw on a malformed map', () => {
      expect(() => compile([[':map', 'a']])).toThrow('Malformed map expression')
    })

    it('should throw on a malformed label', () => {
      expect(() => compile([[':label', 'a']])).toThrow('Malformed label expression')
    })

    it('should throw on a malformed string', () => {
      expect(() => compile([[':str', 'a', 'b']])).toThrow('Malformed string expression')
    })

    it('should throw on an unknown primitive', () => {
      expect(() => compile([[':unknown']])).toThrow('Unknown primitive: :unknown')
    })
  })
})
