/* This script finds all .test.wisp files, compiles them to JavaScript,
 * and writes them out as .test.js files for Jest to run. */

const fs = require('fs')
const path = require('path')
const { compileProject } = require('../compiler/lib/index')

const stdDir = path.join(__dirname, '..', 'compiler', 'std')

const findWispTestFiles = (dir) => {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat && stat.isDirectory()) {
      results = results.concat(findWispTestFiles(filePath))
    } else if (filePath.endsWith('.test.wisp')) {
      results.push(filePath)
    }
  })
  return results
}

const fileProvider = (filePath) => {
  try {
    // Resolve paths relative to the std directory
    const absolutePath = path.resolve(stdDir, filePath)
    return fs.readFileSync(absolutePath, 'utf8')
  } catch (e) {
    // Allow Node module resolution
    if (e.code === 'ENOENT') {
      try {
        return require.resolve(filePath)
      } catch (e2) {
        return undefined
      }
    }
    return undefined
  }
}

const main = () => {
  const testFiles = findWispTestFiles(stdDir)

  console.log(`Compiling ${testFiles.length} Wisp test file(s)...`)

  testFiles.forEach((wispFile) => {
    const compiled = compileProject(wispFile, fileProvider)
    const jsCode = `${compiled.get(wispFile)}\n`
    const jsFile = wispFile.replace(/\.wisp$/, '.js')
    fs.writeFileSync(jsFile, jsCode)
    console.log(`  ✓ ${path.basename(wispFile)} -> ${path.basename(jsFile)}`)
  })

  console.log('Compilation complete.')
}

main()
