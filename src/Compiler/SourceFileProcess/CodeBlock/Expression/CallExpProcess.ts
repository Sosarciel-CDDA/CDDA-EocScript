import { Expression, Node, SyntaxKind } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
import { ExpProcess, ExpPReturn } from "./EPInterface";
import { checkKind, throwLog } from "../../Functions";
import { JArray, JToken } from "Utils";
import { CodeExpression } from "./Expression";
import { CalcExpProcess } from "./CalcExpProcess";

//特殊函数
let _processFunc:Record<string,ExpProcess|null> = {
    "eobj"  :EObjProcess        ,//变量申明表达式 运行js 返回 obj
    "earr"  :EArrProcess        ,//变量申明表达式 运行js 返回 array 多个preFunc
    "u_val" :DefaultProcess     ,//内置函数 转为字符串
    "and"   :AndProcess         ,
    "or"    :OrProcess          ,
    "not"   :NotProcess         ,
    "required_event"        : FieldAddProcess,
    "recurrence"            : FieldAddProcess,
    "deactivate_condition"  : CondFieldAddProcess,
    "global"                : FieldAddProcess,
    "run_for_npcs"          : FieldAddProcess,
    "EOC_TYPE"              : FieldAddProcess,
}

//处理并替换传入参数
function argProcess(ce:CodeExpression,nodes:Array<Node>){
    let args = nodes.map(val=>ce.getLocalVal(val.getText()));
    return args;
}
//字段添加
function FieldAddProcess(this:CodeExpression,node: Node):ExpPReturn{
    checkKind(node,SyntaxKind.CallExpression);
    let cb = this.getCodeBlock();
    let id = node.getExpression().getText();
    let text = node.getArguments()[0].getText();
    //自动给OBJ括号
    if(text[0]=="{"&&text[text.length-1]=="}")
        text = "("+text+")";

    let tokenObj = eval(text);
    cb.addEocField(id,tokenObj);
    return new ExpPReturn();
}

//条件字段添加
function CondFieldAddProcess(this:CodeExpression,node: Node):ExpPReturn{
    checkKind(node,SyntaxKind.CallExpression);
    let cb = this.getCodeBlock();
    let id = node.getExpression().getText();
    let cond = node.getArguments()[0];

    cb.addEocField(id, CalcExpProcess.bind(this)(cond).getToken());
    return new ExpPReturn();
}

//调用函数
export function CallExpProcess(this:CodeExpression, node: Node):ExpPReturn{
    checkKind(node,SyntaxKind.CallExpression);
    let out = new ExpPReturn();

    let id = node.getExpression().getText();
    let spFunc = _processFunc[id];
    if(spFunc!=null)
        return spFunc.bind(this)(node);

    //全局函数
    let gfunc = this.getSfd().getGlobalFunction(id);
    if(gfunc==null){//调用eoc
        out.addPreFunc({ "run_eocs": id });
        return out;
        //throw throwLog(node,"CallExpProcess 未找到 gfunc id:"+id);
    }
    let args = argProcess(this,node.getArguments());

    //动态创建代码块
    let cb = gfunc.getCodeBlock(args);

    out.addPreFunc({ "run_eocs": gfunc.getId(args) });
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
function EArrProcess(this:CodeExpression,node: Node):ExpPReturn{
    checkKind(node,SyntaxKind.CallExpression);

    let out = new ExpPReturn();

    let text = node.getArguments()[0].getText();
    let tokenArr = eval(text);
    out.addPreFuncList(tokenArr);
    return out;
}

//直接输出字符串
function DefaultProcess(this:CodeExpression,node: Node):ExpPReturn{
    checkKind(node,SyntaxKind.CallExpression);
    let out = new ExpPReturn();
    //替换参数然后输出字符串
    //node.getArguments();
    let args = argProcess(this,node.getArguments());

    let text = node.getText();
    let regex = /.*\((.*)\)/;
    let argsText = "";
    for(let arg of args){
        if(argsText!="")
            argsText+=",";
        argsText+=arg
    }

    text = text.replace(regex, (match, p1) => {
        return match.replace(p1, argsText);
    });

    out.setToken(text);
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

