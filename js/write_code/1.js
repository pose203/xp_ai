// 完成的功能
function objectFactory(Constructor,...args){
    var obj = {};
    // 类数组上没有shift方法,所以借用数组的shift方法
    // var Constructor = [].shift.call(arguments);// 构造函数
    obj.__proto__ = Constructor.prototype;
    Constructor.apply(obj,args);
    // || null 的情况 任然会返回object 构造函数 return 简单类型,忽略
    return typeof ret === 'object' ? ret || obj : obj;

    // return obj;
    
}

function Person(name,age){
    this.name = name;
    this.age = age;
    //return 1;
    // return null;
    return {
        name:name,
        age:age,
        label:'哈哈'
     }
}

// let p = new Person('张三',18);
// p.sayHi();


// new Person(...) -> function [[constructor]] -> {} && this -> {} ->[[call]] 
//  -> {}.__proto__ -> Constructor.prototype -> return {}


Person.prototype.say = function(){
    console.log(`你好,我是${this.name}`);
}

let p1 = new Person('张三',18);
console.log(p1);


let p = objectFactory(Person,'张三',18);
console.log(p);
p.say();
console.log(p instanceof Person);


