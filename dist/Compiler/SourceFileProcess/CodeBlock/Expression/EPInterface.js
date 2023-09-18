"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidExpProcess = exports.ExpPReturn = void 0;
/**表达式的返回值 */
class ExpPReturn {
    /**需要预先执行的func */
    preFuncs;
    /**主要返回值 */
    token;
    _noFuncReq = false;
    constructor(token, preFuncs) {
        this.preFuncs = preFuncs || [];
        this.token = token || null;
    }
    mergePreFuncList(obj) {
        this.preFuncs.push(...obj.preFuncs);
    }
    isVaild() {
        return this.token != null;
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
