// 启动http server
// 引入express 框架
//怎么引入express框架
// import express from 'express';
// node 最初的commonhs 的模块化方案
const express = require('express');
// console.log(express);
const app = express();// 后端应用 APP
app.get('/', (req, res) => {
    // 返回index.html
    // res.send("hello world") // str
    // response 有请求req用户,浏览器(proxy) url localhost:1314 ＋ get +path/
    // http 足够简单 高并发 用户赶快走 断开联系
    // __dirname 项目的根目录
    console.log(__dirname);
    res.sendFile(__dirname + '/index.html');
});
// 添加一个支持server push 的路由
app.get('/sse', (req, res) => {
    // 支持server push 服务器端推送 少量的
    // 设置响应头
    res.set({
        // steam 文本流 事件
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',// 禁止前端使用缓存
        'Connection': 'keep-alive',// 保持连接

    })
    setInterval(() => {
        const message = `Current time is: ${new Date().toLocaleTimeString()}`;
        // server push
        res.write(`data: ${message}\n\n`);
    }, 1000);
})


// node 内置模块
const http = require('http').Server(app);// server 基本能力 B/S 架构
// 怎么理解http 的监听？ 伺服状态 伺候用户
http.listen(1314, () => {
    console.log('server is running on 1314');
});