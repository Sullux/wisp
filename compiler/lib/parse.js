/* This file contains the parser for the Wisp language. */

const UNEXPECTED_TOKEN_IN_CONST_EXPRESSION =
  'Unexpected token in const expression. Expected identifier, got $1'
const UNEXPECTED_TOKEN_IN_CONST_VALUE =
  'Unexpected token in const expression. Expected value, got $1'
const UNBALANCED_EXPRESSION = 'Unbalanced expression'
const UNEXPECTED_CHARACTER = 'Unexpected character: $1'
const UNEXPECTED_EOF = 'Unexpected end of file'
const UNEXPECTED_TOKEN = 'Unexpected token: $1'

const error = (message, ...args) => {
  const error = new Error(
    message.replace(/\$(\d+)/g, (_, i) => args[i - 1] ?? ''),
  )
  error.stack = ''
  return error
}

const parse = code => {
  let i = 0

  const next = () => {
    if (i >= code.length) {
      throw error(UNEXPECTED_EOF)
    }
    return code[i++]
  }

  const peek = () => code[i]

  const eof = () => i >= code.length

  const parseAtom = () => {
    let atom = ''
    while (!eof() && !/[\s(){}\[\]]/.test(peek())) {
      atom += next()
    }
    return atom
  }

  const parseString = () => {
    let str = ''
    next() // consume opening '
    while (peek() !== "'") {
      str += next()
    }
    next() // consume closing '
    return str
  }

  const parseList = () => {
    const startChar = next() // consume opening delimiter
    const endChar = { '(': ')', '[': ']', '{': '}' }[startChar]

    if (!endChar) {
      throw error(UNEXPECTED_CHARACTER, startChar)
    }

    const list = []
    while (peek() !== endChar) {
      if (eof()) {
        throw error(UNBALANCED_EXPRESSION)
      }
      list.push(parseExpr())
      while (/\s/.test(peek())) {
        next()
      }
    }
    next() // consume closing )

    return startChar === '(' ? list : [startChar, ...list]
  }

  const parseExpr = () => {
    while (/\s/.test(peek())) {
      next()
    }
    if (eof()) {
      return null
    }
    const char = peek()
    if (char === '(' || char === '[' || char === '{') {
      return parseList()
    } else if (char === "'") {
      return parseString()
    } else {
      return parseAtom()
    }
  }

  const ast = []
  while (!eof()) {
    const expr = parseExpr()
    if (expr) {
      ast.push(expr)
    }
  }

  return ast
}

module.exports = { parse }
