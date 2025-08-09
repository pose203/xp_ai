import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import BlankLayout from '@/components/BlankLayout';
import { LoadingSpinner } from '@/components';
import { useUserStore } from '@/store/useUserStore';
import './App.css';

// 懒加载页面组件
const Home = lazy(() => import('@/pages/Home'));
const Discovery = lazy(() => import('@/pages/Discovery'));
const Workshop = lazy(() => import('@/pages/Workshop'));
const Me = lazy(() => import('@/pages/Profile'));
const Message = lazy(() => import('@/pages/Chat'));

const Detail = lazy(() => import('@/pages/Profile/Detail'));
const ChatDetail = lazy(() => import('@/pages/Chat/ChatDetail'));

function App() {
  const { initAuth } = useUserStore();

  useEffect(() => {
    // 应用启动时初始化认证状态
    initAuth();
  }, [initAuth]);

  return (
    <Suspense fallback={<LoadingSpinner size="large" text="页面加载中..." />}>
      <Routes>
        {/* 主要页面，带底部导航栏 */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/message" element={<Message />} />
          <Route path="/me" element={<Me />} />
        </Route>

        {/* 其他页面，不带底部导航栏 */}
        <Route element={<BlankLayout />}>
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/chat/:userId" element={<ChatDetail />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
