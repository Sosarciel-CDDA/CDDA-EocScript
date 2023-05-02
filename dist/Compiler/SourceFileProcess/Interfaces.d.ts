import { JArray, JObject, JToken } from "Utils";
import { GlobalFunction } from "./CodeBlock/GlobalFunction";
import { Node } from "ts-morph";
export declare class SourceFileData {
    _id: string;
    _rootArray: JArray;
    _count: number;
    _serializedText: string | null;
    _globalFuncTable: Record<string, GlobalFunction | null>;
    constructor(id: string, rootArray?: JArray);
    getCount(): number;
    getId(): string;
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
