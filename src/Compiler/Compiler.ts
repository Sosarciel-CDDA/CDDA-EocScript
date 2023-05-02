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
function customStringify(obj:JToken) {
    let formattedData = JSON.stringify(obj, (key, value) => {
        if (key === 'effect' || key === 'false_effect'){
            return value.map((item:any) => {
                //if(item.switch!=null)
                //    return customStringify(item);
                return JSON.stringify(item)
            });
        }
        if (key === 'condition')
            return JSON.stringify(value);
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
        sfd.setSerializedText(str);
        //str = str.replace(/\\/g, '').replace(/\"\[/g, '[').replace(/\]\"/g,']');
        //console.log(str);
        return sfd;
    }
}
export {Compiler};
export default Compiler;