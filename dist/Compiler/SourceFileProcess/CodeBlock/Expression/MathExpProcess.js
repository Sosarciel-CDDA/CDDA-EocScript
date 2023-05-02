"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathExpProcess = void 0;
const ts_morph_1 = require("ts-morph");
const Functions_1 = require("../../Functions");
const EPInterface_1 = require("./EPInterface");
const CallExpProcess_1 = require("./CallExpProcess");
let _processFunc = {
    [ts_morph_1.SyntaxKind.NumericLiteral]: NumMathExpProcess,
    [ts_morph_1.SyntaxKind.StringLiteral]: NumMathExpProcess,
    [ts_morph_1.SyntaxKind.CallExpression]: CallMathExpProcess,
    [ts_morph_1.SyntaxKind.Identifier]: IdMathExpProcess,
    [ts_morph_1.SyntaxKind.BinaryExpression]: BinaryMathExpProcess,
    [ts_morph_1.SyntaxKind.ParenthesizedExpression]: ParentMathExpProcess, //括号
};
//SyntaxKind:ParenthesizedExpression
//处理表达式
//计算 返回Math右值字符串值
function MathExpProcess(node) {
    let out = new EPInterface_1.ExpPReturn();
    let func = _processFunc[node.getKind()];
    if (func == null)
        throw (0, Functions_1.throwLog)(node, "错误的 NumberExpProcess 表达式");
    let result = func.bind(this)(node);
    out.addPreFuncList(result.getPreFuncs());
    out.setToken(result.getToken());
    return out;
    //throw throwLog(node,"未知的数字表达式");
    //return outObj;
}
exports.MathExpProcess = MathExpProcess;
function IdMathExpProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.Identifier);
    let outObj = new EPInterface_1.ExpPReturn();
    let name = this.getLocalVal(node.getText());
    outObj.setToken(name);
    return outObj;
}
function NumMathExpProcess(node) {
    let outObj = new EPInterface_1.ExpPReturn();
    let name = node.getText();
    outObj.setToken(name);
    return outObj;
}
function CallMathExpProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    return CallExpProcess_1.CallExpProcess.bind(this)(node);
}
function BinaryMathExpProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.BinaryExpression);
    let outObj = new EPInterface_1.ExpPReturn();
    let lft = MathExpProcess.bind(this)(node.getLeft());
    let rit = MathExpProcess.bind(this)(node.getRight());
    let ope = node.getOperatorToken().getText();
    if (!lft.isVaild() || !rit.isVaild() || ope == null)
        return outObj;
    outObj.mergePreFuncList(lft);
    outObj.mergePreFuncList(rit);
    outObj.setToken(lft.getToken() + ope + rit.getToken());
    return outObj;
    //return { "math": [fst,mid,lst]}
}
function ParentMathExpProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.ParenthesizedExpression);
    let outObj = new EPInterface_1.ExpPReturn();
    let subObj = MathExpProcess.bind(this)(node.getExpression());
    outObj.mergePreFuncList(subObj);
    outObj.setToken("(" + subObj.getToken() + ")");
    return outObj;
}
