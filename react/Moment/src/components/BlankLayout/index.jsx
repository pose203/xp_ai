import { Outlet } from 'react-router-dom';
// “空白布局”组件，专用于 React Router 的嵌套路由承载容器。
const BlankLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default BlankLayout;
