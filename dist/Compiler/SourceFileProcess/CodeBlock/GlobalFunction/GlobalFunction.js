"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalFunction = void 0;
const ts_morph_1 = require("ts-morph");
const Functions_1 = require("../../Functions");
class GlobalFunction {
    _node;
    _sfd;
    constructor(node, sfd) {
        (0, Functions_1.checkKind)(node, ts_morph_1.SyntaxKind.FunctionDeclaration);
        this._node = node;
        this._sfd = sfd;
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
     * @param rawFuncName
     */
    getId() {
        return this.getSfd().getId() + "_" + this.getRawName();
    }
    /**获取全局函数返回值ID
     * @param rawFuncName
     */
    getReturnID() {
        return this.getSfd().getId() + "_" + this.getRawName() + "_return";
    }
}
exports.GlobalFunction = GlobalFunction;
