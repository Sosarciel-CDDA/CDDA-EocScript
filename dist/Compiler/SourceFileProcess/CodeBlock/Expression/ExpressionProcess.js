"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeExpression = exports.ExpressionProcess = void 0;
const ts_morph_1 = require("ts-morph");
const NPInterfaces_1 = require("../NPInterfaces");
const Functions_1 = require("../../Functions");
const CallExpProcess_1 = require("./CallExpProcess");
const CalcExpProcess_1 = require("./CalcExpProcess");
const EPInterface_1 = require("./EPInterface");
const ValExpProcess_1 = require("./ValExpProcess");
const MathExpProcess_1 = require("./MathExpProcess");
//表达式申明处理
function ExpressionProcess(node) {
    //常规表达式列表
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.ExpressionStatement);
    //if(node.isKind(SyntaxKind.ExpressionStatement) || node.isKind())
    let out = new NPInterfaces_1.CBPReturn();
    let subExp = node.getExpression();
    let exp = new CodeExpression(subExp, this);
    let result = exp.build();
    out.addPreFuncList(result.getPreFuncs());
    out.addToken(result.getToken());
    return out;
    //throw throwLog(node,"未知的申明表达式类型");
}
exports.ExpressionProcess = ExpressionProcess;
//直接调用函数
function CallStateExpProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.CallExpression);
    let out = new EPInterface_1.ExpPReturn();
    let result = CallExpProcess_1.CallExpProcess.bind(this)(node);
    //判断是否有函数返回 用于判断EObj
    if (result.getPreFuncs().length > 0)
        out.addPreFuncList(result.getPreFuncs());
    else //EObj无函数返回
        out.setToken(result.getToken());
    return out;
}
//return申明
function ReturnStateExpProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.ReturnStatement);
    let out = new EPInterface_1.ExpPReturn();
    let rit = MathExpProcess_1.MathExpProcess.bind(this)(node.getExpressionOrThrow());
    out.addPreFuncList(rit.getPreFuncs());
    let obj = { "math": [this.getCodeBlock().getReturnId(), "=", rit.getToken()] };
    out.setToken(obj);
    //return [{ "math": [ id, mid, lst ]}];
    return out;
}
class CodeExpression {
    _node;
    _codeBlock;
    constructor(node, codeBlock) {
        this._node = node;
        this._codeBlock = codeBlock;
    }
    getCodeBlock() {
        return this._codeBlock;
    }
    getSfd() {
        return this.getCodeBlock().getSfd();
    }
    build() {
        return this.process(this._node);
        //throw throwLog(node,"未知的申明表达式类型");
    }
    process(node) {
        //return
        if (node.isKind(ts_morph_1.SyntaxKind.ReturnStatement))
            return ReturnStateExpProcess.bind(this)(node);
        //直接调用函数
        if (node.isKind(ts_morph_1.SyntaxKind.CallExpression))
            return CallStateExpProcess.bind(this)(node);
        //表达式
        if (node.isKind(ts_morph_1.SyntaxKind.BinaryExpression)) {
            let opera = node.getOperatorToken().getText();
            if (['==', '>=', '<=', '>', '<', '=', '+=', '-=', '*=', '/=', '%='].includes(opera))
                return CalcExpProcess_1.CalcExpProcess.bind(this)(node);
            return ValExpProcess_1.ValExpProcess.bind(this)(node);
        }
        //定义
        if (node.isKind(ts_morph_1.SyntaxKind.VariableDeclaration))
            return CalcExpProcess_1.CalcExpProcess.bind(this)(node);
        //单字
        if (node.isKind(ts_morph_1.SyntaxKind.Identifier) ||
            node.isKind(ts_morph_1.SyntaxKind.StringLiteral) ||
            node.isKind(ts_morph_1.SyntaxKind.NumericLiteral))
            return ValExpProcess_1.ValExpProcess.bind(this)(node);
        return CalcExpProcess_1.CalcExpProcess.bind(this)(node);
    }
}
exports.CodeExpression = CodeExpression;
