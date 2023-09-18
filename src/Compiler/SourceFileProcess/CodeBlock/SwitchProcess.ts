import { JArray, JToken } from "Utils";
import { Node, SyntaxKind, ts } from "ts-morph";
import { checkKind } from '../Functions';
import { CBPReturn } from "./NPInterfaces";
import { BlockType, CodeBlock } from "./CodeBlock";
import { CodeExpression } from "./Expression";

/**处理 switch */
export function SwitchProcess(this:CodeBlock, node: Node):CBPReturn{
    checkKind(node,ts.SyntaxKind.SwitchStatement);
    let out = new CBPReturn();

    let exp = new CodeExpression(node.getExpression(),this);
    let expObj = exp.build();
    out.preFuncs.push(...expObj.preFuncs);
    let switchObj:JToken={
        "switch": expObj.token,
        "cases":[],
    };


    let cases = node.getCaseBlock().getClauses();
    for(let caseClause of cases){
        if(caseClause.isKind(SyntaxKind.CaseClause)){
            let caToken = parseInt(caseClause.getExpression().getText());
            //let caseid = this.getSfd().genBlockId(BlockType.CLAUSE);
            //let blockObj = ca.getFirstDescendantByKindOrThrow(SyntaxKind.Block);
            let block = this.genSubBlock(BlockType.CLAUSE,caseClause);
            let blockObj = block.build();
            out.mergePreFuncList(blockObj);
            (switchObj.cases as JArray).push({
                case:caToken,
                effect:[{ "run_eocs": block.id }]//辅助函数
            })
        }
    }
    out.tokens.push(switchObj);
    return out;
}