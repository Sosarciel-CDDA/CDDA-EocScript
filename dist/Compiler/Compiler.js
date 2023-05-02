"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
const ts_morph_1 = require("ts-morph");
const SourceFileProcess_1 = require("./SourceFileProcess");
function clearFormat(obj) {
    return obj.replace(/\\\"/g, '"')
        .replace(/\\n/g, '\n')
        .replace(/\"\[/g, '[')
        .replace(/\]\"/g, ']')
        .replace(/"\{/g, '{')
        .replace(/\}"/g, '}');
}
function customStringify(obj) {
    let formattedData = JSON.stringify(obj, (key, value) => {
        if (key === 'effect' || key === 'false_effect') {
            return value.map((item) => {
                //if(item.switch!=null)
                //    return customStringify(item);
                return JSON.stringify(item);
            });
        }
        if (key === 'condition')
            return JSON.stringify(value);
        return value;
    }, 2);
    //return formattedData;
    return clearFormat(formattedData);
}
class Compiler {
    _sourceText = "";
    _project = new ts_morph_1.Project();
    _sourceFile;
    constructor(sourceText) {
        this._sourceText = sourceText;
        this._sourceFile = this._project.createSourceFile("temp.ts", sourceText);
    }
    build(projectName) {
        let sfd = new SourceFileProcess_1.SourceFileData(projectName);
        let result = (0, SourceFileProcess_1.default)(this._sourceFile, sfd);
        //let str = JSON.stringify(result.getRootArray(),null,"  ");
        let str = customStringify(result.getRootArray());
        sfd.setSerializedText(str);
        //str = str.replace(/\\/g, '').replace(/\"\[/g, '[').replace(/\]\"/g,']');
        //console.log(str);
        return sfd;
    }
}
exports.Compiler = Compiler;
exports.default = Compiler;
