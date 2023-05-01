import { JToken } from "../Utils";
export interface JsonModule {
    build: () => JToken;
}
export type JsonModuleObj = {
    [key: string]: JToken | JsonModule | null;
};
export declare function convertJsonModuleObjToJObject(obj: JsonModuleObj): JToken;
