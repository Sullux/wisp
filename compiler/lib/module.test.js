const { Module } = require('./module')

describe('Whisp module', () => {
  it('should compile a project with imports and exports', () => {
    const files = {
      './math.wisp': `pi (export pi 3.14)`,
      './main.wisp': `
        (->
          [pi] (import './math.wisp')
          pi)
      `,
    }
    const loader = (path) => files[path]
    const compiledModule = Module('./main.wisp', { loader })
    const { entryPath, jsCode, fileCache } = compiledModule
    console.log('MAIN', jsCode)
    const mathJs = fileCache['./math.wisp']
    console.log('MATH', mathJs)

    expect(mathJs.trim()).toBe('3.14')
    expect(mainJs.trim()).toBe(
      "(() => { const pi = import default from './math.wisp';return pi })()",
    )
  })
})
