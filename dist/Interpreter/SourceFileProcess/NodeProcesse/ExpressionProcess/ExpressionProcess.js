"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionProcess = exports.ExpStatementProcess = void 0;
const ts_morph_1 = require("ts-morph");
const NPInterfaces_1 = require("../NPInterfaces");
const EPInterface_1 = require("./EPInterface");
const Functions_1 = require("../../Functions");
const NumberExpProcess_1 = require("./NumberExpProcess");
const CallExpProcess_1 = require("./CallExpProcess");
let _processFunc = {
    [ts_morph_1.SyntaxKind.VariableDeclaration]: VarDefineExpProcess,
    [ts_morph_1.SyntaxKind.BinaryExpression]: BinaryDefineExpProcess,
    [ts_morph_1.SyntaxKind.CallExpression]: CallDefineExpProcess,
    [ts_morph_1.SyntaxKind.SemicolonToken]: EPInterface_1.VoidExpProcess, //分号
};
function ExpStatementProcess(node, sfd) {
    //常规表达式列表
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.ExpressionStatement);
    let out = new NPInterfaces_1.ProcessReturn();
    let subExp = node.getExpression();
    let result = ExpressionProcess(subExp, sfd);
    out.addPreFuncList(result.getPreFuncs());
    out.addToken(result.getToken());
    return out;
}
exports.ExpStatementProcess = ExpStatementProcess;
//所有 (lval opera rval) 表达式
//表达式处理路由
function ExpressionProcess(node, sfd) {
    let out = new EPInterface_1.ExpProcessReturn();
    let func = _processFunc[node.getKind()];
    if (func == null)
        throw (0, Functions_1.throwLog)(node, "错误的 ExpressionProcess 表达式");
    let result = func(node, sfd);
    out.addPreFuncList(result.getPreFuncs());
    out.setToken(result.getToken());
    return out;
}
exports.ExpressionProcess = ExpressionProcess;
//变量定义
function BinaryDefineExpProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.BinaryExpression);
    let out = new EPInterface_1.ExpProcessReturn();
    let lft = (0, NumberExpProcess_1.MathExpProcess)(node.getLeft(), sfd);
    let rit = (0, NumberExpProcess_1.MathExpProcess)(node.getRight(), sfd);
    let opera = node.getOperatorToken().getText();
    out.addPreFuncList(lft.getPreFuncs());
    out.addPreFuncList(rit.getPreFuncs());
    let obj = {};
    obj = { "math": [lft.getToken(), opera, rit.getToken()] };
    out.setToken(obj);
    return out;
}
//变量定义
function VarDefineExpProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.VariableDeclaration);
    let out = new EPInterface_1.ExpProcessReturn();
    let id = node.getName();
    let rit = (0, NumberExpProcess_1.MathExpProcess)(node.getInitializerOrThrow(), sfd);
    out.addPreFuncList(rit.getPreFuncs());
    let obj = {};
    obj = { "math": [id, "=", rit.getToken()] };
    out.setToken(obj);
    return out;
}
//单独的函数调用
function CallDefineExpProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpProcessReturn();
    let result = (0, CallExpProcess_1.CallExpProcess)(node, sfd);
    //判断是否有函数返回 用于判断EToken
    if (result.getPreFuncs().length > 0)
        out.mergePreFuncList(result);
    else //EToken无函数返回
        out.setToken(result.getToken());
    return out;
}
