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
    _sourceText:string = "";
    _project:Project = new Project();
    _sourceFile:SourceFile;
    constructor(sourceText:string){
        this._sourceText = sourceText;
        this._sourceFile = this._project.createSourceFile("temp.ts",sourceText);
    }
    build(projectName:string):SourceFileData{
        let sfd = new SourceFileData(projectName);
        let result = SourceFileProcess(this._sourceFile,sfd);
        //let str = JSON.stringify(result.getRootArray(),null,"  ");
        let str = customStringify(result.getRootArray());
        //let str =  JSON.stringify(result.getRootArray());
        sfd.setSerializedText(str);
        //str = str.replace(/\\/g, '').replace(/\"\[/g, '[').replace(/\]\"/g,']');
        //console.log(str);
        return sfd;
    }
}
export {Compiler};
export default Compiler;