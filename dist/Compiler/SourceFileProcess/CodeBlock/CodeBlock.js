"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBlock = exports.BlockType = void 0;
const ts_morph_1 = require("ts-morph");
const VariableProcess_1 = require("./VariableProcess");
const Functions_1 = require("../Functions");
const FunctionProcess_1 = require("./FunctionProcess");
const Expression_1 = require("./Expression");
const NPInterfaces_1 = require("./NPInterfaces");
const IfProcess_1 = require("./IfProcess");
const SwitchProcess_1 = require("./SwitchProcess");
const ExpressionProcess_1 = require("./ExpressionProcess");
var BlockType;
(function (BlockType) {
    BlockType["IF"] = "if";
    BlockType["ELSE"] = "el";
    BlockType["CLAUSE"] = "ca";
    BlockType["OTHER"] = "ot";
})(BlockType = exports.BlockType || (exports.BlockType = {}));
let _processFunc = {
    [ts_morph_1.SyntaxKind.VariableStatement]: VariableProcess_1.VariableProcess,
    [ts_morph_1.SyntaxKind.FunctionDeclaration]: FunctionProcess_1.FunctionProcess,
    [ts_morph_1.SyntaxKind.ExpressionStatement]: ExpressionProcess_1.ExpressionProcess,
    [ts_morph_1.SyntaxKind.ReturnStatement]: ReturnProcess,
    [ts_morph_1.SyntaxKind.IfStatement]: IfProcess_1.IfProcess,
    [ts_morph_1.SyntaxKind.SwitchStatement]: SwitchProcess_1.SwitchProcess,
};
//处理retur表达式
function ReturnProcess(node) {
    (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.ReturnStatement);
    let outlist = new NPInterfaces_1.CBPReturn();
    //特殊调用
    let exp = new Expression_1.CodeExpression(node, this);
    let rit = exp.build();
    outlist.preFuncs.push(...rit.preFuncs);
    let obj = { "math": [this.getReturnId(), "=", rit.token] };
    outlist.tokens.push(obj);
    //return [{ "math": [ id, mid, lst ]}];
    return outlist;
}
class CodeBlock {
    id;
    _parentBlock;
    _node;
    _sfd;
    _condition;
    _falseNode;
    _processTable = {
        [ts_morph_1.SyntaxKind.VariableStatement]: VariableProcess_1.VariableProcess,
        [ts_morph_1.SyntaxKind.FunctionDeclaration]: FunctionProcess_1.FunctionProcess,
        [ts_morph_1.SyntaxKind.ExpressionStatement]: ExpressionProcess_1.ExpressionProcess,
        [ts_morph_1.SyntaxKind.ReturnStatement]: ReturnProcess,
        [ts_morph_1.SyntaxKind.IfStatement]: IfProcess_1.IfProcess,
        [ts_morph_1.SyntaxKind.SwitchStatement]: SwitchProcess_1.SwitchProcess,
    };
    //传入参数表
    _passArgsTable = {};
    //额外字段
    _eocFieldTable = {};
    constructor(id, node, sfd, condition, falseNode) {
        this.id = id;
        this._node = node;
        this._sfd = sfd;
        this._condition = condition;
        this._falseNode = falseNode;
    }
    getRootId() {
        return this.getSfd().id;
    }
    getReturnId() {
        return this.id + "_rtn";
    }
    /**生成一个子代码块 */
    genSubBlock(id, node, condition, falseNode) {
        let sfd = this.getSfd();
        let subBlockId = this.getRootId() + "_" + id + sfd.genRID();
        let subBlopck = new CodeBlock(subBlockId, node, sfd, condition, falseNode);
        subBlopck._parentBlock = this;
        return subBlopck;
    }
    getSfd() {
        return this._sfd;
    }
    //增加一个传入参数
    addPassArgs(origVal, targetVal) {
        this._passArgsTable[origVal] = targetVal;
    }
    //获取局部变量
    getLocalVal(origVal) {
        //从当前块开始向父块搜索
        let curr = this;
        while (curr != null) {
            let tg = curr._passArgsTable[origVal];
            if (tg != null)
                return tg;
            curr = curr._parentBlock;
        }
        return origVal;
    }
    //局部变量映射
    getLocalValMap() {
        return this._passArgsTable;
    }
    //添加一个额外字段
    addEocField(str, val) {
        this._eocFieldTable[str] = val;
    }
    /**处理代码块
     */
    build() {
        let eoc = {
            id: this.id,
            type: "effect_on_condition",
        };
        if (this._condition != null)
            eoc["condition"] = this._condition;
        eoc["effect"] = [...this.processStatments(this._node)].filter(item => item != null);
        if (this._falseNode != null)
            eoc["false_effect"] = [...this.processStatments(this._falseNode)].filter(item => item != null);
        //额外字段
        for (let field in this._eocFieldTable)
            eoc[field] = this._eocFieldTable[field];
        this._sfd.addEoc(eoc);
        return new NPInterfaces_1.CBPReturn([eoc]);
    }
    /**处理申明列表
     */
    processStatments(node) {
        let statments = [];
        if (Array.isArray(node))
            statments = node;
        else if (node.isKind(ts_morph_1.SyntaxKind.SourceFile) || node.isKind(ts_morph_1.SyntaxKind.Block) || node.isKind(ts_morph_1.SyntaxKind.CaseClause))
            statments = node.getStatements();
        else
            statments = [node];
        let effects = [];
        for (let stat of statments) {
            try {
                let processFunc = _processFunc[stat.getKind()];
                if (processFunc == null)
                    continue;
                let result = processFunc.bind(this)(stat);
                if (!result.isVaild())
                    continue;
                effects.push(...result.preFuncs);
                effects.push(...result.tokens);
            }
            catch (e) {
                console.log("processStatments 出现错误");
                console.log((0, Functions_1.throwLog)(stat));
                throw e;
            }
        }
        //console.log(effects)
        return effects;
    }
}
exports.CodeBlock = CodeBlock;
exports.default = CodeBlock;
