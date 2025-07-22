// 在src/components/TodoList/index.jsx
import React from 'react'
import { create } from 'zustand'

// 简单的Todo store
const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (text) => set((state) => ({ 
    todos: [...state.todos, { id: Date.now(), text, completed: false }] 
  })),
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  }))
}))

const TodoList = () => {
  const { todos } = useTodoStore()
  
  return (
    <div>
      <h2>待办事项</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList