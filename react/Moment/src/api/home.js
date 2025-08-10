import axios from './config'
import { usePexelsAPI } from '@/constants/api'
import { getRandomImages } from './pexels'

/**
 * 获取图片列表
 * @param {object} params - 查询参数，例如 { page: 1, pageSize: 10, category: 'recommend' }
 */
export const getImages = async (params) => {
  // 若开启真实 Pexels，则调用 Pexels API 并返回统一结构
  if (usePexelsAPI()) {
    const { page = 1, pageSize = 10, category = 'recommend' } = params || {};
    return await getRandomImages(page, pageSize, category);
  }
  // 否则使用本地 mock
  return axios.get('/images', { params })
};