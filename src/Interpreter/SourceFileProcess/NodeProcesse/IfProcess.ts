import { JArray, JToken } from "Utils";
import { Node, IfStatement, ts, Expression } from "ts-morph";
import { checkKind } from '../Functions';
import { SourceFileData } from "../Interfaces";
import { ProcessReturn } from "./NPInterfaces";
import { SyntaxKind } from "ts-morph";
import CodeBlockProcess from "./CodeBlockProcess";
import { ExpressionProcess } from "./ExpressionProcess";

export function IfProcess(node: Node,sfd:SourceFileData):ProcessReturn{
    checkKind(node,ts.SyntaxKind.IfStatement);
    let condition = node.getExpression();
    let conditionObj = ExpressionProcess(condition,sfd);

    let block = node.getThenStatement();
    let ifid = sfd.genRandEocId("if");

    let blockObj = CodeBlockProcess(block,sfd,ifid,conditionObj.getToken());

    let out = new ProcessReturn();
    out.addPreFuncList(conditionObj.getPreFuncs());
    out.mergePreFuncList(blockObj);
    out.addToken({ "run_eocs": ifid });
    return out;
}