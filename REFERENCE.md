# Wisp Language Reference

*   **[Introduction](./INTRODUCTION.md)**
    *   [What is Wisp?](./INTRODUCTION.md#what-is-wisp)
    *   [Philosophy and Goals](./INTRODUCTION.md#philosophy-and-goals)
    *   [Getting Started](./INTRODUCTION.md#getting-started)
        *   [Installation](./INTRODUCTION.md#installation)
        *   [Quick Start: Hello, World!](./INTRODUCTION.md#quick-start-hello-world)
*   **[Language Fundamentals](./FUNDAMENTALS.md)**
    *   [Syntax and Grammar](./FUNDAMENTALS.md#syntax-and-grammar)
        *   [S-expressions: `(...)`](./FUNDAMENTALS.md#s-expressions-)
        *   [Shorthand Notations: `[...]` and `{...}`](./FUNDAMENTALS.md#shorthand-notations--and-)
    *   [Identifiers](./FUNDAMENTALS.md#identifiers)
        *   [Standard Identifiers](./FUNDAMENTALS.md#standard-identifiers)
        *   [Escaped Identifiers (e.g., `"foo bar"`)](./FUNDAMENTALS.md#escaped-identifiers)
    *   [Comments](./FUNDAMENTALS.md#comments)
        *   [Single-line comments: `;`](./FUNDAMENTALS.md#single-line-comments-)
        *   [Block comments: `(; ...)`](./FUNDAMENTALS.md#block-comments--)
    *   [Literals](./FUNDAMENTALS.md#literals)
        *   [Strings](./FUNDAMENTALS.md#strings)
            *   [Template Strings and Interpolation](./FUNDAMENTALS.md#template-strings-and-interpolation)
            *   [Escape Sequences](./FUNDAMENTALS.md#escape-sequences)
        *   [Numbers](./FUNDAMENTALS.md#numbers)
        *   [Arrays](./FUNDAMENTALS.md#arrays)
        *   [Objects](./FUNDAMENTALS.md#objects)
*   **[Variables and Scope](./VARIABLES.md)**
    *   [Declarations: `(: ...)`](./VARIABLES.md#declarations--)
    *   [Declaration Expressions: `(:: ...)`](./VARIABLES.md#declaration-expressions---)
    *   [Scope](./VARIABLES.md#scope)
        *   [Function Scope](./VARIABLES.md#function-scope)
        *   [Expression Scope](./VARIABLES.md#expression-scope)
*   **[Conditionals](./CONDITIONALS.md)**
    *   [Binary Conditional: `if`](./CONDITIONALS.md#binary-conditional-if)
    *   [Multi-Branch Conditional: `when` / `cond`](./CONDITIONALS.md#multi-branch-conditional-when-and-cond)
    *   [Truthiness and Existence: `?` / `??`](./CONDITIONALS.md#truthiness-and-existence-checks)
    *   [Value Matching: `match`](./CONDITIONALS.md#value-based-branching-match)
    *   [Predicate Matching: `given`](./CONDITIONALS.md#predicate-based-branching-given)
*   **[Functions](./FUNCTION.md)**
    *   [Definition: `(=> ...)`](./FUNCTION.md#definition---)
    *   [Function Calls](./FUNCTION.md#function-calls)
    *   [Partial Application (Automatic Currying)](./FUNCTION.md#partial-application-automatic-currying)
    *   [The Implicit `_` Argument](./FUNCTION.md#the-implicit-_-argument)
    *   [Controlling Currying Order](./FUNCTION.md#controlling-currying-order)
    *   [Optional Arguments and Default Values](./FUNCTION.md#optional-arguments-and-default-values)
    *   [The Spread Function: `(...)`](./FUNCTION.md#the-spread-function--)
        *   [Rest arguments in function definitions](./FUNCTION.md#rest-arguments-in-function-definitions)
        *   [Spreading in Arrays and Objects](./FUNCTION.md#spreading-in-arrays-and-objects)
*   **[Interoperability with JavaScript](./INTEROP.md)**
    *   [Operators as Functions](./INTEROP.md#operators-as-functions)
    *   [Property Access: `(. ...)`](./INTEROP.md#property-access---)
    *   [Instance Methods as Standalone Functions](./INTEROP.md#instance-methods-as-standalone-functions)
    *   [Direct JavaScript Execution: `(ecma ...)`](./INTEROP.md#direct-javascript-execution-ecma---)
*   **[Modules](./MODULES.md)**
    *   [Static Imports and Exports](./MODULES.md#static-modules)
    *   [Dynamic Imports](./MODULES.md#dynamic-imports)
    *   [Compiler Targets (CJS vs MJS)](./MODULES.md#compiler-targets)
*   **[Advanced Topics](./ADVANCED.md)**
    *   [Compile-Time Functions (CTFs)](./ADVANCED.md#compile-time-functions-ctfs)
        *   [Concept and Usage](./ADVANCED.md#concept-and-usage)
        *   [The Context Object](./ADVANCED.md#the-context-object)
*   **[Standard Library](./STANDARD.md)**
    *   [Core Functions](./STANDARD.md#core-functions)
    *   [Data Structures](./STANDARD.md#data-structures)
    *   [Utilities](./STANDARD.md#utilities)
*   **[Tooling](./TOOLING.md)**
    *   [Compiler](./TOOLING.md#compiler)
    *   [Interpreter (REPL)](./TOOLING.md#interpreter-repl)
    *   [Build System Integration](./TOOLING.md#build-system-integration)
    *   [Editor and IDE Support](./TOOLING.md#editor-and-ide-support)
*   **[Appendix](./APPENDIX.md)**
    *   [Glossary of Terms](./APPENDIX.md#glossary-of-terms)
    *   [Wisp vs. JavaScript](./APPENDIX.md#wisp-vs-javascript)
    *   [Wisp vs. Other Lisps](./APPENDIX.md#wisp-vs-other-lisps)

