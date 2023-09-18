import { JArray, JObject, JToken } from "../../Utils";
import { GlobalFunction } from "./CodeBlock/GlobalFunction";
import { Node } from "ts-morph";
export declare class SourceFileData {
    /**主文件ID */
    id: string;
    /**基础的effect列表 */
    private _rootArray;
    /**记录子代码块的数量 */
    count: number;
    /**完成编译的文本 */
    private _serializedText;
    private _globalFuncTable;
    constructor(id: string, rootArray?: JArray);
    /**获取一个不重复的随机ID
     * @returns 代码块ID
     */
    genRID(): number;
    addGlobalFunction(node: Node): GlobalFunction;
    getGlobalFunction(rawName: string): GlobalFunction | null;
    addEoc(eocobj: JToken): void;
    getRootArray(): JArray;
    getRootEoc(): JObject;
    setSerializedText(text: string): void;
    getSerializedText(): string | null;
}
