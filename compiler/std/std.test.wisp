(describe 'Wisp Standard Library'
  (=>
    (it 'should have tests'
      (=>
        (. (expect true) (toBe true))))))

(; describe 'Conditionals'
  (=>
    (it 'should execute the "then" branch with a truthy condition'
      (=>
        (: result (if true 'then-branch' 'else-branch'))
        (. (expect result) (toBe 'then-branch'))))

    (it 'should execute the "else" branch with a falsy condition'
      (=>
        (: result (if false 'then-branch' 'else-branch'))
        (. (expect result) (toBe 'else-branch'))))))
