"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoExpProcess = exports.ExpressionProcess = void 0;
const ts_morph_1 = require("ts-morph");
const NPInterfaces_1 = require("../NPInterfaces");
const Functions_1 = require("../../Functions");
const CallExpProcess_1 = require("./CallExpProcess");
const CalcExpProcess_1 = require("./CalcExpProcess");
const EPInterface_1 = require("./EPInterface");
const ValExpProcess_1 = require("./ValExpProcess");
//表达式申明处理
function ExpressionProcess(node, sfd) {
    //常规表达式列表
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.ExpressionStatement);
    //if(node.isKind(SyntaxKind.ExpressionStatement) || node.isKind())
    let out = new NPInterfaces_1.ProcessReturn();
    let subExp = node.getExpression();
    let result = AutoExpProcess(subExp, sfd);
    out.addPreFuncList(result.getPreFuncs());
    out.addToken(result.getToken());
    return out;
    //throw throwLog(node,"未知的申明表达式类型");
}
exports.ExpressionProcess = ExpressionProcess;
//表达式处理路由
function AutoExpProcess(node, sfd) {
    //直接调用函数
    if (node.isKind(ts_morph_1.SyntaxKind.CallExpression))
        return CallStateExpProcess(node, sfd);
    //表达式
    if (node.isKind(ts_morph_1.SyntaxKind.BinaryExpression)) {
        let opera = node.getOperatorToken().getText();
        if (['==', '>=', '<=', '>', '<', '=', '+=', '-=', '*=', '/=', '%='].includes(opera))
            return (0, CalcExpProcess_1.CalcExpProcess)(node, sfd);
        return (0, ValExpProcess_1.ValExpProcess)(node, sfd);
    }
    //单字
    if (node.isKind(ts_morph_1.SyntaxKind.Identifier) ||
        node.isKind(ts_morph_1.SyntaxKind.StringLiteral) ||
        node.isKind(ts_morph_1.SyntaxKind.NumericLiteral))
        return (0, ValExpProcess_1.ValExpProcess)(node, sfd);
    return (0, CalcExpProcess_1.CalcExpProcess)(node, sfd);
    //throw throwLog(node,"未知的申明表达式类型");
}
exports.AutoExpProcess = AutoExpProcess;
//直接调用函数
function CallStateExpProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpProcessReturn();
    let result = (0, CallExpProcess_1.CallExpProcess)(node, sfd);
    //判断是否有函数返回 用于判断EObj
    if (result.getPreFuncs().length > 0)
        out.addPreFuncList(result.getPreFuncs());
    else //EObj无函数返回
        out.setToken(result.getToken());
    return out;
}
