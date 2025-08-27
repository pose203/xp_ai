# Promise.all

- MDN 定义
  Promise.all() 方法接受一个promisede的**iterable**类型的输入(Array, Map, Set)
  并且只返回一个promise实例，那个输入的所有promise的resolve回调的结果是一个数组,
  并按顺序存放，只要任何一个输入的reject回调执行，就会抛出错误
  Promise.all的promise失败.catch 执行。reject是第一个抛出的错误

  如果有promise子项失败，那么其他还没有完成的promise会继续执行，只不过结果不重要了


- race，any，allsettled
  这一组Promise上的静态方法，带来了promise的并行
  async await 简单，不需要then的链式调用，优雅的异步变同步，但也不能乱用，它是窜行的
  如果多个promise值前后有依赖 async/await有优势，但如果没有呢?Promise.all 并发更快

  如果并行业务需求 all/race/any/allSettled 更加高效

  - Promise.all()	全成功才成功：所有 Promise 都 fulfilled 时，它才 fulfilled；任何一个 rejected，它就立即 rejected。
  - Promise.race()	谁快听谁的：哪个 Promise 最先完成（无论 fulfilled 或 rejected），它的结果就决定了 Promise.race() 的最终状态。
  - Promise.any()	首个成功即成功：只要有一个 Promise fulfilled，它就立即 fulfilled；只有当所有 Promise 都 rejected 时，它才 rejected（返回 AggregateError）。
  - Promise.allSettled()	全部完成才结束：等待所有 Promise 都 settled（fulfilled 或 rejected），然后返回一个包含每个 Promise 结果（含状态和值/原因）的数组。

