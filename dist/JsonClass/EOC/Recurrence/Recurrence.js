"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recurrence = void 0;
/**
 * Recurrence类用于生成符合要求的JSON对象
 */
class Recurrence {
    recurrence;
    /**
     * 创建一个Recurrence对象
     * @param {number} interval - recurrence字段的初始值（以秒为单位）
     */
    constructor(interval) {
        this.recurrence = interval;
    }
    /**
     * 将recurrence字段的值设置为一个对象
     * @param {string} name - 对象的name字段
     * @param {string} type - 对象的type字段
     * @param {string} context - 对象的context字段
     * @param {number|string} [def] - 对象的default字段（可选）
     * @param {boolean} [global] - 对象的global字段（可选）
     */
    setObject(name, type, context, def, global) {
        this.recurrence = { name, type, context };
        if (def !== undefined) {
            this.recurrence.default = def;
        }
        if (global !== undefined) {
            this.recurrence.global = global;
        }
    }
    /**
     * 将recurrence字段的值设置为一个数组
     * @param {number} value1 - 数组的第一个值
     * @param {number} value2 - 数组的第二个值
     */
    setArray(value1, value2) {
        this.recurrence = [value1, value2];
    }
    /**
     * 将recurrence字段的值设置为一个整数
     * @param {number} interval - recurrence字段的新值（以秒为单位）
     */
    setNumber(interval) {
        this.recurrence = interval;
    }
    /**
     * 生成一个符合要求的JSON对象
     * @returns {object} 一个包含recurrence字段的JSON对象
     */
    genJson() {
        return this.recurrence;
    }
}
exports.Recurrence = Recurrence;
exports.default = Recurrence;
