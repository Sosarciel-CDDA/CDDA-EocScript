import { JArray, JToken } from "@/src/Utils";
import { SourceFileData } from "../../Interfaces";
import { Node } from "ts-morph";

export type ExpProcess = (node:Node,sfd:SourceFileData,blockId?:string)=>ExpProcessReturn;

export class ExpProcessReturn{
    _preFuncs:JArray;
    _token:JToken;
    constructor(token?:JToken,preFuncs?:JArray){
        this._preFuncs = preFuncs||[];
        this._token = token||null;
    }
    addPreFunc(obj:JToken){
        this._preFuncs.push(obj);
    }
    addPreFuncList(objs:JArray){
        for(let obj of objs)
            this.addPreFunc(obj);
    }
    mergePreFuncList(obj:ExpProcessReturn){
        this.addPreFuncList(obj.getPreFuncs());
    }
    setToken(obj:JToken){
        this._token = obj;
    }
    getToken(){
        return this._token;
    }
    getPreFuncs(){
        return this._preFuncs;
    }
    isVaild(){
        return this._token!=null;
    }
}

export function VoidExpProcess(){
    return new ExpProcessReturn();
}