import { Node,SyntaxKind } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
import { checkKind, throwLog } from "../../Functions";
import { ExpProcess, ExpPReturn } from "./EPInterface";
import { CallExpProcess } from "./CallExpProcess";
import { CodeExpression } from "./Expression";




let _processFunc:Record<number,ExpProcess|null> = {
    [SyntaxKind.NumericLiteral          ]:NumMathExpProcess         ,//数字
    [SyntaxKind.StringLiteral           ]:NumMathExpProcess         ,//字符串
    [SyntaxKind.CallExpression          ]:CallMathExpProcess        ,//函数
    [SyntaxKind.Identifier              ]:IdMathExpProcess          ,//变量
    [SyntaxKind.BinaryExpression        ]:BinaryMathExpProcess      ,//表达式
    [SyntaxKind.ParenthesizedExpression ]:ParentMathExpProcess      ,//括号
}

//SyntaxKind:ParenthesizedExpression
//处理表达式
//计算 返回Math右值字符串值
export function MathExpProcess(this:CodeExpression, node: Node):ExpPReturn{
    let out = new ExpPReturn();
    let func = _processFunc[node.getKind()];
    if(func==null)
        throw throwLog(node,"错误的 NumberExpProcess 表达式");

    let result = func.bind(this)(node);
    out.preFuncs.push(...result.preFuncs);
    out.token = result.token;
    return out;
    //throw throwLog(node,"未知的数字表达式");
    //return outObj;
}

function IdMathExpProcess(this:CodeExpression, node: Node):ExpPReturn{
    checkKind(node,SyntaxKind.Identifier);
    let outObj = new ExpPReturn();
    let name = this.getLocalVal(node.getText());
    outObj.token = name;
    return outObj;
}

function NumMathExpProcess(this:CodeExpression, node: Node):ExpPReturn{
    let outObj = new ExpPReturn();
    let name = node.getText();
    outObj.token = name;
    return outObj;
}

function CallMathExpProcess(this:CodeExpression, node: Node):ExpPReturn{
    checkKind(node,SyntaxKind.CallExpression);
    let out = new ExpPReturn();
    let result = CallExpProcess.bind(this)(node);
    if(!result.isRtnNofuncReq())
        out.mergePreFuncList(result);
    out.token = result.token;
    return out;
}

function BinaryMathExpProcess(this:CodeExpression, node: Node):ExpPReturn{
    checkKind(node,SyntaxKind.BinaryExpression);
    let outObj = new ExpPReturn();

    let lft = MathExpProcess.bind(this)(node.getLeft());
    let rit = MathExpProcess.bind(this)(node.getRight());
    let ope = node.getOperatorToken().getText();

    if(!lft.isVaild() || !rit.isVaild() || ope==null)
        return outObj;
    outObj.mergePreFuncList(lft);
    outObj.mergePreFuncList(rit);

    outObj.token = (lft.token+ope+rit.token);
    return outObj;
    //return { "math": [fst,mid,lst]}
}
function ParentMathExpProcess(this:CodeExpression, node: Node):ExpPReturn{
    checkKind(node,SyntaxKind.ParenthesizedExpression);
    let outObj = new ExpPReturn();
    let subObj = MathExpProcess.bind(this)(node.getExpression());
    outObj.mergePreFuncList(subObj);
    outObj.token = "("+subObj.token+")";
    return outObj;
}
