import {
    createRouter,
    createWebHistory
  } from 'vue-router';
  
import type { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store/user';
  
const routes: RouteRecordRaw[] = [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        requireAuth: true
      }
    }
  ]
  
const router = createRouter({
    history: createWebHistory(),
    routes
})
  
// 路由守卫
router.beforeEach((to, from, next) => {
    console.log('路过。。。');
    const UserStore = useUserStore();
    if(to.meta.requireAuth && !UserStore.isLogin){
        next('/login');
    } else {
        next();
    }
})


export default router