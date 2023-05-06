import { JArray, JToken } from "@/src/Utils";
import { SourceFileData } from "../../Interfaces";
import { Node } from "ts-morph";
import { CodeExpression } from "./Expression";

export type ExpProcess = (this:CodeExpression,node:Node)=>ExpPReturn;

export class ExpPReturn{
    _preFuncs:JArray;
    _token:JToken;
    _noFuncReq:boolean = false;
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
    mergePreFuncList(obj:ExpPReturn){
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
    //不需要调用函数
    //在嵌入表达式时不添加preFunc
    isRtnNofuncReq(){
        return this._noFuncReq;
    }
    setRtnNofuncReq(){
        this._noFuncReq=true;
    }
}

export function VoidExpProcess(){
    return new ExpPReturn();
}