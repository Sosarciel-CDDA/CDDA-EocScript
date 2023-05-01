"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IfProcess = void 0;
const ts_morph_1 = require("ts-morph");
const Functions_1 = require("../Functions");
const NPInterfaces_1 = require("./NPInterfaces");
const CodeBlockProcess_1 = require("./CodeBlockProcess");
const ExpressionProcess_1 = require("./ExpressionProcess");
function IfProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.ts.SyntaxKind.IfStatement);
    let condition = node.getExpression();
    let conditionObj = (0, ExpressionProcess_1.ExpressionProcess)(condition, sfd);
    let block = node.getThenStatement();
    let ifid = sfd.genRandEocId("if");
    let blockObj = (0, CodeBlockProcess_1.default)(block, sfd, ifid, conditionObj.getToken());
    let out = new NPInterfaces_1.ProcessReturn();
    out.addPreFuncList(conditionObj.getPreFuncs());
    out.mergePreFuncList(blockObj);
    out.addToken({ "run_eocs": ifid });
    return out;
}
exports.IfProcess = IfProcess;
