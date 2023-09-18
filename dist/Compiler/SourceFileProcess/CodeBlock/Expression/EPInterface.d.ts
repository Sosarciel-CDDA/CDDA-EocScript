import { JArray, JToken } from "@/src/Utils";
import { Node } from "ts-morph";
import { CodeExpression } from "./Expression";
export type ExpProcess = (this: CodeExpression, node: Node) => ExpPReturn;
/**表达式的返回值 */
export declare class ExpPReturn {
    /**需要预先执行的func */
    preFuncs: JArray;
    /**主要返回值 */
    token: JToken;
    _noFuncReq: boolean;
    constructor(token?: JToken, preFuncs?: JArray);
    mergePreFuncList(obj: ExpPReturn): void;
    isVaild(): boolean;
    isRtnNofuncReq(): boolean;
    setRtnNofuncReq(): void;
}
export declare function VoidExpProcess(): ExpPReturn;
