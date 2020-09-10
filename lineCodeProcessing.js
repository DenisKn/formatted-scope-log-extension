/**
 * Check if line code represents a class declaration
 * @author Chakroun Anas <chakroun.anas@outlook.com>
 */
function checkIfClass(lineCode) {
  const classNameRegex = /class(\s+)[a-zA-Z]+(.*){/;
  return classNameRegex.test(lineCode);
}

/**
 * Return the class name in case if the line code represents a class declaration
 */
function className(lineCode) {
  if (lineCode.split(/class /).length >= 2) {
    return lineCode.split(/class /)[1].split(' ')[0].split('{')[0].trim();
  }
  return '';
}

/**
 * Return a boolean indicating if the line code represents a named function declaration
 */
function checkIfFunction(lineCode) {
  const namedFunctionDeclarationRegex = /(function)?(\s*)[a-zA-Z]+(\s*)\(.*\):?(\s*)[a-zA-Z]*(\s*){/;
  const nonNamedFunctionDeclaration = /(function)(\s*)\(.*\)(\s*){/; // a() => {}
  // const s = function a() {
  // const s = a() {
  const namedFunctionExpressionRegex = /[a-zA-Z]+(\s*)=(\s*)(function)?(async)?(\s*)[a-zA-Z]*(\s*)\(.*\)(\s*)(=>)?(\s*){/;
  // methods
  const publicMethod = /(public)(\s*)(static)?(async)?(\s*)[a-zA-Z]+\(/;
  const privateMethod = /(private)(\s*)(static)?(async)?[a-zA-Z]+\(/;

  const isNamedFunctionDeclaration = namedFunctionDeclarationRegex.test(lineCode);
  const isNonNamedFunctionDeclaration = nonNamedFunctionDeclaration.test(lineCode);
  const isNamedFunctionExpression = namedFunctionExpressionRegex.test(lineCode);
  const isPublicMethod = publicMethod.test(lineCode);
  const isPrivateMethod = privateMethod.test(lineCode);

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
function functionName(lineCode) {
  if (/function(\s+)[a-zA-Z]+(\s*)\(.*\)(\s*){/.test(lineCode)) {
    if (lineCode.split("function ").length > 1) {
      return lineCode
        .split("function ")[1]
        .split("(")[0]
        .replace(/(\s*)/g, '');
    }
  } else {
    if (lineCode.split(/\(.*\)/).length > 1) {
      const textInTheLeftOfTheParams = lineCode.split(/\(.*\)/)[0];
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
    if (lineCode.split(/\((\s*)(\/\/)?/).length > 1) {
      const textInTheLeftOfTheParams = lineCode.split(/\((\s*)(\/\/)?/)[0];
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
function checkIfJSBuiltInStatement(lineCode) {
  const jSBuiltInStatement = /(if|switch|while|for|catch)(\s*)\(.*\)(\s*){/;
  return jSBuiltInStatement.test(lineCode);
}

module.exports.checkIfClass = checkIfClass;
module.exports.className = className;
module.exports.checkIfFunction = checkIfFunction;
module.exports.functionName = functionName;
module.exports.checkIfJSBuiltInStatement = checkIfJSBuiltInStatement;
