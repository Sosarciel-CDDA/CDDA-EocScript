const {Compiler} = require('./index');
let compiler = new Compiler(`
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
let sfd = compiler.build("testProject");
console.log(sfd.getSerializedText());
let compiler1 = new Compiler(`
    if(u_val(mana)<u_val(mana_max))
        u_val(mana)+=u_val(mana_max)/10;
    else if(a==1)
        b=1
    else
        c=1
`);
let sfd1 = compiler1.build("testProject");
//console.log(sfd1.getSerializedText());