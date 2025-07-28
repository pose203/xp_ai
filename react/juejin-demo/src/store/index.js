import { create } from 'zustand';

// 文章列表状态
export const useArticleStore = create((set) => ({
  articles: [
    {
      id: '7531639448892129334',
      title: '深入理解 JWT：结构、原理与安全隐患全解析',
      excerpt: '前言 在现代 Web 应用中，用户认证已不再局限于传统的 Session-Cookie 模型。特别是在前后端分离架构盛行、微服务广泛应用的背景下，JWT（JSON Web Token）被越来越多的系...',
      author: '帅夫帅夫',
      time: '24分钟前',
      views: 2,
      likes: 1,
      cover: null
    },
    {
      id: '7531640198423085066',
      title: '深入理解JSX：从语法糖到React的魔法转换',
      excerpt: '深入解析JSX本质，从JavaScript语法扩展到React.createElement转换原理，结合实战代码演示JSX编译过程，助你彻底掌握这个React核心特性。',
      author: '爱编程的喵',
      time: '1小时前',
      views: 4,
      likes: 1,
      cover: 'https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e20e032d988d45fbaf1ff5518c2183ff~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg54ix57yW56iL55qE5Za1:q75.awebp'
    },
    {
      id: '7531599159825711131',
      title: '移动端自适应方案：lib-flexible + postcss-pxtorem 实践指南',
      excerpt: '引言 在移动端开发中，面对各种不同尺寸的设备屏幕，如何实现完美的自适应布局一直是前端开发者需要解决的核心问题。本文将介绍一种经典的移动端适配方案：结合 lib-flexible 和 postcss-p...',
      author: '绅士玖',
      time: '3小时前',
      views: 8,
      likes: 2,
      cover: null
    },
    {
      id: '7531564066990358574',
      title: '噜噜旅游App(3)——打造个性化用户中心：AI生成头像与交互设计',
      excerpt: '引言 模块预览 在现代旅游类 App 中，提供一个功能丰富且个性化的用户中心是提升用户体验的关键。本文将详细介绍如何基于 React 和 react-vant 实现一个美观、实用的用户中心页面，并重点...',
      author: '每天开心',
      time: '3小时前',
      views: 6,
      likes: 1,
      cover: 'https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/4ca4e81e805a4a5eb9cf423127adda77~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5q-P5aSp5byA5b-D:q75.awebp'
    }
  ],
  fetchArticles: () => {
    // 这里可以添加API调用逻辑
    console.log('Fetching articles...');
  }
}));

// 用户状态
export const useUserStore = create((set) => ({
  isLoggedIn: false,
  userInfo: null,
  login: (userInfo) => set({ isLoggedIn: true, userInfo }),
  logout: () => set({ isLoggedIn: false, userInfo: null })
}));

// 分类导航状态
export const useCategoryStore = create((set) => ({
  categories: [
    { id: 'following', name: '关注', active: true },
    { id: 'recommended', name: '综合', active: false },
    { id: 'hot', name: '排行榜', active: false },
    { id: 'backend', name: '后端', active: false },
    { id: 'frontend', name: '前端', active: false },
    { id: 'android', name: 'Android', active: false },
    { id: 'ios', name: 'iOS', active: false },
    { id: 'ai', name: '人工智能', active: false }
  ],
  setActiveCategory: (id) => set((state) => ({
    categories: state.categories.map(category => ({
      ...category,
      active: category.id === id
    }))
  }))
})); 