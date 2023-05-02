import { JArray, JObject, JToken, deepClone } from "Utils";

export enum BlockType{
    IF      = "if"      ,
    ELSE    = "else"    ,
    CLAUSE  = "clause"  ,
    OTHER   = "other"   ,
}

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
    //特殊代码块ID
    /**根据代码块类型自动生成一个ID
     * @param blockType 代码块类型
     * @returns 代码块ID
     */
    genBlockId(blockType:BlockType){
        let eocid = this.getId();
        if(blockType!=null)
            eocid+="_"+blockType;
        eocid+="_"+this.getCount();
        this._count+=1;
        return eocid;
    }
    /**根据原始函数ID获取代码块ID
     * @param rawId 原始函数ID
     * @returns 代码块ID
     */
    getBlockId(rawId:string){
        return this.getId()+"_"+rawId;
    }
    /**根据代码块名获得此代码块的返回值ID
     * @param blockId 代码块ID
     * @returns 代码块返回值ID
     */
    getReturnId(blockId:string){
        return blockId+"_return";
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