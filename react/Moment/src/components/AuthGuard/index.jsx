import { useEffect } from 'react';
import { useUserStore } from '../../store/useUserStore';
import LoadingSpinner from '../LoadingSpinner';

/**
 * 认证守卫组件
 * 用于保护需要登录的路由
 */
const AuthGuard = ({ children, fallback = null }) => {
  const { isLoggedIn, token, loading, initAuth, fetchUserInfo } = useUserStore();

  useEffect(() => {
    // 如果有token但用户信息为空，尝试获取用户信息
    if (token && !isLoggedIn) {
      initAuth();
    }
  }, [token, isLoggedIn, initAuth]);

  // 正在加载中
  if (loading) {
    return <LoadingSpinner size="large" text="验证登录状态..." />;
  }

  // 未登录，显示fallback内容
  if (!isLoggedIn) {
    return fallback;
  }

  // 已登录，显示子组件
  return children;
};

export default AuthGuard;