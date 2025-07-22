import { useState } from 'react'
import Counter from './components/Counter'
import TodoList from './components/TodoList'
import RepoList from './components/RepoList'
import './App.css'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
    APP中的{count}
    <Counter/>
    <RepoList/>
    <TodoList/>
    
    </>
  )
}

export default App
