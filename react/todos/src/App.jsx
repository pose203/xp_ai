import { useState } from 'react'
import './App.css'
// todos 列表需要渲染
// 返回html 的函数

//function App() {
  
  
//}


function App() {
  // react 比vue 更纯粹
  // 函数组件 App 组件 组合其他的组件完成应用
  // html css js 组合在一起 ，组件

  // 数组->数据状态 数据业务 改变状态
  const [todos, setTodos] = useState(['吃饭', '睡觉', '打豆豆']);
  const [title, setTitle] = useState('ecut 一明')
  setTimeout(() => {
    //Todos=['吃饭', '睡觉', '打豆豆', '养鱼'];
    setTodos(['吃饭', '睡觉', '打豆豆', '养鱼'])
    setTitle('字节一明')
  }, 5000);


  return (
    <div>
      <h1 className='title'>{title}</h1>
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>任务</th>
          </tr>
        </thead>
        <tbody>
          {// html 模板
            todos.map((item, index) => (
              <tr>
                
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
