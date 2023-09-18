"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceFileData = void 0;
const Utils_1 = require("../../Utils");
const GlobalFunction_1 = require("./CodeBlock/GlobalFunction");
class SourceFileData {
    /**主文件ID */
    id;
    /**基础的effect列表 */
    _rootArray;
    /**记录子代码块的数量 */
    count = 0;
    /**完成编译的文本 */
    _serializedText = null;
    //全局函数ID表 用于确认是否有对应参数的全局函数
    _globalFuncTable = {};
    constructor(id, rootArray) {
        this.id = id;
        this._rootArray = rootArray || [];
    }
    /**获取一个不重复的随机ID
     * @returns 代码块ID
     */
    genRID() {
        return this.count++;
    }
    addGlobalFunction(node) {
        let gfunc = new GlobalFunction_1.GlobalFunction(node, this);
        this._globalFuncTable[gfunc.getRawName()] = gfunc;
        return gfunc;
    }
    getGlobalFunction(rawName) {
        return this._globalFuncTable[rawName];
    }
    addEoc(eocobj) {
        this._rootArray.push(eocobj);
    }
    getRootArray() {
        return (0, Utils_1.deepClone)(this._rootArray);
    }
    getRootEoc() {
        for (let obj of this._rootArray) {
            let aobj = obj;
            if (aobj.id == this.id)
                return aobj;
        }
        return null;
    }
    setSerializedText(text) {
        this._serializedText = text;
    }
    getSerializedText() {
        return this._serializedText;
    }
}
exports.SourceFileData = SourceFileData;
