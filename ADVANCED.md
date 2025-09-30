# Advanced Topics

This document covers advanced features of Wisp that enable metaprogramming and extend the capabilities of the compiler.

## Macros

Throughout the documentation, we have used the term "function" to refer to runtime functions. Wisp also has a powerful compile-time macro system.

*   **Runtime Functions:** These are the functions you define with `=>`. They are compiled into standard JavaScript functions and are executed when your program runs.
*   **Macros (Compile-Time Functions):** These are special functions that are executed by the Wisp compiler *during the compilation process*. They are akin to macros in other Lisp dialects. They operate on the code itself, allowing you to manipulate, transform, or generate new code before the final JavaScript is produced.

### Concept and Usage

The power of macros is that they give the developer direct control over the compilation process. A macro is not called with evaluated arguments like a runtime function. Instead, it is invoked by the compiler with a rich **context object** representing the code it is expanding. This enables powerful metaprogramming for creating new language constructs, domain-specific languages (DSLs), or complex optimizations directly within Wisp.

### Defining a Macro

Macros are defined using a special declaration syntax: `(:macro name body)`. This pattern extends the standard `(:)` declaration, signaling that you are creating a compile-time function rather than a runtime constant.

The `body` of the macro must be a JavaScript-backed function, defined using `(ecma ...)`. This function receives the macro's **context object** as its single argument.

#### Example: The `twice` macro

This macro takes a single expression and duplicates it inside an addition.

```wisp
(:macro twice (ecma '
  ; The macro receives a context object. We destructure it to get
  ; the raw AST for the arguments passed to the macro.
  ({ raw: [n] }) => {
    // The macro returns a new raw AST, which the compiler will then
    // hydrate and compile in its place.
    return ["+", n, n]
  }
'))

; Now, when you write:
(twice 5)

; The compiler first runs the macro, which transforms the AST.
; It then compiles the result as if you had written:
(+ 5 5)
```

### The Macro Context Object

A macro's body function is invoked with a single, powerful argument: the **context object**. This object provides the macro with everything it needs to understand the code it is transforming and to interact with the compiler.

The properties of the context object are:

*   `raw`: An array containing the raw, un-hydrated AST of the arguments passed to the macro. This is useful for simple transformations where you only need the basic structure of the code. For `(my-macro arg1 arg2)`, `raw` would be `[<ast for arg1>, <ast for arg2>]`.
*   `ast`: An array containing the rich, hydrated AST nodes for the arguments. This is useful when you need more detailed information about the arguments, such as their source location or type.
*   `compile`: The main compiler `visit` function. You can call this on a hydrated AST node to compile it to a JavaScript string. This is the key to building complex macros that need to compile parts of their arguments.
*   `compileRaw`: A convenience function that takes a raw AST array, hydrates it, and compiles it in the current scope. This is useful for compiling newly constructed ASTs within your macro.

By providing access to the compiler's own machinery, the context object gives macro authors the power to create new language features that are indistinguishable from built-in ones.
