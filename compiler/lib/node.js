/* This file defines the unified Node class for the AST. */

const Node = ({
  type,
  value = null,
  children = [],
  parent = null,
  source = {},
  ast,
}) => ({
  type,
  value,
  children,
  parent,
  source,
  declarations: new Map(),
  ast,
})

module.exports = { Node }
