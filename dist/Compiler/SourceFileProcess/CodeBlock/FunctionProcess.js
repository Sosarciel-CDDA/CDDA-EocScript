"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionProcess = void 0;
const ts_morph_1 = require("ts-morph");
const Functions_1 = require("../Functions");
const CodeBlock_1 = require("./CodeBlock");
const NPInterfaces_1 = require("./NPInterfaces");
//处理全局函数定义
function FunctionProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.FunctionDeclaration);
    let funcid = this.getSfd().getGlobalFuncID(node.getNameOrThrow());
    let codeBody = node.getBodyOrThrow();
    let cb = new CodeBlock_1.CodeBlock(funcid, codeBody, this.getSfd());
    //let cb = new CodeBlock(codeBody,this._sfd,this._cbd.genSubBlock());
    cb.build();
    return new NPInterfaces_1.ProcessReturn();
}
exports.FunctionProcess = FunctionProcess;
