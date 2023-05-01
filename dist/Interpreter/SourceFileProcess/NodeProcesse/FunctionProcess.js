"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionProcess = void 0;
const ts_morph_1 = require("ts-morph");
const Functions_1 = require("../Functions");
const CodeBlockProcess_1 = require("./CodeBlockProcess");
const NPInterfaces_1 = require("./NPInterfaces");
//处理函数
function FunctionProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.FunctionDeclaration);
    let id = node.getName();
    let codeBlock = node.getBodyOrThrow();
    (0, CodeBlockProcess_1.default)(codeBlock, sfd, id);
    return new NPInterfaces_1.ProcessReturn();
}
exports.FunctionProcess = FunctionProcess;
