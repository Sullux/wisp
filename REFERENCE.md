# Wisp Language Reference

*   **[Introduction](./INTRODUCTION.md)**
    *   [What is Wisp?](./INTRODUCTION.md#what-is-wisp)
    *   [Philosophy and Goals](./INTRODUCTION.md#philosophy-and-goals)
    *   [Getting Started](./INTRODUCTION.md#getting-started)
        *   [Installation](./INTRODUCTION.md#installation)
        *   [Quick Start: Hello, World!](./INTRODUCTION.md#quick-start-hello-world)
*   **[Language Fundamentals](./FUNDAMENTALS.md)**
    *   [Syntax and Grammar](./FUNDAMENTALS.md#syntax-and-grammar)
    *   [Identifiers](./FUNDAMENTALS.md#identifiers)
    *   [Comments](./FUNDAMENTALS.md#comments)
    *   [Literals](./FUNDAMENTALS.md#literals)
*   **[Scope and Bindings](./VARIABLES.md)**
    *   [Scoped Expressions: `(-> ...)` / `(let ...)` ](./VARIABLES.md#scoped-expressions----)
    *   [Destructuring](./VARIABLES.md#destructuring)
*   **[Functions](./FUNCTION.md)**
    *   [Definition: `(=> ...)` ](./FUNCTION.md#definition---)
    *   [Function Calls](./FUNCTION.md#function-calls)
*   **[Side Effects](./EFFECTS.md)**
    *   [The `(do ...)` Macro](./EFFECTS.md#do--)
*   **[Conditionals](./CONDITIONALS.md)**
    *   [Binary Conditional: `if`](./CONDITIONALS.md#binary-conditional-if)
    *   [Multi-Branch Conditional: `when` / `cond`](./CONDITIONALS.md#multi-branch-conditional-when--cond)
    *   [Truthiness and Existence: `?` / `??`](./CONDITIONALS.md#truthiness-and-existence-checks)
    *   [Value Matching: `match`](./CONDITIONALS.md#value-based-branching-match)
    *   [Predicate Matching: `given`](./CONDITIONALS.md#predicate-based-branching-given)
*   **[Modules](./MODULES.md)**
    *   [The Module as an Expression](./MODULES.md#the-module-as-an-expression)
    *   [Named Exports](./MODULES.md#named-exports-export--)
    *   [Imports](./MODULES.md#imports)
*   **[Interoperability with JavaScript](./INTEROP.md)**
    *   [Operators as Functions](./INTEROP.md#operators-as-functions)
    *   [Property Access: `(. ...)` ](./INTEROP.md#property-access----)
    *   [Direct JavaScript Execution: `(ecma ...)` ](./INTEROP.md#direct-javascript-execution-ecma---)
*   **[Advanced Topics](./ADVANCED.md)**
    *   [Macros](./ADVANCED.md#macros)
        *   [Defining a Macro](./ADVANCED.md#defining-a-macro)
        *   [The Macro Context Object](./ADVANCED.md#the-macro-context-object)
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

