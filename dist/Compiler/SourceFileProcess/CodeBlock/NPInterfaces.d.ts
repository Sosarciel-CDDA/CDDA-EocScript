import { JArray } from "../../../Utils";
import { Node } from "ts-morph";
import { CodeBlock } from "./CodeBlock";
export type NodeProcess = (this: CodeBlock, node: Node) => CBPReturn;
/**CodeBlock返回值 */
export declare class CBPReturn {
    /**在应用前需要执行的函数 */
    preFuncs: JArray;
    /**主要返回值 JToken */
    tokens: JArray;
    /**
     * @param tokens    JToken
     * @param preFuncs  在应用前需要执行的函数
     */
    constructor(tokens?: JArray, preFuncs?: JArray);
    mergePreFuncList(obj: CBPReturn): void;
    mergeTokenList(obj: CBPReturn): void;
    isVaild(): boolean;
}
export declare function VoidProcess(): CBPReturn;
