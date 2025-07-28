import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5173/api'

axios.interceptors.request.use(config => {
    return config
})
// 拦截器
axios.interceptors.response.use((data) => {
    return data.data
})

export default axios