import { JArray, JToken } from "Utils";
import { Node, SwitchStatement, SyntaxKind, ts } from "ts-morph";
import { checkKind } from '../Functions';
import { BlockType, SourceFileData } from "../Interfaces";
import { ProcessReturn } from "./NPInterfaces";
import CodeBlockProcess from "./CodeBlockProcess";
import { AutoExpProcess } from "./ExpressionProcess";

export function SwitchProcess(node: Node,sfd:SourceFileData):ProcessReturn{
    checkKind(node,ts.SyntaxKind.SwitchStatement);
    //let variableSstatment = node as any as SwitchStatement;
    //let cases = node.getCaseBlocks();
    let out = new ProcessReturn();

    //let exp = MathExpProcess(node.getExpression(),sfd);
    //out.addPreFuncList(exp.getPreFuncs());

    let switchObj:JToken={
        "switch": AutoExpProcess(node.getExpression(),sfd).getToken(),
        "cases":[],
    };


    let cases = node.getCaseBlock().getClauses();
    for(let caseClause of cases){
        if(caseClause.isKind(SyntaxKind.CaseClause)){
            let caToken = parseInt(caseClause.getExpression().getText());
            let caseid = sfd.genBlockId(BlockType.CLAUSE);
            //let blockObj = ca.getFirstDescendantByKindOrThrow(SyntaxKind.Block);
            let block = CodeBlockProcess(caseClause,sfd,caseid);
            out.mergePreFuncList(block);
            (switchObj.cases as JArray).push({
                case:caToken,
                effect:[{ "run_eocs": caseid }]
            })
        }
    }
    out.addToken(switchObj);
    return out;
    //return { "arithmetic": [ { "time_since_cataclysm": "turns" }, "=", { "u_val": "focus" }, "*", { "u_val": "mana_max" } ], "max":15 };
}