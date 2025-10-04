<!-- This document specifies the core primitives and compilation process for the Wisp language. -->

# Wisp Core Language Specification

## 1. Philosophy and Architecture

Wisp's compilation process is designed to be transparent, extensible, and composed of distinct, well-defined stages. This architecture makes the language highly modular and enables powerful metaprogramming capabilities.

The process follows a three-stage pipeline:

1.  **Parse:** A source string of Wisp code is converted into a basic, structural representation known as a **raw Abstract Syntax Tree (AST)**.
2.  **Compile:** The raw AST is processed into a semantically rich and validated representation known as a **rich Abstract Syntax Tree (AST)**.
3.  **Link:** The rich AST is combined with a **library** (a collection of core functions and macros) to produce a final, executable form.

This document specifies the language primitives up through the **Core Library (`corelib`)**, which defines the fundamental, platform-agnostic building blocks of the language.

---

## 2. The Compiler Pipeline

### 2.1. Parse Stage

-   **Input:** A string of Wisp source code.
-   **Output:** A **raw AST**.
-   **Description:** The raw AST is a simple array-based representation of the code's structure. It recognizes the fundamental shapes of the language (lists, atoms, etc.) but attaches no semantic meaning to them.

### 2.2. Compile Stage

-   **Input:** A raw AST.
-   **Output:** A **rich AST**.
-   **Description:** The rich AST is an object-based representation where each node is a tagged object describing its type and value. This stage validates the structure and identifies the core primitives of the language. The term "compile" is used here in the sense of compiling from a raw to a rich AST, not to a final machine-code target.

### 2.3. Link Stage

-   **Input:** A rich AST and a Library (e.g., `corelib`).
-   **Output:** An executable representation (e.g., a JavaScript function, a transpiled string, etc.).
-   **Description:** The linker walks the rich AST and uses the provided library to interpret its meaning. It resolves symbols, executes macros, and assembles the final output.

---

## 3. Lexical Primitives

These are the fundamental, indivisible elements that make up Wisp source code.

| Concept | Description | Examples |
| :--- | :--- | :--- |
| **Atom** | A sequence of characters representing a name, symbol, or operator. Atoms cannot begin with a number and are delimited by whitespace or structural characters `()[]{}"'`. | `x`, `my-variable`, `+`, `_`, `?` |
| **Whitespace** | One or more space, tab, or newline characters. Used to separate atoms and lists. | ` `, `	`, `
` |
| **Comment** | A semicolon `;` followed by any characters until a newline. Comments are treated as whitespace. | `; this is a comment` |

---

## 4. Concrete Primitives (Special Forms)

These are the core data structures and types recognized by the **compile** stage. Each primitive has a canonical form `(:<name> ...)` and may have a more common shortcut syntax.

### 4.1. `:atom`

A name or symbol used as an identifier (e.g., for a variable or function).

-   **Wisp Syntax:**
    -   `foo`
    -   `"an atom that starts with a number, 42"` (quoted)
-   **Raw AST:**
    -   `'foo'`
    -   `'"an atom that starts with a number, 42"'`
-   **Rich AST:**
    -   `{ atom: 'foo' }`
    -   `{ atom: 'an atom that starts with a number, 42' }`

### 4.2. `:list`

The fundamental grouping construct in Wisp, used for function calls and macros.

-   **Wisp Syntax:** `(element1 element2 ...)`
-   **Raw AST:** `['element1', 'element2', ...]`
-   **Rich AST:** `{ list: [{...}, {...}, ...] }`

### 4.3. `:str`

A literal string value.

-   **Canonical Syntax:** `(:str "hello world")`
-   **Shortcut Syntax:** `'hello world'`
-   **Raw AST:** `[':str', 'hello world']`
-   **Rich AST:** `{ str: 'hello world' }`

### 4.4. `:num`

A literal number value.

-   **Canonical Syntax:** `(:num 42)`
-   **Shortcut Syntax:** `42`
-   **Raw AST:** `[':num', 42]` or simply `42`
-   **Rich AST:** `{ num: 42 }`

