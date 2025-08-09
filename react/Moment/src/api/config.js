import axios from 'axios'

// 集中化配置
axios.defaults.baseURL = 'http://localhost:5173/api'

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 统一返回后端的 data（保持现有调用方期望：包含 code/message/data）
axios.interceptors.response.use((response) => {
  return response.data
})

export default axios