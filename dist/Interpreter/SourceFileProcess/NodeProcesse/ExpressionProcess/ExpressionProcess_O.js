"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionProcess = void 0;
const ts_morph_1 = require("ts-morph");
const Functions_1 = require("../../Functions");
const MathExpressionProcess_1 = require("./MathExpressionProcess");
const NPInterfaces_1 = require("../NPInterfaces");
//表达式处理
//赋值操作 调用函数
function ExpressionProcess(node, sfd) {
    if (node.isKind(ts_morph_1.SyntaxKind.VariableDeclarationList))
        null;
    else if (node.isKind(ts_morph_1.SyntaxKind.BinaryExpression) || node.isKind(ts_morph_1.SyntaxKind.CallExpression))
        null;
    else
        (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.ExpressionStatement);
    let subExps = node.getChildren(); //常规表达式
    if (node.isKind(ts_morph_1.SyntaxKind.VariableDeclarationList)) //变量声明表达式
        subExps = node.getDeclarations();
    if (node.isKind(ts_morph_1.SyntaxKind.BinaryExpression) || node.isKind(ts_morph_1.SyntaxKind.CallExpression)) //内嵌表达式
        subExps = [node];
    if (subExps == null)
        throw (0, Functions_1.throwLog)(node, "subExp 未找到");
    let outlist = new NPInterfaces_1.ProcesseReturn();
    for (let subExp of subExps) {
        if (subExp.isKind(ts_morph_1.SyntaxKind.BinaryExpression) || subExp.isKind(ts_morph_1.SyntaxKind.VariableDeclaration)) {
            let list = subExp.getChildren();
            let id = list[0]?.getText();
            let ev = (0, MathExpressionProcess_1.MathExpressionProcess)(list[2], sfd);
            let mid = list[1].getText();
            outlist.mergePreFunc(ev);
            let obj = {};
            if (mid == "==" || mid == ">=" || mid == "<=" || mid == ">" || mid == "<")
                obj = { "math": ["u_val(" + id + ")", mid, ev.getFstToken()] };
            else
                obj = { "math": [id, mid, ev.getFstToken()] };
            outlist.addToken(obj);
            continue;
        }
        //调用函数
        if (subExp.isKind(ts_morph_1.SyntaxKind.CallExpression)) {
            //let id = subExp.getFirstChildByKindOrThrow(SyntaxKind.Identifier)?.getText();
            //outlist.addToken({ "run_eocs": id });
            let obj = (0, MathExpressionProcess_1.MathExpressionProcess)(subExp, sfd);
            outlist.addToken(obj.getPreFuncs()[0]);
            continue;
        }
        //忽略分号
        if (subExp.isKind(ts_morph_1.SyntaxKind.SemicolonToken))
            continue;
        throw (0, Functions_1.throwLog)(subExp, "未知的表达式");
    }
    return outlist;
    //throw throwLog(node,"未知的表达式");
}
exports.ExpressionProcess = ExpressionProcess;
