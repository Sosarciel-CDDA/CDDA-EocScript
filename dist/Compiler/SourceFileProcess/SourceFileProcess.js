"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceFileProcess = void 0;
const CodeBlock_1 = require("./CodeBlock");
function SourceFileProcess(sourceFile, sfd) {
    let block = sourceFile;
    let cb = new CodeBlock_1.CodeBlock(sfd.getId(), block, sfd);
    cb.build();
    return sfd;
}
exports.SourceFileProcess = SourceFileProcess;
exports.default = SourceFileProcess;
