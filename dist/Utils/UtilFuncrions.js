"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFiles = exports.writeJSONFileByText = exports.writeJSONFile = exports.loadJSONFile = exports.deepClone = void 0;
const fs = require("fs");
const path = require("path");
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.deepClone = deepClone;
/**加载json文件
 * Object (string)
 * @param {string} filePath - 文件路径
 * @returns {JObject}
 */
function loadJSONFile(filePath) {
    if (filePath.indexOf(".json") == -1)
        filePath += ".json";
    // 判断文件路径是否存在
    if (!fs.existsSync(filePath)) {
        // 如果路径不存在，创建文件夹
        try {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }
        catch (e) { }
        // 创建文件
        fs.writeFileSync(filePath, '');
    }
    let str = fs.readFileSync(filePath);
    if (str == "" || str == null)
        str = "{}";
    return JSON.parse(str);
}
exports.loadJSONFile = loadJSONFile;
/**写入JSON文件
 * void (string,Object)
 * @async
 * @param {string} filePath - 文件路径
 * @param {JObject} obj 	    - 所要写入的JObject
 * @returns {Promise<void>}
 */
async function writeJSONFile(filePath, obj) {
    let str = JSON.stringify(obj, null, "\t");
    if (filePath.indexOf(".json") === -1)
        filePath += ".json";
    // 判断文件路径是否存在
    await new Promise((resolve, reject) => {
        fs.exists(filePath, (ex) => {
            if (!ex) {
                try {
                    fs.mkdirSync(path.dirname(filePath), { recursive: true });
                }
                catch (e) {
                    console.log("创建文件错误:" + e);
                }
            }
            resolve(true);
        });
    });
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, str, function (err) {
            if (err === null) {
                console.log(`${filePath} writeJSONFile 成功`);
                resolve();
            }
            else {
                console.log(`${filePath} writeJSONFile 错误`);
                console.log(err);
                reject(err);
            }
        });
    });
}
exports.writeJSONFile = writeJSONFile;
/**写入文件
 * void (string,Object)
 * @async
 * @param {string} filePath - 文件路径
 * @param {string} str 	    - 所要写入的JObject
 * @returns {Promise<void>}
 */
async function writeJSONFileByText(filePath, str) {
    // 判断文件路径是否存在
    await new Promise((resolve, reject) => {
        fs.exists(filePath, (ex) => {
            if (!ex) {
                try {
                    fs.mkdirSync(path.dirname(filePath), { recursive: true });
                }
                catch (e) {
                    console.log("创建文件错误:" + e);
                }
            }
            resolve(true);
        });
    });
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, str, function (err) {
            if (err === null) {
                console.log(`${filePath} writeFile 成功`);
                resolve();
            }
            else {
                console.log(`${filePath} writeFile 错误`);
                console.log(err);
                reject(err);
            }
        });
    });
}
exports.writeJSONFileByText = writeJSONFileByText;
/**在目录下寻找符合正则表达式的文件
 */
function findFiles(dir, regex) {
    let result = [];
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory())
            result = result.concat(findFiles(filePath, regex));
        else if (regex.test(file))
            result.push(filePath);
    }
    return result;
}
exports.findFiles = findFiles;
