import { JArray, JObject, JToken } from "Utils";
export declare class SourceFileData {
    _id: string;
    _rootArray: JArray;
    _count: number;
    _serializedText: string | null;
    constructor(id: string, rootArray?: JArray);
    getCount(): number;
    getId(): string;
    /**获取一个不重复的随机ID
     * @returns 代码块ID
     */
    genRID(): number;
    /**获取全局函数ID
     * @param rawFuncName
     */
    getGlobalFuncID(rawFuncName: string): string;
    /**获取全局函数返回值ID
     * @param rawFuncName
     */
    getGlobalFuncReturnID(rawFuncName: string): string;
    addEoc(eocobj: JToken): void;
    getRootArray(): JArray;
    getRootEoc(): JObject;
    setSerializedText(text: string): void;
    getSerializedText(): string | null;
}
