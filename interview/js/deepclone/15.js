let obj = {a:1,b:2}
// 太常用，大语言都内置的,[] {}
// HashMap 字典0 (1) key:value
const target = new Map();
target.set('C',1);
console.log(target.get('C'));
target.set(obj,4); // 和JSON不一样的地方 对象做key
console.log(target.get(obj));


let obj2 = {b:'hello'}
const target2 = new WeakMap(); // Weak 弱的
target2.set(obj2,'code 密码花园');
obj2 = null;// 内存垃圾的回收
console.log(target.get(obj));











