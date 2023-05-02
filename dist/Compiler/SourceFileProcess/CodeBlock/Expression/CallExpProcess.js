"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallExpProcess = void 0;
const ts_morph_1 = require("ts-morph");
const EPInterface_1 = require("./EPInterface");
const Functions_1 = require("../../Functions");
const ExpressionProcess_1 = require("./ExpressionProcess");
//特殊函数
let _processFunc = {
    "eobj": EObjProcess,
    "u_val": DefaultProcess,
    "and": AndProcess,
    "or": OrProcess,
    "not": NotProcess,
};
//调用函数
function CallExpProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpPReturn();
    let id = node.getExpression().getText();
    let spFunc = _processFunc[id];
    if (spFunc != null)
        return spFunc(node, sfd);
    out.addPreFunc({ "run_eocs": sfd.getGlobalFuncID(id) });
    out.setToken(sfd.getGlobalFuncReturnID(id));
    return out;
}
exports.CallExpProcess = CallExpProcess;
//特殊函数EToken
function EObjProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpPReturn();
    let text = node.getArguments()[0].getText();
    //自动给OBJ括号
    if (text[0] == "{" && text[text.length - 1] == "}")
        text = "(" + text + ")";
    let tokenObj = eval(text);
    out.setToken(tokenObj);
    return out;
}
//直接输出字符串
function DefaultProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpPReturn();
    out.setToken(node.getText());
    return out;
}
function AndProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpPReturn();
    let arr = [];
    let args = node.getArguments();
    for (let arg of args) {
        let result = (0, ExpressionProcess_1.AutoExpProcess)(arg, sfd);
        out.mergePreFuncList(result);
        arr.push(result.getToken());
    }
    out.setToken({ and: arr });
    return out;
}
function OrProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpPReturn();
    let arr = [];
    let args = node.getArguments();
    for (let arg of args) {
        let result = (0, ExpressionProcess_1.AutoExpProcess)(arg, sfd);
        out.mergePreFuncList(result);
        arr.push(result.getToken());
    }
    out.setToken({ or: arr });
    return out;
}
function NotProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpPReturn();
    let arg = node.getArguments()[0];
    let result = (0, ExpressionProcess_1.AutoExpProcess)(arg, sfd);
    out.mergePreFuncList(result);
    out.setToken({ not: result.getToken() });
    return out;
}
