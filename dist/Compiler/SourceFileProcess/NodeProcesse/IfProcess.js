"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IfProcess = void 0;
const ts_morph_1 = require("ts-morph");
const Functions_1 = require("../Functions");
const Interfaces_1 = require("../Interfaces");
const NPInterfaces_1 = require("./NPInterfaces");
const CodeBlockProcess_1 = require("./CodeBlockProcess");
const ExpressionProcess_1 = require("./ExpressionProcess");
function IfProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.IfStatement);
    let condition = node.getExpression();
    let conditionObj = (0, ExpressionProcess_1.AutoExpProcess)(condition, sfd);
    let ifBlock = node.getThenStatement();
    let elseBlock = node.getElseStatement();
    let ifid = sfd.genBlockId(Interfaces_1.BlockType.IF);
    let ifBlockObj = (0, CodeBlockProcess_1.CodeBlockProcess)(ifBlock, sfd, ifid, conditionObj.getToken(), elseBlock);
    let out = new NPInterfaces_1.ProcessReturn();
    out.addPreFuncList(conditionObj.getPreFuncs());
    out.mergePreFuncList(ifBlockObj);
    out.addToken({ "run_eocs": ifid });
    return out;
}
exports.IfProcess = IfProcess;
