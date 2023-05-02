import { Node, SyntaxKind } from "ts-morph";
import { checkKind, logKind, throwLog } from '../Functions';
import { CBPReturn } from "./NPInterfaces";
import { CodeBlock } from "./CodeBlock";
import { CodeExpression } from "./Expression";

//变量声明处理
export function VariableProcess(this:CodeBlock, node: Node):CBPReturn{
    checkKind(node,SyntaxKind.VariableStatement);

    let declarationList = node.getDeclarationList().getDeclarations();
    let out = new CBPReturn();
    for(let declaration of declarationList){
        let exp = new CodeExpression(declaration,this);
        let result = exp.build();
        out.addPreFuncList(result.getPreFuncs());
        out.addToken(result.getToken());
    }
    return out;
    //return { "arithmetic": [ { "time_since_cataclysm": "turns" }, "=", { "u_val": "focus" }, "*", { "u_val": "mana_max" } ], "max":15 };
}