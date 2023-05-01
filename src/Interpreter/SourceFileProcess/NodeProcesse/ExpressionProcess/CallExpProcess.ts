import { Node, SyntaxKind } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
import { ExpProcess, ExpProcessReturn } from "./EPInterface";
import { checkKind, throwLog } from "../../Functions";
import { getFuncReVal } from "../NPInterfaces";
import { JToken } from "@/src/Utils";

//特殊函数
let _processFunc:Record<string,ExpProcess|null> = {
    "EToken":ETokenProcess   ,//变量申明表达式 运行js 返回obj
    "u_val":DefaultProcess   ,//内置函数 转为字符串
}

//调用函数
export function CallExpProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
    checkKind(node,SyntaxKind.CallExpression);
    let out = new ExpProcessReturn();

    let id = node.getExpression().getText();
    let spFunc = _processFunc[id];
    if(spFunc!=null)
        return spFunc(node,sfd);

    out.addPreFunc({ "run_eocs": id });
    out.setToken(getFuncReVal(id));

    return out;
}

//特殊函数EToken
function ETokenProcess(node: Node,sfd:SourceFileData):ExpProcessReturn{
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