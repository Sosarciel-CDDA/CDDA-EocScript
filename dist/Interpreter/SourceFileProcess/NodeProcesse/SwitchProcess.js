"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchProcess = void 0;
const ts_morph_1 = require("ts-morph");
const Functions_1 = require("../Functions");
const NPInterfaces_1 = require("./NPInterfaces");
const CodeBlockProcess_1 = require("./CodeBlockProcess");
const ExpressionProcess_1 = require("./ExpressionProcess");
function SwitchProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.ts.SyntaxKind.SwitchStatement);
    //let variableSstatment = node as any as SwitchStatement;
    //let cases = node.getCaseBlocks();
    let out = new NPInterfaces_1.ProcessReturn();
    let exp = (0, ExpressionProcess_1.MathExpProcess)(node.getExpression(), sfd);
    out.addPreFuncList(exp.getPreFuncs());
    let switchObj = {
        "switch": { "math": [exp.getToken()] },
        "cases": [],
    };
    let cases = node.getCaseBlock().getClauses();
    for (let caseClause of cases) {
        if (caseClause.isKind(ts_morph_1.SyntaxKind.CaseClause)) {
            let caToken = parseInt(caseClause.getExpression().getText());
            let caseid = sfd.genRandEocId("clause");
            //let blockObj = ca.getFirstDescendantByKindOrThrow(SyntaxKind.Block);
            let block = (0, CodeBlockProcess_1.default)(caseClause, sfd, caseid);
            out.mergePreFuncList(block);
            switchObj.cases.push({
                case: caToken,
                effect: [{ "run_eocs": caseid }]
            });
        }
    }
    out.addToken(switchObj);
    return out;
    //return { "arithmetic": [ { "time_since_cataclysm": "turns" }, "=", { "u_val": "focus" }, "*", { "u_val": "mana_max" } ], "max":15 };
}
exports.SwitchProcess = SwitchProcess;
