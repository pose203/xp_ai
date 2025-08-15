let obj1 = {
    name:'xmr',
    age:18,
}

let obj2 = obj1;// 不是复印，引用传递，只是换个名字，还是一个东西
obj2.age = 20;


let arr1 = [1,2,3]
let arr2 = arr1;
arr2.push(4);