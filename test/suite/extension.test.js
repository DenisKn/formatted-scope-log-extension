const assert = require('assert');
const codeLineProcessing = require("../../codeLineProcessing");

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
// const myExtension = require('../extension');

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.equal(-1, [1, 2, 3].indexOf(5));
		assert.equal(-1, [1, 2, 3].indexOf(0));
		assert.equal(1, [1, 2, 3].indexOf(2));
	});

	test('Line code processing tests: method checkIfFunction', () => {
		assert.equal(true, codeLineProcessing.checkIfFunction('export function functionName(){'));
		assert.equal(true, codeLineProcessing.checkIfFunction('const varName = () => {'));
		assert.equal(true, codeLineProcessing.checkIfFunction('const varName = (a, b) => {'));
		assert.equal(true, codeLineProcessing.checkIfFunction('export methodName(){'));
		assert.equal(true, codeLineProcessing.checkIfFunction('public static methodName() {'));
		assert.equal(true, codeLineProcessing.checkIfFunction('public static methodName(a, b, c) {'));
		assert.equal(true, codeLineProcessing.checkIfFunction('private methodName('));
		assert.equal(false, codeLineProcessing.checkIfFunction('class Function('));
	});

	test('Line code processing tests: method functionName', () => {
		assert.equal('functionName', codeLineProcessing.functionName('export function functionName(){'));
		assert.equal('varName', codeLineProcessing.functionName('const varName = () => {'));
		assert.equal('varName', codeLineProcessing.functionName('const varName = (a, b) => {'));
		assert.equal('methodName', codeLineProcessing.functionName('export methodName(){'));
		assert.equal('methodName', codeLineProcessing.functionName('public static methodName() {'));
		assert.equal('methodName', codeLineProcessing.functionName('public static methodName(a, b, c) {'));
		assert.equal('methodName', codeLineProcessing.functionName('private methodName('));
	});

	test('Line code processing tests: method checkIfClass', () => {
		assert.equal(true, codeLineProcessing.checkIfClass('class A {'));
		assert.equal(true, codeLineProcessing.checkIfClass('class A{'));
		assert.equal(true, codeLineProcessing.checkIfClass('class A extends B {'));
		assert.equal(true, codeLineProcessing.checkIfClass('class A extends B, C {'));
		assert.equal(true, codeLineProcessing.checkIfClass('class A extends B implements IOne, ITwo {'));
		assert.equal(true, codeLineProcessing.checkIfClass('class A implements IOne, ITwo {'));
		assert.equal(true, codeLineProcessing.checkIfClass('export class A implements IOne, ITwo {'));
		assert.equal(false, codeLineProcessing.checkIfClass('const s = "class"; //comment'));
		assert.equal(false, codeLineProcessing.checkIfClass('export function class (a, b) {}'));
	});

	test('Line code processing tests: method className', () => {
		assert.equal('A', codeLineProcessing.className('class A {'));
		assert.equal('A', codeLineProcessing.className('class A{'));
		assert.equal('A', codeLineProcessing.className('class A extends B {'));
		assert.equal('A', codeLineProcessing.className('class A extends B, C {'));
		assert.equal('A', codeLineProcessing.className('class A extends B implements IOne, ITwo {'));
		assert.equal('A', codeLineProcessing.className('class A implements IOne, ITwo {'));
	});
});
