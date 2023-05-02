"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceFileData = void 0;
const Utils_1 = require("Utils");
class SourceFileData {
    _id;
    _rootArray;
    _count = 0;
    _serializedText = null;
    constructor(id, rootArray) {
        this._id = id;
        this._rootArray = rootArray || [];
    }
    getCount() {
        return this._count;
    }
    getId() {
        return this._id;
    }
    /**获取一个不重复的随机ID
     * @returns 代码块ID
     */
    genRID() {
        return this._count++;
    }
    /**获取全局函数ID
     * @param rawFuncName
     */
    getGlobalFuncID(rawFuncName) {
        return this.getId() + "_" + rawFuncName;
    }
    /**获取全局函数返回值ID
     * @param rawFuncName
     */
    getGlobalFuncReturnID(rawFuncName) {
        return this.getId() + "_" + rawFuncName + "_return";
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
            if (aobj.id == this._id)
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
