# Modules

Wisp's module system is designed to be simple, expressive, and fully compatible with the JavaScript ecosystem. It is built on the same core concepts of scoped expressions (`->`) and destructuring that are used throughout the language.

## The Module as an Expression

A Wisp file is treated as a single, implicit scoped expression. This means you can define local bindings within a file, and the value of the final expression in the file becomes its **default export**.

```wisp
; math.wisp

; These are local bindings, not visible outside the module.
pi 3.14159
square (=> (x) (* x x))

; The last expression is the default export.
; This module will default export a function that calculates
; the area of a circle.
(=> (r) (* pi (square r)))
```

## Named Exports: `(export ...)`

To export a named value, you use the `export` macro. This macro marks a value for export while still allowing it to be used as a binding within the file.

**Syntax:** `(export <name-as-string> <value>)`

The `export` macro evaluates to `<value>`.

```wisp
; utils.wisp

; 'log-prefix' is local to this module
log-prefix '[WISP]'

; The 'log' function is bound locally AND marked for named export.
log (export 'log' (=> (msg) (console.log log-prefix msg)))

; The 'add' function is also bound locally and exported.
add (export 'add' (=> (x y) (+ x y)))

; This module has no default export, so its final value is undefined.
(do)
```

## Imports

Importing from other modules uses the same destructuring syntax as the `->` block. You create a binding where the "value" is an `(import ...)` expression.

**Syntax:** `(import <path-to-module>)`

### Default Imports

To import the default export of a module, bind it to a name.

```wisp
(->
  ; Bind the default export of 'math.wisp' to the local name 'area'
  area (import './math.wisp')

  (area 10)) ; Calculates area of a circle with radius 10
```

### Named Imports

To import named exports, use the standard destructuring syntax.

```wisp
(->
  ; Import 'log' and 'add' from 'utils.wisp'
  [log add] (import './utils.wisp')

  (log (add 1 2)))
```

### Renaming Imports

Renaming also uses the standard destructuring syntax.

```wisp
(->
  ; Import 'log' as 'print' and 'add' as 'sum'
  { log print, add sum } (import './utils.wisp')

  (print (sum 1 2)))
```