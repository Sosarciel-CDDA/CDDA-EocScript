import { Node, SyntaxKind } from "ts-morph";
import { CallExpProcess } from "./CallExpProcess";
import { ExpPReturn, ExpProcess } from "./EPInterface";
import { CodeExpression } from "./Expression";


/** 条件表达式特殊处理 */
export function condExpProcess(this:CodeExpression, node: Node):ExpPReturn{ 
    //checkKind(node,SyntaxKind.IfStatement);
    let out = new ExpPReturn();

    let exp = node;
    if(node.isKind(SyntaxKind.IfStatement))
        exp = node.getExpression();

    let result = new ExpPReturn();

    if(exp.isKind(SyntaxKind.CallExpression))
        result = CallExpProcess.bind(this)(exp);
    else
        result = this.process(exp);

    //取preFunc与token
    out.token = result.token;
    if(!result.isRtnNofuncReq())
        out.preFuncs.push(...result.preFuncs);
    return out;
}