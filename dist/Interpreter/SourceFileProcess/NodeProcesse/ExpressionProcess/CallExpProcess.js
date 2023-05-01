"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallExpProcess = void 0;
const ts_morph_1 = require("ts-morph");
const EPInterface_1 = require("./EPInterface");
const Functions_1 = require("../../Functions");
const NPInterfaces_1 = require("../NPInterfaces");
//特殊函数
let _processFunc = {
    "EToken": ETokenProcess,
    "u_val": DefaultProcess, //内置函数 转为字符串
};
//调用函数
function CallExpProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpProcessReturn();
    let id = node.getExpression().getText();
    let spFunc = _processFunc[id];
    if (spFunc != null)
        return spFunc(node, sfd);
    out.addPreFunc({ "run_eocs": id });
    out.setToken((0, NPInterfaces_1.getFuncReVal)(id));
    return out;
}
exports.CallExpProcess = CallExpProcess;
//特殊函数EToken
function ETokenProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpProcessReturn();
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
    let out = new EPInterface_1.ExpProcessReturn();
    out.setToken(node.getText());
    return out;
}
