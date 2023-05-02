import { Node } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
import { CBPReturn } from "../NPInterfaces";
import { ExpPReturn } from "./EPInterface";
import { CodeBlock } from "../CodeBlock";
export declare function ExpressionProcess(this: CodeBlock, node: Node): CBPReturn;
export declare function AutoExpProcess(node: Node, sfd: SourceFileData): ExpPReturn;
export declare class Expression {
    _node: Node;
    _codeBlock: CodeBlock;
    constructor(node: Node, codeBlock: CodeBlock);
    build(): ExpPReturn;
}
