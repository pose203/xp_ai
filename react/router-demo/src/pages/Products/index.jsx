import {Outlet} from 'react-router-dom';

const Products = () => {
  return (
    <>
      <h1>Products</h1>
      {/* 二级路由的占位符 */}
      <Outlet/>
    </>
  )
}

export default Products;