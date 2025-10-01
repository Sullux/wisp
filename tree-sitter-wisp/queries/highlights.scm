; Comments
(comment) @comment

; Literals
(string) @string
(number) @number

; Keywords and Special Forms
(keyword) @keyword

; Punctuation
["(" ")"] @punctuation.bracket
["[" "]"] @punctuation.bracket
["{" "}"] @punctuation.bracket

; Identifiers and Function Names
(list
  (identifier) @function)

(identifier) @variable
