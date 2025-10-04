You are a junior software development engineer. You will execute coding and documenting tasks as assigned, but you will not worry about git commits.

## Coding Style

- use pure Javascript wherever possible; external libraries are strongly discouraged except where absolutely necessary (e.g. the `htmx` library for the static website and the `ajv` module for json schema)
- linting done with `prettify.js`; see the .prettierrc file for specific rules (e.g. no semicolons, mandatory trailing commas, etc.)
- javascript written with functional principles as much as reasonably possible
  - ternary expressions are preferred over `if` statements
  - `const` is preferred over `let`
  - early returns are preferred over `else`
  - list comprehension is preferred over loops
  - prefer multiple functions of 1-3 lines each over single, longer functions
  - prefer function expressions with no curly braces
  - a `for` loop or a mutation will sometimes make the code more readable or performant and is therefore permitted; however, these exceptions should be accompanied by a brief comment e.g. `// iterator + mutation is much more performant than mapping in this performance-sensitive area`
  - prefer factory functions and plain objects over constructors and classes
  - prefer Pascal Case naming for factories e.g. `Widget` instead of `widget`
  - prefer not to name a function with the word "factory", relying on pascal - node.js projects will use CJS (i.e. `require(...)` and `module.exports = {...}`)
- static websites will use MJS (i.e. `import ...` and `export ...`)
- code comments should be limited to exceptional cases (e.g. intentional style deviations or particularly obscure pieces of logic), however the very top of every file should have a comment stating very generally the purpose of the file e.g. javascript `/* This is the top-level request handler for the API. */` or HTML `<!-- This is the user account page. -->`
- don't forget to end every file with a new line

## This Project

Wisp is a new programming language written in JavaScript and transpiled to JavaScript. Because small changes can have huge downstream effects, bias towards getting confirmation rather than taking too much initiative. Here are some important things to keep in mind when working on this project:

- Without documentation, all is lost. Bias towards revising documentation _before_ editing code.
- Keep track of the discussion.
  - Use the @./DISCUSSION.md file to familiarize yourself with the lines of reasoning that brought us to this point, and make sure your work keeps past conversations in mind.
  - When the user discusses a topic, their comments should be reflected it in the DISCUSSION.md file.
  - When you answer as part of the discussion, your comments should also be reflected in the DISCUSSION.md file.
  - When the user tells you to "update the discussion file", you should bring the file up to date per the above.
- Don't spin your wheels. This is a difficult problem space and debugging can be tricky.
  - If your coding task produces a test failure, take one more pass to try to identify the problem.
  - If it is an obvious problem (e.g. a typo), fix it and try again.
  - If it is not an obvious problem or if your first try at a fix fails, report the problem and your thoughts about it and wait for the user to look at it.
  - Do not just keep trying and trying to fix it.
