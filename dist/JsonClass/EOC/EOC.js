"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eoc = void 0;
const Interfaces_1 = require("../Interfaces");
class Eoc {
    _effect = [];
    obj = {
        id: "",
        type: "effect_on_condition",
        recurrence: null,
        effect: this._effect,
        condition: null,
    };
    constructor(id) {
        this.obj.id = id;
        this.obj.recurrence = null;
    }
    build() {
        let jobj = (0, Interfaces_1.convertJsonModuleObjToJObject)(this.obj);
        return jobj;
    }
    addEffect(obj) {
        this._effect.push(obj);
    }
    setCondition(obj) {
        this.obj.condition = obj;
    }
}
exports.Eoc = Eoc;
exports.default = Eoc;
