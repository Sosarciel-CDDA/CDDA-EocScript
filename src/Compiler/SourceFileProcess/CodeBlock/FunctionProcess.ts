import { Node,SyntaxKind } from "ts-morph";
import { SourceFileData } from "../Interfaces";
import { checkKind, throwLog } from "../Functions";
import { CodeBlock } from "./CodeBlock";
import { CBPReturn } from "./NPInterfaces";



//处理全局函数定义
export function FunctionProcess(this:CodeBlock,node: Node):CBPReturn{
    checkKind(node,SyntaxKind.FunctionDeclaration);

    let gfunc = this.getSfd().addGlobalFunction(node);
    let funcid = gfunc.getId();
    let codeBody = node.getBodyOrThrow();
    let cb = new CodeBlock(funcid,codeBody,this.getSfd());
    //let cb = new CodeBlock(codeBody,this._sfd,this._cbd.genSubBlock());
    cb.build();
    return new CBPReturn();
}

