import { useState } from 'react'

import './App.css'
import { 
  TodoContext

} from './TodoContext'
import { useTodos } from './hooks/useTodos'
import AddTodo from './components/AddTodo.jsx'
import TodoList from './components/TodoList'




function App() {
  const todosHook = useTodos();


  return (
    // App 管理状态
    <TodoContext.Provider value={todosHook}>
      <h1>Todo List</h1>
      <AddTodo />
      <TodoList />

    </TodoContext.Provider>
    
  )
}

export default App
