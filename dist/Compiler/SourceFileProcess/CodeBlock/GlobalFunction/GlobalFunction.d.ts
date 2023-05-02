import { FunctionDeclaration, Node } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
export declare class GlobalFunction {
    _node: FunctionDeclaration;
    _sfd: SourceFileData;
    constructor(node: Node, sfd: SourceFileData);
    getNode(): FunctionDeclaration;
    getSfd(): SourceFileData;
    getRawName(): string;
    /**获取全局函数ID
     * @param rawFuncName
     */
    getId(): string;
    /**获取全局函数返回值ID
     * @param rawFuncName
     */
    getReturnID(): string;
}
