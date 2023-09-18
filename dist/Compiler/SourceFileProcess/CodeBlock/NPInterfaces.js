"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidProcess = exports.CBPReturn = void 0;
/**CodeBlock返回值 */
class CBPReturn {
    /**在应用前需要执行的函数 */
    preFuncs;
    /**主要返回值 JToken */
    tokens;
    /**
     * @param tokens    JToken
     * @param preFuncs  在应用前需要执行的函数
     */
    constructor(tokens, preFuncs) {
        this.preFuncs = preFuncs || [];
        this.tokens = tokens || [];
    }
    mergePreFuncList(obj) {
        this.preFuncs.push(...obj.preFuncs);
    }
    mergeTokenList(obj) {
        this.tokens.push(...obj.tokens);
    }
    isVaild() {
        return this.tokens.length > 0 || this.preFuncs.length > 0;
    }
}
exports.CBPReturn = CBPReturn;
function VoidProcess() {
    return new CBPReturn();
}
exports.VoidProcess = VoidProcess;
