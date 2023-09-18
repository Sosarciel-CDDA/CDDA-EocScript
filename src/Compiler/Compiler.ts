import { Project,SourceFile,ts,VariableStatement} from "ts-morph";
import SourceFileProcess, { SourceFileData } from "./SourceFileProcess";
import { JToken } from "../Utils";


function clearFormat(obj:string){
    return obj  .replace(/\\\"/g, '"')
                .replace(/\\n/g, '\n')
                .replace(/\"\[/g, '[')
                .replace(/\]\"/g,']')
                .replace(/"\{/g, '{')
                .replace(/\}"/g, '}');
}

function typeStringify(item:any){
    if(typeof item == 'number' || typeof item == 'string' || typeof item == 'boolean')
        return item;
    return JSON.stringify(item)
}

function customStringify(obj:JToken) {
    let formattedData = JSON.stringify(obj, (key, value) => {
        if (key === 'effect' || key === 'false_effect'){
            return value.map((item:any) => {
                return typeStringify(item)
            });
        }
        if (key === 'condition'|| key === 'deactivate_condition' ||
            key === 'recurrence')
            return typeStringify(value)
        return value;
    }, 2);
    //return formattedData;
    return clearFormat(formattedData);
}

class Compiler{
    /**未编译的来源文本 */
    sourceText:string = "";
    /**来源文件 基础代码块 */
    private _sourceFile:SourceFile;
    private _project:Project = new Project();
    constructor(sourceText:string){
        this.sourceText = sourceText;
        this._sourceFile = this._project.createSourceFile("temp.ts",sourceText);
    }
    build(projectName:string):SourceFileData{
        let sfd = new SourceFileData(projectName);
        let result = SourceFileProcess(this._sourceFile,sfd);
        //let str = JSON.stringify(result.getRootArray(),null,"  ");
        let str = customStringify(result.rootArray);
        //let str =  JSON.stringify(result.getRootArray());
        sfd.setSerializedText(str);
        //str = str.replace(/\\/g, '').replace(/\"\[/g, '[').replace(/\]\"/g,']');
        //console.log(str);
        return sfd;
    }
}
export {Compiler};
export default Compiler;