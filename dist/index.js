"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Utils"), exports);
__exportStar(require("./JsonClass"), exports);
__exportStar(require("./Interpreter"), exports);
//https://ts-ast-viewer.com/
//https://github.com/CleverRaven/Cataclysm-DDA/blob/master/doc/NPCs.md
const Interpreter_1 = require("./Interpreter");
let inte = new Interpreter_1.default(`
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
if(and(a==1,b==2,c==3,or(d==4,e==5,not(f==6)))){
    b=2;
}
`);
let sfd = inte.build("testProject");
//console.log(sfd.getSerializedText());
let inte1 = new Interpreter_1.default(`
    if(u_val(mana)<u_val(mana_max))
        u_val(mana)+=u_val(mana_max)/10;
    else if(a==1)
        b=1
    else
        c=1
`);
let sfd1 = inte1.build("testProject");
console.log(sfd1.getSerializedText());
