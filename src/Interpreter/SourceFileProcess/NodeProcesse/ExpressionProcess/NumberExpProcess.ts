import { Node,SyntaxKind } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
import { checkKind, throwLog } from "../../Functions";
import { ExpProcess, ExpProcessReturn } from "./EPInterface";
import { CallExpProcess } from "./CallExpProcess";




let _processFunc:Record<number,ExpProcess|null> = {
    [SyntaxKind.NumericLiteral]:NumMathExpProcess            ,//数字
    [SyntaxKind.StringKeyword]:NumMathExpProcess             ,//字符串
    [SyntaxKind.CallExpression]:CallMathExpProcess           ,//函数
    [SyntaxKind.Identifier]:IdMathExpProcess                 ,//变量
    [SyntaxKind.BinaryExpression]:BinaryMathExpProcess       ,//表达式
    [SyntaxKind.ParenthesizedExpression]:ParentMathExpProcess,//括号
}

//SyntaxKind:ParenthesizedExpression
//处理表达式
//计算 返回Math右值字符串值
export function MathExpProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
    let out = new ExpProcessReturn();
    let func = _processFunc[node.getKind()];
    if(func==null)
        throw throwLog(node,"错误的 NumberExpProcess 表达式");

    let result = func(node,sfd);
    out.addPreFuncList(result.getPreFuncs());
    out.setToken(result.getToken());
    return out;
    //throw throwLog(node,"未知的数字表达式");
    //return outObj;
}

function IdMathExpProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
    checkKind(node,SyntaxKind.Identifier);
    let outObj = new ExpProcessReturn();
    let name = node.getText();
    outObj.setToken(name);
    return outObj;
}

function NumMathExpProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
    let outObj = new ExpProcessReturn();
    let name = node.getText();
    outObj.setToken(name);
    return outObj;
}

function CallMathExpProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
    checkKind(node,SyntaxKind.CallExpression);
    return CallExpProcess(node,sfd);
}

function BinaryMathExpProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
    checkKind(node,SyntaxKind.BinaryExpression);
    let outObj = new ExpProcessReturn();

    let lft = MathExpProcess(node.getLeft(),sfd);
    let rit = MathExpProcess(node.getRight(),sfd);
    let ope = node.getOperatorToken().getText();

    if(!lft.isVaild() || !rit.isVaild() || ope==null)
        return outObj;
    outObj.mergePreFuncList(lft);
    outObj.mergePreFuncList(rit);

    outObj.setToken(lft.getToken()+ope+rit.getToken())
    return outObj;
    //return { "math": [fst,mid,lst]}
}
function ParentMathExpProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
    checkKind(node,SyntaxKind.ParenthesizedExpression);
    let outObj = new ExpProcessReturn();
    let subObj = MathExpProcess(node.getExpression(),sfd);
    outObj.mergePreFuncList(subObj);
    outObj.setToken("("+subObj.getToken()+")");
    return outObj;
}
