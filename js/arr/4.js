// 如何遍历数组
// for(let i = 0..) 计数循环 性能好 可读性不好 不是人脑，电脑
// while
// - forEach 
// - map filter find some every
// - for of

const names = Array.of('龙','凤','虎','豹','蛇','鼠','牛','马','羊','猴','鸡','狗');
// console.log(names);

names.forEach(name => {
    if(name === '虎'){
        console.log("虎在这里");
        // break;
    }
    console.log('Processing'+ name);

})

