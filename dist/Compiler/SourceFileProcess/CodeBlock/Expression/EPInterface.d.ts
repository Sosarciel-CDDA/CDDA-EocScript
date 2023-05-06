import { JArray, JToken } from "@/src/Utils";
import { Node } from "ts-morph";
import { CodeExpression } from "./Expression";
export type ExpProcess = (this: CodeExpression, node: Node) => ExpPReturn;
export declare class ExpPReturn {
    _preFuncs: JArray;
    _token: JToken;
    _noFuncReq: boolean;
    constructor(token?: JToken, preFuncs?: JArray);
    addPreFunc(obj: JToken): void;
    addPreFuncList(objs: JArray): void;
    mergePreFuncList(obj: ExpPReturn): void;
    setToken(obj: JToken): void;
    getToken(): JToken;
    getPreFuncs(): JArray;
    isVaild(): boolean;
    isRtnNofuncReq(): boolean;
    setRtnNofuncReq(): void;
}
export declare function VoidExpProcess(): ExpPReturn;
