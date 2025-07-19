import { 
  useState,
  useEffect
 } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: '标题一'
    },
    {
      id: 2,
      title: '标题二'
    },
    {
      id: 3,
      title: '标题三'
    },
  ])

useEffect(() => {
  setTimeout(() => {
  // 
  // setTodos(pre => pre.map(todo => {
  //   if(todo.id === 1) return {
  //     ...todo,
  //     title:'标题一修改'
  //   }
  //   return todo
  // })) 
  // 
  // setTodos(prev => [
  //   ...prev,
  //   {
  //     id: 4,
  //     title: '标题四'
  //   }
  // ])
  setTodos(prev =>[
    {
      id: 4,
      title: '标题四'
    },
    ...prev
  ])
}, 5000)
}, [])

  return (
    <>
      <ul>
        { // 为什么Map循环输出不能用index作为key
          todos.map((todo,index) => (
            <li key={todo.id}>{todo.title}</li>
          ))
        }
      </ul>
    </>
  )
}

export default App