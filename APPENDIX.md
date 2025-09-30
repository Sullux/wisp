# Appendix

This appendix contains supplementary material, including a glossary and comparisons to other languages.

## Glossary of Terms

*   **S-expression (Symbolic Expression):** The fundamental syntactic structure of Wisp, inherited from Lisp. It consists of a list of atoms (e.g., numbers, strings, identifiers) enclosed in parentheses.
*   **Homoiconicity:** The property where a language's source code is represented using its own primary data structures. In Wisp, code is written as lists, which are also a data structure you can manipulate within the language itself.
*   **Currying:** The technique of translating the evaluation of a function that takes multiple arguments into evaluating a sequence of functions, each with a single argument. Wisp functions do this automatically.
*   **Partial Application:** The process of fixing a number of arguments to a function, producing another function of smaller arity. This is the practical result of Wisp's automatic currying.
*   **CTF (Compile-Time Function):** A special function that runs during the compilation process, allowing for metaprogramming and manipulation of the code itself. Similar to macros in other Lisps.
*   **REPL (Read-Eval-Print Loop):** An interactive programming environment that takes single user inputs, executes them, and returns the result to the user.

## Wisp vs. JavaScript

| Feature               | JavaScript                               | Wisp                                                              |
| :-------------------- | :--------------------------------------- | :---------------------------------------------------------------- |
| **Syntax**            | C-style, with `{}` blocks and `;`        | Lisp-style S-expressions `(...)`                                  |
| **Functions**         | `function`, `=>` (arrow functions)       | `=>` for all function definitions                                 |
| **Operators**         | Infix (`x + y`)                          | Prefix / Function calls (`(+ x y)`)                               |
| **Mutability**        | `let` and `var` for mutable variables    | All declarations via `(:)` are constants (immutable)              |
| **Partial Application** | Manual implementation required         | Automatic for all functions                                       |
| **Metaprogramming**   | Limited (e.g., Proxies, Reflect)         | First-class via Compile-Time Functions (CTFs)                     |
| **Property Access**   | `obj.prop` or `obj['prop']`              | Unified `(. obj prop)`                                            |
| **`this` Context**    | Complex and often confusing rules        | Avoided in favor of passing the instance as the last argument     |

## Wisp vs. Other Lisps

Wisp shares its core S-expression syntax with other languages in the Lisp family (like Common Lisp, Scheme, and Clojure), but it has several key distinctions.

*   **Target Platform:** Wisp's primary and only target is the JavaScript runtime. This makes it a "hosted" language, deeply integrated with its host environment. In contrast, many other Lisps are self-hosted or compile to machine code.
*   **Interoperability:** Wisp's reason for being is its seamless interoperability with JavaScript. While other Lisps (like ClojureScript) also compile to JS, Wisp is designed to make the boundary feel as thin and natural as possible.
*   **Simplicity:** Wisp intentionally omits some of the more complex features of larger Lisps (e.g., a complex condition system or reader macros) in favor of a smaller, more focused language that leverages the underlying JavaScript platform for much of its functionality.
*   **Metaprogramming:** Wisp's Compile-Time Functions (CTFs) are its answer to the powerful macro systems of other Lisps. While the implementation is different (operating on a context object rather than direct code rewriting), the goal of allowing the programmer to extend the language is the same.
