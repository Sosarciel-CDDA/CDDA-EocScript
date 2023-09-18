"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableProcess = void 0;
const ts_morph_1 = require("ts-morph");
const Functions_1 = require("../Functions");
const NPInterfaces_1 = require("./NPInterfaces");
const Expression_1 = require("./Expression");
//变量声明处理
function VariableProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.VariableStatement);
    let declarationList = node.getDeclarationList().getDeclarations();
    let out = new NPInterfaces_1.CBPReturn();
    for (let declaration of declarationList) {
        let exp = new Expression_1.CodeExpression(declaration, this);
        let result = exp.build();
        out.preFuncs.push(...result.preFuncs);
        out.tokens.push(result.token);
    }
    return out;
    //return { "arithmetic": [ { "time_since_cataclysm": "turns" }, "=", { "u_val": "focus" }, "*", { "u_val": "mana_max" } ], "max":15 };
}
exports.VariableProcess = VariableProcess;
