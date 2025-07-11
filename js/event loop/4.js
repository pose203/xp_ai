console.log('script start');

const promise1 = Promise.resolve('Frist Promise');
const promise2 = Promise.resolve('Second Promise');
const promise3 = new Promise(resolve => {
    resolve('Third Promise');
})
promise1.then(value => console.log(value));
promise2.then(value => console.log(value));
promise3.then(value => console.log(value));

setTimeout(()=>{
    console.log('下一把再相见');
},0)

console.log('同步end')