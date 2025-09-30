# Advanced Topics

This document covers advanced features of Wisp that enable metaprogramming and extend the capabilities of the compiler.

## Compile-Time Functions (CTFs)

Throughout the documentation, we have used the term "function" to refer to two distinct concepts: runtime functions and compile-time functions (CTFs). While they share the same calling syntax, their execution context and purpose are fundamentally different.

*   **Runtime Functions:** These are the functions you define with `=>`. They are compiled into standard JavaScript functions and are executed when your program runs. Examples include `log`, `+`, and any custom functions you create.
*   **Compile-Time Functions:** These are special functions that are executed by the Wisp compiler *during the compilation process*. They are more akin to macros in other Lisp dialects or the C preprocessor. They operate on the code itself, allowing you to manipulate, transform, or generate new code before the final JavaScript is produced. The `Object`, `Array`, `=>`, and `ecma` functions are all examples of built-in CTFs.

### Concept and Usage

The power of CTFs is that they give the developer direct control over the compilation process. A CTF is not called with evaluated arguments like a runtime function. Instead, it is invoked by the compiler with a rich data structure representing the code itself, allowing the macro to transform it before the final JavaScript is produced. This enables powerful metaprogramming for creating new language constructs, domain-specific languages (DSLs), or complex optimizations directly within Wisp.

### Defining a Macro (CTF)

Macros are defined using a special declaration syntax: `(:macro name body)`. This pattern extends the standard `(:)` declaration, signaling that you are creating a compile-time function rather than a runtime constant.

The `body` of the macro must be a JavaScript-backed function, defined using `(ecma ...)`. This function receives the macro's **Context Node** as its single argument.

#### Example: Inspection Macro

This `inspect` macro prints a structured view of its own Context Node to the console *during compilation* and then allows the compilation to proceed normally.

```wisp
(:macro inspect (ecma "
  function inspectMacro(contextNode) {
    // A helper to prevent circular logging from the 'parent' property
    const simplifiedNode = {
      ...contextNode,
      parent: '[Parent Node]',
      children: contextNode.children.map(c => c.type),
    };

    console.log('--- Macro Inspection ---');
    console.log(simplifiedNode);
    console.log('----------------------');

    // This macro is for inspection only, so it doesn't modify the node.
    // The compiler will proceed to compile the original expression.
    // For example, (inspect + 1 2) will still compile to add(1, 2).
    return contextNode;
  }
"))
```

#### Example: Transformation Macro

A more powerful macro can modify the AST before it is compiled. This `unless` macro transforms `(unless condition body)` into a standard `(if (! condition) body)` expression.

```wisp
(:macro unless (ecma "
  function unlessMacro(contextNode) {
    // 1. Validate the structure: (unless condition body)
    // The children are [unless, condition, body]
    if (contextNode.children.length !== 3) {
      throw new Error('Syntax Error: `unless` expects exactly 2 arguments.');
    }

    const conditionNode = contextNode.children[1];
    const bodyNode = contextNode.children[2];

    // 2. Create a new node to represent the negated condition: (! condition)
    const negatedConditionNode = {
      type: 'expression',
      parent: contextNode, // The parent is the 'if' expression we're building
      children: [
        { type: 'atom', compiledOutput: '!' }, // Synthetic '!' atom
        conditionNode,
      ],
      // Other properties would be inherited or synthesized
    };

    // 3. Mutate the original 'unless' node to become an 'if' node.
    // The compiler will now see this as a standard 'if' statement.
    contextNode.children[0].compiledOutput = 'if'; // Change 'unless' to 'if'
    contextNode.children[1] = negatedConditionNode; // Replace the condition
    contextNode.children[2] = bodyNode; // The body stays the same

    return contextNode;
  }
"))

; Now, when you write:
(unless some-condition (log 'it was false'))
; The compiler first runs the macro, transforms the AST, and then
; compiles it as if you had written:
(if (! some-condition) (log 'it was false'))
```

### The Macro Context Node

Instead of operating on a simple list of tokens, a macro's body function is invoked with a single, powerful argument: the **Context Node** for the expression it is transforming. This node is part of a larger Unified Context Tree that represents the entire program, giving the macro a rich understanding of its surroundings.

A macro's job is to inspect and, if necessary, modify this node (or its children) before the compiler continues its traversal. The key properties of a Context Node available to a macro are:

*   `type`: The type of the node, e.g., `'expression'`, `'atom'`, `'string'`.
*   `parent`: A reference to the parent node in the tree, allowing the macro to understand the scope it's in.
*   `children`: (Mutable) An array of child Context Nodes. This is what a macro will most commonly manipulate. For `(my-macro arg1 arg2)`, the `children` array would contain the nodes for `my-macro`, `arg1`, and `arg2`.
*   `declarations`: A `Map` object holding any declarations (`:` or `:macro`) made within the immediate scope of this node.
*   `source`: An object containing source map information, like `{ filename, start: { line, column }, end: { line, column } }`. This is crucial for providing high-quality error messages.
