var p4 = new Promise((resolve,reject)=>{
    // 宏任务
    // 先执行
    setTimeout(()=>{
    resolve(1000)// 将第一个 .then 的回调 放到微任务队列中
    console.log('哈哈哈')
    },0)
    
})  // 微任务
    p4.then((res)=>{
    // 执行第一个.then 的回调 
    console.log('1')// 1
    console.log(res)// 1000
    console.log('2')// 2
    }).then(()=>{
    
    console.log('第二次then')
}) 