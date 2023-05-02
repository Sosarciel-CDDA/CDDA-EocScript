import { Node } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
import { ExpPReturn } from "./EPInterface";
import { MathExpProcess } from "./MathExpProcess";
import { CodeExpression } from "./Expression";



//非赋值运算处理
export function ValExpProcess(this:CodeExpression, node: Node):ExpPReturn{
    let out = new ExpPReturn();

    let exp = MathExpProcess.bind(this)(node);
    out.addPreFuncList(exp.getPreFuncs());

    out.setToken({"math":[exp.getToken()]});

    return out;
}