import { Node,SyntaxKind } from "ts-morph";
import { JArray, JToken } from "Utils";
import { BlockType, SourceFileData } from "../Interfaces";
import { VariableProcess } from "./VariableProcess";
import { checkKind, throwLog } from '../Functions';
import { Eoc } from "JsonClass";
import { FunctionProcess } from "./FunctionProcess";
import { ExpressionProcess, MathExpProcess } from "./ExpressionProcess";
import { NodeProcess, ProcessReturn } from "./NPInterfaces";
import { IfProcess } from "./IfProcess";
import { SwitchProcess } from "./SwitchProcess";

let _processFunc:Record<number,NodeProcess|null> = {
    [SyntaxKind.VariableStatement   ]:VariableProcess   ,
    [SyntaxKind.FunctionDeclaration ]:FunctionProcess   ,
    [SyntaxKind.ExpressionStatement ]:ExpressionProcess ,
    [SyntaxKind.ReturnStatement     ]:ReturnProcess     ,
    [SyntaxKind.IfStatement         ]:IfProcess         ,
    [SyntaxKind.SwitchStatement     ]:SwitchProcess     ,
};

//处理代码块
export function CodeBlockProcess(node: Node|Array<Node>,sfd:SourceFileData,blockId?:string,condition?:JToken, falseEffect?: Node|Array<Node>):ProcessReturn{

    let eocname = blockId||sfd.genBlockId(BlockType.OTHER);

    let eoc = new Eoc(eocname);

    if(condition!=null)
        eoc.setCondition(condition);

    eoc.addEffectList(processStatments(node,sfd,blockId));
    if(falseEffect!=null)
        eoc.addFalseEffectList(processStatments(falseEffect,sfd,blockId));

    let eocObj = eoc.build();
    sfd.addEoc(eocObj);
    return new ProcessReturn([eoc.build()]);
}

function processStatments(node:Node|Array<Node>,sfd:SourceFileData,blockId?:string){
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
            let result = processFunc(stat,sfd,blockId);
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

export function ReturnProcess(node: Node,sfd:SourceFileData,blockId?:string):ProcessReturn{
    checkKind(node,SyntaxKind.ReturnStatement);
    if(blockId==null)
        throw throwLog(node,"未分配 blockId");
    let outlist = new ProcessReturn();
    let rit = MathExpProcess(node.getExpressionOrThrow(),sfd);

    outlist.addPreFuncList(rit.getPreFuncs());

    let obj:JToken = { "math": [ sfd.getReturnId(blockId), "=", rit.getToken() ]};
    outlist.addToken(obj);
    //return [{ "math": [ id, mid, lst ]}];
    return outlist;
}


export default CodeBlockProcess;