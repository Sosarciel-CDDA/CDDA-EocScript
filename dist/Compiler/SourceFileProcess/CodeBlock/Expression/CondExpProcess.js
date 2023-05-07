"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.condExpProcess = void 0;
const ts_morph_1 = require("ts-morph");
const CallExpProcess_1 = require("./CallExpProcess");
const EPInterface_1 = require("./EPInterface");
//条件表达式特殊处理
function condExpProcess(node) {
    //checkKind(node,SyntaxKind.IfStatement);
    let out = new EPInterface_1.ExpPReturn();
    let exp = node;
    if (node.isKind(ts_morph_1.SyntaxKind.IfStatement))
        exp = node.getExpression();
    let result = new EPInterface_1.ExpPReturn();
    if (exp.isKind(ts_morph_1.SyntaxKind.CallExpression))
        result = CallExpProcess_1.CallExpProcess.bind(this)(exp);
    else
        result = this.process(exp);
    //取preFunc与token
    out.setToken(result.getToken());
    if (!result.isRtnNofuncReq())
        out.addPreFuncList(result.getPreFuncs());
    return out;
}
exports.condExpProcess = condExpProcess;
