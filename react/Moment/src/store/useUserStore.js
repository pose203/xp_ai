import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as loginAPI, register as registerAPI, getUserInfo, logout as logoutAPI } from '../api/auth';

export const useUserStore = create(
  persist(
    (set, get) => ({
      // 用户状态
      isLoggedIn: false,
      token: localStorage.getItem('token') || null,
      userInfo: null,
      loading: false,
      error: null,

      // 登录操作
      login: async (credentials) => {
        try {
          set({ loading: true, error: null });
          
          const response = await loginAPI(credentials);
          const { token, user } = response.data;
          
          // 保存token到localStorage
          localStorage.setItem('token', token);
          
          set({
            isLoggedIn: true,
            token,
            userInfo: user,
            loading: false,
            error: null
          });
          
          return { success: true, message: response.message };
        } catch (error) {
          set({ 
            loading: false, 
            error: error.message || '登录失败'
          });
          return { success: false, message: error.message || '登录失败' };
        }
      },

      // 注册操作
      register: async (userData) => {
        try {
          set({ loading: true, error: null });
          
          const response = await registerAPI(userData);
          const { token, user } = response.data;
          
          // 保存token到localStorage
          localStorage.setItem('token', token);
          
          set({
            isLoggedIn: true,
            token,
            userInfo: user,
            loading: false,
            error: null
          });
          
          return { success: true, message: response.message };
        } catch (error) {
          set({ 
            loading: false, 
            error: error.message || '注册失败'
          });
          return { success: false, message: error.message || '注册失败' };
        }
      },

      // 登出操作
      logout: async () => {
        try {
          await logoutAPI();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          // 清除本地状态
          localStorage.removeItem('token');
          set({
            isLoggedIn: false,
            token: null,
            userInfo: null,
            error: null
          });
        }
      },

      // 获取用户信息
      fetchUserInfo: async () => {
        try {
          set({ loading: true, error: null });
          
          const response = await getUserInfo();
          
          set({
            userInfo: response.data,
            isLoggedIn: true,
            loading: false
          });
          
          return { success: true, data: response.data };
        } catch (error) {
          // 如果获取用户信息失败，说明token无效，清除登录状态
          localStorage.removeItem('token');
          set({
            isLoggedIn: false,
            token: null,
            userInfo: null,
            loading: false,
            error: error.message
          });
          return { success: false, message: error.message };
        }
      },

      // 初始化认证状态
      initAuth: async () => {
        const token = localStorage.getItem('token');
        if (token) {
          set({ token });
          // 尝试获取用户信息验证token是否有效
          await get().fetchUserInfo();
        }
      },

      // 更新用户信息
      updateUserInfo: (updates) => {
        set({
          userInfo: {
            ...get().userInfo,
            ...updates
          }
        });
      }
    }),
    {
      name: 'user-storage', // localStorage key
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        token: state.token,
        userInfo: state.userInfo
      })
    }
  )
);