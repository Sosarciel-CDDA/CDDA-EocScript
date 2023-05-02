import { Node, SyntaxKind } from "ts-morph";
import { checkKind } from '../Functions';
import { CBPReturn } from "./NPInterfaces";
import { BlockType, CodeBlock } from "./CodeBlock";
import { CodeExpression } from "./Expression";

export function IfProcess(this:CodeBlock, node: Node):CBPReturn{
    checkKind(node,SyntaxKind.IfStatement);
    let condition = node.getExpression();
    let exp = new CodeExpression(condition,this);
    let conditionObj = exp.build();

    let ifBlockStat = node.getThenStatement();
    let elseBlock = node.getElseStatement();
    //let ifid = this.getSfd().genBlockId(BlockType.IF);
    let ifBlock = this.genSubBlock(BlockType.IF,ifBlockStat,this.getSfd(),conditionObj.getToken(),elseBlock);
    let ifBlockObj = ifBlock.build();

    let out = new CBPReturn();
    out.addPreFuncList(conditionObj.getPreFuncs());
    out.mergePreFuncList(ifBlockObj);
    out.addToken({ "run_eocs": ifBlock.getId() });

    return out;
}