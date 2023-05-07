import { Node } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
import { ExpPReturn } from "./EPInterface";
import { CodeBlock } from "../CodeBlock";
export declare class CodeExpression {
    _node: Node;
    _codeBlock: CodeBlock;
    constructor(node: Node, codeBlock: CodeBlock);
    getCodeBlock(): CodeBlock;
    getSfd(): SourceFileData;
    getLocalVal(origVal: string): string;
    build(): ExpPReturn;
    process(node: Node): ExpPReturn;
}
