"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallExpProcess = void 0;
const ts_morph_1 = require("ts-morph");
const EPInterface_1 = require("./EPInterface");
const Functions_1 = require("../../Functions");
const CalcExpProcess_1 = require("./CalcExpProcess");
const CondExpProcess_1 = require("./CondExpProcess");
//特殊函数
let _processFunc = {
    "eobj": EObjProcess,
    "earr": EArrProcess,
    //"u_val" :DefaultProcess     ,//内置函数 转为字符串
    "and": AndProcess,
    "or": OrProcess,
    "not": NotProcess,
    "required_event": FieldAddProcess,
    "recurrence": FieldAddProcess,
    "deactivate_condition": CondFieldAddProcess,
    "condition": CondFieldAddProcess,
    "global": FieldAddProcess,
    "run_for_npcs": FieldAddProcess,
    "eoc_type": FieldAddProcess,
};
//处理并替换传入参数
function argProcess(ce, nodes) {
    let args = nodes.map(val => ce.getLocalVal(val.getText()));
    return args;
}
//字段添加
function FieldAddProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let cb = this.getCodeBlock();
    let id = node.getExpression().getText();
    let text = node.getArguments()[0].getText();
    //自动给OBJ括号
    if (text[0] == "{" && text[text.length - 1] == "}")
        text = "(" + text + ")";
    let tokenObj = eval(text);
    cb.addEocField(id, tokenObj);
    return new EPInterface_1.ExpPReturn();
}
//条件字段添加
function CondFieldAddProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let cb = this.getCodeBlock();
    let id = node.getExpression().getText();
    let cond = node.getArguments()[0];
    cb.addEocField(id, CalcExpProcess_1.CalcExpProcess.bind(this)(cond).getToken());
    return new EPInterface_1.ExpPReturn();
}
//调用函数
function CallExpProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpPReturn();
    let id = node.getExpression().getText();
    //特殊函数
    let spFunc = _processFunc[id];
    if (spFunc != null) {
        let spReturn = spFunc.bind(this)(node);
        //console.log(spReturn.getToken())
        return spReturn;
    }
    let gfunc = this.getSfd().getGlobalFunction(id);
    //预留内置函数
    if (gfunc == null)
        return DefaultProcess.bind(this)(node);
    //全局函数处理
    let args = argProcess(this, node.getArguments());
    //动态创建代码块
    let cb = gfunc.getCodeBlock(args);
    out.addPreFunc({ "run_eocs": gfunc.getId(args) });
    let returnid = gfunc.getReturnID(args);
    if (returnid != null)
        out.setToken(returnid);
    return out;
}
exports.CallExpProcess = CallExpProcess;
//特殊函数EToken
function EObjProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpPReturn();
    let text = node.getArguments()[0].getText();
    //自动给OBJ括号
    if (text[0] == "{" && text[text.length - 1] == "}")
        text = "(" + text + ")";
    //console.log(text)
    //替换变量
    let argMap = this.getLocalValMap();
    let preText = "";
    for (let orig in argMap) {
        preText += "let " + orig + "=" + argMap[orig] + ";\n";
    }
    text = preText + text;
    //console.log(text)
    let tokenObj = eval(text);
    out.setToken(tokenObj);
    out.addPreFunc(tokenObj);
    out.setRtnNofuncReq();
    return out;
}
function EArrProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpPReturn();
    let text = node.getArguments()[0].getText();
    //替换变量
    let argMap = this.getLocalValMap();
    let preText = "";
    for (let orig in argMap) {
        preText += "let " + orig + "=" + argMap[orig] + ";\n";
    }
    text = preText + text;
    let tokenArr = eval(text);
    out.addPreFuncList(tokenArr);
    return out;
}
//处理内置函数或eoc
function DefaultProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpPReturn();
    //替换参数然后输出 字符串类型的本地变量参数数组
    //node.getArguments();
    let args = argProcess(this, node.getArguments());
    //将括号内的文本匹配并替换
    let text = node.getText();
    let argsText = "";
    for (let arg of args) {
        if (argsText != "")
            argsText += ",";
        argsText += arg;
    }
    //将捕获部分替换成 本地变量参数字符串
    let regex = /.*\((.*)\)/;
    text = text.replace(regex, (match, p1) => {
        return match.replace(p1, argsText);
    });
    let id = node.getExpression().getText();
    out.addPreFunc({ "run_eocs": id });
    out.setToken(text);
    out.setRtnNofuncReq();
    return out;
}
function AndProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpPReturn();
    let arr = [];
    let args = node.getArguments();
    for (let arg of args) {
        //let result = this.process(arg);
        let result = CondExpProcess_1.condExpProcess.bind(this)(arg);
        out.mergePreFuncList(result);
        arr.push(result.getToken());
    }
    out.setToken({ and: arr });
    return out;
}
function OrProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpPReturn();
    let arr = [];
    let args = node.getArguments();
    for (let arg of args) {
        //let result = this.process(arg);
        let result = CondExpProcess_1.condExpProcess.bind(this)(arg);
        out.mergePreFuncList(result);
        arr.push(result.getToken());
    }
    out.setToken({ or: arr });
    return out;
}
function NotProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpPReturn();
    let arg = node.getArguments()[0];
    //let result = this.process(arg);
    let result = CondExpProcess_1.condExpProcess.bind(this)(arg);
    out.mergePreFuncList(result);
    out.setToken({ not: result.getToken() });
    return out;
}
