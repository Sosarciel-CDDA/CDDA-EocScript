"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionProcess = void 0;
const ts_morph_1 = require("ts-morph");
const Functions_1 = require("../Functions");
const NPInterfaces_1 = require("./NPInterfaces");
/**处理全局函数定义 */
function FunctionProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.FunctionDeclaration);
    let gfunc = this.getSfd().addGlobalFunction(node);
    if (gfunc.getParams().length == 0)
        gfunc.getCodeBlock();
    return new NPInterfaces_1.CBPReturn();
}
exports.FunctionProcess = FunctionProcess;
