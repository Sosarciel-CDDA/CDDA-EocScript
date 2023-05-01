import { JObject, JToken, JValue, deepClone } from "../Utils";

export interface JsonModule{
    build:()=>JToken;
}

export type JsonModuleObj={
    [key:string]:JToken|JsonModule|null;
}


function isJsonModule(value: JToken | JsonModule | null): value is JsonModule {
    return typeof value === 'object' && value !== null && 'build' in value && typeof value.build === 'function';
}

export function convertJsonModuleObjToJObject(obj: JsonModuleObj): JToken {
    const result: JObject = {};
    for (const key in obj) {
        const value = obj[key];
        if (value === null) continue;
        if (Array.isArray(value) && value.length<=0) continue;
        if (value === null || (typeof value === 'object' && Object.keys(value).length === 0)) continue;
        if (isJsonModule(value))
            result[key] = value.build();
        else
            result[key] = value;
    }
    return deepClone(result);
}