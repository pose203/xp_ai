//代码 
// 编译阶段
//   一 霎那，语法检测，做点准备（变量查找）
// 执行阶段
//当前作用域的顶部
// 变量提升是面试官喜欢的，js开发者设计的
// 不好，代码的执行结果和代码阅读顺序不一致，有歧义
//糟蹋 ，避开
// 申明变量
showName()//驼峰式命名
console.log(myName);
var myName = '曾小贤';
function showName() {
    let b = 2;
    console.log('函数执行了')
}




