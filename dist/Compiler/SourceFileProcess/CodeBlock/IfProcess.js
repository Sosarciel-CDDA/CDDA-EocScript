"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IfProcess = void 0;
const ts_morph_1 = require("ts-morph");
const Functions_1 = require("../Functions");
const NPInterfaces_1 = require("./NPInterfaces");
const CodeBlock_1 = require("./CodeBlock");
const Expression_1 = require("./Expression");
/**处理IF定义 */
function IfProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.IfStatement);
    //let condition = node.getExpression();
    //console.log(SyntaxKind[node.getKind()])
    let exp = new Expression_1.CodeExpression(node, this);
    let conditionObj = exp.build();
    let ifBlockStat = node.getThenStatement();
    let elseBlock = node.getElseStatement();
    //let ifid = this.getSfd().genBlockId(BlockType.IF);
    let ifBlock = this.genSubBlock(CodeBlock_1.BlockType.IF, ifBlockStat, conditionObj.token, elseBlock);
    let ifBlockObj = ifBlock.build();
    let out = new NPInterfaces_1.CBPReturn();
    out.preFuncs.push(...conditionObj.preFuncs);
    out.mergePreFuncList(ifBlockObj);
    //辅助函数
    out.tokens.push({ "run_eocs": ifBlock.id });
    return out;
}
exports.IfProcess = IfProcess;
