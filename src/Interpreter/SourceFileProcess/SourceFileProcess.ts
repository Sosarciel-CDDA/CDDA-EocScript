import { JArray, JToken } from "Utils";
import { Block, SourceFile, Node, VariableStatement, ts } from "ts-morph";
import * as func from './Functions';
import {CodeBlockProcess} from "./NodeProcesse";
import { SourceFileData } from "./Interfaces";

export function SourceFileProcess(sourceFile: SourceFile,sfd:SourceFileData):SourceFileData{
    let block = sourceFile as any as Node;

    CodeBlockProcess(block,sfd,"root");
    return sfd;
}

export default SourceFileProcess;