import { Expression, Node, SyntaxKind } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
import { ExpProcess, ExpPReturn } from "./EPInterface";
import { checkKind, throwLog } from "../../Functions";
import { JArray, JToken } from "Utils";
import { CodeExpression } from "./Expression";

//特殊函数
let _processFunc:Record<string,ExpProcess|null> = {
    "eobj"  :EObjProcess        ,//变量申明表达式 运行js 返回obj
    "u_val" :DefaultProcess     ,//内置函数 转为字符串
    "and"   :AndProcess         ,
    "or"    :OrProcess          ,
    "not"   :NotProcess         ,
}

//调用函数
export function CallExpProcess(this:CodeExpression, node: Node):ExpPReturn{
    checkKind(node,SyntaxKind.CallExpression);
    let out = new ExpPReturn();

    let id = node.getExpression().getText();
    let spFunc = _processFunc[id];
    if(spFunc!=null)
        return spFunc.bind(this)(node);

    let gfunc = this.getSfd().getGlobalFunction(id);
    if(gfunc==null)
        throw throwLog(node,"CallExpProcess 未找到 gfunc id:"+id);

    out.addPreFunc({ "run_eocs": gfunc.getId() });
    out.setToken(gfunc.getReturnID());

    return out;
}

//特殊函数EToken
function EObjProcess(this:CodeExpression,node: Node):ExpPReturn{
    checkKind(node,SyntaxKind.CallExpression);

    let out = new ExpPReturn();

    let text = node.getArguments()[0].getText();
    //自动给OBJ括号
    if(text[0]=="{"&&text[text.length-1]=="}")
        text = "("+text+")";

    let tokenObj = eval(text);
    out.setToken(tokenObj);
    return out;
}

//直接输出字符串
function DefaultProcess(this:CodeExpression,node: Node):ExpPReturn{
    checkKind(node,SyntaxKind.CallExpression);
    let out = new ExpPReturn();
    out.setToken(node.getText());
    return out;
}

function AndProcess(this:CodeExpression,node: Node):ExpPReturn{
    checkKind(node,SyntaxKind.CallExpression);
    let out = new ExpPReturn();
    let arr:JArray = [];
    let args = node.getArguments();
    for(let arg of args){
        let result = this.process(arg);
        out.mergePreFuncList(result);
        arr.push(result.getToken());
    }
    out.setToken({and:arr});
    return out;
}
function OrProcess(this:CodeExpression,node: Node):ExpPReturn{
    checkKind(node,SyntaxKind.CallExpression);
    let out = new ExpPReturn();
    let arr:JArray = [];
    let args = node.getArguments();
    for(let arg of args){
        let result = this.process(arg);
        out.mergePreFuncList(result);
        arr.push(result.getToken());
    }
    out.setToken({or:arr});
    return out;
}
function NotProcess(this:CodeExpression,node: Node):ExpPReturn{
    checkKind(node,SyntaxKind.CallExpression);
    let out = new ExpPReturn();

    let arg = node.getArguments()[0];

    let result = this.process(arg);
    out.mergePreFuncList(result);

    out.setToken({not:result.getToken()});
    return out;
}