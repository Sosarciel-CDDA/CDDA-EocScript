import { Node } from "ts-morph";
import { ExpPReturn } from "./EPInterface";
import { CodeBlock } from "../CodeBlock";
/**表达式 */
export declare class CodeExpression {
    private _node;
    /**处于哪个代码块 */
    codeBlock: CodeBlock;
    constructor(node: Node, codeBlock: CodeBlock);
    getSfd(): import("../..").SourceFileData;
    getLocalVal(origVal: string): string;
    getLocalValMap(): Record<string, string | null>;
    build(): ExpPReturn;
    /**处理表达式 */
    process(node: Node): ExpPReturn;
}
