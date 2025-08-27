// js 弱类型，容易出问题
// ts l带来类型的约束
// ts是微软想让java工程师写前端
// react+ts 是开发的标配
// 自定义类型
// interface 关键字
interface UserDemo{
    name:string;
    age:number;
}

type UserType = {
    name:string;
    age:number;
}

const ul:UserDemo={name:'张三',age:18}
const ul2:UserType={name:'李四',age:20}