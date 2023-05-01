"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidExpProcess = exports.ExpProcessReturn = void 0;
class ExpProcessReturn {
    _preFuncs;
    _token;
    constructor(token, preFuncs) {
        this._preFuncs = preFuncs || [];
        this._token = token || null;
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
    setToken(obj) {
        this._token = obj;
    }
    getToken() {
        return this._token;
    }
    getPreFuncs() {
        return this._preFuncs;
    }
    isVaild() {
        return this._token != null;
    }
}
exports.ExpProcessReturn = ExpProcessReturn;
function VoidExpProcess() {
    return new ExpProcessReturn();
}
exports.VoidExpProcess = VoidExpProcess;
