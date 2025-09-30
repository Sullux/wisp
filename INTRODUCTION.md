# Introduction to Wisp

This document provides a high-level introduction to the Wisp programming language.

## What is Wisp?

Wisp (a portmanteau of "Web Lisp") is a dynamic, functional programming language with a Lisp-like syntax that is designed to compile directly to highly readable and efficient JavaScript. It aims to provide the expressiveness and simplicity of a Lisp while seamlessly integrating with the entire JavaScript ecosystem, including browsers, Node.js, and the vast array of existing libraries.

The core idea behind Wisp is to treat JavaScript as a target platform, leveraging its powerful virtual machine, extensive standard library, and massive community, while offering a syntax that is more consistent, homoiconic, and geared towards a functional programming style.

## Philosophy and Goals

The design of Wisp is guided by several core principles:

*   **Seamless JavaScript Interoperability:** Wisp is not intended to replace JavaScript, but to complement it. Calling JavaScript functions from Wisp and vice-versa should be trivial and feel natural.
*   **Functional First:** The language encourages a functional programming paradigm with features like first-class functions, automatic currying (partial application), and a focus on immutable data structures.
*   **Expressive and Concise Syntax:** By using a Lisp-like syntax, Wisp reduces syntactic noise, allowing developers to focus on logic. The principle of "code is data" (homoiconicity) also opens the door for powerful macro-like capabilities through compile-time functions.
*   **Readability:** While concise, Wisp aims to produce compiled JavaScript that is clean, readable, and easy to debug, closely mirroring the structure of the original Wisp code.

## Getting Started

### Installation

*(Note: The Wisp compiler is still under development. The following instructions are provisional.)*

Once published, the Wisp compiler and toolchain will be available via standard JavaScript package managers. You will be able to install it in your project using `yarn` or `npm`:

```sh
# Using Yarn
yarn add --dev @wisp/compiler

# Using NPM
npm install --save-dev @wisp/compiler
```

### Quick Start: Hello, World!

As is tradition, the simplest way to start is by printing "Hello, World!" to the console.

Create a file named `hello.wisp`:

```wisp
; This is a Wisp program to greet the world
(log 'Hello, World!')
```

To run this, you will use the Wisp compiler to transpile it into a JavaScript file:

```sh
wisp compile hello.wisp -o hello.js
```

This will generate `hello.js` with the following content:

```javascript
// This is a Wisp program to greet the world
console.log('Hello, World!');
```

You can then execute the resulting JavaScript file using Node.js:

```sh
node hello.js
```

You will see the output:

```
Hello, World!
```
