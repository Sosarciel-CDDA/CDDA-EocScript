
import {JObject, JToken} from './UtilInterfaces';
import * as fs from 'fs';
import * as path from 'path';

export function deepClone(obj:JToken):JToken{
    return JSON.parse(JSON.stringify(obj));
}

/**加载json文件
 * Object (string)
 * @param {string} filePath - 文件路径
 * @returns {JObject}
 */
export function loadJSONFile(filePath:string):JObject{
	if(filePath.indexOf(".json")==-1)
        filePath += ".json";
	// 判断文件路径是否存在
	if (!fs.existsSync(filePath)) {
		// 如果路径不存在，创建文件夹
		try {
			fs.mkdirSync(path.dirname(filePath), { recursive: true });
		}catch(e){}
		// 创建文件
		fs.writeFileSync(filePath, '');
	}
    let str = fs.readFileSync(filePath) as any;
	if(str=="" || str==null)
		str = "{}";
    return JSON.parse(str);
}
/**写入JSON文件
 * void (string,Object)
 * @param {string} filePath - 文件路径
 * @param {JObject} obj 	    - 所要写入的JObject
 * @returns {void}
 */
export function writeJSONFile_o(filePath:string,obj:JObject){
	let str = JSON.stringify(obj,null,"\t");
    if(filePath.indexOf(".json")==-1)
        filePath += ".json";
	// 判断文件路径是否存在
	if (!fs.existsSync(filePath)) {
		// 如果路径不存在，创建文件夹
		try {
			fs.mkdirSync(path.dirname(filePath), { recursive: true });
		}catch(e){}
	}
	fs.writeFile(filePath,str,function(err:any){
		if(err==null)
			console.log(filePath+"writeJSONFile 成功");
		else{
			console.log(filePath+"writeJSONFile 错误");
			console.log(err);
		}
	});
}