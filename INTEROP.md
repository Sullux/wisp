# Interoperability with JavaScript

Wisp is designed for seamless integration with the JavaScript ecosystem. This document outlines the features that allow Wisp to interact with existing JavaScript code, libraries, and platforms.

## Operators as Functions

Most standard JavaScript operators are available in Wisp as regular functions. Since Wisp syntax does not have infix operators, you simply use the operator's symbol as the function name.

| JavaScript | Wisp          |
| :--------- | :------------ |
| `x + y`    | `(+ x y)`     |
| `x > y`    | `(> x y)`     |
| `x === y`  | `(= x y)`     |
| `x && y`   | `(&& x y)`    |
| `!x`       | `(! x)`       |

A key difference is equality. Wisp uses a single equals sign `(=)` for strict equality, which is equivalent to JavaScript's `===`. This is possible because Wisp does not have assignment, freeing up the `=` symbol.

## Property Access: `(. ...)`

To access properties of a JavaScript object, Wisp provides the dot `(.)` function. This single function replaces both dot notation (`obj.prop`) and bracket notation (`obj['prop']`) from JavaScript.

```wisp
(: myObj { foo: 42, 'bar baz': 1138 })
(: myArr [10 20 30])

; Equivalent to myObj.foo
(. myObj foo) ; 42

; Equivalent to myObj['bar baz']
(. myObj 'bar baz') ; 1138

; Equivalent to myArr[1]
(. myArr 1) ; 20
```

## Instance Methods as Standalone Functions

Wisp encourages a more functional style by providing standalone functions that correspond to common JavaScript instance methods (like `String.prototype.startsWith` or `Array.prototype.includes`).

The convention is to pass the object instance (the `this` context in JavaScript) as the *last* argument to the function.

The general pattern is:

*   **JavaScript:** `object.method(arg1, arg2)`
*   **Wisp:** `(method arg1 arg2 object)`

Here are a few examples:

```wisp
(: myString 'hello world')
(: myArray [1 2 3])

; JavaScript: myString.startsWith('hello')
(startsWith 'hello' myString) ; true

; JavaScript: myArray.includes(2)
(includes 2 myArray) ; true
```

This design promotes consistency and works well with partial application. For example, you could create a reusable function to check for a specific prefix:

```wisp
(: startsWithHello (startsWith 'hello'))
(startsWithHello 'hello there') ; true
(startsWithHello 'goodbye world') ; false
```

## Direct JavaScript Execution: `(ecma ...)`

For situations where you need to drop down to raw JavaScript, Wisp provides the `ecma` function. This function takes a single string argument, which is executed as JavaScript code.

All Wisp constants that are in scope are available as variables within the `ecma` string. This provides a powerful escape hatch for accessing JavaScript features not yet wrapped by Wisp or for performance-critical code.

```wisp
(: x 10)
(: y 20)

; Use raw JavaScript to perform addition
(ecma 'x + y') ; 30
```

This is particularly useful for interacting with complex JavaScript APIs or libraries directly.

```wisp
; Example: Using the browser's DOM API
(ecma "document.getElementById('my-element').innerText = 'Hello from Wisp!'")
```

While powerful, `ecma` should be used judiciously. Prefer using Wisp's native functions when possible to maintain the benefits of the Wisp syntax and compilation process.
