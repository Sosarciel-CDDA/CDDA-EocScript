import { Node } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
import { CBPReturn } from "../NPInterfaces";
import { ExpPReturn } from "./EPInterface";
import { CodeBlock } from "../CodeBlock";
export declare function ExpressionProcess(this: CodeBlock, node: Node): CBPReturn;
export declare class CodeExpression {
    _node: Node;
    _codeBlock: CodeBlock;
    constructor(node: Node, codeBlock: CodeBlock);
    getCodeBlock(): CodeBlock;
    getSfd(): SourceFileData;
    build(): ExpPReturn;
    process(node: Node): ExpPReturn;
}
