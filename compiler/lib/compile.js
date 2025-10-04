/* This file contains the compiler for the Wisp language. */

const MALFORMED_MAP = 'Malformed map expression; expected pairs of atoms and values'
const MALFORMED_LABEL = 'Malformed label expression; expected a name and a value'
const MALFORMED_STRING = 'Malformed string expression; expected a value'
const UNKNOWN_PRIMITIVE = 'Unknown primitive: $1'

const error = (message, ...args) => {
  const err = new Error(
    message.replace(/\$(\d+)/g, (_, i) => args[i - 1] ?? ''),
  )
  err.stack = ''
  return err
}

const compileNode = (node) => {
  if (typeof node === 'string') {
    if (node === ':t') return { bool: true }
    if (node === ':f') return { bool: false }
    if (node.startsWith('"')) {
      return { atom: node.substring(1, node.length - 1) }
    }
    return { atom: node }
  }

  if (typeof node === 'number') {
    return { num: node }
  }

  if (Array.isArray(node)) {
    if (node.length === 0) {
      return { list: [] }
    }

    const [head, ...tail] = node
    switch (head) {
      case ':str':
        if (tail.length !== 1) throw error(MALFORMED_STRING)
        return { str: tail[0] }
      case ':seq':
        return { seq: tail.map(compileNode) }
      case ':comment':
        return { comment: tail.map(compileNode) }
      case ':label':
        if (tail.length !== 2) throw error(MALFORMED_LABEL)
        return {
          label: {
            name: compileNode(tail[0]),
            value: compileNode(tail[1]),
          },
        }
      case ':map': {
        const labels = []
        for (let i = 0; i < tail.length; i++) {
          const item = tail[i]
          if (Array.isArray(item) && item[0] === ':label') {
            labels.push(compileNode(item))
          } else {
            if (i + 1 >= tail.length) throw error(MALFORMED_MAP)
            const key = item
            const value = tail[++i]
            labels.push({
              label: {
                name: compileNode(key),
                value: compileNode(value),
              },
            })
          }
        }
        return { map: labels }
      }
      default:
        if (typeof head === 'string' && head.startsWith(':')) {
          throw error(UNKNOWN_PRIMITIVE, head)
        }
        return { list: node.map(compileNode) }
    }
  }

  return node
}

const compile = (rawAst) => rawAst.map(compileNode)

module.exports = { compile, compileNode }
