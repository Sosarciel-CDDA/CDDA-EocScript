"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpProcesseReturn = void 0;
class ExpProcesseReturn {
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
    mergePreFunc(obj) {
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
exports.ExpProcesseReturn = ExpProcesseReturn;
