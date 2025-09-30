# Functions

Functions are the primary mechanism for abstraction and execution in Wisp. They are first-class citizens, meaning they can be treated like any other value: passed as arguments, returned from other functions, and assigned to names.

## Definition: `(=> ...)`

Functions are defined using the `=>` (arrow) function. The syntax is `(=> arg1 arg2 ... body)`, where all terms before the final term are positional arguments, and the final term is the function's body, which is its return value.

```wisp
; A function that adds two numbers
(=> x y (+ x y))
```

This is directly equivalent to the JavaScript arrow function `(x, y) => x + y`.

You can assign a function to a name using a declaration:

```wisp
(: add (=> x y (+ x y)))
```

## Function Calls

A function is called by placing its name as the first item in a list, followed by its arguments.

```wisp
(add 40 2) ; Returns 42
```

## Partial Application (Automatic Currying)

A powerful feature of Wisp is that all functions are automatically "curried." This means that if you call a function with fewer arguments than it expects, it will return a new function that waits for the remaining arguments. This is also known as partial application.

Consider the `add` function from before:

```wisp
(: add (=> x y (+ x y)))

; Call with all arguments
(log (add 40 2)) ; 42

; Call with one argument
(: add40 (add 40))

; add40 is now a new function equivalent to (=> y (+ 40 y))
(log (add40 2)) ; 42

; You can also call it directly
(log ((add 40) 2)) ; 42
```

## The Implicit `_` Argument

For convenience, functions always receive a special scoped constant `_` (underscore), which is an alias for the *first unnamed argument* passed to the function. This allows for a more concise syntax, especially in callbacks.

For example, instead of `(=> x (+ x 1))`, you can simply write `(=> (+ _ 1))`.

This is particularly useful for functions like `map`:

```wisp
(: arr [1 2 3])

; The standard way
(map (=> x (+ x 1)) arr) ; [2 3 4]

; Using the implicit _ argument
(map (=> (+ _ 1)) arr) ; [2 3 4]

; Thanks to automatic currying, this can be even shorter
(: add1 (+ 1))
(map add1 arr) ; [2 3 4]
```

## Controlling Currying Order

By default, partial application applies arguments from left to right. However, sometimes you need to curry the "last" argument first. You can control this by explicitly using `_` in the argument list.

Consider a subtraction function. If we define it as `(=> x y (- x y))`, then `(- 5)` would create a function `(y) => 5 - y`. What if we wanted a function that subtracts 5 from a number, i.e., `(x) => x - 5`?

We can use `_` to specify which argument should be filled by partial application.

```wisp
; Define subtraction with explicit currying control
(: subtract (=> _ y (ecma '_ - y')))

; (subtract 5) now creates a function that takes one argument (_)
; and subtracts 5 (y) from it.
(: subtract5 (subtract 5))

(log (subtract5 10)) ; 5, because it evaluates as 10 - 5
```

If you want to give the placeholder argument a name for clarity within the function body, you can wrap it in parentheses: `(=> (_ x) y ...)`

```wisp
; This is functionally identical to the previous example
(: subtract (=> (_ x) y (ecma 'x - y')))
```

## Optional Arguments and Default Values

*(Note: This feature is planned but the syntax is not yet finalized.)*

## The Spread Function: `(...)`

The `(...)` syntax serves two purposes, similar to JavaScript's `...` operator: defining rest parameters and spreading values into arrays or objects.

### Rest Arguments in Function Definitions

In a function definition, `(...)` can be used to gather a variable number of arguments into an array.

```wisp
; JavaScript equivalent: (name, ...values) => ...
(=> name (... values) (
  map (=> (log name _) values)
))
```

### Spreading in Arrays and Objects

When used inside an array or object literal, `(...)` spreads the elements of an array or the properties of an object into the new literal.

```wisp
(: arr1 [1 2])
(: arr2 [3 4])
(: combined [(... arr1) (... arr2)]) ; [1 2 3 4]

(: obj1 {a 1 b 2})
(: obj2 {c 3 d 4})
(: combinedObj {(... obj1) (... obj2)}) ; {a 1 b 2 c 3 d 4}
```
