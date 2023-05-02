import { SourceFile, Node } from "ts-morph";
import { CodeBlockProcess } from "./NodeProcesse";
import { SourceFileData } from "./Interfaces";

export function SourceFileProcess(sourceFile: SourceFile,sfd:SourceFileData):SourceFileData{
    let block = sourceFile as any as Node;

    CodeBlockProcess(block,sfd,sfd.getId());
    return sfd;
}

export default SourceFileProcess;