import { Node } from "ts-morph";
import { ExpPReturn } from "./EPInterface";
import { CodeExpression } from "./Expression";
/**SyntaxKind:ParenthesizedExpression
 * 处理表达式
 * 计算 返回Math右值字符串值
 */
export declare function MathExpProcess(this: CodeExpression, node: Node): ExpPReturn;
