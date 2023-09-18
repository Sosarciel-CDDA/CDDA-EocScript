import { FunctionDeclaration, Node } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
import CodeBlock from "../CodeBlock";
export declare class GlobalFunction {
    _node: FunctionDeclaration;
    sfd: SourceFileData;
    _params: Array<string>;
    _dynamicCodeBlockTable: Record<string, CodeBlock | null>;
    constructor(node: Node, sfd: SourceFileData);
    getNode(): FunctionDeclaration;
    getRawName(): string;
    /**获取全局函数ID
     * @param args 参数
     */
    getId(args?: Array<string>): string;
    getCodeBlock(args?: Array<string>): CodeBlock | null;
    getParams(): string[];
    /**获取全局函数返回值ID
     * @param rawFuncName
     */
    getReturnID(args?: Array<string>): string | undefined;
}
