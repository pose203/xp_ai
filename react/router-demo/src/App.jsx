import{
  BrowserRouter as Router, // 前端路由
  Routes, // 路由设置
  Route,  // 单条
}from 'react-router-dom'
import { useState } from 'react' 
import './App.css'
import Home from './pages/Home/index'
import About from './pages/About/index'
function App() {

  return (
    <>
      {/* 前端路由接管一切 */}
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App