import { JArray, JObject, JToken, deepClone } from "Utils";
import { Statement,ts,Node } from "ts-morph";

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
    genRandEocId(str?:string){
        let eocid = this.getId()+"_"+this.getCount();
        if(str!=null)
            eocid+="_"+str;
        this._count+=1;
        return eocid;
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
            if(aobj.id=="root")
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