import { JArray, JObject, JToken, deepClone } from "Utils";

export class SourceFileData{
    _id:string;
    _rootArray:JArray;
    _count:number=0;
    _serializedText:string|null=null;
    constructor(id:string,rootArray?:JArray){
        this._id=id;
        this._rootArray=rootArray||[];
    }
    getCount(){
        return this._count;
    }
    getId(){
        return this._id;
    }

    /**获取一个不重复的随机ID
     * @returns 代码块ID
     */
    genRID(){
        return this._count++;
    }
    /**获取全局函数ID
     * @param rawFuncName 
     */
    getGlobalFuncID(rawFuncName:string){
        return this.getId()+"_"+rawFuncName;
    }
    /**获取全局函数返回值ID
     * @param rawFuncName 
     */
    getGlobalFuncReturnID(rawFuncName:string){
        return this.getId()+"_"+rawFuncName+"_return";
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
            if(aobj.id==this._id)
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
