# Advanced Topics

This document covers advanced features of Wisp that enable metaprogramming and extend the capabilities of the compiler.

## Compile-Time Functions (CTFs)

Throughout the documentation, we have used the term "function" to refer to two distinct concepts: runtime functions and compile-time functions (CTFs). While they share the same calling syntax, their execution context and purpose are fundamentally different.

*   **Runtime Functions:** These are the functions you define with `=>`. They are compiled into standard JavaScript functions and are executed when your program runs. Examples include `log`, `+`, and any custom functions you create.
*   **Compile-Time Functions:** These are special functions that are executed by the Wisp compiler *during the compilation process*. They are more akin to macros in other Lisp dialects or the C preprocessor. They operate on the code itself, allowing you to manipulate, transform, or generate new code before the final JavaScript is produced. The `Object`, `Array`, `=>`, and `ecma` functions are all examples of built-in CTFs.

### Concept and Usage

The power of CTFs is that they give the developer direct control over the compilation process. A CTF is not called with evaluated arguments like a runtime function. Instead, it is invoked by the compiler with a `context` object that contains the raw, unevaluated tokens of the expression, the current scope, and the compilation state.

The CTF's job is to process these tokens and return a new context object, which might have a modified token stream or an updated `compiled` string. This allows for powerful metaprogramming, enabling the creation of new language constructs, domain-specific languages (DSLs), or complex optimizations directly within Wisp.

### The Context Object

While runtime functions have a definable argument list, all CTFs receive a single `context` object and are expected to return a (potentially modified) `context` object. The context object has the following properties:

*   `tokens`: (Mutable) An array of the tokens that make up the rest of the expression to be processed. The CTF can inspect, consume, or modify this array.
*   `scope`: An object containing all named values currently in scope. This allows the CTF to check for the existence of identifiers or access their compile-time metadata.
*   `filename`: The absolute path of the file currently being compiled.
*   `compiled`: (Mutable) A string containing the JavaScript code that has been compiled so far. A CTF can directly append to this string to generate its output.
