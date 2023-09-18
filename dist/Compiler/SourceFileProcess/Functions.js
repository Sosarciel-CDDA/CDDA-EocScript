"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logKind = exports.throwLog = exports.checkKind = void 0;
const ts_morph_1 = require("ts-morph");
/**检测某个节点是否属于kind */
function checkKind(node, kind, message) {
    if (!node.isKind(kind)) {
        let str = "checkKindId 错误 statment.getKind()!=" + ts_morph_1.SyntaxKind[kind] +
            "\nline:\n" + node.getText() + "\nKind:" + ts_morph_1.SyntaxKind[node.getKind()];
        if (message != null)
            str += "\n" + message;
        str += "\n";
        console.log("错误堆栈追溯:");
        console.trace();
        console.log();
        throw str;
    }
}
exports.checkKind = checkKind;
function throwLog(node, message) {
    let str = "throwLog 错误\nline:\n" + node.getText() + "\nSyntaxKind:" + ts_morph_1.SyntaxKind[node.getKind()];
    if (message != null)
        str = str + "\n" + message;
    str += "\n";
    return str;
}
exports.throwLog = throwLog;
function logKind(node) {
    console.log(ts_morph_1.SyntaxKind[node.getKind()]);
}
exports.logKind = logKind;
