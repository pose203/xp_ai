const target = {a:1}

const source = {
    // 对象的嵌套
    b:{
        name:'hxt',
        age:18
    },
    c:1
}
// 浅拷贝
// Object.assign(target,source)、
// 常用的深拷贝
const newObj = JSON.parse(JSON.stringify(source));
console.log(newObj);
newObj.b.name = 'hxt1'
newObj.c = 2
console.log(newObj)
console.log(source)