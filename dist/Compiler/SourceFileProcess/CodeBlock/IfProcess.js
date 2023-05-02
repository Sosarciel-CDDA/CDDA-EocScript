"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IfProcess = void 0;
const ts_morph_1 = require("ts-morph");
const Functions_1 = require("../Functions");
const NPInterfaces_1 = require("./NPInterfaces");
const CodeBlock_1 = require("./CodeBlock");
const ExpressionProcess_1 = require("./ExpressionProcess");
function IfProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.IfStatement);
    let condition = node.getExpression();
    let conditionObj = (0, ExpressionProcess_1.AutoExpProcess)(condition, this.getSfd());
    let ifBlockStat = node.getThenStatement();
    let elseBlock = node.getElseStatement();
    //let ifid = this.getSfd().genBlockId(BlockType.IF);
    let ifBlock = this.genSubBlock(CodeBlock_1.BlockType.IF, ifBlockStat, this.getSfd(), conditionObj.getToken(), elseBlock);
    let ifBlockObj = ifBlock.build();
    let out = new NPInterfaces_1.ProcessReturn();
    out.addPreFuncList(conditionObj.getPreFuncs());
    out.mergePreFuncList(ifBlockObj);
    out.addToken({ "run_eocs": ifBlock.getId() });
    return out;
}
exports.IfProcess = IfProcess;
