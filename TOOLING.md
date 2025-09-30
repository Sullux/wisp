# Tooling

This document describes the official command-line tools and editor integrations for the Wisp programming language.

*(Note: The Wisp tooling is currently under design and development. The contents of this document are provisional and subject to change.)*

## Compiler

The Wisp compiler, `wisp`, is the primary tool for transpiling Wisp code (`.wisp`) into JavaScript (`.js`).

### Usage

```sh
# Compile a single file
wisp compile <input.wisp> -o <output.js>

# Compile a directory
wisp compile <src-dir> --out-dir <dist-dir>

# Watch for changes and recompile
wisp compile <src-dir> --out-dir <dist-dir> --watch
```

## Interpreter (REPL)

Wisp will include an interactive Read-Eval-Print Loop (REPL) for experimenting with the language, testing ideas, and debugging.

### Usage

To start the REPL, run the `wisp` command without any arguments:

```sh
wisp
```

This will open an interactive prompt:

```
> (: x 40)
> (+ x 2)
42
> (log 'Hello from the Wisp REPL!')
Hello from the Wisp REPL!
```

## Build System Integration

Wisp is designed to integrate smoothly with modern JavaScript build tools. We plan to provide official plugins for popular bundlers and task runners like Vite, esbuild, and Rollup.

## Editor and IDE Support

A rich editing experience is crucial for developer productivity. The primary tool for this is the **Wisp Language Server**, which implements the Language Server Protocol (LSP). This allows any LSP-compatible editor to provide features like:

*   Syntax Highlighting
*   Autocompletion
*   Error Diagnostics (Linting)
*   Go-to-Definition
*   Hover Information

Official extensions will be provided for popular editors, starting with Visual Studio Code.
