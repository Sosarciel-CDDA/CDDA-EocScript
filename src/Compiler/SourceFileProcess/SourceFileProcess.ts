import { SourceFile, Node } from "ts-morph";
import { CodeBlock } from "./CodeBlock";
import { SourceFileData } from "./Interfaces";

export function SourceFileProcess(sourceFile: SourceFile,sfd:SourceFileData):SourceFileData{
    let block = sourceFile as any as Node;

    let cb = new CodeBlock(sfd.getId(),block,sfd);
    cb.build();
    return sfd;
}

export default SourceFileProcess;