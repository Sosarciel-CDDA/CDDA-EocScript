import { Node } from "ts-morph";
import { JArray, JObject, JToken } from "../../../Utils";
import { SourceFileData } from "../Interfaces";
import { NodeProcess, CBPReturn } from "./NPInterfaces";
export declare enum BlockType {
    IF = "if",
    ELSE = "el",
    CLAUSE = "ca",
    OTHER = "ot"
}
export declare class CodeBlock {
    id: string;
    private _parentBlock?;
    private _node;
    _sfd: SourceFileData;
    _condition?: JToken | null;
    _falseNode?: Node | Array<Node>;
    _processTable: Record<number, NodeProcess | null>;
    _passArgsTable: Record<string, string | null>;
    _eocFieldTable: Record<string, JToken>;
    constructor(id: string, node: Node | Array<Node>, sfd: SourceFileData, condition?: JToken, falseNode?: Node | Array<Node>);
    getRootId(): string;
    getReturnId(): string;
    /**生成一个子代码块 */
    genSubBlock(id: BlockType, node: Node | Array<Node>, condition?: JToken, falseNode?: Node | Array<Node>): CodeBlock;
    getSfd(): SourceFileData;
    addPassArgs(origVal: string, targetVal: string): void;
    getLocalVal(origVal: string): string;
    getLocalValMap(): Record<string, string | null>;
    addEocField(str: string, val: JToken): void;
    /**处理代码块
     */
    build(): CBPReturn;
    /**处理申明列表
     */
    processStatments(node: Node | Array<Node>): (string | number | boolean | JArray | JObject | null)[];
}
export default CodeBlock;
