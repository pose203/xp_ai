const str = '我的手机号是13812345678，有空打给我';
const str2 = "hello world"
const reg = /1[3-9][0-9]{9}/;// 简写方式

console.log(reg.test(str));
console.log(reg.test(str2));
console.log(str.match(reg));

const str3 = "我的{name}"

const result = str3.replace(/\{name\}/g, '奶龙');
console.log(result);





