import { Node, SyntaxKind } from "ts-morph";
import { ExpProcess, ExpPReturn, VoidExpProcess } from "./EPInterface";
import { checkKind, throwLog } from "../../Functions";
import { JToken } from "@/src/Utils";
import { CodeExpression } from "./Expression";
import { MathExpProcess } from "./MathExpProcess";


const _processFunc:Record<number,ExpProcess|null> = {
    [SyntaxKind.VariableDeclaration ]:VarCalcExpProcess      ,//变量申明表达式
    [SyntaxKind.BinaryExpression    ]:BinaryCalcExpProcess   ,//表达式
    [SyntaxKind.SemicolonToken      ]:VoidExpProcess         ,//分号
}

/** 所有 (lval opera rval) 赋值/比较/定义 表达式
 *  表达式处理路由
 */
export function CalcExpProcess(this:CodeExpression, node: Node):ExpPReturn{
    let out = new ExpPReturn();

    let func = _processFunc[node.getKind()];
    if(func==null)
        throw throwLog(node,"错误的 CalcExpProcess 表达式");

    let result = func.bind(this)(node);
    out.preFuncs.push(...result.preFuncs);
    out.token = result.token;
    return out;
}

/**表达式处理 */
function BinaryCalcExpProcess(this:CodeExpression, node: Node):ExpPReturn{
    checkKind(node,SyntaxKind.BinaryExpression);
    let out = new ExpPReturn();

    let lft = MathExpProcess.bind(this)(node.getLeft());
    let rit = MathExpProcess.bind(this)(node.getRight());
    let opera = node.getOperatorToken().getText();

    out.preFuncs.push(...lft.preFuncs);
    out.preFuncs.push(...rit.preFuncs);

    let obj:JToken = {};

    obj = { "math": [ lft.token, opera, rit.token ]};
    out.token = obj;

    return out;
}

/**变量申明表达式 */
function VarCalcExpProcess(this:CodeExpression, node: Node):ExpPReturn{
    checkKind(node,SyntaxKind.VariableDeclaration);
    let out = new ExpPReturn();

    let id = this.getLocalVal(node.getName());
    let rit = MathExpProcess.bind(this)(node.getInitializerOrThrow());

    out.preFuncs.push(...rit.preFuncs);
    let obj:JToken = {};
    obj = { "math": [ id , "=", rit.token ]};
    out.token = obj;
    return out;
}




