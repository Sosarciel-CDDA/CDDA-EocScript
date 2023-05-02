"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchProcess = void 0;
const ts_morph_1 = require("ts-morph");
const Functions_1 = require("../Functions");
const Interfaces_1 = require("../Interfaces");
const NPInterfaces_1 = require("./NPInterfaces");
const CodeBlockProcess_1 = require("./CodeBlockProcess");
const ExpressionProcess_1 = require("./ExpressionProcess");
function SwitchProcess(node, sfd) {
    (0, Functions_1.checkKind)(node, ts_morph_1.ts.SyntaxKind.SwitchStatement);
    let out = new NPInterfaces_1.ProcessReturn();
    let switchObj = {
        "switch": (0, ExpressionProcess_1.AutoExpProcess)(node.getExpression(), sfd).getToken(),
        "cases": [],
    };
    let cases = node.getCaseBlock().getClauses();
    for (let caseClause of cases) {
        if (caseClause.isKind(ts_morph_1.SyntaxKind.CaseClause)) {
            let caToken = parseInt(caseClause.getExpression().getText());
            let caseid = sfd.genBlockId(Interfaces_1.BlockType.CLAUSE);
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
}
exports.SwitchProcess = SwitchProcess;
