import { JArray, JToken } from "Utils";
import { SourceFileData } from "../Interfaces";
import { Node } from "ts-morph";
import { CodeBlock } from "./CodeBlock";
export type NodeProcess = (this:CodeBlock,node:Node)=>CBPReturn;

/**CodeBlock返回值 */
export class CBPReturn{
    /**在应用前需要执行的函数 */
    preFuncs:JArray;
    /**主要返回值 JToken */
    tokens:JArray;
    /**
     * @param tokens    JToken
     * @param preFuncs  在应用前需要执行的函数
     */
    constructor(tokens?:JArray,preFuncs?:JArray){
        this.preFuncs = preFuncs||[];
        this.tokens = tokens||[];
    }
    mergePreFuncList(obj:CBPReturn){
        this.preFuncs.push(...obj.preFuncs);
    }
    mergeTokenList(obj:CBPReturn){
        this.tokens.push(...obj.tokens)
    }
    isVaild(){
        return this.tokens.length>0 || this.preFuncs.length>0;
    }
}

export function VoidProcess(){
    return new CBPReturn();
}