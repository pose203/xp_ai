import { useState } from 'react'
import './App.css'

import AnotherButton from './components/AnotherButton'
// import 会运行 路由懒加载
import Button from './components/Button'

function App() {
  

  return (
    <>
    <Button/>
    <AnotherButton/>
    </>
  )
}

export default App
