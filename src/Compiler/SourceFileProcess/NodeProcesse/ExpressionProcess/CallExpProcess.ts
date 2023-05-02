import { Node, SyntaxKind } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
import { ExpProcess, ExpProcessReturn } from "./EPInterface";
import { checkKind, throwLog } from "../../Functions";
import { JArray, JToken } from "@/src/Utils";
import { AutoExpProcess } from "./ExpressionProcess";

//特殊函数
let _processFunc:Record<string,ExpProcess|null> = {
    "eobj"  :EObjProcess        ,//变量申明表达式 运行js 返回obj
    "u_val" :DefaultProcess     ,//内置函数 转为字符串
    "and"   :AndProcess         ,
    "or"    :OrProcess          ,
    "not"   :NotProcess         ,
}

//调用函数
export function CallExpProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
    checkKind(node,SyntaxKind.CallExpression);
    let out = new ExpProcessReturn();

    let id = node.getExpression().getText();
    let spFunc = _processFunc[id];
    if(spFunc!=null)
        return spFunc(node,sfd);

    out.addPreFunc({ "run_eocs": sfd.getBlockId(id) });
    out.setToken(sfd.getReturnId(sfd.getBlockId(id)));

    return out;
}

//特殊函数EToken
function EObjProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
    checkKind(node,SyntaxKind.CallExpression);

    let out = new ExpProcessReturn();

    let text = node.getArguments()[0].getText();
    //自动给OBJ括号
    if(text[0]=="{"&&text[text.length-1]=="}")
        text = "("+text+")";

    let tokenObj = eval(text);
    out.setToken(tokenObj);
    return out;
}

//直接输出字符串
function DefaultProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
    checkKind(node,SyntaxKind.CallExpression);
    let out = new ExpProcessReturn();
    out.setToken(node.getText());
    return out;
}

function AndProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
    checkKind(node,SyntaxKind.CallExpression);
    let out = new ExpProcessReturn();
    let arr:JArray = [];
    let args = node.getArguments();
    for(let arg of args){
        let result = AutoExpProcess(arg,sfd);
        out.mergePreFuncList(result);
        arr.push(result.getToken());
    }
    out.setToken({and:arr});
    return out;
}
function OrProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
    checkKind(node,SyntaxKind.CallExpression);
    let out = new ExpProcessReturn();
    let arr:JArray = [];
    let args = node.getArguments();
    for(let arg of args){
        let result = AutoExpProcess(arg,sfd);
        out.mergePreFuncList(result);
        arr.push(result.getToken());
    }
    out.setToken({or:arr});
    return out;
}
function NotProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
    checkKind(node,SyntaxKind.CallExpression);
    let out = new ExpProcessReturn();

    let arg = node.getArguments()[0];

    let result = AutoExpProcess(arg,sfd);
    out.mergePreFuncList(result);

    out.setToken({not:result.getToken()});
    return out;
}