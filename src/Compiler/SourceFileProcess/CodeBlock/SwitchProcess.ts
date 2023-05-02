import { JArray, JToken } from "Utils";
import { Node, SyntaxKind, ts } from "ts-morph";
import { checkKind } from '../Functions';
import { ProcessReturn } from "./NPInterfaces";
import { BlockType, CodeBlock } from "./CodeBlock";
import { AutoExpProcess } from "./Expression";

export function SwitchProcess(this:CodeBlock, node: Node):ProcessReturn{
    checkKind(node,ts.SyntaxKind.SwitchStatement);
    let out = new ProcessReturn();

    let switchObj:JToken={
        "switch": AutoExpProcess(node.getExpression(),this.getSfd()).getToken(),
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
                effect:[{ "run_eocs": block.getId() }]
            })
        }
    }
    out.addToken(switchObj);
    return out;
}