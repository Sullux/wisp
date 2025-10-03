const fs = require('fs')
const path = require('path')

const FileLoader = (rootPath = process.cwd()) => {
  const load = (filePath) => {
    try {
      // Resolve paths relative to the std directory
      const absolutePath = path.resolve(rootPath, filePath)
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
  return load
}

module.exports = { FileLoader }
