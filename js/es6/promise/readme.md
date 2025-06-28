# promise


- cpu 轮询
- 同步任务，异步任务
  异步任务
  先跳到后面去执行
  代码的编写顺序和执行顺序不一样
  异步比较花时间
- 有个需求
   111 输出放在后面
   控制执行的顺序

## promise  的底层理解
画个饼
- 异步任务需要些时间，不管的话，跳到后面运行
  代码的可读性不好，代码的阅读顺序和执行顺序不一致
- const p =new Promise(fn)
  类，专门用于解决异步问题
  prototype then 方法
- 异步任务放到这个fn
- fn里面的异步任务做完了，resolve()
- p.then(() => {
    都可以运行
} )
- 我们把任务放到then 里面就可以把执行的流程交给resolve来处理

## 控制执行流程的es6 套路
   - new Promise()// 请Promise 类 控制异步流程专业
   - (resolve) => {// executor 耗时性的异步任务}
     异步任务 setTimeout readFile fetch ...
   - then 原型方法
   - resovle() then 函数执行
