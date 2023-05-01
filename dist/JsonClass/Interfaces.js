"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertJsonModuleObjToJObject = void 0;
const Utils_1 = require("../Utils");
function isJsonModule(value) {
    return typeof value === 'object' && value !== null && 'build' in value && typeof value.build === 'function';
}
function convertJsonModuleObjToJObject(obj) {
    const result = {};
    for (const key in obj) {
        const value = obj[key];
        if (value === null)
            continue;
        if (isJsonModule(value))
            result[key] = value.build();
        else
            result[key] = value;
    }
    return (0, Utils_1.deepClone)(result);
}
exports.convertJsonModuleObjToJObject = convertJsonModuleObjToJObject;
