import axios from 'axios';

const service = axios.create({
  // 在开发环境中，我们的 mock API 与前端在同一个域，所以 baseURL 设置为 / 即可
  baseURL: '/', 
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 添加 JWT token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 确保请求URL有正确的前缀
    if (config.url && !config.url.startsWith('/api/') && !config.url.startsWith('http')) {
      config.url = `/api${config.url}`;
    }
    
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 统一的响应处理
    if (res.code !== 0) {
      // 如果是401错误，说明token过期或无效，清除本地token
      if (res.code === 401) {
        localStorage.removeItem('token');
        // 可以在这里触发跳转到登录页
        window.location.href = '/login';
      }
      
      console.error('API Error:', res.message || 'Error');
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    // 处理网络错误等
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

export default service;
