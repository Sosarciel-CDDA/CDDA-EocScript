"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableProcess = void 0;
const ts_morph_1 = require("ts-morph");
const Functions_1 = require("../Functions");
const ExpressionProcess_1 = require("./ExpressionProcess");
const NPInterfaces_1 = require("./NPInterfaces");
//变量声明处理
function VariableProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.VariableStatement);
    let declarationList = node.getDeclarationList().getDeclarations();
    let out = new NPInterfaces_1.ProcessReturn();
    for (let declaration of declarationList) {
        let result = (0, ExpressionProcess_1.ExpressionProcess)(declaration, sfd);
        out.addPreFuncList(result.getPreFuncs());
        out.addToken(result.getToken());
    }
    return out;
    //return { "arithmetic": [ { "time_since_cataclysm": "turns" }, "=", { "u_val": "focus" }, "*", { "u_val": "mana_max" } ], "max":15 };
}
exports.VariableProcess = VariableProcess;
