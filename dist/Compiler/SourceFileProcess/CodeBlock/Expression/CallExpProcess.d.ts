import { Node } from "ts-morph";
import { ExpPReturn } from "./EPInterface";
import { CodeExpression } from "./Expression";
/** 调用函数 */
export declare function CallExpProcess(this: CodeExpression, node: Node): ExpPReturn;
