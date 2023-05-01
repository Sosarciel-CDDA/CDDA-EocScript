import { JToken } from 'Utils';
import { JsonModule } from '../Interfaces';
import Recurrence from './Recurrence';
export declare class Eoc implements JsonModule {
    _effect: Array<JToken>;
    obj: {
        id: string;
        type: "effect_on_condition";
        recurrence: Recurrence | null;
        effect: Array<JToken>;
        condition: JToken;
    };
    constructor(id: string);
    build(): JToken;
    addEffect(obj: JToken): void;
    setCondition(obj: JToken): void;
}
export default Eoc;
