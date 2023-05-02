import { KindToNodeMappings,SyntaxKind,Node } from "ts-morph";


export function checkKind<TKind extends SyntaxKind>(node:Node,kind:TKind,message?:string): asserts node is KindToNodeMappings[TKind]{
    if(!node.isKind(kind)){
        let str = "checkKindId 错误 statment.getKind()!="+SyntaxKind[kind] +
            "\nline:\n"+node.getText()+"\nKind:"+SyntaxKind[node.getKind()];
        if(message!=null)
            str+="\n"+message;
        str+="\n";
        console.log("错误堆栈追溯:");
        console.trace();
        console.log();
        throw str;
    }
}


export function throwLog(node:Node,message?:string){
    let str = "throwLog 错误\nline:\n"+node.getText()+"\nSyntaxKind:"+SyntaxKind[node.getKind()];
    if(message!=null)
        str = str+"\n"+message;
    str+="\n";
    return str;
}

export function logKind(node:Node){
    console.log(SyntaxKind[node.getKind()]);
}
