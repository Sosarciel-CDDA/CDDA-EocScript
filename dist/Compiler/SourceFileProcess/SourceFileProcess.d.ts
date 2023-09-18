import { SourceFile } from "ts-morph";
import { SourceFileData } from "./Interfaces";
/**处理来源文件 视为代码块 */
export declare function SourceFileProcess(sourceFile: SourceFile, sfd: SourceFileData): SourceFileData;
export default SourceFileProcess;
