import { Node,SyntaxKind } from "ts-morph";
import { JArray, JToken } from "Utils";
import { SourceFileData } from "../Interfaces";
import { VariableProcess } from "./VariableProcess";
import { checkKind, throwLog } from '../Functions';
import { Eoc } from "JsonClass";
import { FunctionProcess } from "./FunctionProcess";
import { CodeExpression, ExpressionProcess } from "./Expression";
import { NodeProcess, CBPReturn } from "./NPInterfaces";
import { IfProcess } from "./IfProcess";
import { SwitchProcess } from "./SwitchProcess";


export enum BlockType{
    IF      = "if"      ,
    ELSE    = "else"    ,
    CLAUSE  = "clause"  ,
    OTHER   = "other"   ,
}

let _processFunc:Record<number,NodeProcess|null> = {
    [SyntaxKind.VariableStatement   ]:VariableProcess   ,
    [SyntaxKind.FunctionDeclaration ]:FunctionProcess   ,
    [SyntaxKind.ExpressionStatement ]:ExpressionProcess ,
    [SyntaxKind.ReturnStatement     ]:ReturnProcess     ,
    [SyntaxKind.IfStatement         ]:IfProcess         ,
    [SyntaxKind.SwitchStatement     ]:SwitchProcess     ,
};


function ReturnProcess(this:CodeBlock, node: Node):CBPReturn{
    checkKind(node,SyntaxKind.ReturnStatement);

    let outlist = new CBPReturn();

    //特殊调用
    let exp = new CodeExpression(node,this);
    let rit = exp.build();

    outlist.addPreFuncList(rit.getPreFuncs());

    let obj:JToken = { "math": [ this.getReturnId(), "=", rit.getToken() ]};
    outlist.addToken(obj);
    //return [{ "math": [ id, mid, lst ]}];
    return outlist;
}

export class CodeBlock{
    _id:string;
    _parentBlock?:CodeBlock;
    _node: Node|Array<Node>;
    _sfd:SourceFileData;
    _condition?:JToken|null;
    _falseNode?: Node|Array<Node>;
    _processTable:Record<number,NodeProcess|null> = {
        [SyntaxKind.VariableStatement   ]:VariableProcess   ,
        [SyntaxKind.FunctionDeclaration ]:FunctionProcess   ,
        [SyntaxKind.ExpressionStatement ]:ExpressionProcess ,
        [SyntaxKind.ReturnStatement     ]:ReturnProcess     ,
        [SyntaxKind.IfStatement         ]:IfProcess         ,
        [SyntaxKind.SwitchStatement     ]:SwitchProcess     ,
    };
    constructor(id:string,node: Node|Array<Node>,sfd:SourceFileData,condition?:JToken, falseNode?: Node|Array<Node>){
        this._id    =id         ;
        this._node  = node   ;
        this._sfd   = sfd    ;
        this._condition = condition;
        this._falseNode = falseNode;
    }
    getId(){
        return this._id;
    }
    getReturnId(){
        return this.getId()+"_return";
    }
    getParentBlock(){
        return this._parentBlock;
    }
    genSubBlock(id:BlockType,node: Node|Array<Node>,sfd:SourceFileData,condition?:JToken, falseNode?: Node|Array<Node>){
        let rid = sfd.genRID();
        let subBlockId = this.getId()+"_"+id+"_"+rid;
        let subBolck = new CodeBlock(subBlockId,node,sfd,condition,falseNode);
        subBolck._parentBlock = this;
        return subBolck;
    }
    getSfd(){
        return this._sfd;
    }

    /**处理代码块
     */
    build(){
        let eoc = new Eoc(this.getId());

        if(this._condition!=null)
            eoc.setCondition(this._condition);

        eoc.addEffectList(this.processStatments(this._node));
        if(this._falseNode!=null)
            eoc.addFalseEffectList(this.processStatments(this._falseNode));

        let eocObj = eoc.build();
        this._sfd.addEoc(eocObj);
        return new CBPReturn([eoc.build()]);
    }
    /**处理申明列表
     */
    processStatments(node:Node|Array<Node>){
        let statments:Array<Node> = [];
        if(Array.isArray(node))
            statments = node;
        else if(node.isKind(SyntaxKind.SourceFile) || node.isKind(SyntaxKind.Block) || node.isKind(SyntaxKind.CaseClause))
            statments = node.getStatements();
        else
            statments = [node];

        let effects = [];
        for(let stat of statments){
            try{
                let processFunc = _processFunc[stat.getKind()];
                if(processFunc==null)
                    continue;
                let result = processFunc.bind(this)(stat);
                if(!result.isVaild())
                    continue;
                let preFuncs = result.getPreFuncs();
                let tokens = result.getTokens();
                for(let obj of preFuncs)
                    effects.push(obj);
                for(let obj of tokens)
                    effects.push(obj);
            }catch(e){
                console.log("processStatments 出现错误");
                console.log(throwLog(stat));
                throw e;
            }
        }
        return effects;
    }
}

export default CodeBlock;