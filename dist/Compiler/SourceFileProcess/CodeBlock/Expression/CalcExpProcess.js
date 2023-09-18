"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalcExpProcess = void 0;
const ts_morph_1 = require("ts-morph");
const EPInterface_1 = require("./EPInterface");
const Functions_1 = require("../../Functions");
const MathExpProcess_1 = require("./MathExpProcess");
const _processFunc = {
    [ts_morph_1.SyntaxKind.VariableDeclaration]: VarCalcExpProcess,
    [ts_morph_1.SyntaxKind.BinaryExpression]: BinaryCalcExpProcess,
    [ts_morph_1.SyntaxKind.SemicolonToken]: EPInterface_1.VoidExpProcess, //分号
};
/** 所有 (lval opera rval) 赋值/比较/定义 表达式
 *  表达式处理路由
 */
function CalcExpProcess(node) {
    let out = new EPInterface_1.ExpPReturn();
    let func = _processFunc[node.getKind()];
    if (func == null)
        throw (0, Functions_1.throwLog)(node, "错误的 CalcExpProcess 表达式");
    let result = func.bind(this)(node);
    out.preFuncs.push(...result.preFuncs);
    out.token = result.token;
    return out;
}
exports.CalcExpProcess = CalcExpProcess;
/**表达式处理 */
function BinaryCalcExpProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.BinaryExpression);
    let out = new EPInterface_1.ExpPReturn();
    let lft = MathExpProcess_1.MathExpProcess.bind(this)(node.getLeft());
    let rit = MathExpProcess_1.MathExpProcess.bind(this)(node.getRight());
    let opera = node.getOperatorToken().getText();
    out.preFuncs.push(...lft.preFuncs);
    out.preFuncs.push(...rit.preFuncs);
    let obj = {};
    obj = { "math": [lft.token, opera, rit.token] };
    out.token = obj;
    return out;
}
/**变量申明表达式 */
function VarCalcExpProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.VariableDeclaration);
    let out = new EPInterface_1.ExpPReturn();
    let id = this.getLocalVal(node.getName());
    let rit = MathExpProcess_1.MathExpProcess.bind(this)(node.getInitializerOrThrow());
    out.preFuncs.push(...rit.preFuncs);
    let obj = {};
    obj = { "math": [id, "=", rit.token] };
    out.token = obj;
    return out;
}
