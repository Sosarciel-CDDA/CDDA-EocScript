import { Project,ts,VariableStatement} from "ts-morph";

const project = new Project();
const sourceFile = project.createSourceFile("temp.ts", `
    let a=1;
    let b=2;
    switch(a){
        case 1:
            console.log(1)
    }
    let c=3;
`);
let needStr = {
    "type": "switch",
    "cases": [
        {
            "val": 1,
            "cmd": {"type":"consoleLog", "val":{"u_val":"a"}}
        }
    ]
}


let valList = sourceFile.getDescendantsOfKind(ts.SyntaxKind.VariableStatement);
console.log(valList[0]);
//let result:{
//    effect:Array<any>
//} = {
//    effect:[]
//};
//for(let val of valList){
//    result.effect.push({ "arithmetic":[ {"time_since_cataclysm": "turns" }, "=", { "const": 1 } ]});
//}

//console.log(count);
//let b = sourceFile.getDescendantsOfKind(ts.SyntaxKind.SwitchStatement)
//console.log(b);
//const switchStatement = sourceFile.getDescendantsOfKind(ts.SyntaxKind.SwitchStatement)[0];
//const result = {
//    type: "switch",
//    cases: switchStatement.getCaseBlock()
//        .getDescendantsOfKind(ts.SyntaxKind.CaseClause)
//        .map(clause => ({
//            val: parseInt(clause.getExpression().getText()),
//            cmd: {
//                type: "consoleLog",
//                val: {
//                    u_val: clause.getStatements()[0].getDescendantsOfKind(ts.SyntaxKind.Identifier)[1].getText()
//                    //u_val: clause.getStatements()[0].getDescendantsOfKind(ts.SyntaxKind.Identifier)[0].getText()
//                }
//            }
//        }))
//}
//const result = {
//    type: "switch",
//    cases: switchStatement.getCaseBlock()
//        .getDescendantsOfKind(ts.SyntaxKind.CaseClause)
//        .map(clause => ({
//            val: clause.getExpression().getText(),
//            cmd: clause.getStatements()[0].getText()
//        }))
//}
//let str = JSON.stringify(result,null,"  ");;
//console.log(str);