### 4.5. `:t` and `:f`

The literal boolean values `true` and `false`.

-   **Wisp Syntax:** `:t` for true, `:f` for false.
-   **Raw AST:** `':t'`, `':f'`
-   **Rich AST:** `{ bool: true }`, `{ bool: false }`

### 4.6. `:label`

A name/value pair, primarily used inside a `:map`.

-   **Wisp Syntax:** `(:label name value)`
-   **Raw AST:** `[':label', 'name', <value>]`
-   **Rich AST:** `{ label: { name: { atom: 'name' }, value: {...} } }`

### 4.7. `:map`

An associative collection of name/value pairs.

-   **Canonical Syntax:** `(:map (:label key1 val1) (:label key2 val2))`
-   **Implicit Label Syntax:** `(:map key1 val1 key2 val2)`
-   **Shortcut Syntax:** `{ key1 val1 key2 val2 }`
-   **Raw AST (Implicit):** `[':map', 'key1', <val1>, 'key2', <val2>]`
-   **Rich AST:** `{ map: [ { label: ... }, { label: ... } ] }`

### 4.8. `:seq`

A sequential, ordered list of expressions (an array).

-   **Canonical Syntax:** `(:seq element1 element2)`
-   **Shortcut Syntax:** `[element1 element2]`
-   **Raw AST:** `[':seq', <element1>, <element2>]`
-   **Rich AST:** `{ seq: [ {...}, {...} ] }`

### 4.9. `:src`

The `:src` primitive is a special form used internally by the compiler to track the origin of every expression. It follows a hybrid model:

1.  **In the raw AST (Parser Output):** Every parsed node is wrapped in a `:src` list. This tightly couples the source location with the node, ensuring that AST transformations (e.g., in macros) carry the source information with them automatically.
    -   **Raw AST Syntax:** `[':src', location-string, <expression>]`

2.  **In the rich AST (Compiler Output):** The compiler unwraps the `:src` list. It compiles the inner `<expression>` into a rich AST object and then attaches the `location-string` as a `src` property on that object. This provides a clean, non-nested AST for the linker and other tools to consume.
    -   **Rich AST Object:** `{ <type>: ..., src: location-string }`

-   **Source String Format:** `filename:start_line:start_col:end_line:end_col`
    -   Example: `foo.wisp:3:7:3:9`

### 4.10. `:comment`

A comment block. The linker will parse and compile the contents of a comment block, but will ignore it and produce no output. This allows for multi-line comments and for commenting out entire S-expressions.

-   **Syntax:** `(; ...any content...)`
-   **Raw AST:** `[':comment', <...any content...>]`
-   **Rich AST:** `{ comment: [...] }`

---

## 5. The Core Library (`corelib`)

`corelib` provides the fundamental, platform-agnostic logic required to give the language semantic meaning. It is the first library used by the **linker**. Its primitives are the essential building blocks for creating abstractions.

### 5.1. Compiler API

These primitives expose the compiler's own pipeline, allowing for powerful metaprogramming.

-   **`:parse`**
    -   **Syntax:** `(:parse source-string)`
    -   **Operands:**
        -   `source-string`: A `:str` containing Wisp code.
    -   **Description:** Parses the source string and returns a raw AST.

-   **`:compile`**
    -   **Syntax:** `(:compile raw-ast)`
    -   **Operands:**
        -   `raw-ast`: A `:seq` representing a raw AST.
    -   **Description:** Compiles the raw AST and returns a rich AST.

-   **`:link`**
    -   **Syntax:** `(:link rich-ast library)`
    -   **Operands:**
        -   `rich-ast`: A rich AST object.
        -   `library`: A `:map` of functions to link against.
    -   **Description:** Links the rich AST with the provided library to produce an executable result.

### 5.2. Scoping and Bindings

