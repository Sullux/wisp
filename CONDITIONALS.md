# Conditionals in Wisp

Wisp provides a rich and expressive suite of tools for handling conditional logic. It favors an expression-based approach, where a conditional block evaluates to a single value, aligning with the language's functional philosophy.

## Binary Conditional: `if`

The `if` form is the simplest and most common conditional, used for binary (true/false) choices. It is a macro that ensures only the chosen branch is evaluated.

**Syntax:** `(if <condition> <then-expression> <else-expression>)`

*   If `<condition>` evaluates to a truthy value, the `if` expression evaluates to the result of `<then-expression>`.
*   If `<condition>` evaluates to a falsy value, it evaluates to the result of `<else-expression>`.

**Example:**
```wisp
(: is-admin true)
(if is-admin
  (log "Welcome, admin!")  ; This expression is chosen
  (log "Access denied."))   ; This one is ignored
```

## Multi-Branch Conditional: `when` (and `cond`)

For more complex scenarios with multiple branching paths, Wisp provides the `when` macro. It evaluates a series of condition/result pairs and evaluates to the result of the first condition that is met.

**Syntax:** `(when <c1> <r1> <c2> <r2> ... <default-result>)`

*   It checks `c1`. If truthy, the entire `when` block evaluates to `r1`.
*   If not, it checks `c2`. If truthy, it evaluates to `r2`.
*   This continues for all pairs.
*   If none of the conditions are met, the block evaluates to the final, standalone `<default-result>`.
*   If no default is provided and no conditions are met, the expression evaluates to `undefined`.

**Examples:**
```wisp
(: score 85)

(when
  (> score 90) 'A'
  (> score 80) 'B'  ; This condition is met first
  (> score 70) 'C'
  'F')              ; Default case

;=> 'B'
```

**Alias:** For developers coming from a Lisp background, `cond` is available as an alias for `when`. They are functionally identical.

## Truthiness and Existence Checks

To handle the ambiguity of JavaScript's "truthiness" in a clear and explicit way, Wisp provides two utility macros.

### `?` (Truthy)

The `?` macro coerces any value to a strict boolean `true` or `false`, equivalent to JavaScript's `!!` operator.

**Syntax:** `(? <value>)`

**Example:**
```wisp
(? 0)    ;=> false
(? 'hi') ;=> true
(? nil)  ;=> false
```

### `??` (Exists)

The `??` macro checks for existence, returning `true` if a value is anything other than `null` or `undefined`. This is useful for avoiding common truthiness pitfalls with `0` or empty strings.

**Syntax:** `(?? <value>)`

**Example:**
```wisp
(?? 0)           ;=> true
(?? '')          ;=> true
(?? null)        ;=> false
(?? undefined)  ;=> false
```

## Value-Based Branching: `match`

Where `when` uses a series of boolean expressions, `match` compares a single subject value against multiple potential cases. It is an expression-based alternative to the `switch` statement.

**Syntax:** `(match <subject> <case1> <result1> <case2> <result2> ... <default-result>)`

**Example:**
```wisp
(: status 'success')

(match status
  'pending' (log "Loading...")
  'success' (process-data)  ; This branch is chosen
  'error'   (show-error)
  (log "Unknown status"))
```

## Predicate-Based Branching: `given`

The `given` macro is a high-level conditional that takes a subject and applies it to a series of predicate functions. This leverages Wisp's functional nature and automatic currying for highly expressive, point-free style.

**Syntax:** `(given <subject> <p1> <r1> <p2> <r2> ... <default-result>)`

*   Each `<p>` is a predicate function. The `<subject>` is passed to it.
*   The `given` block evaluates to the result `<r>` of the first predicate `<p>` that returns a truthy value.

**Example:**
```wisp
(-> temperature 3
  (given temperature
    (> 10)  "It's warm"
    (> 0)   "It's cool"   ; This predicate ((> 0) 3) is true
    (< 0)   "It's freezing"
    "It's exactly zero"))
  
;=> "It's cool"
```
