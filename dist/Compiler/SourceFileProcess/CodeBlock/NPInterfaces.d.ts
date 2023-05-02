import { JArray, JToken } from "Utils";
import { Node } from "ts-morph";
import { CodeBlock } from "./CodeBlock";
export type NodeProcess = (this: CodeBlock, node: Node) => CBPReturn;
export declare class CBPReturn {
    _preFuncs: JArray;
    _tokens: JArray;
    constructor(tokens?: JArray, preFuncs?: JArray);
    addPreFunc(obj: JToken): void;
    addPreFuncList(objs: JArray): void;
    mergePreFuncList(obj: CBPReturn): void;
    addToken(obj: JToken): void;
    addTokenList(objs: JArray): void;
    mergeTokenList(obj: CBPReturn): void;
    getTokens(): JArray;
    getPreFuncs(): JArray;
    isVaild(): boolean;
}
export declare function VoidProcess(): CBPReturn;
