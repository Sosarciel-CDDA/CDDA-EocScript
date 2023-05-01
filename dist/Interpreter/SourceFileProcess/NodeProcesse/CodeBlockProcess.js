"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnProcess = exports.CodeBlockProcess = void 0;
const ts_morph_1 = require("ts-morph");
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
    [ts_morph_1.SyntaxKind.ExpressionStatement]: ExpressionProcess_1.ExpStatementProcess,
    [ts_morph_1.SyntaxKind.ReturnStatement]: ReturnProcess,
    [ts_morph_1.SyntaxKind.IfStatement]: IfProcess_1.IfProcess,
    [ts_morph_1.SyntaxKind.SwitchStatement]: SwitchProcess_1.SwitchProcess,
};
//处理代码块
function CodeBlockProcess(node, sfd, blockId, condition) {
    let statments = [];
    if (Array.isArray(node))
        statments = node;
    else if (node.isKind(ts_morph_1.SyntaxKind.SourceFile) || node.isKind(ts_morph_1.SyntaxKind.Block) || node.isKind(ts_morph_1.SyntaxKind.CaseClause))
        statments = node.getStatements();
    else
        statments = [node];
    let eocname = blockId ? blockId : sfd.genRandEocId();
    let eoc = new JsonClass_1.Eoc(eocname);
    if (condition != null)
        eoc.setCondition(condition);
    //let statments = node.getStatements();
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
                eoc.addEffect(obj);
            for (let obj of tokens)
                eoc.addEffect(obj);
        }
        catch (e) {
            console.log("CodeBlockProcess 出现错误");
            console.log((0, Functions_1.throwLog)(stat));
            throw e;
        }
    }
    let eocObj = eoc.build();
    sfd.addEoc(eocObj);
    return new NPInterfaces_1.ProcessReturn([eoc.build()]);
}
exports.CodeBlockProcess = CodeBlockProcess;
function ReturnProcess(node, sfd, blockId) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.ReturnStatement);
    if (blockId == null)
        throw (0, Functions_1.throwLog)(node, "未分配 blockId");
    let outlist = new NPInterfaces_1.ProcessReturn();
    let rit = (0, ExpressionProcess_1.MathExpProcess)(node.getExpressionOrThrow(), sfd);
    outlist.addPreFuncList(rit.getPreFuncs());
    let obj = { "math": [(0, NPInterfaces_1.getFuncReVal)(blockId), "=", rit.getToken()] };
    outlist.addToken(obj);
    //return [{ "math": [ id, mid, lst ]}];
    return outlist;
}
exports.ReturnProcess = ReturnProcess;
exports.default = CodeBlockProcess;
