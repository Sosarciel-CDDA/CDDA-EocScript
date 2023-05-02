import { Node } from "ts-morph";
import { JArray, JToken } from "Utils";
import { SourceFileData } from "../Interfaces";
import { NodeProcess, CBPReturn } from "./NPInterfaces";
export declare enum BlockType {
    IF = "if",
    ELSE = "else",
    CLAUSE = "clause",
    OTHER = "other"
}
export declare class CodeBlock {
    _id: string;
    _parentBlock?: CodeBlock;
    _node: Node | Array<Node>;
    _sfd: SourceFileData;
    _condition?: JToken | null;
    _falseNode?: Node | Array<Node>;
    _processTable: Record<number, NodeProcess | null>;
    constructor(id: string, node: Node | Array<Node>, sfd: SourceFileData, condition?: JToken, falseNode?: Node | Array<Node>);
    getId(): string;
    getReturnId(): string;
    getParentBlock(): CodeBlock | undefined;
    genSubBlock(id: BlockType, node: Node | Array<Node>, sfd: SourceFileData, condition?: JToken, falseNode?: Node | Array<Node>): CodeBlock;
    getSfd(): SourceFileData;
    /**处理代码块
     */
    build(): CBPReturn;
    /**处理申明列表
     */
    processStatments(node: Node | Array<Node>): (string | number | boolean | JArray | import("Utils").JObject | null)[];
}
export default CodeBlock;
