import axios from 'axios';
import { message } from 'antd';

// 创建axios实例
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加token等认证信息
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 添加用户ID
    const userId = localStorage.getItem('user_id');
    if (userId) {
      config.headers['X-User-ID'] = userId;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    const { data } = response;
    
    // 统一处理响应格式
    if (data.success || data.code === 200) {
      return data;
    } else {
      // 处理业务错误
      const errorMessage = data.message || data.msg || '请求失败';
      console.warn('API响应错误:', errorMessage);
      // 不显示错误消息，让上层组件处理
      return data; // 返回原始数据，让组件决定如何处理
    }
  },
  (error) => {
    // 处理HTTP错误
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          message.error('登录已过期，请重新登录');
          // 清除本地存储的认证信息
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
          // 可以跳转到登录页面
          break;
        case 403:
          message.error('权限不足');
          break;
        case 404:
          message.error('请求的资源不存在');
          break;
        case 500:
          message.error('服务器内部错误');
          break;
        default:
          message.error(data?.message || '网络错误，请稍后重试');
      }
    } else if (error.request) {
      message.error('网络连接失败，请检查网络设置');
    } else {
      message.error('请求配置错误');
    }
    
    return Promise.reject(error);
  }
);

// API服务类
export class ApiService {
  /**
   * 用户登录
   * @param {string} code 登录凭证
   * @param {string} refereeId 推荐人ID
   */
  async login(code, refereeId = '') {
    return api.post('/user/login', { code, referee_id: refereeId });
  }

  /**
   * 获取用户信息
   */
  async getUserInfo() {
    return api.get('/user/detail');
  }

  /**
   * 更新用户信息
   * @param {Object} userInfo 用户信息
   */
  async updateUserInfo(userInfo) {
    return api.post('/user/upInfo', userInfo);
  }

  /**
   * 解析视频/图片链接
   * @param {string} url 链接地址
   * @param {string} type 类型 video/image
   */
  async parseContent(url, type = 'auto') {
    return api.post('/parse/content', { url, type });
  }

  /**
   * 批量解析用户主页内容
   * @param {string} profileUrl 用户主页链接
   */
  async batchParse(profileUrl) {
    return api.post('/parse/batch', { profile_url: profileUrl });
  }

  /**
   * 获取解析记录
   * @param {number} page 页码
   * @param {number} limit 每页数量
   */
  async getParseHistory(page = 1, limit = 20) {
    return api.get('/user/parse-history', { params: { page, limit } });
  }

  /**
   * 获取系统配置
   */
  async getSystemConfig() {
    return api.get('/system/config');
  }

  /**
   * 获取任务列表
   */
  async getTasks() {
    return api.get('/user/tasks');
  }

  /**
   * 完成任务
   * @param {string} taskType 任务类型
   * @param {Object} taskData 任务数据
   */
  async completeTask(taskType, taskData = {}) {
    return api.post('/user/task/complete', { type: taskType, data: taskData });
  }

  /**
   * 用户签到
   */
  async checkIn() {
    return api.post('/user/checkin');
  }

  /**
   * 观看广告获得奖励
   * @param {string} adType 广告类型
   */
  async watchAd(adType = 'reward') {
    return api.post('/user/watch-ad', { ad_type: adType });
  }

  /**
   * 获取VIP信息
   */
  async getVipInfo() {
    return api.get('/user/vip-info');
  }

  /**
   * 使用卡密
   * @param {string} code 卡密
   */
  async useCode(code) {
    return api.post('/user/use-code', { code });
  }

  /**
   * 上传文件
   * @param {File} file 文件对象
   * @param {Function} onProgress 进度回调
   */
  async uploadFile(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);
    
    return api.post('/upload/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
  }

  /**
   * 获取统计数据
   */
  async getStats() {
    return api.get('/user/stats');
  }

  /**
   * 分享应用
   * @param {string} platform 分享平台
   */
  async shareApp(platform = 'wechat') {
    return api.post('/user/share', { platform });
  }

  /**
   * 邀请用户
   * @param {string} inviteCode 邀请码
   */
  async invite(inviteCode) {
    return api.post('/user/invite', { invite_code: inviteCode });
  }

  /**
   * 获取邀请记录
   */
  async getInviteHistory() {
    return api.get('/user/invite-history');
  }

  /**
   * 反馈问题
   * @param {Object} feedback 反馈内容
   */
  async submitFeedback(feedback) {
    return api.post('/feedback/submit', feedback);
  }

  /**
   * 获取常见问题
   */
  async getFAQ() {
    return api.get('/help/faq');
  }

  /**
   * 获取公告列表
   */
  async getAnnouncements() {
    return api.get('/system/announcements');
  }

  /**
   * 检查应用更新
   */
  async checkUpdate() {
    return api.get('/system/check-update');
  }
}

// 创建API服务实例
export const apiService = new ApiService();

// 导出常用的HTTP方法
export const get = (url, config) => api.get(url, config);
export const post = (url, data, config) => api.post(url, data, config);
export const put = (url, data, config) => api.put(url, data, config);
export const del = (url, config) => api.delete(url, config);

// 导出默认实例
export default api;
