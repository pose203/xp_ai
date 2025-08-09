import axios from './config'
import { getRandomImages } from './pexels';
import { usePexelsAPI } from '@/constants/api';

/**
 * 获取图片列表
 * @param {object} params - 查询参数，例如 { page: 1, pageSize: 10, category: 'recommend' }
 */
export const getImages = async (params) => {
  if (usePexelsAPI()) {
    // 使用真实的 Pexels API
    try {
      const result = await getRandomImages(params.page, params.pageSize, params.category);
      return result;
    } catch (error) {
      console.error('Pexels API failed, falling back to mock data:', error);
      // 如果 Pexels API 失败，回退到 mock 数据
      return axios.get('/images', { params })
    }
  } else {
    // 使用 mock 数据
    return axios.get('/images', { params })
  }
};
