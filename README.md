- [说明](#说明)
- [使用](#使用)
- [语法](#使用)
  - [类型说明](#类型说明)
  - [实现的语法或关键字](#实现的语法或关键字)
  - [特殊函数](#特殊函数)



# 说明
将JS编译为CDDA支持的jSON格式EOC  
cdda:https://github.com/CleverRaven/Cataclysm-DDA


# 使用
在命令行中
```bat
EocScript --input ./input --output ./output
```
将 ./input 目录下所有内容编译为json输出到 ./output

# 语法
## 类型说明
类型 | 描述
--- | ---
`exp` | 表达式，如`a+=test()`,`a=a+2`,`a`,暂不支持a++等单目
`obj` | js对象，`{key:value},[a,b,c]`,`"123"`,或是js代码块，如`((()=>{ let obj = {};for (let i = 1; i <= 10; i++) obj[String.fromCharCode(64 + i)] = i; return obj; })())`

## 实现的语法或关键字
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

## 特殊函数
函数 | 描述
--- | ---
`eobj(obj)`                 |在当前代码块中添加一个不会被编译的对象
`earr(obj[])`               |在当前代码块中添加多个不会被编译的对象，无法在表达式中使用
`u_val(...)`                |math所支持的函数只会解析传入参数，不会作其它改变
`and(params exp[])`         |将参数组合为eoc所支持的and运算块
`or(params exp[])`          |将参数组合为or所支持的and运算块
`not(exp)`                  |将参数组合为or所支持的not运算块
`required_event(obj)`       |将当前代码块对应的eoc上的`required_event`字段设置为`obj`,
`recurrence(obj)`           |将当前代码块对应的eoc上的`recurrence`字段设置为`obj`,
`deactivate_condition(exp)` |将当前代码块对应的eoc上的`deactivate_condition`字段设置为`exp`所编译的obj,
`global(obj)`               |将当前代码块对应的eoc上的`global`字段设置为`obj`,
`run_for_npcs(obj)`         |将当前代码块对应的eoc上的`run_for_npcs`字段设置为`obj`,
`EOC_TYPE(obj)`             |将当前代码块对应的eoc上的`EOC_TYPE`字段设置为`obj`,
