"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnProcess = exports.CodeBlockProcess = void 0;
const ts_morph_1 = require("ts-morph");
const Interfaces_1 = require("../Interfaces");
const VariableProcess_1 = require("./VariableProcess");
const Functions_1 = require("../Functions");
const JsonClass_1 = require("JsonClass");
const FunctionProcess_1 = require("./FunctionProcess");
const ExpressionProcess_1 = require("./ExpressionProcess");
const NPInterfaces_1 = require("./NPInterfaces");
const IfProcess_1 = require("./IfProcess");
const SwitchProcess_1 = require("./SwitchProcess");
let _processFunc = {
    [ts_morph_1.SyntaxKind.VariableStatement]: VariableProcess_1.VariableProcess,
    [ts_morph_1.SyntaxKind.FunctionDeclaration]: FunctionProcess_1.FunctionProcess,
    [ts_morph_1.SyntaxKind.ExpressionStatement]: ExpressionProcess_1.ExpressionProcess,
    [ts_morph_1.SyntaxKind.ReturnStatement]: ReturnProcess,
    [ts_morph_1.SyntaxKind.IfStatement]: IfProcess_1.IfProcess,
    [ts_morph_1.SyntaxKind.SwitchStatement]: SwitchProcess_1.SwitchProcess,
};
//处理代码块
function CodeBlockProcess(node, sfd, blockId, condition, falseEffect) {
    let eocname = blockId || sfd.genBlockId(Interfaces_1.BlockType.OTHER);
    let eoc = new JsonClass_1.Eoc(eocname);
    if (condition != null)
        eoc.setCondition(condition);
    eoc.addEffectList(processStatments(node, sfd, blockId));
    if (falseEffect != null)
        eoc.addFalseEffectList(processStatments(falseEffect, sfd, blockId));
    let eocObj = eoc.build();
    sfd.addEoc(eocObj);
    return new NPInterfaces_1.ProcessReturn([eoc.build()]);
}
exports.CodeBlockProcess = CodeBlockProcess;
function processStatments(node, sfd, blockId) {
    let statments = [];
    if (Array.isArray(node))
        statments = node;
    else if (node.isKind(ts_morph_1.SyntaxKind.SourceFile) || node.isKind(ts_morph_1.SyntaxKind.Block) || node.isKind(ts_morph_1.SyntaxKind.CaseClause))
        statments = node.getStatements();
    else
        statments = [node];
    let effects = [];
    for (let stat of statments) {
        try {
            let processFunc = _processFunc[stat.getKind()];
            if (processFunc == null)
                continue;
            let result = processFunc(stat, sfd, blockId);
            if (!result.isVaild())
                continue;
            let preFuncs = result.getPreFuncs();
            let tokens = result.getTokens();
            for (let obj of preFuncs)
                effects.push(obj);
            for (let obj of tokens)
                effects.push(obj);
        }
        catch (e) {
            console.log("processStatments 出现错误");
            console.log((0, Functions_1.throwLog)(stat));
            throw e;
        }
    }
    return effects;
}
function ReturnProcess(node, sfd, blockId) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.ReturnStatement);
    if (blockId == null)
        throw (0, Functions_1.throwLog)(node, "未分配 blockId");
    let outlist = new NPInterfaces_1.ProcessReturn();
    let rit = (0, ExpressionProcess_1.MathExpProcess)(node.getExpressionOrThrow(), sfd);
    outlist.addPreFuncList(rit.getPreFuncs());
    let obj = { "math": [sfd.getReturnId(blockId), "=", rit.getToken()] };
    outlist.addToken(obj);
    //return [{ "math": [ id, mid, lst ]}];
    return outlist;
}
exports.ReturnProcess = ReturnProcess;
exports.default = CodeBlockProcess;
