"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidExpProcess = exports.ExpPReturn = void 0;
class ExpPReturn {
    _preFuncs;
    _token;
    _noFuncReq = false;
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
    //不需要调用函数
    //在嵌入表达式时不添加preFunc
    isRtnNofuncReq() {
        return this._noFuncReq;
    }
    setRtnNofuncReq() {
        this._noFuncReq = true;
    }
}
exports.ExpPReturn = ExpPReturn;
function VoidExpProcess() {
    return new ExpPReturn();
}
exports.VoidExpProcess = VoidExpProcess;
