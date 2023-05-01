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
    genRandEocId(str) {
        let eocid = this.getId() + "_" + this.getCount();
        if (str != null)
            eocid += "_" + str;
        this._count += 1;
        return eocid;
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
            if (aobj.id == "root")
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
