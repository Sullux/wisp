# Modules in Wisp

Wisp provides a robust module system that aligns with the modern JavaScript (ESM) standard while maintaining compatibility with the legacy CommonJS (CJS) ecosystem. This allows Wisp developers to write code using a single, consistent syntax and then target the desired JavaScript module system at compile time.

The module system is designed to be both statically analyzable for performance and tooling, and flexible enough to support dynamic loading for advanced use cases.

## Static Modules

Static modules form the backbone of a Wisp application's architecture. They use top-level `import` and `export` declarations to create a clear, analyzable dependency graph. This is the preferred method for structuring your projects.

### `export`

The `export` declaration makes a value or function from the current file available to other files.

You can export a variable or function definition directly:

```wisp
; -- file: ./math.wisp

; Export a variable
(export (: pi 3.14159))

; Export a function
(export (=> add (a b) (+ a b)))
```

You can also export a default value:

```wisp
; -- file: ./calculator.wisp
(export-default (=> (a b) (* a b)))
```

### `import`

The `import` declaration brings exported values from another module into the current scope.

To import named exports, use a list of identifiers:

```wisp
; -- file: ./main.wisp
(import [pi add] from "./math.wisp")

(log (add pi 2)) ;=> 5.14159
```

To import a default export, use a single identifier:

```wisp
(import multiply from "./calculator.wisp")

(log (multiply 3 4)) ;=> 12
```

### JavaScript Interoperability

You can import directly from JavaScript files. The compiler will automatically handle the correct file extension (`.js`, `.mjs`, or `.cjs`) based on the compilation target.

```wisp
; Import a CJS module like 'fs'
(import-js [readFile] from "fs")

; Import an ESM module from a local file
(import-js [myFunction] from "./utils.js")
```

## Dynamic Imports

For advanced use cases like lazy-loading modules, conditional dependencies, or loading code from a dynamic source, Wisp provides a `dynamic-import` macro. This is the equivalent of JavaScript's dynamic `import()` function or CJS's `require`.

The `dynamic-import` macro takes a single argument—the path to the module—and returns a `Promise` that resolves with the module's exports.

```wisp
(-> (dynamic-import "./math.wisp")
  (then (math)
    (log (math.add math.pi 10))))
;=> 13.14159
```

Because it returns a promise, you can use it with `await` in an async context for cleaner syntax.

## Compiler Targets

The Wisp compiler will have a `--target` flag that determines the output format.

*   `--target cjs`: Compiles Wisp module syntax to CommonJS (`require` and `module.exports`).
*   `--target mjs`: Compiles Wisp module syntax to ES Modules (`import` and `export`).

This allows the same Wisp codebase to seamlessly integrate with any JavaScript project, regardless of its underlying module system.
