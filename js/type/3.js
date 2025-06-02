// 独一无二的值
const sym = Symbol();
const sym1 = Symbol();
const sym2 = Symbol('desc');// label 标签
console.log(typeof sym,sym);
console.log(sym1 === sym);
// symbol 可用于 对象的key
//使用symbol 构造函数实例化，一个被标记为 id 的唯一值 ID
const ID = Symbol('id');
// es6 之前 key string
// symbol 作为key

const user = {
    name:'Alice',
    //[sex]:'女',
    //[num]:2
    //key 是独一无二的
    // 当我们在大厂，如果我们要去修改别人的代码中的对象
    // 对象动态的 不希望出错
    [ID]:'123'
    // "ID":1

}
user.age = 18;

//console.log(user.name,user.age,user[ID],user[age]);
// 面对对象私有属性概念？
// 对象的隐私 内部需要，不希望外界调用
for(let key in user){
    console.log(key,user[key],'-------');
}

// 获取symbol 类型的key
