// 标准的http请求库，vue/react 都用它
import axios from 'axios';

// mock 地址
//axios.defaults.baseURL = 'http://localhost:5173';
// 线上地址有了
axios.defaults.baseURL = 'http://api.github.com/users/facebook';

export default axios;