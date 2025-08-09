// API配置检查工具
import { getAIConfig } from '@/constants/api';

/**
 * 检查API配置是否正确
 * @returns {Object} 检查结果
 */
export const checkAPIConfig = () => {
  const config = getAIConfig();
  const results = {
    volcesUrl: config.VOLCES_IMAGE_URL,
    volcesModel: config.VOLCES_MODEL,
    usingProxy: config.VOLCES_IMAGE_URL.startsWith('/api/')
  };
  
  console.log('🔍 API配置检查结果:', results);
  
  if (results.usingProxy) {
    console.log('✅ 使用代理服务器，避免CORS问题');
    console.log('💡 API密钥由代理服务器自动处理');
  } else {
    console.warn('⚠️ 未使用代理，可能遇到CORS问题');
  }
  
  return results;
};

/**
 * 测试API连接（仅检查配置，不实际调用）
 */
export const testAPIConnection = async () => {
  const config = getAIConfig();
  
  if (!config.VOLCES_API_KEY) {
    return {
      success: false,
      message: '❌ API密钥未配置，请检查环境变量 VITE_ARK_API_KEY'
    };
  }
  
  return {
    success: true,
    message: '✅ API配置已就绪，可以尝试生成头像'
  };
};