import { Project, SourceFile } from "ts-morph";
import { SourceFileData } from "./SourceFileProcess";
declare class Compiler {
    _sourceText: string;
    _project: Project;
    _sourceFile: SourceFile;
    constructor(sourceText: string);
    build(projectName: string): SourceFileData;
}
export { Compiler };
export default Compiler;
