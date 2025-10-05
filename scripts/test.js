/* This script finds all .test.wisp files, compiles them to JavaScript,
 * and writes them out as .test.js files for Jest to run. */

const fs = require('node:fs')
const path = require('node:path')
const { compileModule } = require('../compiler/lib')
const { FileLoader } = require('../compiler/lib/fileLoader')

const stdDir = path.join(__dirname, '..', 'compiler', 'std')
const loader = FileLoader(stdDir)

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

const main = () => {
  console.log('(skipping wisp tests until implemented)')
  return
  const testFiles = findWispTestFiles(stdDir)

  console.log(`Compiling ${testFiles.length} Wisp test file(s)...`)

  testFiles.forEach((wispFile) => {
    let jsCode = compileModule(wispFile, { loader })
    jsCode = jsCode
      ? `${jsCode.trim()}\n`
      : `describe('wisp standard library', () => { test.todo('TODO: test ${wispFile}') })\n`
    const jsFile = wispFile.replace(/\.wisp$/, '.js')
    fs.writeFileSync(jsFile, jsCode)
    console.log(`  ✓ ${path.basename(wispFile)} -> ${path.basename(jsFile)}`)
  })

  console.log('Compilation complete.')
}

main()
