// add 函数, 接收三个参数, 返回三个参数的和
//add.length 3


function add(a, b, c) {
    return a + b + c;
}

add(1, 2, 3);
function curry(fn) {
    // fn? 参数 最终要执行的功能，闭包中的自由变量
    // curry 函数 包装fn,慢慢收集参数
    // 递归
    //返回一个函数
    //...args 所有的参数 自由变量
    let judge = (...args) => {
        // 任何地方都可以访问到定义时候的fn
        if(args.length == fn.length){
            //退出条件
            return fn(...args);
        }
        return (...newArgs) => judge (...args,...newArgs);
    }
    return judge; // 关键：返回 judge 函数
}
// 柯里化 将一个多参数的函数转换为一系列的单参数函数
// 手写curry函数
let addCurry = curry(add);
// 逐步的去获取函数需要的参数，当到达fn 需要的参数数量时，执行fn
console.log(addCurry(1)(2)(3));