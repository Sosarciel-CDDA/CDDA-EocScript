"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidProcess = exports.getFuncReVal = exports.ProcessReturn = void 0;
class ProcessReturn {
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
        return this._tokens.length > 0;
    }
    getFstToken() {
        return this._tokens[0];
    }
}
exports.ProcessReturn = ProcessReturn;
function getFuncReVal(functionId) {
    return functionId + "_return";
}
exports.getFuncReVal = getFuncReVal;
function VoidProcess() {
    return new ProcessReturn();
}
exports.VoidProcess = VoidProcess;
