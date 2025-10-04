/* This file contains the Environment factory for lexical scoping. */

const Environment = (bindings = {}, outer = null) => ({
  bindings,
  outer,
  find(name) {
    if (Object.prototype.hasOwnProperty.call(this.bindings, name)) {
      return this.bindings[name]
    }
    if (this.outer) {
      return this.outer.find(name)
    }
    return null
  },
  set(name, value) {
    this.bindings[name] = value
  },
})

module.exports = { Environment }
