"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanExpProcess = void 0;
const ts_morph_1 = require("ts-morph");
const EPInterface_1 = require("./EPInterface");
const Functions_1 = require("../../Functions");
const NumberExpProcess_1 = require("./NumberExpProcess");
const CallExpProcess_1 = require("./CallExpProcess");
let _processFunc = {
    [ts_morph_1.SyntaxKind.BinaryExpression]: BinaryBoolExpProcess,
    [ts_morph_1.SyntaxKind.CallExpression]: CallBoolExpProcess,
    [ts_morph_1.SyntaxKind.SemicolonToken]: EPInterface_1.VoidExpProcess, //分号
};
//条件判断
function BooleanExpProcess(node, sfd) {
    let out = new EPInterface_1.ExpProcessReturn();
    let func = _processFunc[node.getKind()];
    if (func == null)
        throw (0, Functions_1.throwLog)(node, "错误的 BooleanExpProcess 表达式");
    let result = func(node, sfd);
    out.addPreFuncList(result.getPreFuncs());
    out.setToken(result.getToken());
    return out;
}
exports.BooleanExpProcess = BooleanExpProcess;
function BinaryBoolExpProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.BinaryExpression);
    let out = new EPInterface_1.ExpProcessReturn();
    let lft = (0, NumberExpProcess_1.NumberExpProcess)(node.getLeft(), sfd);
    let rit = (0, NumberExpProcess_1.NumberExpProcess)(node.getRight(), sfd);
    let opera = node.getOperatorToken().getText();
    out.mergePreFunc(lft);
    out.mergePreFunc(rit);
    let obj = {};
    obj = { "math": [lft.getToken(), opera, rit.getToken()] };
    out.setToken(obj);
    return out;
}
function CallBoolExpProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    return (0, CallExpProcess_1.CallExpProcess)(node, sfd);
    ;
}
