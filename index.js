//const tsconfig = require("./tsconfig.json");
//console.log(tsconfig.compilerOptions);
const tsconfigPaths = require("tsconfig-paths");

const baseUrl = "."; // 项目根目录
const paths = {
    "@/*"                   : ["./*"]                       ,
    "@/src/*"               : ["./dist/*"]                  , // 将 @ 映射到 dist 目录
    "Utils"                 : ["./dist/Utils"]              ,
    "Interpreter"           : ["./dist/Interpreter"]        ,
    "JsonClass"             : ["./dist/JsonClass"]          ,
};


tsconfigPaths.register({
    baseUrl,
    paths,
});

require("./dist");

//import { register } from "esm-resolve";
//
//register({
//  baseUrl: ".", // 项目根目录
//  paths: {
//    "@/*": ["dist/*"], // 将 @ 映射到 dist 目录
//  },
//});
//
//import("./dist/index.js");