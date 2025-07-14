import{
  BrowserRouter as Router, // 前端路由
  Routes, // 路由设置
  Route,  // 单条
}from 'react-router-dom'
import { useState } from 'react' 
import './App.css'
import Home from './pages/Home/index'
import About from './pages/About/index'
import UserProfile from './pages/UserProfile/index'
import Products from './pages/Products/index'
import ProductDetails from './pages/ProductDetails/index'
import NewProduct from './pages/NewProduct/index'
function App() {

  return (
    <>
      {/* 前端路由接管一切 */}
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/user/:id' element={<UserProfile/>}/>
          <Route path='/products' element={<Products/>}>
          {/* 修正路径 - 将/productId改为/products/:id */}
          <Route path='/products/:id' element={<ProductDetails/>}/>
            <Route path='new' element={<NewProduct/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App