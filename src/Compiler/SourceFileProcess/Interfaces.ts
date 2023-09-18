import { JArray, JObject, JToken, deepClone } from "Utils";
import { GlobalFunction } from "./CodeBlock/GlobalFunction";
import { Node } from "ts-morph";

export class SourceFileData{
    /**主文件ID */
    id:string;
    /**effect列表 */
    rootArray:JArray;
    /**记录子代码块的数量 */
    count:number=0;
    /**完成编译的文本 */
    private _serializedText:string|null=null;

    //全局函数ID表 用于确认是否有对应参数的全局函数
    private _globalFuncTable:Record<string,GlobalFunction|null>={};

    constructor(id:string,rootArray?:JArray){
        this.id=id;
        this.rootArray=rootArray||[];
    }

    /**获取一个不重复的随机ID
     * @returns 代码块ID
     */
    genRID(){
        return this.count++;
    }

    /**添加一个全局函数 */
    addGlobalFunction(node:Node){
        let gfunc = new GlobalFunction(node,this);
        this._globalFuncTable[gfunc.getRawName()] = gfunc;
        return gfunc;
    }
    /**获得一个全局函数 */
    getGlobalFunction(rawName:string){
        return this._globalFuncTable[rawName];
    }

    addEoc(eocobj:JToken){
        this.rootArray.push(eocobj);
    }
    /**获取主EOC */
    getRootEoc():JObject{
        for(let obj of this.rootArray){
            let aobj = obj as any;
            if(aobj.id==this.id)
                return aobj;
        }
        return null as any;
    }
    /**设置输出文本 */
    setSerializedText(text:string){
        this._serializedText = text;
    }
    /**获取输出文本 */
    getSerializedText(){
        return this._serializedText;
    }
}
