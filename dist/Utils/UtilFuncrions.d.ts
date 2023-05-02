import { JObject, JToken } from './UtilInterfaces';
export declare function deepClone(obj: JToken): JToken;
/**加载json文件
 * Object (string)
 * @param {string} filePath - 文件路径
 * @returns {JObject}
 */
export declare function loadJSONFile(filePath: string): JObject;
/**写入JSON文件
 * void (string,Object)
 * @async
 * @param {string} filePath - 文件路径
 * @param {JObject} obj 	    - 所要写入的JObject
 * @returns {Promise<void>}
 */
export declare function writeJSONFile(filePath: string, obj: JObject): Promise<void>;
/**写入文件
 * void (string,Object)
 * @async
 * @param {string} filePath - 文件路径
 * @param {string} str 	    - 所要写入的JObject
 * @returns {Promise<void>}
 */
export declare function writeJSONFileByText(filePath: string, str: string): Promise<void>;
/**在目录下寻找符合正则表达式的文件
 */
export declare function findFiles(dir: string, regex: RegExp): string[];
