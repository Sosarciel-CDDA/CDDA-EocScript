import { Node, SyntaxKind } from "ts-morph";
import { checkKind } from '../Functions';
import { BlockType, SourceFileData } from "../Interfaces";
import { ProcessReturn } from "./NPInterfaces";
import CodeBlockProcess from "./CodeBlockProcess";
import { AutoExpProcess } from "./ExpressionProcess";

export function IfProcess(node: Node,sfd:SourceFileData):ProcessReturn{
    checkKind(node,SyntaxKind.IfStatement);
    let condition = node.getExpression();
    let conditionObj = AutoExpProcess(condition,sfd);

    let ifBlock = node.getThenStatement();
    let elseBlock = node.getElseStatement();
    let ifid = sfd.genBlockId(BlockType.IF);
    let ifBlockObj = CodeBlockProcess(ifBlock,sfd,ifid,conditionObj.getToken(),elseBlock);

    let out = new ProcessReturn();
    out.addPreFuncList(conditionObj.getPreFuncs());
    out.mergePreFuncList(ifBlockObj);
    out.addToken({ "run_eocs": ifid });

    return out;
}