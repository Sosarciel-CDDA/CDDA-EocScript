
import {JToken} from './UtilInterfaces';

export function deepClone(obj:JToken):JToken{
    return JSON.parse(JSON.stringify(obj));
}