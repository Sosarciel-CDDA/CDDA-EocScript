import { FunctionDeclaration, Node } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
import CodeBlock from "../CodeBlock";
export declare class GlobalFunction {
    _node: FunctionDeclaration;
    _sfd: SourceFileData;
    _params: Array<string>;
    _dynamicCodeBlockTable: Record<string, CodeBlock | null>;
    constructor(node: Node, sfd: SourceFileData);
    getNode(): FunctionDeclaration;
    getSfd(): SourceFileData;
    getRawName(): string;
    /**获取全局函数ID
     * @param args 参数
     */
    getId(args?: Array<string>): string;
    getCodeBlock(args?: Array<string>): CodeBlock | null;
    /**获取全局函数返回值ID
     * @param rawFuncName
     */
    getReturnID(): string;
}
