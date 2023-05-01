import { JArray, JToken } from "@/src/Utils";
import { SourceFileData } from "../../Interfaces";
export type ExpProcesse = (node: Node, sfd: SourceFileData, blockId?: string) => ExpProcesseReturn;
export declare class ExpProcesseReturn {
    _preFuncs: JArray;
    _token: JToken;
    constructor(token?: JToken, preFuncs?: JArray);
    addPreFunc(obj: JToken): void;
    addPreFuncList(objs: JArray): void;
    mergePreFunc(obj: ExpProcesseReturn): void;
    setToken(obj: JToken): void;
    getToken(): JToken;
    getPreFuncs(): JArray;
    isVaild(): boolean;
}
