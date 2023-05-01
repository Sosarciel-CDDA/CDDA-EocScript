import { JArray, JObject, JToken } from "Utils";
export declare class SourceFileData {
    _id: string;
    _rootArray: JArray;
    _count: number;
    _serializedText: string | null;
    constructor(id: string, rootArray?: JArray);
    getCount(): number;
    getId(): string;
    genRandEocId(str?: string): string;
    addEoc(eocobj: JToken): void;
    getRootArray(): JArray;
    getRootEoc(): JObject;
    setSerializedText(text: string): void;
    getSerializedText(): string | null;
}
