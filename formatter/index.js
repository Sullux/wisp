#!/usr/bin/env node

/* This file is the entry point for the wisp-fmt code formatter. */

const fs = require('fs')
const path = require('path')
const { parse } = require('../compiler/lib/parse')

const format = (ast) => {
  const MAX_LINE_LENGTH = 40
  const INDENT_SIZE = 2

  const printNode = (node, indent = 0) => {
    if (Array.isArray(node)) {
      // First, calculate the length if it were all on one line
      const singleLine = `(${node.map((n) => printNode(n, 0)).join(' ')})`

      // If it fits, use the single-line version
      if (singleLine.length <= MAX_LINE_LENGTH) {
        return singleLine
      }

      // If not, format it across multiple lines
      const head = printNode(node[0], indent)
      const tail = node.slice(1)
      const newIndent = indent + INDENT_SIZE
      const indentStr = ' '.repeat(newIndent)

      const children = tail.map((n) => indentStr + printNode(n, newIndent))

      return `( ${head}\n${children.join('\n')})`
    } else if (typeof node === 'object' && node.type === 'string') {
      return `'${node.value}'`
    } else {
      return String(node)
    }
  }

  return ast.map((node) => printNode(node, 0)).join('\n')
}

const main = () => {
  const args = process.argv.slice(2)
  if (args.length === 0) {
    console.error('Usage: wisp-fmt <file-or-directory>')
    process.exit(1)
  }

  const targetPath = path.resolve(args[0])

  if (!fs.existsSync(targetPath)) {
    console.error(`Error: Path not found: ${targetPath}`)
    process.exit(1)
  }

  // For now, we only handle single files
  const stat = fs.statSync(targetPath)
  if (stat.isDirectory()) {
    console.error('Error: Directory formatting is not yet implemented.')
    process.exit(1)
  }

  console.log(`Formatting ${targetPath}...`)

  const source = fs.readFileSync(targetPath, 'utf8')
  const ast = parse(source)
  const formattedSource = format(ast)
  const finalOutput = formattedSource.trim() + '\n'

  fs.writeFileSync(targetPath, finalOutput)

  console.log('Done.')
}

main()
