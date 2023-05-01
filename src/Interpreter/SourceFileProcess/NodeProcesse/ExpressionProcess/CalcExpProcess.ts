import { Node, SyntaxKind } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
import { NodeProcess, ProcessReturn } from "../NPInterfaces";
import { ExpProcess, ExpProcessReturn, VoidExpProcess } from "./EPInterface";
import { checkKind, throwLog } from "../../Functions";
import { MathExpProcess } from "./MathExpProcess";
import { JToken } from "@/src/Utils";
import { CallExpProcess } from "./CallExpProcess";


let _processFunc:Record<number,ExpProcess|null> = {
    [SyntaxKind.VariableDeclaration]:VarCalcExpProcess      ,//变量申明表达式
    [SyntaxKind.BinaryExpression]:BinaryCalcExpProcess      ,//表达式
    [SyntaxKind.SemicolonToken]:VoidExpProcess              ,//分号
}

//所有 (lval opera rval) 赋值/比较/定义 表达式
//表达式处理路由
export function CalcExpProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
    let out = new ExpProcessReturn();

    let func = _processFunc[node.getKind()];
    if(func==null)
        throw throwLog(node,"错误的 CalcExpProcess 表达式");

    let result = func(node,sfd);
    out.addPreFuncList(result.getPreFuncs());
    out.setToken(result.getToken());
    return out;
}

//变量定义
function BinaryCalcExpProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
    checkKind(node,SyntaxKind.BinaryExpression);
    let out = new ExpProcessReturn();

    let lft = MathExpProcess(node.getLeft(),sfd);
    let rit = MathExpProcess(node.getRight(),sfd);
    let opera = node.getOperatorToken().getText();

    out.addPreFuncList(lft.getPreFuncs());
    out.addPreFuncList(rit.getPreFuncs());

    let obj:JToken = {};

    obj = { "math": [ lft.getToken(), opera, rit.getToken() ]};
    out.setToken(obj);

    return out;
}

//变量定义
function VarCalcExpProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
    checkKind(node,SyntaxKind.VariableDeclaration);
    let out = new ExpProcessReturn();

    let id = node.getName();
    let rit = MathExpProcess(node.getInitializerOrThrow(),sfd);

    out.addPreFuncList(rit.getPreFuncs());
    let obj:JToken = {};
    obj = { "math": [ id , "=", rit.getToken() ]};
    out.setToken(obj);
    return out;
}




