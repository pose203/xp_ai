const arr = new Array(5);
// console.log(arr[0]);
let obj = {
    name: '葫芦娃',
    
}
let obj2 = {
    still: '喷火',
}
obj.__proto__ = obj2;
console.log(obj.still);
for(let key in obj){
    console.log(obj[key]);
}
console.log(obj.hasOwnProperty('name'),obj.hasOwnProperty('still'));
console.log(obj.hasOwnProperty(0));


