module.exports = grammar({
  name: 'wisp',

  // Rules for things that can appear anywhere between other tokens,
  // like whitespace and comments.
  extras: ($) => [/\s/, $.comment],

  rules: {
    // A source file is a sequence of zero or more expressions.
    source_file: ($) => repeat($._expression),

    // An expression is a choice between any of the language's constructs.
    _expression: ($) =>
      choice(
        $.list,
        $.bracket_list,
        $.brace_list,
        $.string,
        $.number,
        $.keyword,
        $.identifier,
      ),

    // --- Literals and Comments ---

    string: ($) => token(seq("'", /[^']*/, "'")),

    number: ($) => token(/-?\d+(\.\d+)?/),

    comment: ($) => token(seq(';', /.*/)),

    // --- Keywords and Identifiers ---

    keyword: ($) => token(choice(':', ':macro', 'ecma', '=>', '.')),

    identifier: ($) => /[^\\s()\[\]{}]+/,

    // --- Lists and Expressions ---

    list: ($) =>
      seq(
        '(',
        // The head of the list is treated as the function/macro name.
        field('head', $._expression),
        // The rest are arguments.
        repeat(field('argument', $._expression)),
        ')',
      ),

    bracket_list: ($) => seq('[', repeat($._expression), ']'),

    brace_list: ($) => seq('{', repeat($._expression), '}'),
  },
})
