import { Node, SyntaxKind } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
import { NodeProcess, ProcessReturn } from "../NPInterfaces";
import { checkKind, throwLog } from "../../Functions";
import { CallExpProcess } from "./CallExpProcess";
import { CalcExpProcess } from "./CalcExpProcess";
import { ExpProcessReturn } from "./EPInterface";
import { ValExpProcess } from "./ValExpProcess";



//表达式申明处理
export function ExpressionProcess(node: Node,sfd:SourceFileData):ProcessReturn{
    //常规表达式列表
    checkKind(node, SyntaxKind.ExpressionStatement);
    //if(node.isKind(SyntaxKind.ExpressionStatement) || node.isKind())
    let out = new ProcessReturn();
    let subExp = node.getExpression();

    let result = AutoExpProcess(subExp,sfd);
    out.addPreFuncList(result.getPreFuncs());
    out.addToken(result.getToken());
    return out;
    //throw throwLog(node,"未知的申明表达式类型");
}
//表达式处理路由
export function AutoExpProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
    //直接调用函数
    if(node.isKind(SyntaxKind.CallExpression))
        return CallStateExpProcess(node,sfd);

    //表达式
    if(node.isKind(SyntaxKind.BinaryExpression)){
        let opera = node.getOperatorToken().getText();
        if (['==', '>=', '<=', '>', '<', '=', '+=', '-=', '*=', '/=', '%='].includes(opera))
            return CalcExpProcess(node,sfd);
        return ValExpProcess(node,sfd);
    }

    //单字
    if( node.isKind(SyntaxKind.Identifier)      ||
        node.isKind(SyntaxKind.StringLiteral)   ||
        node.isKind(SyntaxKind.NumericLiteral))
        return ValExpProcess(node,sfd);

    return CalcExpProcess(node,sfd);
    //throw throwLog(node,"未知的申明表达式类型");
}
//直接调用函数
function CallStateExpProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{ 
    checkKind(node,SyntaxKind.CallExpression);

    let out = new ExpProcessReturn();

    let result = CallExpProcess(node,sfd);
    //判断是否有函数返回 用于判断EToken
    if(result.getPreFuncs().length>0)
        out.addPreFuncList(result.getPreFuncs());
    else //EToken无函数返回
        out.setToken(result.getToken());
    return out;
}




