import { Node,SyntaxKind } from "ts-morph";
import { JArray, JObject, JToken } from "Utils";
import { SourceFileData } from "../Interfaces";
import { VariableProcess } from "./VariableProcess";
import { checkKind, throwLog } from '../Functions';
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

    outlist.preFuncs.push(...rit.preFuncs);

    let obj:JToken = { "math": [ this.getReturnId(), "=", rit.token ]};
    outlist.tokens.push(obj);
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
        return this.getSfd().id;
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
        //从当前块开始向父块搜索
        let curr:CodeBlock|undefined = this;
        while(curr!=null){
            let tg = curr._passArgsTable[origVal];
            if(tg!=null)
                return tg;
            curr = curr.getParentBlock();
        }
        return origVal;
    }
    //局部变量映射
    getLocalValMap(){
        return this._passArgsTable;
    }
    //添加一个额外字段
    addEocField(str:string,val:JToken){
        this._eocFieldTable[str]=val;
    }

    /**处理代码块
     */
    build(){
        let eoc:JObject = {
            id           : this.getId()         ,
            type         : "effect_on_condition",
        }

        if(this._condition!=null)
            eoc["condition"] = this._condition;

        eoc["effect"] = [...this.processStatments(this._node)].filter(item=>item!=null)
        if(this._falseNode!=null)
            eoc["false_effect"] = [...this.processStatments(this._falseNode)].filter(item=>item!=null);

        //额外字段
        for(let field in this._eocFieldTable)
            eoc[field] = this._eocFieldTable[field];


        this._sfd.addEoc(eoc);
        return new CBPReturn([eoc]);
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
                let preFuncs = result.preFuncs;
                let tokens = result.tokens;
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
        //console.log(effects)
        return effects;
    }
}

export default CodeBlock;