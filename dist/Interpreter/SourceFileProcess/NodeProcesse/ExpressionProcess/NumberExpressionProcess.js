"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathExpressionProcess = void 0;
const ts_morph_1 = require("ts-morph");
const NPInterfaces_1 = require("../NPInterfaces");
const Functions_1 = require("../../Functions");
let _processFunc = {
//[SyntaxKind.VariableStatement]:VariableProcess,
};
//处理表达式
//计算 返回number值
function MathExpressionProcess(node, sfd) {
    let outObj = new NPInterfaces_1.ProcesseReturn();
    //console.log(SyntaxKind[node.getKind()])
    if (node.isKind(ts_morph_1.SyntaxKind.Identifier)) {
        let name = node.getText();
        outObj.addToken("u_val(" + name + ")");
        return outObj;
        //return { "math": ["u_val("+name+")"]}
    }
    if (node.isKind(ts_morph_1.SyntaxKind.NumericLiteral) || node.isKind(ts_morph_1.SyntaxKind.StringKeyword)) {
        let name = node.getText();
        outObj.addToken(name);
        return outObj;
        //return { "math": [name]}
    }
    if (node.isKind(ts_morph_1.SyntaxKind.CallExpression)) {
        let id = node.getFirstChildByKindOrThrow(ts_morph_1.SyntaxKind.Identifier)?.getText();
        outObj.addPreFunc({ "run_eocs": id });
        outObj.addToken("u_val(" + (0, NPInterfaces_1.getFuncReVal)(id) + ")");
        return outObj;
    }
    if (node.isKind(ts_morph_1.SyntaxKind.BinaryExpression)) {
        let list = node.getChildren();
        let fst = MathExpressionProcess(list[0], sfd);
        let lst = MathExpressionProcess(list[2], sfd);
        let mid = list[1].getText();
        if (!fst.isVaild() || !lst.isVaild() || mid == null)
            return outObj;
        outObj.mergePreFunc(fst);
        outObj.mergePreFunc(lst);
        outObj.addToken(fst.getFstToken() + mid + lst.getFstToken());
        return outObj;
        //return { "math": [fst,mid,lst]}
    }
    throw (0, Functions_1.throwLog)(node, "未知的数学表达式");
    //return outObj;
}
exports.MathExpressionProcess = MathExpressionProcess;
