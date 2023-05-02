"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidProcess = exports.CBPReturn = void 0;
class CBPReturn {
    _preFuncs;
    _tokens;
    constructor(tokens, preFuncs) {
        this._preFuncs = preFuncs || [];
        this._tokens = tokens || [];
    }
    addPreFunc(obj) {
        this._preFuncs.push(obj);
    }
    addPreFuncList(objs) {
        for (let obj of objs)
            this.addPreFunc(obj);
    }
    mergePreFuncList(obj) {
        this.addPreFuncList(obj.getPreFuncs());
    }
    addToken(obj) {
        if (obj != null)
            this._tokens.push(obj);
    }
    addTokenList(objs) {
        for (let obj of objs)
            this.addToken(obj);
    }
    mergeTokenList(obj) {
        this.addTokenList(obj.getTokens());
    }
    getTokens() {
        return this._tokens;
    }
    getPreFuncs() {
        return this._preFuncs;
    }
    isVaild() {
        return this._tokens.length > 0 || this._preFuncs.length > 0;
    }
}
exports.CBPReturn = CBPReturn;
function VoidProcess() {
    return new CBPReturn();
}
exports.VoidProcess = VoidProcess;
