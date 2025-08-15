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
Object.assign(target,source)

target.b.name = 'hxt1'
target.b.age = 19
target.c = 2

console.log(source.b.name,source.b.age,source.c)