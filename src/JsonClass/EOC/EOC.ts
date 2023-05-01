import { JObject, JToken } from 'Utils';
import { JsonModule, JsonModuleObj, convertJsonModuleObjToJObject } from '../Interfaces';
import Recurrence from './Recurrence';



export class Eoc implements JsonModule{
    _effect:Array<JToken>=[];
    obj:{
        id          :string         ,
        type        : "effect_on_condition",
        recurrence  :Recurrence|null,
        effect      :Array<JToken>  ,
        condition   :JToken         ,
    }={
        id          :""         ,
        type        : "effect_on_condition",
        recurrence  :null           ,
        effect      :this._effect   ,
        condition   :null           ,
    };
    constructor(id:string){
        this.obj.id = id;
        this.obj.recurrence = null;
    }
    build():JToken{
        let jobj = convertJsonModuleObjToJObject(this.obj as JsonModuleObj);
        return jobj;
    }
    addEffect(obj:JToken){
        this._effect.push(obj);
    }
    setCondition(obj:JToken){
        this.obj.condition = obj;
    }
}


export default Eoc;