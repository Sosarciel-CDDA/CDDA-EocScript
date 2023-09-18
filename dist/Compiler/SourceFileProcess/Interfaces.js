"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceFileData = void 0;
const GlobalFunction_1 = require("./CodeBlock/GlobalFunction");
class SourceFileData {
    /**主文件ID */
    id;
    /**effect列表 */
    rootArray;
    /**记录子代码块的数量 */
    count = 0;
    /**完成编译的文本 */
    _serializedText = null;
    //全局函数ID表 用于确认是否有对应参数的全局函数
    _globalFuncTable = {};
    constructor(id, rootArray) {
        this.id = id;
        this.rootArray = rootArray || [];
    }
    /**获取一个不重复的随机ID
     * @returns 代码块ID
     */
    genRID() {
        return this.count++;
    }
    /**添加一个全局函数 */
    addGlobalFunction(node) {
        let gfunc = new GlobalFunction_1.GlobalFunction(node, this);
        this._globalFuncTable[gfunc.getRawName()] = gfunc;
        return gfunc;
    }
    /**获得一个全局函数 */
    getGlobalFunction(rawName) {
        return this._globalFuncTable[rawName];
    }
    addEoc(eocobj) {
        this.rootArray.push(eocobj);
    }
    /**获取主EOC */
    getRootEoc() {
        for (let obj of this.rootArray) {
            let aobj = obj;
            if (aobj.id == this.id)
                return aobj;
        }
        return null;
    }
    /**设置输出文本 */
    setSerializedText(text) {
        this._serializedText = text;
    }
    /**获取输出文本 */
    getSerializedText() {
        return this._serializedText;
    }
}
exports.SourceFileData = SourceFileData;
