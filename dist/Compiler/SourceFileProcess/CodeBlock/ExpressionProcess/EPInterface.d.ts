import { JArray, JToken } from "@/src/Utils";
import { SourceFileData } from "../../Interfaces";
import { Node } from "ts-morph";
export type ExpProcess = (node: Node, sfd: SourceFileData, blockId?: string) => ExpProcessReturn;
export declare class ExpProcessReturn {
    _preFuncs: JArray;
    _token: JToken;
    constructor(token?: JToken, preFuncs?: JArray);
    addPreFunc(obj: JToken): void;
    addPreFuncList(objs: JArray): void;
    mergePreFuncList(obj: ExpProcessReturn): void;
    setToken(obj: JToken): void;
    getToken(): JToken;
    getPreFuncs(): JArray;
    isVaild(): boolean;
}
export declare function VoidExpProcess(): ExpProcessReturn;
