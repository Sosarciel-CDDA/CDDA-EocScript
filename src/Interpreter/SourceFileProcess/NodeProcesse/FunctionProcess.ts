import { Node,SyntaxKind } from "ts-morph";
import { JArray, JToken } from "Utils";
import { SourceFileData } from "../Interfaces";
import { VariableProcess } from "./VariableProcess";
import { Eoc } from "JsonClass";
import { checkKind, throwLog } from "../Functions";
import CodeBlockProcesser from "./CodeBlockProcess";
import { ProcessReturn } from "./NPInterfaces";



//处理函数
export function FunctionProcess(node: Node,sfd:SourceFileData):ProcessReturn{
    checkKind(node,SyntaxKind.FunctionDeclaration);

    let id = node.getName();
    let codeBlock = node.getBodyOrThrow();

    CodeBlockProcesser(codeBlock,sfd,id);
    return new ProcessReturn();
}

