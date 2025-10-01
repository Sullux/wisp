#!/usr/bin/env node

/* This file is the entry point for the wisp-fmt code formatter. */

const fs = require('fs')
const path = require('path')
const { parse } = require('../compiler/lib/parse')

const format = (ast) => {
  const printNode = (node) => {
    if (Array.isArray(node)) {
      const children = node.map(printNode).join(' ')
      return `(${children})`
    } else if (typeof node === 'object' && node.type === 'string') {
      return `'${node.value}'`
    } else {
      return node
    }
  }

  return ast.map(printNode).join('\n')
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
