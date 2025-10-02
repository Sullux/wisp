# Side Effects

Wisp is an expression-based language, meaning that every construct, from a function call to a conditional, evaluates to a value. However, real-world programs often need to perform actions for their side effects, such as printing to the console, modifying a database, or updating the UI.

Wisp provides a clear and explicit mechanism for handling these situations: the `do` macro.

## `(do ...)`

The `do` macro takes one or more expressions, executes them in sequence, and discards their return values. The entire `do` block evaluates to `undefined`.

This provides a clearly demarcated "imperative" zone within your functional code, signaling to the reader that the expressions inside are being run for their effects, not for their resulting value.

**Syntax:** `(do expression1 expression2 ...)`

**Example:**
```wisp
(do
  (log "Starting process...")
  (perform-action)
  (log "Process complete."))
```

### Usage in Functions

The most common use for `do` is inside a function body. Wisp functions can only have a single body expression. If you need to perform a sequence of actions, you must wrap them in a `do` block.

```wisp
(=> (name)
  (do
    (validate-name name)
    (db-save-user name)
    (log "User saved!")))
```

**Alias:** For conciseness and cognitive continuity with the old `(::)` form, `::` is available as an alias for `do`. They are functionally identical.
