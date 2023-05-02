"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalFunction = void 0;
const ts_morph_1 = require("ts-morph");
const Functions_1 = require("../../Functions");
const CodeBlock_1 = require("../CodeBlock");
class GlobalFunction {
    _node;
    _sfd;
    _params = [];
    //动态生成的不同参数函数代码块
    _dynamicCodeBlockTable = {};
    constructor(node, sfd) {
        (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.FunctionDeclaration);
        this._node = node;
        this._sfd = sfd;
        this._params = node.getParameters().map((value) => value.getText());
    }
    getNode() {
        return this._node;
    }
    getSfd() {
        return this._sfd;
    }
    getRawName() {
        return this.getNode().getNameOrThrow();
    }
    /**获取全局函数ID
     * @param args 参数
     */
    getId(args) {
        let base = this.getSfd().getId() + "_" + this.getRawName();
        if (args != null) {
            for (let arg of args)
                base += "_" + arg;
        }
        return base;
    }
    getCodeBlock(args) {
        let cid = this.getId(args);
        if (this._dynamicCodeBlockTable[cid] != null)
            return this._dynamicCodeBlockTable[cid];
        let funcid = this.getId(args);
        let codeBody = this.getNode().getBodyOrThrow();
        let cb = new CodeBlock_1.default(funcid, codeBody, this.getSfd());
        //传参
        if (args == null)
            args = [];
        if (args.length > this._params.length)
            throw (0, Functions_1.throwLog)(this._node, "传入参数超出定义个数");
        for (let i in args)
            cb.addPassArgs(this._params[i], args[i]);
        //let cb = new CodeBlock(codeBody,this._sfd,this._cbd.genSubBlock());
        cb.build();
        this._dynamicCodeBlockTable[cid] = cb;
        return cb;
    }
    /**获取全局函数返回值ID
     * @param rawFuncName
     */
    getReturnID() {
        return this.getSfd().getId() + "_" + this.getRawName() + "_return";
    }
}
exports.GlobalFunction = GlobalFunction;
