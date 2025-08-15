const target = {
    a:1,

};
// 对象为简单数据类型会直接忽略
Object.assign(target,null);
Object.assign(target,undefined);

console.log(target)

//Object.assign(undefined,{a:1});

const obj = {name:"张三"};
Object.assign(obj);