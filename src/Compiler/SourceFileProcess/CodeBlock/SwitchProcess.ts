import { JArray, JToken } from "Utils";
import { Node, SyntaxKind, ts } from "ts-morph";
import { checkKind } from '../Functions';
import { CBPReturn } from "./NPInterfaces";
import { BlockType, CodeBlock } from "./CodeBlock";
import { CodeExpression } from "./Expression";

export function SwitchProcess(this:CodeBlock, node: Node):CBPReturn{
    checkKind(node,ts.SyntaxKind.SwitchStatement);
    let out = new CBPReturn();

    let exp = new CodeExpression(node.getExpression(),this);
    let expObj = exp.build();
    out.addPreFuncList(expObj.getPreFuncs());
    let switchObj:JToken={
        "switch": expObj.getToken(),
        "cases":[],
    };


    let cases = node.getCaseBlock().getClauses();
    for(let caseClause of cases){
        if(caseClause.isKind(SyntaxKind.CaseClause)){
            let caToken = parseInt(caseClause.getExpression().getText());
            //let caseid = this.getSfd().genBlockId(BlockType.CLAUSE);
            //let blockObj = ca.getFirstDescendantByKindOrThrow(SyntaxKind.Block);
            let block = this.genSubBlock(BlockType.CLAUSE,caseClause,this.getSfd());
            let blockObj = block.build();
            out.mergePreFuncList(blockObj);
            (switchObj.cases as JArray).push({
                case:caToken,
                effect:[{ "run_eocs": block.getId() }]//辅助函数
            })
        }
    }
    out.addToken(switchObj);
    return out;
}