/* This file contains the parser for the Wisp language. */

const UNBALANCED_EXPRESSION = 'Unbalanced expression'
const UNEXPECTED_CHARACTER = 'Unexpected character: $1'
const UNEXPECTED_EOF = 'Unexpected end of file'

const error = (message, ...args) => {
  const err = new Error(
    message.replace(/\$(\d+)/g, (_, i) => args[i - 1] ?? ''),
  )
  err.stack = ''
  return err
}

const parse = (code, filename = 'source') => {
  let i = 0
  let line = 1
  let col = 1

  const getPos = () => ({ line, col })

  const next = () => {
    if (i >= code.length) {
      throw error(UNEXPECTED_EOF)
    }
    const char = code[i++]
    if (char === '\n') {
      line++
      col = 1
    } else {
      col++
    }
    return char
  }

  const peek = () => code[i]
  const eof = () => i >= code.length

  const withSrc = (parser) => () => {
    const start = getPos()
    const node = parser()
    const end = getPos()
    const src = `${filename}:${start.line}:${start.col}:${end.line}:${end.col - 1}`
    return node === null ? null : [':src', src, node]
  }

  const parseAtom = () => {
    let atom = ''
    if (peek() === '"') {
      next() // consume opening "
      while (!eof() && peek() !== '"') {
        atom += next()
      }
      if (eof()) {
        throw error(UNBALANCED_EXPRESSION)
      }
      next() // consume closing "
      return `"${atom}"`
    }

    while (!eof() && !/[\s(){}\[\]"']/.test(peek())) {
      atom += next()
    }
    return atom
  }

  const parseString = () => {
    let str = ''
    next() // consume opening '
    while (peek() !== "'") {
      if (eof()) {
        throw error(UNBALANCED_EXPRESSION)
      }
      str += next()
    }
    next() // consume closing '
    return [':str', str]
  }

  const parseList = () => {
    const startChar = next() // consume opening delimiter
    const endChar = { '(': ')', '[': ']', '{': '}' }[startChar]

    if (!endChar) {
      throw error(UNEXPECTED_CHARACTER, startChar)
    }

    while (!eof() && /\s/.test(peek())) {
      next()
    }

    const isComment = startChar === '(' && peek() === ';'
    if (isComment) {
      next() // consume the ';'
    }

    const list = []
    while (!eof() && peek() !== endChar) {
      const expr = parseExpr()
      if (expr !== null) {
        list.push(expr)
      }
      while (!eof() && /\s/.test(peek())) {
        next()
      }
    }

    if (eof()) {
      throw error(UNBALANCED_EXPRESSION)
    }
    next() // consume closing delimiter

    if (isComment) {
      return [':comment', ...list]
    }

    return startChar === '('
      ? list
      : startChar === '['
      ? [':seq', ...list]
      : [':map', ...list]
  }

  const _parseExpr = () => {
    while (!eof() && /\s/.test(peek())) {
      next()
    }

    if (eof()) {
      return null
    }

    const char = peek()

    if (char === ';') {
      while (!eof() && peek() !== '\n') {
        next()
      }
      return null
    }

    if (char === '(' || char === '[' || char === '{') {
      return parseList()
    }

    if (char === "'") {
      return parseString()
    }

    const atom = parseAtom()

    if (/^"/.test(atom)) {
      return atom
    }

    if (!isNaN(parseFloat(atom)) && isFinite(atom)) {
      return parseFloat(atom)
    }

    return atom
  }
  
  const parseExpr = withSrc(_parseExpr)

  const ast = []
  while (!eof()) {
    const expr = parseExpr()
    if (expr !== null) {
      ast.push(expr)
    }
  }

  return ast
}

module.exports = { parse }
