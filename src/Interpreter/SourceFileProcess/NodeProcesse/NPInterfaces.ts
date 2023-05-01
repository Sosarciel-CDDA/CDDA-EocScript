import { JArray, JToken, deepClone } from "Utils";
import { SourceFileData } from "../Interfaces";
import { Node } from "ts-morph";
export type NodeProcess = (node:Node,sfd:SourceFileData,blockId?:string)=>ProcessReturn;

export class ProcessReturn{
    _preFuncs:JArray;
    _tokens:JArray;
    constructor(tokens?:JArray,preFuncs?:JArray){
        this._preFuncs = preFuncs||[];
        this._tokens = tokens||[];
    }
    addPreFunc(obj:JToken){
        this._preFuncs.push(obj);
    }
    addPreFuncList(objs:JArray){
        for(let obj of objs)
            this.addPreFunc(obj);
    }
    mergePreFuncList(obj:ProcessReturn){
        this.addPreFuncList(obj.getPreFuncs());
    }
    addToken(obj:JToken){
        if(obj!=null)
            this._tokens.push(obj);
    }
    addTokenList(objs:JArray){
        for(let obj of objs)
            this.addToken(obj);
    }
    mergeTokenList(obj:ProcessReturn){
        this.addTokenList(obj.getTokens());
    }
    getTokens(){
        return this._tokens;
    }
    getPreFuncs(){
        return this._preFuncs;
    }
    isVaild(){
        return this._tokens.length>0 || this._preFuncs.length>0;
    }
}

export function VoidProcess(){
    return new ProcessReturn();
}