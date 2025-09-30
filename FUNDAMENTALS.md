# Language Fundamentals

This document covers the basic building blocks of the Wisp language, including its syntax, data types, and core grammar.

## Syntax and Grammar

Wisp's syntax is based on S-expressions (Symbolic Expressions), a notation originating with Lisp. This means that all code is written as a series of nested lists.

### S-expressions: `(...)`

The fundamental structure in Wisp is the list, denoted by parentheses `(...)`. The first item in a list is treated as a function or operator, and the subsequent items are its arguments. For example, a simple addition operation is written as:

```wisp
(+ 40 2)
```

This expression represents a call to the `+` function with `40` and `2` as its arguments.

### Shorthand Notations: `[...]` and `{...}`

For convenience, Wisp provides shorthand notations for array and object literals, which are functionally identical to their S-expression counterparts:

*   `[1 2 3]` is shorthand for `(Array 1 2 3)`
*   `{foo 42}` is shorthand for `(Object foo 42)`

These are discussed in more detail in the [Literals](#literals) section.

## Identifiers

Identifiers are the names used for variables, constants, and functions.

### Standard Identifiers

In Wisp, an identifier can be any string that does not contain parentheses or whitespace and does not begin with a number. This is more permissive than many other languages, allowing for characters that are often reserved. For example, `*`, `+`, and `is-valid?` are all valid identifiers.

### Escaped Identifiers

To use identifiers that contain spaces or other special characters, you can escape them with double quotes (`"`). This is particularly useful for object keys.

```wisp
; A standard identifier
(: fooBar 42)

; An escaped identifier with a space
(: "foo bar" 42)
```

**Note:** Double quotes are used *only* for identifiers, never for string literal values.

## Comments

Wisp supports two forms of comments.

### Single-line comments: `;`

A semicolon (`;`) marks the beginning of a comment that extends to the end of the line.

```wisp
; This is a comment
(+ x y) ; This is also a comment
```

### Block comments: `(; ...)`

Because Wisp's syntax is just a series of lists, you can create a block comment by making the semicolon the first item in a list. The entire list is then treated as a comment. This is useful for commenting out multi-line blocks of code.

```wisp
(; This is a
   multi-line
   comment block. )
(+ x y)
```

You can also use this to easily comment out a block of code by simply adding a semicolon after the opening parenthesis:

```wisp
(; This whole expression is now a comment
  (: x 40)
  (: y 2)
  (+ x y)
)
```

## Literals

Literals are notations for representing fixed values in source code.

### Strings

Strings are sequences of characters enclosed in single quotes (`'`).

```wisp
'Hello, Wisp!'
```

#### Template Strings and Interpolation

If a string is used where a function would normally be, it is treated as a template literal. You can embed expressions within it using `${...}` or reference arguments by their 1-based index with `$1`, `$2`, etc.

```wisp
(: name 'Wisp')

; Using an in-scope variable
('Hello, ${name}!') ; "Hello, Wisp!"

; Using positional arguments
('Hello, $1!' 'Wisp') ; "Hello, Wisp!"
```

#### Escape Sequences

The characters `\`, `'`, and `$` have special meaning within strings and must be escaped with a backslash (`\`) if you want to include them literally. A backslash preceding any other character is ignored.

```wisp
'A single quote: \''
'A dollar sign: \$'
'A backslash: \\'
```

### Numbers

Numeric literals in Wisp follow the same lexical rules as JavaScript, including integers, floating-point numbers, and scientific notation. For a detailed reference, see the [MDN documentation on numeric literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#numeric_literals).

### Arrays

Arrays are ordered collections of values. They can be created with the `Array` function or the `[...]` shorthand.

```wisp
; Both of these create the same array
(Array 1 2 3)
[1 2 3]
```

### Objects

Objects are collections of key-value pairs. They can be created with the `Object` function or the `{...}` shorthand.

```wisp
; Both of these create the same object: { foo: 42, bar: 'baz' }
(Object foo 42 bar 'baz')
{foo 42 bar 'baz'}
```

Wisp provides four mechanisms for specifying keys in an object literal, mirroring JavaScript's capabilities:

*   **Direct:** An unquoted identifier. ` {foo 42} `
*   **Escaped:** A single-quoted string for keys that are not valid identifiers. ` {'foo bar' 42} `
*   **Interpolated:** A double-quoted identifier to use the *value* of a variable as the key. ` (: myKey 'foo') ({"myKey" 42}) `
*   **Inline:** A bracketed identifier to use a variable's name as the key and its value as the property's value (shorthand for `key key`). ` (: foo 42) ({[foo]}) `
