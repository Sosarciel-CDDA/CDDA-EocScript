import { Node,SyntaxKind } from "ts-morph";
import { SourceFileData } from "../Interfaces";
import { checkKind, throwLog } from "../Functions";
import CodeBlockProcesser from "./CodeBlockProcess";
import { ProcessReturn } from "./NPInterfaces";



//处理函数
export function FunctionProcess(node: Node,sfd:SourceFileData):ProcessReturn{
    checkKind(node,SyntaxKind.FunctionDeclaration);

    let id = sfd.getBlockId(node.getNameOrThrow());
    let codeBlock = node.getBodyOrThrow();

    CodeBlockProcesser(codeBlock,sfd,id);
    return new ProcessReturn();
}

