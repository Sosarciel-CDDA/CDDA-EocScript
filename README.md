[**中文简体**](./README.md) | [**English**](./README_EN.md)


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
sample [**js**](./test/input/expression-test.js)  
sample [**json**](./test/output/expression-test.json)  
```
a=1;
a+=1;
b=a+c;
```
### let
sample [**js**](./test/input/let-test.js)  
sample [**json**](./test/output/let-test.json)  
```js
let a=1;
```
### if
sample [**js**](./test/input/if-test.js)  
sample [**json**](./test/output/if-test.json)  
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
sample [**js**](./test/input/switch-test.js)  
sample [**json**](./test/output/switch-test.json)  
```js
switch(a){
  case 1:
    b=1;
  case 2:
    b=2;
}
```
### function
sample [**js**](./test/input/function-test.js)  
sample [**json**](./test/output/function-test.json)  
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
`eobj(obj)`                 |在当前代码块中添加一个不会被编译的对象 `eobj({message:"hello world"})`
`earr(obj[])`               |在当前代码块中添加多个不会被编译的对象，无法在表达式中使用 `earr([{num:1},{num:2}])`
`and(...exps)`              |将参数组合为eoc所支持的and 运算块 `if(and(a==1,b==2,c==3))`
`or(...exps)`               |将参数组合为eoc所支持的or  运算块
`not(exp)`                  |将参数组合为eoc所支持的not 运算块
`required_event(obj)`       |将当前代码块对应的eoc上的`required_event`       字段设置为`obj`
`recurrence(obj)`           |将当前代码块对应的eoc上的`recurrence`           字段设置为`obj` `recurrence([10,20])`
`condition(exp)`            |将当前代码块对应的eoc上的`condition`            字段设置为`exp`所编译的obj
`deactivate_condition(exp)` |将当前代码块对应的eoc上的`deactivate_condition` 字段设置为`exp`所编译的obj
`global(obj)`               |将当前代码块对应的eoc上的`global`               字段设置为`obj`
`run_for_npcs(obj)`         |将当前代码块对应的eoc上的`run_for_npcs`         字段设置为`obj`
`eoc_type(obj)`             |将当前代码块对应的eoc上的`eoc_type`             字段设置为`obj`
`'任何其他函数'(...)`        |任何没用`function`关键字申明的函数只会解析传入参数，不会作其它改变，直接调用时将运行同名eoc
