"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionProcess = void 0;
const ts_morph_1 = require("ts-morph");
const NPInterfaces_1 = require("./NPInterfaces");
const Functions_1 = require("../Functions");
const Expression_1 = require("./Expression");
//表达式申明处理
function ExpressionProcess(node) {
    //常规表达式列表
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.ExpressionStatement);
    //if(node.isKind(SyntaxKind.ExpressionStatement) || node.isKind())
    let out = new NPInterfaces_1.CBPReturn();
    let subExp = node.getExpression();
    let exp = new Expression_1.CodeExpression(subExp, this);
    let result = exp.build();
    out.addPreFuncList(result.getPreFuncs());
    out.addToken(result.getToken());
    return out;
    //throw throwLog(node,"未知的申明表达式类型");
}
exports.ExpressionProcess = ExpressionProcess;
