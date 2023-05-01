import { Node, SyntaxKind } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
import { NodeProcess, ProcessReturn } from "../NPInterfaces";
import { ExpProcess, ExpProcessReturn, VoidExpProcess } from "./EPInterface";
import { checkKind, throwLog } from "../../Functions";
import { MathExpProcess } from "./NumberExpProcess";
import { JToken } from "@/src/Utils";
import { CallExpProcess } from "./CallExpProcess";


let _processFunc:Record<number,ExpProcess|null> = {
    [SyntaxKind.VariableDeclaration]:VarDefineExpProcess      ,//变量申明表达式
    [SyntaxKind.BinaryExpression]:BinaryDefineExpProcess      ,//表达式
    [SyntaxKind.CallExpression]:CallDefineExpProcess          ,//调用函数
    [SyntaxKind.SemicolonToken]:VoidExpProcess                ,//分号
}
export function ExpStatementProcess(node: Node,sfd:SourceFileData):ProcessReturn{
    //常规表达式列表
    checkKind(node,SyntaxKind.ExpressionStatement);
    let out = new ProcessReturn();
    let subExp = node.getExpression();
    let result = ExpressionProcess(subExp,sfd);
    out.addPreFuncList(result.getPreFuncs());
    out.addToken(result.getToken());
    return out;
}

//所有 (lval opera rval) 表达式
//表达式处理路由
export function ExpressionProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
    let out = new ExpProcessReturn();

    let func = _processFunc[node.getKind()];
    if(func==null)
        throw throwLog(node,"错误的 ExpressionProcess 表达式");

    let result = func(node,sfd);
    out.addPreFuncList(result.getPreFuncs());
    out.setToken(result.getToken());
    return out;
}

//变量定义
function BinaryDefineExpProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
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
function VarDefineExpProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
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



//单独的函数调用
function CallDefineExpProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
    checkKind(node,SyntaxKind.CallExpression);
    let out = new ExpProcessReturn();
    let result = CallExpProcess(node,sfd);

    //判断是否有函数返回 用于判断EToken
    if(result.getPreFuncs().length>0)
        out.mergePreFuncList(result);
    else //EToken无函数返回
        out.setToken(result.getToken());

    return out;
}
