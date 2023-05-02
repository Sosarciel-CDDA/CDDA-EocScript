const tsconfigPaths = require("tsconfig-paths");

const baseUrl = "."; // 项目根目录
const paths = {
    "@/*"                   : ["./*"]                       ,
    "@/src/*"               : ["./dist/*"]                  , // 将 @ 映射到 dist 目录
    "Utils"                 : ["./dist/Utils"]              ,
    "Compiler"              : ["./dist/Compiler"]           ,
    "JsonClass"             : ["./dist/JsonClass"]          ,
};


tsconfigPaths.register({
    baseUrl,
    paths,
});

const dist = require("./dist");
module.exports = dist;


//https://ts-ast-viewer.com/
//https://github.com/CleverRaven/Cataclysm-DDA/blob/master/doc/NPCs.md