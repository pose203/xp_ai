import axios from './config'

/**
 * 用户登录
 * @param {Object} data 登录信息
 * @param {string} data.username 用户名或邮箱
 * @param {string} data.password 密码
 * @returns {Promise} 登录结果
 */
export const login = (data) => axios.post('/auth/login', data)

/**
 * 用户注册
 * @param {Object} data 注册信息
 * @param {string} data.username 用户名
 * @param {string} data.email 邮箱
 * @param {string} data.password 密码
 * @param {string} data.nickname 昵称
 * @returns {Promise} 注册结果
 */
export const register = (data) => axios.post('/auth/register', data)

/**
 * 获取当前用户信息
 * @returns {Promise} 用户信息
 */
export const getUserInfo = () => axios.get('/auth/user')

/**
 * 刷新token
 * @returns {Promise} 新的token和用户信息
 */
export const refreshToken = () => axios.post('/auth/refresh')

/**
 * 退出登录
 * @returns {Promise} 退出结果
 */
export const logout = () => {
  // 清除本地存储的token
  localStorage.removeItem('token');
  return Promise.resolve({ code: 0, message: '退出成功' });
};