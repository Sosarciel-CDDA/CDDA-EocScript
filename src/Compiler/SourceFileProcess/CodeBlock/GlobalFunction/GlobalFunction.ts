import { FunctionDeclaration, Node, SyntaxKind } from "ts-morph";
import { checkKind } from "../../Functions";
import { SourceFileData } from "../../Interfaces";



export class GlobalFunction{
    _node:FunctionDeclaration;
    _sfd:SourceFileData;
    constructor(node:Node,sfd:SourceFileData){
        checkKind(node,SyntaxKind.FunctionDeclaration);
        this._node = node;
        this._sfd = sfd;
    }
    getNode(){
        return this._node;
    }
    getSfd(){
        return this._sfd;
    }
    getRawName(){
        return this.getNode().getNameOrThrow();
    }
    /**获取全局函数ID
     * @param rawFuncName 
     */
    getId(){
        return this.getSfd().getId()+"_"+this.getRawName();
    }
    /**获取全局函数返回值ID
     * @param rawFuncName
     */
    getReturnID(){
        return this.getSfd().getId()+"_"+this.getRawName()+"_return";
    }
}