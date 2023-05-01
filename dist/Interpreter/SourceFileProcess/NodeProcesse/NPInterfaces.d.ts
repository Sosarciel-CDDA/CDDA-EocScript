import { JArray, JToken } from "Utils";
import { SourceFileData } from "../Interfaces";
import { Node } from "ts-morph";
export type NodeProcess = (node: Node, sfd: SourceFileData, blockId?: string) => ProcessReturn;
export declare class ProcessReturn {
    _preFuncs: JArray;
    _tokens: JArray;
    constructor(tokens?: JArray, preFuncs?: JArray);
    addPreFunc(obj: JToken): void;
    addPreFuncList(objs: JArray): void;
    mergePreFuncList(obj: ProcessReturn): void;
    addToken(obj: JToken): void;
    addTokenList(objs: JArray): void;
    mergeTokenList(obj: ProcessReturn): void;
    getTokens(): JArray;
    getPreFuncs(): JArray;
    isVaild(): boolean;
    getFstToken(): JToken;
}
export declare function getFuncReVal(functionId: string): string;
export declare function VoidProcess(): ProcessReturn;
