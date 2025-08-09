// API配置常量

// Pexels API配置
export const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

// 是否使用Pexels API
export const usePexelsAPI = () => {
  return false; // 目前使用mock数据
};

// API端点
export const API_ENDPOINTS = {
  IMAGES: '/images',
  IMAGE_DETAIL: '/image/detail',
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_USER: '/auth/user',
  AUTH_REFRESH: '/auth/refresh'
};

// 默认分页参数
export const DEFAULT_PAGE_SIZE = 10;

// 图片分类
export const IMAGE_CATEGORIES = {
  RECOMMEND: 'recommend',
  PHOTOGRAPHY: 'photography', 
  LANDSCAPE: 'landscape',
  PORTRAIT: 'portrait',
  FOOD: 'food',
  PETS: 'pets',
  ART: 'art',
  LIFESTYLE: 'lifestyle'
};