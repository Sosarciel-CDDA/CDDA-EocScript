import { Node, SyntaxKind } from "ts-morph";
import { checkKind } from "../../Functions";
import { CallExpProcess } from "./CallExpProcess";
import { CalcExpProcess } from "./CalcExpProcess";
import { ExpPReturn } from "./EPInterface";
import { ValExpProcess } from "./ValExpProcess";
import { CodeBlock } from "../CodeBlock";
import { MathExpProcess } from "./MathExpProcess";
import { condExpProcess } from "./CondExpProcess";






/** 直接调用函数*/
function CallStateExpProcess(this:CodeExpression, node: Node):ExpPReturn{
    checkKind(node,SyntaxKind.CallExpression);

    let out = new ExpPReturn();

    let result = CallExpProcess.bind(this)(node);
    //直接调用只取preFunc
    out.preFuncs.push(...result.preFuncs);
    //console.log(out.getPreFuncs());
    //out.setToken(result.getToken());
    return out;
}



/** return申明*/
function ReturnStateExpProcess(this:CodeExpression, node: Node):ExpPReturn{ 
    checkKind(node,SyntaxKind.ReturnStatement);
    let out = new ExpPReturn();

    let rit = MathExpProcess.bind(this)(node.getExpressionOrThrow());

    out.preFuncs.push(...rit.preFuncs);

    //let obj:JToken = { "math": [ this.getCodeBlock().getReturnId(), "=", rit.getToken() ]};
    out.token = rit.token;
    //return [{ "math": [ id, mid, lst ]}];
    return out;
}

/**表达式 */
export class CodeExpression{
    private _node:Node;
    /**处于哪个代码块 */
    codeBlock:CodeBlock;
    constructor(node:Node,codeBlock:CodeBlock){
        this._node          = node      ;
        this.codeBlock      = codeBlock ;
    }
    //源数据
    getSfd(){
        return this.codeBlock.getSfd();
    }
    //本地变量
    getLocalVal(origVal:string){
        return this.codeBlock.getLocalVal(origVal);
    }
    //本地变量映射
    getLocalValMap(){
        return this.codeBlock.getLocalValMap();
    }

    build(){
        return this.process(this._node);
        //throw throwLog(node,"未知的申明表达式类型");
    }
    /**处理表达式 */
    process(node:Node){
        //return
        if(node.isKind(SyntaxKind.ReturnStatement))
            return ReturnStateExpProcess.bind(this)(node);

        //直接调用函数
        if(node.isKind(SyntaxKind.CallExpression))
            return CallStateExpProcess.bind(this)(node);

        //条件表达式
        if(node.isKind(SyntaxKind.IfStatement)){
            //return new ExpPReturn();
            return condExpProcess.bind(this)(node);
        }

        //表达式
        if(node.isKind(SyntaxKind.BinaryExpression)){
            let opera = node.getOperatorToken().getText();
            if (['==', '>=', '<=', '>', '<', '=', '+=', '-=', '*=', '/=', '%='].includes(opera))
                return CalcExpProcess.bind(this)(node);
            return ValExpProcess.bind(this)(node);
        }

        //定义
        if(node.isKind(SyntaxKind.VariableDeclaration))
            return CalcExpProcess.bind(this)(node);

        //单字
        if( node.isKind(SyntaxKind.Identifier)      ||
            node.isKind(SyntaxKind.StringLiteral)   ||
            node.isKind(SyntaxKind.NumericLiteral))
            return ValExpProcess.bind(this)(node);


        return CalcExpProcess.bind(this)(node);
    }
}






