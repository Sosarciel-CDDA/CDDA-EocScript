import { Node, SyntaxKind } from "ts-morph";
import { checkKind } from '../Functions';
import { ProcessReturn } from "./NPInterfaces";
import { BlockType, CodeBlock } from "./CodeBlock";
import { AutoExpProcess } from "./Expression";

export function IfProcess(this:CodeBlock, node: Node):ProcessReturn{
    checkKind(node,SyntaxKind.IfStatement);
    let condition = node.getExpression();
    let conditionObj = AutoExpProcess(condition,this.getSfd());

    let ifBlockStat = node.getThenStatement();
    let elseBlock = node.getElseStatement();
    //let ifid = this.getSfd().genBlockId(BlockType.IF);
    let ifBlock = this.genSubBlock(BlockType.IF,ifBlockStat,this.getSfd(),conditionObj.getToken(),elseBlock);
    let ifBlockObj = ifBlock.build();

    let out = new ProcessReturn();
    out.addPreFuncList(conditionObj.getPreFuncs());
    out.mergePreFuncList(ifBlockObj);
    out.addToken({ "run_eocs": ifBlock.getId() });

    return out;
}