"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefineExpressionProcess = void 0;
const ts_morph_1 = require("ts-morph");
const EPInterface_1 = require("./EPInterface");
let _processFunc = {
    //[SyntaxKind.VariableStatement]:VariableProcess,
    [ts_morph_1.SyntaxKind.ExpressionStatement]: ExpressionProcess,
    [ts_morph_1.SyntaxKind.VariableDeclaration]: VarExpProcess,
    [ts_morph_1.SyntaxKind.BinaryExpression]: BinaryExpProcess,
    [ts_morph_1.SyntaxKind.CallExpression]: CallExpProcess, //内嵌 调用函数
};
//赋值
function DefineExpressionProcess(node, sfd) {
    let tokenStr = null;
    return new EPInterface_1.ExpProcesseReturn();
}
exports.DefineExpressionProcess = DefineExpressionProcess;
