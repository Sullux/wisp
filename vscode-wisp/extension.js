// The module 'vscode' contains the VS Code extensibility API
// This file is the main entry point for your extension

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // The syntax highlighter is purely declarative, so this function can be empty.
  // This file is just needed to make the extension development host work correctly.
  console.log('Wisp syntax highlighter activated.');
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
