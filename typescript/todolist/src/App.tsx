
import HelloComponent from './components/HelloComponent.tsx'

import './App.css'
// react + typescript
//javascript 可能有些问题，主要因为弱类型
// jsx 后缀改成tsx
// 函数进行类型约束


// const HelloComponent = () => {
//   // void 空 ReactNode
//   return 1
//   // return <div>Hello Component</div>
// }

function App() {
  // 编译阶段
  // 多写了些类型申明文件
  // 多写一些代码 类型申明 代码质量保驾护航
  let count: number = 10;
  const title:string= 'hello';
  const isDone:boolean = true;
  const list:number[] = [1,2,3,4,5];
  // 元组类型
  const tuple:[string,number] = ['hello',10];
  // // 枚举类型
  // enum status {
  //   Pending,
  //   Fullfilled,
  //   Rejected
  // }
  // const status1:status = status.Pending;
  // 对象的约束?
  // 接口类
  interface User {
    name:string;
    age:number;
    email:string;
    isSingle?:boolean;
    
  }
  // 使用接口来约定类型
  const user:User = {
    name:'张三',
    age:18,
    email:'zhangsan@163.com',
    
  }
  return (
   
    <>
      {title}
      {count}
      {isDone}
      {list}
      {tuple}
      
      {user.name}
      {/* typecript*/}
      <HelloComponent name='uzi' />
           
    </>
  )

}



export default App


