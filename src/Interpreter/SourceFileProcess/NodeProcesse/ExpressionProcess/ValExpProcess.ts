import { Node,SyntaxKind } from "ts-morph";
import { JArray, JToken } from "Utils";
import { SourceFileData } from "../../Interfaces";
import { ProcessReturn, getFuncReVal } from "../NPInterfaces";
import { throwLog } from "../../Functions";



//单字处理
export function ValExpProcess(node: Node,sfd:SourceFileData):ProcessReturn{
    let outObj = new ProcessReturn();
    throw throwLog(node,"未知的变量表达式");
    //return outObj;
}

