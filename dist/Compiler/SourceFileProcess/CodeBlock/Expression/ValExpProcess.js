"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValExpProcess = void 0;
const EPInterface_1 = require("./EPInterface");
const MathExpProcess_1 = require("./MathExpProcess");
//非赋值运算处理
function ValExpProcess(node) {
    let out = new EPInterface_1.ExpPReturn();
    let exp = MathExpProcess_1.MathExpProcess.bind(this)(node);
    out.preFuncs.push(...exp.preFuncs);
    out.token = { math: [exp.token] };
    return out;
}
exports.ValExpProcess = ValExpProcess;
