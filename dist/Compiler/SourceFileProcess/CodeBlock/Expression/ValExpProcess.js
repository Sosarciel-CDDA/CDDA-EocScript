"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValExpProcess = void 0;
const EPInterface_1 = require("./EPInterface");
const MathExpProcess_1 = require("./MathExpProcess");
//非赋值运算处理
function ValExpProcess(node, sfd) {
    let out = new EPInterface_1.ExpPReturn();
    let exp = (0, MathExpProcess_1.MathExpProcess)(node, sfd);
    out.addPreFuncList(exp.getPreFuncs());
    out.setToken({ "math": [exp.getToken()] });
    return out;
}
exports.ValExpProcess = ValExpProcess;
