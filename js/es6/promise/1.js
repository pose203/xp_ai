// 读取1.html 里面的内容
// 读取完后 打印 读完了
const fs = require('fs');// 引入js 内置的文件模块
const readFilePromise = new Promise((resolve, reject) => {
    fs.readFile('./1.html', (err, data) => {
        console.log(data.toString());
        resolve();
    })
})

// readFilePromise.then(() => {
//     console.log('读完了');
// })
// fs.readFile('./1.html', (err, data) => {
//     console.log(data.toString());
// })

// console.log('1111');

readFilePromise.then(() => {
    // 函数
    console.log('1111');
})

