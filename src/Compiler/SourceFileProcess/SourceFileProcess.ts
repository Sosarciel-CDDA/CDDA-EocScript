import { SourceFile, Node } from "ts-morph";
import { CodeBlock } from "./CodeBlock";
import { SourceFileData } from "./Interfaces";


/**处理来源文件 视为代码块 */
export function SourceFileProcess(sourceFile: SourceFile,sfd:SourceFileData):SourceFileData{
    let block = sourceFile as any as Node;

    let cb = new CodeBlock(sfd.id,block,sfd);
    cb.build();
    //console.log(sfd.getRootArray());
    return sfd;
}

export default SourceFileProcess;