const fs = require('fs');
const path = require('path');
const {Compiler,findFiles, writeJSONFile, writeJSONFileByText} = require('./index');
const args = process.argv.slice(2);
function getArgValue(argName, defaultValue) {
    const args = process.argv.slice(2);
    const argIndex = args.indexOf(argName);
    if (argIndex !== -1) {
        return args[argIndex + 1];
    } else {
        return defaultValue;
    }
}
const input = getArgValue('--input', './in');
const output = getArgValue('--output', './out');
//console.log(`input: ${input}`);
//console.log(`output: ${output}`);

let fileList = findFiles(input,/.*[(\.js)(\.eocscript)]/);
for(let filePath of fileList){
    console.log("compileing: "+filePath);
    try{
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath);
        const baseName = fileName.replace(path.extname(fileName), '');
        const outFilePath = filePath.replace(path.normalize(input),path.normalize(output)).replace(path.extname(fileName), ".json");

        let compiler = new Compiler(fileContent);

        let eocname = baseName;
        //替换特殊符号
        let regex = /[+\-*/><]/g;
        if (regex.test(eocname)) {
            eocname = baseName.replace(regex, '_');
            console.log(`Change eoc name:`);
            console.log(`Original file name: ${baseName}`);
            console.log(`Replaced eoc name: ${eocname}`);
        }

        let sfd = compiler.build(eocname);
        let text = sfd.getSerializedText();
        //console.log(text);
        writeJSONFileByText(outFilePath,text);
        console.log("compile: "+filePath+" success");
    }catch(e){
        console.log("编译 "+filePath+" 时出现错误");
        console.log(e);
    }
}