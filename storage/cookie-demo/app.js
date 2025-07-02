// es6 模块化
// mjs 后缀 使用es6模块化
// 模块化是语言的能力
// node 默认不支持es6 模块化
// node 最新版本 支持了 22
// node 准备跟require commonjs say goodbye
// es6 module 更先进 
import http from 'http';

const server = http.createServer((req, res) => {
    
    res.end('hello world');
})
server.listen(1233);

