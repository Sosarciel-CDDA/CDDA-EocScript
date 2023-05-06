import { Node,SyntaxKind } from "ts-morph";
import { JArray, JToken } from "Utils";
import { SourceFileData } from "../Interfaces";
import { VariableProcess } from "./VariableProcess";
import { checkKind, throwLog } from '../Functions';
import { Eoc } from "JsonClass";
import { FunctionProcess } from "./FunctionProcess";
import { CodeExpression } from "./Expression";
import { NodeProcess, CBPReturn } from "./NPInterfaces";
import { IfProcess } from "./IfProcess";
import { SwitchProcess } from "./SwitchProcess";
import { ExpressionProcess } from "./ExpressionProcess";


export enum BlockType{
    IF      = "if"    ,
    ELSE    = "el"    ,
    CLAUSE  = "ca"    ,
    OTHER   = "ot"    ,
}

let _processFunc:Record<number,NodeProcess|null> = {
    [SyntaxKind.VariableStatement   ]:VariableProcess   ,
    [SyntaxKind.FunctionDeclaration ]:FunctionProcess   ,
    [SyntaxKind.ExpressionStatement ]:ExpressionProcess ,
    [SyntaxKind.ReturnStatement     ]:ReturnProcess     ,
    [SyntaxKind.IfStatement         ]:IfProcess         ,
    [SyntaxKind.SwitchStatement     ]:SwitchProcess     ,
};

//处理retur表达式
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
    //传入参数表
    _passArgsTable:Record<string,string|null> = {}

    //额外字段
    _eocFieldTable:Record<string,JToken>={}

    constructor(id:string,node: Node|Array<Node>,sfd:SourceFileData,condition?:JToken, falseNode?: Node|Array<Node>){
        this._id    = id     ;
        this._node  = node   ;
        this._sfd   = sfd    ;
        this._condition = condition;
        this._falseNode = falseNode;
    }
    getId(){
        return this._id;
    }

    getRootId(){
        return this.getSfd().getId();
    }

    getReturnId(){
        return this.getId()+"_rtn";
    }
    getParentBlock(){
        return this._parentBlock;
    }
    setParentBlock(block:CodeBlock){
        this._parentBlock = block;
    }

    genSubBlock(id:BlockType,node: Node|Array<Node>,condition?:JToken, falseNode?: Node|Array<Node>){
        let sfd = this.getSfd();
        let subBlockId = this.getRootId()+"_"+id+sfd.genRID();
        let subBlopck = new CodeBlock(subBlockId,node,sfd,condition,falseNode);
        subBlopck.setParentBlock(this);
        return subBlopck;
    }

    getSfd(){
        return this._sfd;
    }

    //增加一个传入参数
    addPassArgs(origVal:string,targetVal:string){
        this._passArgsTable[origVal]=targetVal;
    }
    //获取局部变量
    getLocalVal(origVal:string){
        let tg = this._passArgsTable[origVal];
        return tg==null? origVal:tg;
    }
    //添加一个额外字段
    addEocField(str:string,val:JToken){
        this._eocFieldTable[str]=val;
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
        //额外字段
        if(eocObj!=null){
            for(let field in this._eocFieldTable)
                (eocObj as any)[field] = this._eocFieldTable[field];
        }

        this._sfd.addEoc(eocObj);
        return new CBPReturn([eocObj]);
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