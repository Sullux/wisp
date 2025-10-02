# Scope and Bindings

This document explains how to create local bindings for values and how lexical scope works in Wisp.

Wisp is an expression-based language. Instead of statements (like `const x = 42;`), it uses scoped expression blocks to create local bindings for values.

## Scoped Expressions: `(-> ...)`

The primary mechanism for creating a new lexical scope and local bindings is the `->` macro. A `->` block is an expression that allows you to define one or more named constants that exist only within that block.

The syntax consists of a series of binding pairs followed by a single body expression. The entire `->` block evaluates to the value of this final body expression.

**Syntax:** `(-> name1 value1 name2 value2 ... body-expression)`

```wisp
(->
  x 40
  y 2
  (+ x y)) ; The value of this expression is returned

; The entire -> block evaluates to 42
```

This is conceptually similar to a JavaScript IIFE (Immediately Invoked Function Expression). Bindings are immutable and only visible within the block.

**Alias:** For developers who prefer a more descriptive keyword, `let` is available as an alias for `->`. They are functionally identical.

## Destructuring

The `->` block also provides a powerful, unified syntax for destructuring—extracting values from objects and binding them to local names. This same syntax is used for [module imports](./MODULES.md).

### Positional Destructuring `[...]`

To bind names to the properties of an object, you can use bracket notation.

```wisp
(->
  point { x: 10, y: 20 }

  ; Binds local 'x' to point.x and local 'y' to point.y
  [x y] point

  (+ x y)) ; Evaluates to 30
```

### Renaming Destructuring `{...}`

To bind properties to different local names, you can use brace notation.

**Syntax:** `{ original-name new-name, ... }`

```wisp
(->
  point { x: 10, y: 20 }

  ; Binds local 'px' to point.x and local 'py' to point.y
  { x px, y py } point

  (+ px py)) ; Evaluates to 30
```

You can also mix and match: `[x, { y py }] point`.

### Spread Destructuring `...`

To bring all properties of an object into the current scope under their own names, use the spread `...` syntax.

```wisp
(->
  point { x: 10, y: 20 }

  ...point ; Brings 'x' and 'y' into scope

  (+ x y)) ; Evaluates to 30
```
