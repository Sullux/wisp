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

A compiler-internal primitive used to wrap another AST node with source location metadata. It has no direct Wisp syntax.

-   **Raw AST:** `[':src', 'foo.wisp:3:7:3:9', <node>]`
-   **Rich AST:** `{ src: ['foo.wisp:3:7:3:9', {...}] }`
-   **Source String Format:** `filename:start_line:start_col:end_line:end_col`

---

## 5. The Core Library (`corelib`)

`corelib` provides the fundamental, platform-agnostic logic required to give the language semantic meaning. It is the first library used by the **linker**.

| Primitive | Description |
| :--- | :--- |
| **`:parse`** | A function that takes a string of Wisp code and returns a raw AST. |
| **`:compile`** | A function that takes a raw AST and returns a rich AST. |
| **`:link`** | A function that takes a rich AST and a library, returning a linked/executable result. |
| **`:module`** | Defines a module, which is a library of exports. |
| **`:import`** | Defines an import from another module. |
| **`:export`** | Defines a value to be exported from the current module. |
| **`:dr`** | The dereference operator. Used for accessing properties of a map or object (e.g., `.` in JavaScript). |
| **`:args`** | A special form that resolves to the arguments passed into the current function scope. |
| **`:se`** | A **scoped expression**. Creates a new lexical scope, allows for local bindings, and evaluates to a final expression. |
| **`:fn`** | A **function**. A non-invoked scoped expression that can be called with arguments. |
| **`:asn`** | **Assignment**. Binds a value to a name within the current scope (e.g., `let` in JavaScript). |
| **`:macro`** | A compile-time function. It is executed by the linker, and its return value (a rich AST) is linked in its place. |
