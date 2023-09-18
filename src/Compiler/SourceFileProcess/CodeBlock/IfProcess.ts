import { Node, SyntaxKind } from "ts-morph";
import { checkKind } from '../Functions';
import { CBPReturn } from "./NPInterfaces";
import { BlockType, CodeBlock } from "./CodeBlock";
import { CodeExpression } from "./Expression";

export function IfProcess(this:CodeBlock, node: Node):CBPReturn{
    checkKind(node,SyntaxKind.IfStatement);
    //let condition = node.getExpression();
    //console.log(SyntaxKind[node.getKind()])
    let exp = new CodeExpression(node,this);
    let conditionObj = exp.build();

    let ifBlockStat = node.getThenStatement();
    let elseBlock = node.getElseStatement();
    //let ifid = this.getSfd().genBlockId(BlockType.IF);
    let ifBlock = this.genSubBlock(BlockType.IF,ifBlockStat,conditionObj.token,elseBlock);
    let ifBlockObj = ifBlock.build();

    let out = new CBPReturn();
    out.preFuncs.push(...conditionObj.preFuncs);
    out.mergePreFuncList(ifBlockObj);
    //辅助函数
    out.tokens.push({ "run_eocs": ifBlock.getId() });

    return out;
}