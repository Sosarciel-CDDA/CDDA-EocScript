import { Node,SyntaxKind } from "ts-morph";
import { SourceFileData } from "../Interfaces";
import { checkKind, throwLog } from "../Functions";
import { CodeBlock } from "./CodeBlock";
import { CBPReturn } from "./NPInterfaces";



/**处理全局函数定义 */
export function FunctionProcess(this:CodeBlock,node: Node):CBPReturn{
    checkKind(node,SyntaxKind.FunctionDeclaration);

    let gfunc = this.getSfd().addGlobalFunction(node);
    if(gfunc.getParams().length==0)
        gfunc.getCodeBlock();
    return new CBPReturn();
}

