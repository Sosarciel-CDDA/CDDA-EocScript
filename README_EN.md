
- [description](#Description)
- [Use](#Use)
- [Syntax](#syntax)
  - [Type Description](#type-description)
  - [Implemented Syntax Or Keywords](#implemented-syntax-or-keywords)
  - [Special Functions](#special-functions)

# Description
Compile JS to CDDA supported jSON format EOC  
cdda:https://github.com/CleverRaven/Cataclysm-DDA

# Use
In the command line
```bat
EocScript --input ./input --output ./output
```
Compile all the contents of . /input directory and compile all the contents to json to . /output

# Syntax
## Type Description
Type | Description
--- | ---
`exp` | Expressions `a+=test()`,`a=a+2`,`a`
`obj` | js object `{key:value},[a,b,c]`,`"123"`, or js code block `((()=>{ let obj = {};for (let i = 1; i <= 10; i++) obj[String.fromCharCode(64 + i)] = i; return obj; })())`

## Implemented Syntax Or Keywords
### expression
```
a=1;
a+=1;
b=a+c;
```
### let
```js
let a=1;
```
### if
```js
if(a==1){
  a=2;
  b=3;
}else if(b==1)
  c=4;
else
  d=5;
```
### switch
```js
switch(a){
  case 1:
    b=1;
  case 2:
    b=2;
}
```
### function
```js
function regenVal(id){
  u_val(id)+=1;
  return 123;
}
regenVal(a)
regenVal(b)
let c = regenVal(b)+1;
```

## Special Functions
Function | Description
--- | ---
`eobj(obj)`                 |Add an object to the current block of code that will not be compiled
`earr(obj[])`               |Add multiple objects to the current block of code that will not be compiled and cannot be used in an expression
`u_val(...)`                |The functions supported by math only parse incoming parameters and make no other changes
`and(params exp[])`         |Combining parameters into 'and' blocks supported by eoc
`or(params exp[])`          |Combining parameters into 'or' blocks supported by eoc
`not(exp)`                  |Combining parameters into 'not' blocks supported by eoc
`required_event(obj)`       |Set the current block of code corresponding to the eoc on the `required_event` field set to `obj`,
`recurrence(obj)`           |Set the current block of code corresponding to the eoc on the `recurrence` field set to `obj`,
`deactivate_condition(exp)` |Set the current block of code corresponding to the eoc on the `deactivate_condition` field set to the obj compiled by `exp`,
`global(obj)`               |Set the current block of code corresponding to the eoc on the `global` field set to `obj`,
`run_for_npcs(obj)`         |Set the current block of code corresponding to the eoc on the `run_for_npcs` field set to `obj`,
`EOC_TYPE(obj)`             |Set the current block of code corresponding to the eoc on the `EOC_TYPE` field set to `obj`,
