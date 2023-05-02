import { Node, SyntaxKind } from "ts-morph";
import { SourceFileData } from "../../Interfaces";
import { NodeProcess, CBPReturn } from "../NPInterfaces";
import { checkKind, throwLog } from "../../Functions";
import { CallExpProcess } from "./CallExpProcess";
import { CalcExpProcess } from "./CalcExpProcess";
import { ExpPReturn, ExpProcess } from "./EPInterface";
import { ValExpProcess } from "./ValExpProcess";
import { CodeBlock } from "../CodeBlock";
import { MathExpProcess } from "./MathExpProcess";
import { JToken } from "@/src/Utils";






//直接调用函数
function CallStateExpProcess(this:CodeExpression, node: Node):ExpPReturn{ 
    checkKind(node,SyntaxKind.CallExpression);

    let out = new ExpPReturn();

    let result = CallExpProcess.bind(this)(node);
    //判断是否有函数返回 用于判断EObj
    if(result.getPreFuncs().length>0)
        out.addPreFuncList(result.getPreFuncs());
    else //EObj无函数返回
        out.setToken(result.getToken());
    return out;
}

//return申明
function ReturnStateExpProcess(this:CodeExpression, node: Node):ExpPReturn{ 
    checkKind(node,SyntaxKind.ReturnStatement);
    let out = new ExpPReturn();

    let rit = MathExpProcess.bind(this)(node.getExpressionOrThrow());

    out.addPreFuncList(rit.getPreFuncs());

    //let obj:JToken = { "math": [ this.getCodeBlock().getReturnId(), "=", rit.getToken() ]};
    out.setToken(rit.getToken());
    //return [{ "math": [ id, mid, lst ]}];
    return out;
}

export class CodeExpression{
    _node:Node;
    _codeBlock:CodeBlock;
    constructor(node:Node,codeBlock:CodeBlock){
        this._node          = node      ;
        this._codeBlock     = codeBlock ;
    }

    getCodeBlock(){
        return this._codeBlock;
    }
    getSfd(){
        return this.getCodeBlock().getSfd();
    }

    build(){
        return this.process(this._node);
        //throw throwLog(node,"未知的申明表达式类型");
    }

    process(node:Node){

        //return
        if(node.isKind(SyntaxKind.ReturnStatement))
            return ReturnStateExpProcess.bind(this)(node);

        //直接调用函数
        if(node.isKind(SyntaxKind.CallExpression))
            return CallStateExpProcess.bind(this)(node);

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






