import axios from './config'
import { getImageDetail as getPexelsImageDetail } from './pexels';
import { usePexelsAPI } from '@/constants/api';

/**
 * 根据 ID 获取图片详情
 * @param {string} id - 图片的ID
 */
export const getImageDetail = async (id) => {
  // 检查是否是 Pexels 格式的 ID
  const isPexelsId = id.toString().startsWith('pexels-');
  
  if (usePexelsAPI() && isPexelsId) {
    // 使用真实的 Pexels API
    try {
      const result = await getPexelsImageDetail(id);
      return result;
    } catch (error) {
      console.error('Pexels Detail API failed, falling back to mock data:', error);
      // 如果 Pexels API 失败，回退到 mock 数据
      return axios.get('/image/detail', { params: { id } })
    }
  } else {
    // 使用 mock 数据
    return axios.get('/image/detail', { params: { id } })
  }
};
