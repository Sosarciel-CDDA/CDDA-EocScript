
import { Node, SyntaxKind } from "ts-morph";
import { CBPReturn } from "./NPInterfaces";
import { checkKind } from "../Functions";
import { CodeBlock } from "../CodeBlock";
import { CodeExpression } from "./Expression";


//表达式申明处理
export function ExpressionProcess(this:CodeBlock, node: Node):CBPReturn{
    //常规表达式列表
    checkKind(node, SyntaxKind.ExpressionStatement);
    //if(node.isKind(SyntaxKind.ExpressionStatement) || node.isKind())
    let out = new CBPReturn();
    let subExp = node.getExpression();

    let exp = new CodeExpression(subExp,this);
    let result = exp.build();
    out.preFuncs.push(...result.preFuncs);
    out.tokens.push(result.token);
    //console.log(out.getPreFuncs());
    return out;
    //throw throwLog(node,"未知的申明表达式类型");
}