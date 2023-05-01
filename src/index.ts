export * from "./Utils";
export * from "./JsonClass";
export * from "./Interpreter";
//https://ts-ast-viewer.com/
//https://github.com/CleverRaven/Cataclysm-DDA/blob/master/doc/NPCs.md

import Interpreter from "./Interpreter";
let inte = new Interpreter(`
EToken({a:1,b:2});
EToken((()=>{
    let obj = {};
    for (let i = 1; i <= 10; i++)
        obj[String.fromCharCode(64 + i)] = i;
    return obj;
})())
function test2(){
    a=a+1;
    return a;
}
function tsfunc(){
    let e=1,b=2,c=3;
    return test2();
}
let a=1;
let b=2+(a+3)+c+d*2;
switch(a){
    case 1:
        a=1;
    case 2:
        b=1;
}
let c=3;
tsfunc();
let sss = test2();
if(a==tsfunc()){
    b=2;
}
if(EToken({testEtoken:1})){
    b=2;
}
`);
let sfd = inte.build("testProject");
console.log(sfd.getSerializedText());
