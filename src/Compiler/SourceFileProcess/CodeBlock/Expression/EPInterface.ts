import { JArray, JToken } from "@/src/Utils";
import { Node } from "ts-morph";
import { CodeExpression } from "./Expression";

export type ExpProcess = (this:CodeExpression,node:Node)=>ExpPReturn;

/**表达式的返回值 */
export class ExpPReturn{
    /**需要预先执行的func */
    preFuncs:JArray;
    /**主要返回值 */
    token:JToken;
    _noFuncReq:boolean = false;
    constructor(token?:JToken,preFuncs?:JArray){
        this.preFuncs = preFuncs||[];
        this.token = token||null;
    }
    mergePreFuncList(obj:ExpPReturn){
        this.preFuncs.push(...obj.preFuncs);
    }
    isVaild(){
        return this.token!=null;
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