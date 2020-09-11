/**
 * @file parts of code was borrowed from https://github.com/Chakroun-Anas/turbo-console-log
 */

/**
 * Check if line code represents a class declaration
 * @author Chakroun Anas <chakroun.anas@outlook.com>
 */
function checkIfClass(codeLine) {
  const classNameRegex = /class(\s+)[a-zA-Z]+(.*){/;
  return classNameRegex.test(codeLine);
}

/**
 * Return the class name in case if the line code represents a class declaration
 */
function className(codeLine) {
  if (codeLine.split(/class /).length >= 2) {
    return codeLine.split(/class /)[1].split(' ')[0].split('{')[0].trim();
  }
  return '';
}

/**
 * Return a boolean indicating if the line code represents a named function declaration
 */
function checkIfFunction(codeLine) {
  const namedFunctionDeclarationRegex = /(function)?(\s*)[a-zA-Z]+(\s*)\(.*\):?(\s*)[a-zA-Z]*(\s*){/;
  const nonNamedFunctionDeclaration = /(function)(\s*)\(.*\)(\s*){/; // a() => {}
  // const s = function a() {
  // const s = a() {
  const namedFunctionExpressionRegex = /[a-zA-Z]+(\s*)=(\s*)(function)?(async)?(\s*)[a-zA-Z]*(\s*)\(.*\)(\s*)(=>)?(\s*){/;
  // methods
  const publicMethod = /(public)(\s*)(static)?(async)?(\s*)[a-zA-Z]+\(/;
  const privateMethod = /(private)(\s*)(static)?(async)?[a-zA-Z]+\(/;

  const isNamedFunctionDeclaration = namedFunctionDeclarationRegex.test(codeLine);
  const isNonNamedFunctionDeclaration = nonNamedFunctionDeclaration.test(codeLine);
  const isNamedFunctionExpression = namedFunctionExpressionRegex.test(codeLine);
  const isPublicMethod = publicMethod.test(codeLine);
  const isPrivateMethod = privateMethod.test(codeLine);

  return (
    (isNamedFunctionDeclaration && !isNonNamedFunctionDeclaration) ||
    isNamedFunctionExpression ||
    isPublicMethod || isPrivateMethod
  );
}

/**
 * Return the function name in case if the line code represents a named function declaration
 * @author Chakroun Anas <chakroun.anas@outlook.com>
 */
function functionName(codeLine) {
  if (/function(\s+)[a-zA-Z]+(\s*)\(.*\)(\s*){/.test(codeLine)) {
    if (codeLine.split("function ").length > 1) {
      return codeLine
        .split("function ")[1]
        .split("(")[0]
        .replace(/(\s*)/g, '');
    }
  } else {
    if (codeLine.split(/\(.*\)/).length > 1) {
      const textInTheLeftOfTheParams = codeLine.split(/\(.*\)/)[0];
      if (/=/.test(textInTheLeftOfTheParams)) {
        if (textInTheLeftOfTheParams.split("=").length > 1) {
          return textInTheLeftOfTheParams
            .split("=")[0]
            .replace(/export |module.exports |const |var |let |=|(\s*)/g, '');
        }
      } else {
        return textInTheLeftOfTheParams.replace(
          /async|public|private|protected|static|export |(\s*)/g,
          ''
        );
      }
    } else
    if (codeLine.split(/\((\s*)(\/\/)?/).length > 1) {
      const textInTheLeftOfTheParams = codeLine.split(/\((\s*)(\/\/)?/)[0];
      if (/=/.test(textInTheLeftOfTheParams)) {
        if (textInTheLeftOfTheParams.split("=").length > 1) {
          return textInTheLeftOfTheParams
            .split("=")[0]
            .replace(/export |module.exports |const |var |let |=|(\s*)/g, '');
        }
      } else {
        return textInTheLeftOfTheParams.replace(
          /async|public|private|protected|static|export |(\s*)/g,
          ''
        );
      }
    }
  }
  return '';
}

/**
 * Return a boolean indicating if the line code represents an if, switch, while, for or catch statement
 * @author Chakroun Anas <chakroun.anas@outlook.com>
 */
function checkIfJSBuiltInStatement(codeLine) {
  const jSBuiltInStatement = /(if|switch|while|for|catch)(\s*)\(.*\)(\s*){/;
  return jSBuiltInStatement.test(codeLine);
}

module.exports.checkIfClass = checkIfClass;
module.exports.className = className;
module.exports.checkIfFunction = checkIfFunction;
module.exports.functionName = functionName;
module.exports.checkIfJSBuiltInStatement = checkIfJSBuiltInStatement;
