import axios from 'axios';

// 创建axios实例
const request = axios.create({
  baseURL: '/api', // 基础URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 从localStorage获取token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data;
    // 根据自定义状态码判断请求是否成功
    if (res.code !== 200) {
      // 处理错误
      console.error(res.message || 'Error');
      
      // 401: 未登录或token过期
      if (res.code === 401) {
        // 清除token并跳转到登录页
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    console.error('Request error: ', error);
    return Promise.reject(error);
  }
);

export default request; 