import { JArray, JObject, JToken } from "Utils";
export declare enum BlockType {
    IF = "if",
    ELSE = "else",
    CLAUSE = "clause",
    OTHER = "other"
}
export declare class SourceFileData {
    _id: string;
    _rootArray: JArray;
    _count: number;
    _serializedText: string | null;
    constructor(id: string, rootArray?: JArray);
    getCount(): number;
    getId(): string;
    /**根据代码块类型自动生成一个ID
     * @param blockType 代码块类型
     * @returns 代码块ID
     */
    genBlockId(blockType: BlockType): string;
    /**根据原始函数ID获取代码块ID
     * @param rawId 原始函数ID
     * @returns 代码块ID
     */
    getBlockId(rawId: string): string;
    /**根据代码块名获得此代码块的返回值ID
     * @param blockId 代码块ID
     * @returns 代码块返回值ID
     */
    getReturnId(blockId: string): string;
    addEoc(eocobj: JToken): void;
    getRootArray(): JArray;
    getRootEoc(): JObject;
    setSerializedText(text: string): void;
    getSerializedText(): string | null;
}