-   **`:asn` (Assignment)**
    -   **Syntax:** `(:asn name value)`
    -   **Operands:**
        -   `name`: An `:atom` to be used as the binding's name.
        -   `value`: Any expression (`:expr`).
    -   **Description:** Binds `value` to `name` within the current lexical scope. This is a building block and is primarily used within a `:se` or `:fn`.

-   **`:se` (Scoped Expression)**
    -   **Syntax:** `(:se bindings-sequence return-expression)`
    -   **Operands:**
        -   `bindings-sequence`: A `:seq` containing zero or more `:asn` expressions.
        -   `return-expression`: The final `:expr` to be evaluated.
    -   **Description:** Creates a new lexical scope. It first evaluates all assignments in the `bindings-sequence`, making them available within the scope. It then evaluates and returns the value of the `return-expression`.
    -   **Example:**
        ```wisp
        ; Create a scope, bind x to 10 and y to 20, then return their sum.
        (:se
          (:seq
            (:asn x 10)
            (:asn y 20))
          (+ x y)) ; Assuming '+' is linked, this evaluates to 30.
        ```

### 5.3. Functions

-   **`:args`**
    -   **Syntax:** `:args`
    -   **Operands:** None.
    -   **Description:** A special atom that resolves to a `:seq` containing all arguments passed to the current function (`:fn`). It is only valid within the body of a function.

-   **`:dr` (Dereference)**
    -   **Syntax:** `(:dr collection key)`
    -   **Operands:**
        -   `collection`: An expression that evaluates to a `:seq` or `:map`.
        -   `key`: An expression that evaluates to a `:num` (for a `:seq`) or an `:atom` (for a `:map`).
    -   **Description:** Extracts a value from a collection.
    -   **Example:**
        ```wisp
        ; Get the first argument passed to a function
        (:dr :args 0)
        ```

-   **`:fn` (Function)**
    -   **Syntax:** `(:fn bindings-and-args-sequence return-expression)`
    -   **Operands:**
        -   `bindings-and-args-sequence`: A `:seq` of `:asn` expressions. These are used to formally bind arguments from `:args` to names, and to create other local bindings.
        -   `return-expression`: The `:expr` that serves as the function's body and return value.
    -   **Description:** Defines a function. The function is a non-invoked expression that can be stored in a binding and called later. When called, the arguments are available via the `:args` special form.
    -   **Example:**
        ```wisp
        ; Defines a function that takes two arguments and returns their sum.
        (:fn
          ; Bind 'a' to the first argument and 'b' to the second.
          (:seq
            (:asn a (:dr :args 0))
            (:asn b (:dr :args 1)))
          ; Return the result of adding them.
          (+ a b))
        ```

### 5.4. Modules

-   **`:import`**
    -   **Syntax:** `(:import path)`
    -   **Operands:**
        -   `path`: A `:str` representing the path to the module.
    -   **Description:** Imports a module. The result of this expression is a `:map` where the keys are the exported names and the values are the exported values.

-   **`:export`**
    -   **Syntax:** `(:export name value)`
    -   **Operands:**
        -   `name`: An `:atom` for the exported name.
        -   `value`: The `:expr` to be exported.
    -   **Description:** Marks a value for export from a module.

-   **`:module`**
    -   **Syntax:** `(:module scoped-expression)`
    -   **Operands:**
        -   `scoped-expression`: A `:se` that defines the module's contents.
    -   **Description:** Defines a module. The module's public interface is determined by the `:export` expressions used within its scope. The result of a linked module is a `:map` of its exports.

### 5.5. Metaprogramming

-   **`:macro`**
    -   **Syntax:** `(:macro name function-definition)`
    -   **Operands:**
        -   `name`: An `:atom` to bind the macro to.
        -   `function-definition`: A `:fn` that implements the macro's logic.
    -   **Description:** Defines a compile-time macro. When the linker encounters a call to `name`, it executes the `function-definition`. The arguments to the macro are passed to the function as a `:seq` of rich AST nodes. The function must return a new rich AST node, which the linker will then evaluate and link in place of the original macro call.
