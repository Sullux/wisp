# Functions

Functions are the primary mechanism for abstraction and execution in Wisp. They are first-class citizens, meaning they can be treated like any other value: passed as arguments, returned from other functions, and bound to names.

In Wisp, a function is a **parameterized scoped expression**.

## Definition: `(=> ...)`

Functions are defined using the `=>` macro. The syntax consists of an optional argument list, followed by the function's body.

**Syntax with arguments:** `(=> (arg1 arg2 ...) body-expression)`
**Syntax with zero arguments:** `(=> body-expression)`

The body of a function must be a single expression, which is its return value. To define a function with local bindings, use a `->` block as the body. To perform a sequence of side effects, use a `do` block as the body.

```wisp
; A simple function that adds two numbers
(=> (x y) (+ x y))

; A zero-argument function that returns a constant
(=> 42)

; A function with local bindings
(=> (name)
  (-> greeting ('Hello, $1!' name)
    (log greeting)))

; A function that performs side effects
(=> (name)
  (do
    (log 'Greeting user...')
    (log ('Hello, $1' name))))
```

## Binding Functions to Names

To create a named function, you bind the `=>` expression to a name within a `->` block.

```wisp
(->
  add (=> (x y) (+ x y))
  
  ; The 'add' function is now in scope
  (add 40 2)) ; Returns 42
```

## Function Calls

A function is called by placing its name (or the function expression itself) as the first item in a list, followed by its arguments.

```wisp
(add 40 2) ; Returns 42

; Calling an anonymous function directly
((=> (x) (* x x)) 5) ; Returns 25
```

## Planned Features

The following features are planned for a future version of Wisp but are not yet implemented.

*   **Partial Application (Automatic Currying)**
*   **The Implicit `_` Argument**
