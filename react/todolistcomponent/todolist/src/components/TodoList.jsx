//内置的hook 函数
import  {usestate} from 'react'
import '../TodoList.css'
import TodoForm from './TodoForm'
import Todos from './Todos'

function TodoList(){
  // 数据驱动的界面
  // 静态界面?
  // DOM 数组 -> map -> join('') -> innerHTML 底层API 编程
  // 缺点 低效、面向API
  // 面向业务  懂业务
  // 数据 -> 变化 -> 数据状态 -> 自动刷新页面 ->**数据****驱动**页面
  // 数组，第一项是数据变量，第二项函数执行，并传入新的todos
  //页面会自动更新
  // 挂载点 tbody
  // {todos.map}
  // setTodos DOM 及动态更新
  // 响应式界面开发
  const [todos, setTodos] = useState([
    {
      id : 1,
      text:'吃饭',
      completed :false
    }
  ])
  setTimeout(()=>{
      setTodos([
        ...todos,
        {
          id : 2,
          text:'睡觉',
          completed :false
        }

      ])
    }
  )
  return(
    <div className="container">
      <h1 className="title">Todo List</h1>
      <TodoForm/>
      <Todos/>
      {
        //当下这个位置
        // 数据为王 界面是被驱动的
        //数据驱动
        //数据绑定 data binding
        //发生改变后
        todos.map(todo =>(
          <li>{todo.text}</li>
        ))
      }
    </div>
  )
}

export default TodoList;