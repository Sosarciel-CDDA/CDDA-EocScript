import { Node } from "ts-morph";
import { ExpPReturn } from "./EPInterface";
import { CodeExpression } from "./Expression";
/** 条件表达式特殊处理 */
export declare function condExpProcess(this: CodeExpression, node: Node): ExpPReturn;
