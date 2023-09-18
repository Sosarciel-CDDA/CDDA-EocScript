import { JArray, JObject, JToken } from "../../Utils";
import { GlobalFunction } from "./CodeBlock/GlobalFunction";
import { Node } from "ts-morph";
export declare class SourceFileData {
    /**主文件ID */
    id: string;
    /**effect列表 */
    rootArray: JArray;
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
    /**添加一个全局函数 */
    addGlobalFunction(node: Node): GlobalFunction;
    /**获得一个全局函数 */
    getGlobalFunction(rawName: string): GlobalFunction | null;
    addEoc(eocobj: JToken): void;
    /**获取主EOC */
    getRootEoc(): JObject;
    /**设置输出文本 */
    setSerializedText(text: string): void;
    /**获取输出文本 */
    getSerializedText(): string | null;
}
