import axios from './config'

/**
 * 获取图片列表
 * @param {object} params - 查询参数，例如 { page: 1, pageSize: 10, category: 'recommend' }
 */
export const getImages = async (params) => {
  // 使用 mock 数据
  return axios.get('/images', { params })
};