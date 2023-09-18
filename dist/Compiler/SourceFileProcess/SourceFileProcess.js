"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceFileProcess = void 0;
const CodeBlock_1 = require("./CodeBlock");
/**处理来源文件 视为代码块 */
function SourceFileProcess(sourceFile, sfd) {
    let block = sourceFile;
    let cb = new CodeBlock_1.CodeBlock(sfd.id, block, sfd);
    cb.build();
    //console.log(sfd.getRootArray());
    return sfd;
}
exports.SourceFileProcess = SourceFileProcess;
exports.default = SourceFileProcess;
