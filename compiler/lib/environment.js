/* This file contains the Environment factory for lexical scoping. */

const Environment = (library = {}, outer = null) => ({
  bindings: {},
  specialForms: library.specialForms || {},
  functions: library.functions || {},
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
  findSpecialForm(name) {
    if (Object.prototype.hasOwnProperty.call(this.specialForms, name)) {
      return this.specialForms[name]
    }
    if (this.outer) {
      return this.outer.findSpecialForm(name)
    }
    return null
  },
  findFunction(name) {
    if (Object.prototype.hasOwnProperty.call(this.functions, name)) {
      return this.functions[name]
    }
    if (this.outer) {
      return this.outer.findFunction(name)
    }
    return null
  },
  set(name, value) {
    this.bindings[name] = value
  },
})

module.exports = { Environment }
