import axios from 'axios'

// 集中化配置：使用相对路径，避免主机/端口不一致导致的跨域或拦截失效
axios.defaults.baseURL = '/api'

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