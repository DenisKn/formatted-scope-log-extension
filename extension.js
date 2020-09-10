// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const lineCodeProcessing = require("./lineCodeProcessing");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {any} lvl
 * @param {string} className
 * @param {string} methodName
 */
const format = (lvl, className, methodName) => {
  const isWithBrackets = false;
  /* if (lvl !== 'info' && lvl !== 'warn' && lvl !== 'error') {} */
  const logPrefix = 'this.log.';
  return `${logPrefix}${lvl}('${isWithBrackets ? '[' : ''}${className}:${methodName}${isWithBrackets ? ']' : ''}', {});`;
}

const buildMessage = (document, /* selection, */ lineOfSelection, lvl) => {
  const classThatEncloseTheSelection = enclosingBlockName(
    document,
    lineOfSelection,
    "class"
  );
  const funcThatEncloseTheSelection = enclosingBlockName(
    document,
    lineOfSelection,
    "function"
  );
  return format(lvl, classThatEncloseTheSelection, funcThatEncloseTheSelection);
}

/**
 * Return the number line of the block's closing brace
 */
function blockClosingBraceLineNum(
  document,
  lineNum
) {
  const docNbrOfLines = document.lineCount;
  let enclosingBracketFounded = false;
  let numberOfOpeningBrackets = 1;
  let numberOfClosingBrackets = 0;
  while (!enclosingBracketFounded && lineNum < docNbrOfLines - 1) {
    lineNum++;
    const currentLineText = document.lineAt(lineNum).text;
    /* if (/{/.test(currentLineText)) {
      nbrOfOpeningBrackets++;
    } */
    numberOfOpeningBrackets += currentLineText.split('{').length - 1;
    /* if (/}/.test(currentLineText)) {
      nbrOfClosingBrackets++;
    } */
    numberOfClosingBrackets += currentLineText.split('}').length - 1;
    
    if (numberOfOpeningBrackets === numberOfClosingBrackets) {
      enclosingBracketFounded = true;
      return lineNum;
    }
  }
  return lineNum;
}

/**
 * Return the name of the enclosing block whether if it's a class or a function
 * @author Chakroun Anas <chakroun.anas@outlook.com>
 */
function enclosingBlockName(
  document,
  lineOfSelectedVar,
  blockType
) {
  let currentLineNum = lineOfSelectedVar;
  while (currentLineNum >= 0) {
    const currentLineText = document.lineAt(currentLineNum).text;
    switch (blockType) {
      case 'class':
        if (lineCodeProcessing.checkIfClass(currentLineText)) {
          if (
            lineOfSelectedVar > currentLineNum &&
            lineOfSelectedVar < blockClosingBraceLineNum(document, currentLineNum)
          ) {
            return `${lineCodeProcessing.className(currentLineText)}`;
          }
        }
        break;
      case 'function':
        if (
          lineCodeProcessing.checkIfFunction(currentLineText) &&
          !lineCodeProcessing.checkIfJSBuiltInStatement(currentLineText)
        ) {
          if (
            lineOfSelectedVar >= currentLineNum &&
            lineOfSelectedVar < blockClosingBraceLineNum(document, currentLineNum)
          ) {
            if (lineCodeProcessing.functionName(currentLineText).length !== 0) {
              return `${lineCodeProcessing.functionName(currentLineText)}`;
            }
            return '';
          }
        }
        break;
    }
    currentLineNum--;
  }
  return '';
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "log-scope-ext" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let loginfo = vscode.commands.registerCommand('log-scope-ext.loginfo', function () {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World!');
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return; // No open text editor
    }
    const document = editor.document;
    const selection = editor.selection;
    const lineOfSelection = selection.active.line;
    const message = buildMessage(document, lineOfSelection, 'info');
    editor.edit(builder => {
      builder.replace(selection, message);
    });
  });

  let logwarn = vscode.commands.registerCommand('log-scope-ext.logwarn', function () {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World!');
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return; // No open text editor
    }
    const document = editor.document;
    const selection = editor.selection;
    const lineOfSelection = selection.active.line;
    const message = buildMessage(document, lineOfSelection, 'warn');
    editor.edit(builder => {
      builder.replace(selection, message);
    });
  });

  let logerror = vscode.commands.registerCommand('log-scope-ext.logerror', function () {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World!');
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return; // No open text editor
    }
    const document = editor.document;
    const selection = editor.selection;
    const lineOfSelection = selection.active.line;
    const message = buildMessage(document, lineOfSelection, 'error');
    editor.edit(builder => {
      builder.replace(selection, message);
    });
  });
  context.subscriptions.push(loginfo, logwarn, logerror);
  /* context.subscriptions.push(logwarn);
  context.subscriptions.push(logerror); */

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
  activate,
  deactivate
}
