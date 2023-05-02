"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceFileData = exports.BlockType = void 0;
const Utils_1 = require("Utils");
var BlockType;
(function (BlockType) {
    BlockType["IF"] = "if";
    BlockType["ELSE"] = "else";
    BlockType["CLAUSE"] = "clause";
    BlockType["OTHER"] = "other";
})(BlockType = exports.BlockType || (exports.BlockType = {}));
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
    //特殊代码块ID
    /**根据代码块类型自动生成一个ID
     * @param blockType 代码块类型
     * @returns 代码块ID
     */
    genBlockId(blockType) {
        let eocid = this.getId();
        if (blockType != null)
            eocid += "_" + blockType;
        eocid += "_" + this.getCount();
        this._count += 1;
        return eocid;
    }
    /**根据原始函数ID获取代码块ID
     * @param rawId 原始函数ID
     * @returns 代码块ID
     */
    getBlockId(rawId) {
        return this.getId() + "_" + rawId;
    }
    /**根据代码块名获得此代码块的返回值ID
     * @param blockId 代码块ID
     * @returns 代码块返回值ID
     */
    getReturnId(blockId) {
        return blockId + "_return";
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
