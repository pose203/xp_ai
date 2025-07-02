import { useState } from 'react'
import PictureCard from './components/PictureCard'
import './App.css'

function App() {
  
  
  return (
    // jsx react 优势 方便写HTML模板
    <>
    <div className = "container">
      {/* 自定义组件 子组件  */}
      {/* 组件 html、css、js 沙子一样，组合起来，图片上传功能  */}
      {/* 模块化，复用，页面由DOM 树->组件树 */}
      <PictureCard/> 
    </div>
      
    </>
  )
}


export default App
