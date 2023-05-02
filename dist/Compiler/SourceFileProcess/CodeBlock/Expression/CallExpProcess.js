"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallExpProcess = void 0;
const ts_morph_1 = require("ts-morph");
const EPInterface_1 = require("./EPInterface");
const Functions_1 = require("../../Functions");
const CalcExpProcess_1 = require("./CalcExpProcess");
//特殊函数
let _processFunc = {
    "eobj": EObjProcess,
    "earr": EArrProcess,
    "u_val": DefaultProcess,
    "and": AndProcess,
    "or": OrProcess,
    "not": NotProcess,
    "required_event": FieldAddProcess,
    "recurrence": FieldAddProcess,
    "deactivate_condition": CondFieldAddProcess,
    "global": FieldAddProcess,
    "run_for_npcs": FieldAddProcess,
    "EOC_TYPE": FieldAddProcess,
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
    let spFunc = _processFunc[id];
    if (spFunc != null)
        return spFunc.bind(this)(node);
    //全局函数
    let gfunc = this.getSfd().getGlobalFunction(id);
    if (gfunc == null) { //调用eoc
        out.addPreFunc({ "run_eocs": id });
        return out;
        //throw throwLog(node,"CallExpProcess 未找到 gfunc id:"+id);
    }
    let args = argProcess(this, node.getArguments());
    //动态创建代码块
    let cb = gfunc.getCodeBlock(args);
    out.addPreFunc({ "run_eocs": gfunc.getId(args) });
    out.setToken(gfunc.getReturnID());
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
    let tokenObj = eval(text);
    out.setToken(tokenObj);
    return out;
}
function EArrProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpPReturn();
    let text = node.getArguments()[0].getText();
    let tokenArr = eval(text);
    out.addPreFuncList(tokenArr);
    return out;
}
//直接输出字符串
function DefaultProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpPReturn();
    //替换参数然后输出字符串
    //node.getArguments();
    let args = argProcess(this, node.getArguments());
    let text = node.getText();
    let regex = /.*\((.*)\)/;
    let argsText = "";
    for (let arg of args) {
        if (argsText != "")
            argsText += ",";
        argsText += arg;
    }
    text = text.replace(regex, (match, p1) => {
        return match.replace(p1, argsText);
    });
    out.setToken(text);
    return out;
}
function AndProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpPReturn();
    let arr = [];
    let args = node.getArguments();
    for (let arg of args) {
        let result = this.process(arg);
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
        let result = this.process(arg);
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
    let result = this.process(arg);
    out.mergePreFuncList(result);
    out.setToken({ not: result.getToken() });
    return out;
}
