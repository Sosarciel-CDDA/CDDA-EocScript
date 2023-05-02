import { JArray, JToken } from "@/src/Utils";
import { Node } from "ts-morph";
import { CodeExpression } from "./ExpressionProcess";
export type ExpProcess = (this: CodeExpression, node: Node) => ExpPReturn;
export declare class ExpPReturn {
    _preFuncs: JArray;
    _token: JToken;
    constructor(token?: JToken, preFuncs?: JArray);
    addPreFunc(obj: JToken): void;
    addPreFuncList(objs: JArray): void;
    mergePreFuncList(obj: ExpPReturn): void;
    setToken(obj: JToken): void;
    getToken(): JToken;
    getPreFuncs(): JArray;
    isVaild(): boolean;
}
export declare function VoidExpProcess(): ExpPReturn;
