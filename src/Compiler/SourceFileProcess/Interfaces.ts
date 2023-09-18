import { JArray, JObject, JToken, deepClone } from "Utils";
import { GlobalFunction } from "./CodeBlock/GlobalFunction";
import { Node } from "ts-morph";

export class SourceFileData{
    /**主文件ID */
    id:string;
    /**基础的effect列表 */
    private _rootArray:JArray;
    /**记录子代码块的数量 */
    count:number=0;
    /**完成编译的文本 */
    private _serializedText:string|null=null;

    //全局函数ID表 用于确认是否有对应参数的全局函数
    private _globalFuncTable:Record<string,GlobalFunction|null>={};

    constructor(id:string,rootArray?:JArray){
        this.id=id;
        this._rootArray=rootArray||[];
    }

    /**获取一个不重复的随机ID
     * @returns 代码块ID
     */
    genRID(){
        return this.count++;
    }

    addGlobalFunction(node:Node){
        let gfunc = new GlobalFunction(node,this);
        this._globalFuncTable[gfunc.getRawName()] = gfunc;
        return gfunc;
    }
    getGlobalFunction(rawName:string){
        return this._globalFuncTable[rawName];
    }

    addEoc(eocobj:JToken){
        this._rootArray.push(eocobj);
    }
    getRootArray():JArray{
        return deepClone(this._rootArray) as JArray;
    }
    getRootEoc():JObject{
        for(let obj of this._rootArray){
            let aobj = obj as any;
            if(aobj.id==this.id)
                return aobj;
        }
        return null as any;
    }
    setSerializedText(text:string){
        this._serializedText = text;
    }
    getSerializedText(){
        return this._serializedText;
    }
}
