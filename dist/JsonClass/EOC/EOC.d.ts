import { JArray, JToken } from 'Utils';
import { JsonModule } from '../Interfaces';
import Recurrence from './Recurrence';
export declare class Eoc implements JsonModule {
    _effect: Array<JToken>;
    _falseEffect: Array<JToken>;
    obj: {
        id: string;
        type: "effect_on_condition";
        recurrence: Recurrence | null;
        effect: Array<JToken>;
        false_effect: Array<JToken>;
        condition: JToken;
    };
    constructor(id: string);
    build(): JToken;
    addEffect(obj: JToken): void;
    addEffectList(arr: JArray): void;
    addFalseEffect(obj: JToken): void;
    addFalseEffectList(arr: JArray): void;
    setCondition(obj: JToken): void;
}
export default Eoc;
