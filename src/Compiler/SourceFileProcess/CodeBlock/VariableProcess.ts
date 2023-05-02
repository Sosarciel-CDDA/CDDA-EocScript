import { JArray, JToken } from "Utils";
import { Node, VariableStatement,VariableDeclaration, SyntaxKind } from "ts-morph";
import { checkKind, logKind, throwLog } from '../Functions';
import { SourceFileData } from "../Interfaces";
import { ProcessReturn } from "./NPInterfaces";
import { AutoExpProcess } from "./Expression";
import { CodeBlock } from "./CodeBlock";

//变量声明处理
export function VariableProcess(this:CodeBlock, node: Node):ProcessReturn{
    checkKind(node,SyntaxKind.VariableStatement);

    let declarationList = node.getDeclarationList().getDeclarations();
    let out = new ProcessReturn();
    for(let declaration of declarationList){
        let result = AutoExpProcess(declaration,this._sfd);
        out.addPreFuncList(result.getPreFuncs());
        out.addToken(result.getToken());
    }
    return out;
    //return { "arithmetic": [ { "time_since_cataclysm": "turns" }, "=", { "u_val": "focus" }, "*", { "u_val": "mana_max" } ], "max":15 };
}