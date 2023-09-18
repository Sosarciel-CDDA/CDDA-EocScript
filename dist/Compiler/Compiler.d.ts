import { SourceFileData } from "./SourceFileProcess";
declare class Compiler {
    /**未编译的来源文本 */
    sourceText: string;
    /**来源文件 基础代码块 */
    private _sourceFile;
    private _project;
    constructor(sourceText: string);
    build(projectName: string): SourceFileData;
}
export { Compiler };
export default Compiler;
