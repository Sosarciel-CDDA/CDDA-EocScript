"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceFileProcess = void 0;
const NodeProcesse_1 = require("./NodeProcesse");
function SourceFileProcess(sourceFile, sfd) {
    let block = sourceFile;
    (0, NodeProcesse_1.CodeBlockProcess)(block, sfd, sfd.getId());
    return sfd;
}
exports.SourceFileProcess = SourceFileProcess;
exports.default = SourceFileProcess;
