const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// apia.vip API 配置
const APIA_CONFIG = {
  baseUrl: 'https://apia.vip/api/dsp',
  // 从您提供的信息中提取的API密钥和用户ID
  apiKey: '329D8FDBADD4453C2AF7A9C3059549F9A932D1B766504AB8F7',
  userId: '202037297'
};

// 构建API URL
const buildApiUrl = (videoUrl) => {
  return `${APIA_CONFIG.baseUrl}/${APIA_CONFIG.apiKey}/${APIA_CONFIG.userId}/?url=${encodeURIComponent(videoUrl)}`;
};

// 视频解析接口
app.post('/api/parse/content', async (req, res) => {
  console.log('📥 收到解析请求:', req.body);
  
  try {
    const { url } = req.body;
    
    // 验证输入
    if (!url) {
      return res.status(400).json({
        success: false,
        message: '请提供视频链接',
        data: null
      });
    }

    // 构建API请求URL
    const apiUrl = buildApiUrl(url);
    console.log('🌐 调用API:', apiUrl);

    // 调用 apia.vip API
    const response = await axios.get(apiUrl, {
      timeout: 30000, // 30秒超时
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    console.log('✅ API响应:', response.data);

    // 处理API响应
    if (response.data.code === 200 && response.data.data) {
      const apiData = response.data.data;
      
      // 转换为前端期望的格式
      const result = {
        success: true,
        message: '解析成功',
        data: {
          title: apiData.title || '未知标题',
          author: '未知作者',
          downloadUrl: apiData.url || apiData.down,
          coverUrl: apiData.photo || apiData.cover,
          duration: '未知',
          platform: detectPlatform(url),
          isDemo: false,
          originalUrl: url,
          timestamp: new Date().toISOString()
        }
      };

      return res.json(result);
    } else {
      // API返回错误
      console.log('❌ API返回错误:', response.data);
      
      // 返回演示数据作为后备
      const demoResult = generateDemoData(url);
      return res.json({
        success: true,
        message: `API解析失败(${response.data.msg || '未知错误'})，使用演示数据`,
        data: demoResult
      });
    }

  } catch (error) {
    console.error('💥 解析出错:', error.message);
    
    // 网络错误或其他异常，返回演示数据
    const demoResult = generateDemoData(req.body.url);
    
    return res.json({
      success: true,
      message: `网络请求失败，使用演示数据: ${error.message}`,
      data: demoResult
    });
  }
});

// 检测视频平台
function detectPlatform(url) {
  if (url.includes('douyin.com') || url.includes('tiktok.com')) {
    return '抖音';
  } else if (url.includes('kuaishou.com')) {
    return '快手';
  } else if (url.includes('xiaohongshu.com')) {
    return '小红书';
  } else if (url.includes('weibo.com')) {
    return '微博';
  } else if (url.includes('bilibili.com')) {
    return 'B站';
  }
  return '未知平台';
}

// 生成演示数据
function generateDemoData(url) {
  const platform = detectPlatform(url);
  const videoId = Math.random().toString(36).substr(2, 9);
  
  return {
    title: `${platform}无水印视频 - ${videoId}`,
    author: '演示用户',
    downloadUrl: `https://example.com/demo-video-${videoId}.mp4`,
    coverUrl: `https://example.com/demo-cover-${videoId}.jpg`,
    duration: '00:15',
    platform: platform,
    isDemo: true,
    originalUrl: url,
    timestamp: new Date().toISOString()
  };
}

// 健康检查接口
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: '无水印视频解析服务',
    version: '1.0.0'
  });
});

// 根路径
app.get('/', (req, res) => {
  res.json({
    message: '无水印视频解析 API 服务',
    version: '1.0.0',
    endpoints: {
      parse: 'POST /api/parse/content',
      health: 'GET /api/health'
    }
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
  console.log(`📡 API端点: http://localhost:${PORT}/api/parse/content`);
  console.log(`🔍 健康检查: http://localhost:${PORT}/api/health`);
});

module.exports = app;
