// AI头像生成工具 - 使用火山引擎API
import { useAIAPI, getAIConfig } from '@/constants/api';

// Mock头像列表（用于回退）
const mockAvatars = [
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop&crop=face',
  'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop&crop=face',
  'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop&crop=face',
  'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop&crop=face',
  'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop&crop=face',
  'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop&crop=face'
];

/**
 * 根据用户信息生成头像提示词
 * @param {Object} userInfo - 用户信息
 * @returns {string} - 生成的提示词
 */
export const generatePersonalizedPrompt = (userInfo) => {
  const { nickname, signature } = userInfo;
  
  // 构建基础描述
  let prompt = '个性化头像设计';
  
  if (nickname) {
    prompt += `，用户名：${nickname}`;
  }
  
  if (signature && signature.trim()) {
    prompt += `，个性签名：${signature}`;
  }
  
  // 添加设计要求
  prompt += '，要求：现代时尚风格，有个性，有设计感，适合社交平台头像，高质量渲染';
  
  return prompt;
};

/**
 * 使用火山引擎API生成头像
 * @param {string} prompt - 头像描述提示词
 * @returns {Promise<{status: number, avatar?: string, msg?: string}>}
 */
export const generateAvatar = async (prompt) => {
  if (!useAIAPI()) {
    // Mock模式
    await new Promise(resolve => setTimeout(resolve, 2000));
    const randomAvatar = mockAvatars[Math.floor(Math.random() * mockAvatars.length)];
    return {
      status: 0,
      avatar: randomAvatar,
      msg: 'Mock头像生成成功'
    };
  }

  try {
    const config = getAIConfig();
    
    if (!config.VOLCES_API_KEY) {
      throw new Error('火山引擎API密钥未配置');
    }

    console.log('使用火山引擎生成头像，提示词:', prompt);

    const response = await fetch(config.VOLCES_IMAGE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // Authorization头由代理服务器自动添加，避免CORS问题
      },
      body: JSON.stringify({
        model: config.VOLCES_MODEL,
        prompt: prompt,
        response_format: 'url',
        size: '1024x1024',
        guidance_scale: 3,
        watermark: true
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`火山引擎API调用失败: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // 火山引擎API返回格式处理
    if (data.data && data.data.length > 0 && data.data[0].url) {
      return {
        status: 0,
        avatar: data.data[0].url,
        msg: '头像生成成功'
      };
    } else {
      throw new Error('API返回数据格式异常');
    }
  } catch (error) {
    console.error('火山引擎头像生成失败:', error);
    
    // 失败时回退到Mock
    const randomAvatar = mockAvatars[Math.floor(Math.random() * mockAvatars.length)];
    return {
      status: 500,
      avatar: randomAvatar,
      msg: `头像生成失败: ${error.message}，使用默认头像`
    };
  }
};