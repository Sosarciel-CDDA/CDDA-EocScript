import { Node } from "ts-morph";
import { ExpPReturn } from "./EPInterface";
import { CodeExpression } from "./Expression";
/** 所有 (lval opera rval) 赋值/比较/定义 表达式
 *  表达式处理路由
 */
export declare function CalcExpProcess(this: CodeExpression, node: Node): ExpPReturn;
