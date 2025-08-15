// API 配置文件
export const API_CONFIG = {
  // 是否使用真实的 Pexels API（设置为 true 使用 Pexels，false 使用 mock）
  USE_REAL_PEXELS_API: true,
  
  // 是否使用真实的 AI 服务（设置为 true 使用线上，false 使用 mock）
  USE_REAL_AI_API: true,
  
  // Pexels API 配置
  PEXELS: {
    API_KEY: import.meta.env.VITE_PEXELS_API_KEY,
    BASE_URL: 'https://api.pexels.com/v1',
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGES: 100
  },
  
  // AI API 配置
  AI: {
    // 豆包可视化模型API（用于AI好友聊天和图片分析）
    DOUBAO_API_KEY: import.meta.env.VITE_DOUBAO_API_KEY,
    DOUBAO_BASE_URL: '/api/doubao', // 使用代理路径
    DOUBAO_VISION_MODEL: 'ep-20250807102216-l5dmq', // 豆包可视化模型
    // 火山引擎图像生成API配置（用于头像生成）
          VOLCES_API_KEY: import.meta.env.VITE_ARK_API_KEY,
    VOLCES_IMAGE_URL: '/api/volces/images', // 使用代理路径避免CORS问题
    VOLCES_MODEL: 'ep-20250804203858-ft79n'
  },
  
  // Mock API 配置
  MOCK: {
    BASE_URL: '/api'
  }
};

// 导出便利方法
export const usePexelsAPI = () => API_CONFIG.USE_REAL_PEXELS_API;
export const useAIAPI = () => API_CONFIG.USE_REAL_AI_API;
export const getPexelsConfig = () => API_CONFIG.PEXELS;
export const getAIConfig = () => API_CONFIG.AI;
export const getMockConfig = () => API_CONFIG.MOCK;