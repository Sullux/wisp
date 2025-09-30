# Variables and Scope

This document explains how to declare named values (constants) and how scope works in Wisp.

It's important to note that Wisp does not have mutable variables in the traditional sense; all declarations create constants whose values cannot be reassigned.

## Declarations: `(: ...)`

Named constants are created using the colon `(:)` function. A declaration is a statement, not an expression, meaning it does not return a value.

The basic syntax is `(: name value)`.

```wisp
(: x 42)
(: greeting 'Hello, World!')
```

This is conceptually similar to `const` in JavaScript.

Because declarations are not expressions, they are effectively "invisible" to the surrounding code in terms of evaluation flow. This allows you to place them within other expressions to provide context or "givens" for a calculation.

Consider this example:

```wisp
(
  (: x 40)
  (: y 2)
  + x y
)
```

Here, we declare `x` and `y` within a list. When the list is evaluated as a function call, the declarations are processed to establish the scope, but they are ignored during the function application itself. The expression is evaluated as if it were `(+ x y)`, but in a scope where `x` is `40` and `y` is `2`. The final result of the expression is `42`.

## Declaration Expressions: `(:: ...)`

While `(:)` is a statement that returns no value, Wisp also provides a declaration *expression*, `(::)`, which both declares a constant and returns its value.

The syntax `(:: name value)` is roughly equivalent to the assignment expression `(name = value)` in JavaScript.

This is most useful when you need to create and use a value in the same step, such as within a loop or a mapping function.

```wisp
(: toObject (=> arr (
  (: i 0)
  (fromEntries (map (=> (Array (:: i (++ i)) _)) arr))
)))

(log (toObject (Array 'a' 'b' 'c')))
; Expected output: { 0: 'a', 1: 'b', 2: 'c' }
```

In the expression `(Array (:: i (++ i)) _)`, the `(:: i (++ i))` part first increments `i`, then assigns the *new* value back to `i`, and finally returns that new value to be used as the first element in the new array.

## Scope

Scope in Wisp determines the visibility and lifetime of identifiers. The rules are very similar to lexical scoping in JavaScript.

### Function Scope

Any constant declared inside a function is local to that function and cannot be accessed from outside of it. Inner functions, however, can access constants from their parent (outer) scopes.

```wisp
(: x 10)

(: myFunction (=> y (
  (: z 20)
  (+ x y z) ; Can access global x, parameter y, and local z
)))

(log (myFunction 12)) ; 42
(log z) ; Error: z is not defined in this scope
```

### Expression Scope

In Wisp, any list (an expression enclosed in parentheses) creates its own scope. Declarations placed at the beginning of a list are scoped to that list and are not visible outside of it.

```wisp
(
  (: message 'Hello')
  (log message) ; "Hello"
)

(log message) ; Error: message is not defined in this scope
```

This is a powerful feature for creating isolated blocks of logic without polluting the surrounding scope. For example, you can have an expression `(: x 42 (1138))`. This is valid syntax: `x` is declared and scoped only to this expression. Since `x` is never used, the expression simply evaluates to its final term, `1138`.
