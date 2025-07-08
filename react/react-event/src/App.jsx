import { useState } from 'react'

import './App.css'

function App() {
  // react 不能直接操作DOM,性能差 高速 v8->渲染引擎
  // react 借鉴了DOM 0 行内的写法
  // 相似，学习成本 react event并不是原生事件，叫合成事件
  // onClick 不是onclick 不是字符串，而是事件函数绑定
  const handleClick = (e) => {
    // 事件模块是项目，框架的核心部分,react 性能，封装，优化
    //console.log(e)// SyntheticEvent 合成事件   
    //console.log(e.nativeEvent)// 原生事件
    // 事件代理 #root + 唯一值 合成事件
    console.log('立即访问',e.type);
    setTimeout(() => {
      console.log('延迟访问',e.type);
    }, 2000);
  
  
}

  return (
    <>
    <button onClick={handleClick}>Click</button>
    
    
    </>
  )
}

export default App
