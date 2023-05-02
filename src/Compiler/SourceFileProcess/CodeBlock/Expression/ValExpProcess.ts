import { Node } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
import { ExpPReturn } from "./EPInterface";
import { MathExpProcess } from "./MathExpProcess";



//非赋值运算处理
export function ValExpProcess(node: Node,sfd:SourceFileData):ExpPReturn{
    let out = new ExpPReturn();

    let exp = MathExpProcess(node,sfd);
    out.addPreFuncList(exp.getPreFuncs());

    out.setToken({"math":[exp.getToken()]});

    return out;
}