"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchProcess = void 0;
const ts_morph_1 = require("ts-morph");
const Functions_1 = require("../Functions");
const NPInterfaces_1 = require("./NPInterfaces");
const CodeBlock_1 = require("./CodeBlock");
const Expression_1 = require("./Expression");
function SwitchProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.ts.SyntaxKind.SwitchStatement);
    let out = new NPInterfaces_1.CBPReturn();
    let exp = new Expression_1.CodeExpression(node.getExpression(), this);
    let expObj = exp.build();
    out.preFuncs.push(...expObj.preFuncs);
    let switchObj = {
        "switch": expObj.token,
        "cases": [],
    };
    let cases = node.getCaseBlock().getClauses();
    for (let caseClause of cases) {
        if (caseClause.isKind(ts_morph_1.SyntaxKind.CaseClause)) {
            let caToken = parseInt(caseClause.getExpression().getText());
            //let caseid = this.getSfd().genBlockId(BlockType.CLAUSE);
            //let blockObj = ca.getFirstDescendantByKindOrThrow(SyntaxKind.Block);
            let block = this.genSubBlock(CodeBlock_1.BlockType.CLAUSE, caseClause);
            let blockObj = block.build();
            out.mergePreFuncList(blockObj);
            switchObj.cases.push({
                case: caToken,
                effect: [{ "run_eocs": block.getId() }] //辅助函数
            });
        }
    }
    out.tokens.push(switchObj);
    return out;
}
exports.SwitchProcess = SwitchProcess;
