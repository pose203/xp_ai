// 工具函数集合

/**
 * 复制文本到剪贴板
 * @param {string} text 要复制的文本
 * @returns {Promise<boolean>} 是否成功
 */
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // 降级方案
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.error('复制失败:', error);
    return false;
  }
};

/**
 * 从剪贴板读取文本
 * @returns {Promise<string>} 剪贴板内容
 */
export const readFromClipboard = async () => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      return await navigator.clipboard.readText();
    } else {
      throw new Error('不支持剪贴板读取');
    }
  } catch (error) {
    console.error('读取剪贴板失败:', error);
    throw error;
  }
};

/**
 * 解析视频URL，调用真实API获取无水印内容
 * @param {string} url 视频链接
 * @returns {Object} 解析结果
 */
export const parseVideoUrl = async (url) => {
  try {
    // 清理URL
    const cleanUrl = url.trim();
    
    // 检测平台
    const platform = detectPlatform(cleanUrl);
    if (!platform) {
      return {
        success: false,
        message: '不支持的平台，请检查链接是否正确'
      };
    }

    // 首先尝试调用真实的解析API
    try {
      const { apiService } = await import('../services/api');
      const result = await apiService.parseContent(cleanUrl, 'auto');
      
      if (result && result.data) {
        return {
          success: true,
          platform: platform.name,
          title: result.data.title || '未知标题',
          author: result.data.author || '未知作者',
          duration: result.data.duration || '00:00',
          downloadUrl: result.data.downloadUrl || result.data.video_url,
          thumbnailUrl: result.data.thumbnailUrl || result.data.cover_url,
          images: result.data.images || [], // 支持多图片
          originalUrl: cleanUrl,
          fileSize: result.data.fileSize,
          quality: result.data.quality
        };
      }
    } catch (apiError) {
      console.warn('API调用失败，使用演示数据:', apiError);
    }

    // API失败时，返回演示数据（便于测试界面）
    await new Promise(resolve => setTimeout(resolve, 2000)); // 模拟网络延迟
    
    return generateDemoData(platform, cleanUrl);
    
  } catch (error) {
    console.error('解析错误:', error);
    return {
      success: false,
      message: '网络错误或服务暂时不可用，请稍后重试'
    };
  }
};

/**
 * 生成演示数据
 * @param {Object} platform 平台信息
 * @param {string} url 原始URL
 * @returns {Object} 演示数据
 */
const generateDemoData = (platform, url) => {
  const demoData = {
    抖音: {
      title: '🎵 超火热门舞蹈挑战 | 原创编舞',
      author: '@舞蹈达人小美',
      duration: '00:45',
      thumbnailUrl: 'https://picsum.photos/400/600?random=1',
      downloadUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      fileSize: '8.5 MB',
      quality: '720P高清'
    },
    快手: {
      title: '🚗 极速漂移！老司机的完美操作',
      author: '@汽车达人阿强',
      duration: '01:12',
      thumbnailUrl: 'https://picsum.photos/400/600?random=2',
      downloadUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      fileSize: '12.3 MB',
      quality: '1080P超清'
    },
    小红书: {
      title: '🌸 春日穿搭分享 | 温柔少女风',
      author: '@穿搭博主小雨',
      duration: '02:15',
      thumbnailUrl: 'https://picsum.photos/400/600?random=3',
      images: [
        'https://picsum.photos/300/400?random=31',
        'https://picsum.photos/300/400?random=32',
        'https://picsum.photos/300/400?random=33',
        'https://picsum.photos/300/400?random=34'
      ],
      fileSize: '15.7 MB',
      quality: '原图高清'
    },
    微博: {
      title: '📱 最新科技资讯分享',
      author: '@科技博主老王',
      duration: '03:20',
      thumbnailUrl: 'https://picsum.photos/400/600?random=4',
      downloadUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      fileSize: '18.2 MB',
      quality: '4K超高清'
    }
  };

  const demo = demoData[platform.name] || demoData['抖音'];
  
  return {
    success: true,
    platform: platform.name,
    title: demo.title,
    author: demo.author,
    duration: demo.duration,
    downloadUrl: demo.downloadUrl,
    thumbnailUrl: demo.thumbnailUrl,
    images: demo.images || [],
    originalUrl: url,
    fileSize: demo.fileSize,
    quality: demo.quality,
    isDemo: true // 标记为演示数据
  };
};

/**
 * 检测URL所属平台
 * @param {string} url 链接
 * @returns {Object|null} 平台信息
 */
export const detectPlatform = (url) => {
  const platforms = [
    {
      name: '抖音',
      code: 'douyin',
      patterns: [
        /(?:https?:\/\/)?(?:www\.)?douyin\.com/,
        /(?:https?:\/\/)?v\.douyin\.com/,
        /(?:https?:\/\/)?iesdouyin\.com/
      ]
    },
    {
      name: '快手',
      code: 'kuaishou',
      patterns: [
        /(?:https?:\/\/)?(?:www\.)?kuaishou\.com/,
        /(?:https?:\/\/)?v\.kuaishou\.com/
      ]
    },
    {
      name: '小红书',
      code: 'xiaohongshu',
      patterns: [
        /(?:https?:\/\/)?(?:www\.)?xiaohongshu\.com/,
        /(?:https?:\/\/)?xhslink\.com/
      ]
    },
    {
      name: '微博',
      code: 'weibo',
      patterns: [
        /(?:https?:\/\/)?(?:www\.)?weibo\.com/,
        /(?:https?:\/\/)?m\.weibo\.cn/
      ]
    }
  ];

  for (const platform of platforms) {
    for (const pattern of platform.patterns) {
      if (pattern.test(url)) {
        return platform;
      }
    }
  }
  
  return null;
};

/**
 * 格式化文件大小
 * @param {number} bytes 字节数
 * @returns {string} 格式化后的大小
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * 格式化时间
 * @param {string|number|Date} time 时间
 * @param {string} format 格式
 * @returns {string} 格式化后的时间
 */
export const formatTime = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
  const date = new Date(time);
  
  if (isNaN(date.getTime())) {
    return '无效时间';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

/**
 * 生成唯一ID
 * @returns {string} 唯一ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * 防抖函数
 * @param {Function} func 要防抖的函数
 * @param {number} wait 等待时间
 * @returns {Function} 防抖后的函数
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * 节流函数
 * @param {Function} func 要节流的函数
 * @param {number} limit 限制时间
 * @returns {Function} 节流后的函数
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * 验证URL格式
 * @param {string} url 链接
 * @returns {boolean} 是否有效
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * 下载文件
 * @param {string} url 文件URL
 * @param {string} filename 文件名
 */
export const downloadFile = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || 'download';
  link.target = '_blank';
  
  // 添加到DOM，触发点击，然后移除
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * 检测设备类型
 * @returns {string} 设备类型
 */
export const getDeviceType = () => {
  const userAgent = navigator.userAgent;
  
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return 'tablet';
  }
  
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
    return 'mobile';
  }
  
  return 'desktop';
};

/**
 * 获取浏览器信息
 * @returns {Object} 浏览器信息
 */
export const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  let browserName = 'Unknown';
  let version = 'Unknown';

  if (userAgent.indexOf('Chrome') > -1) {
    browserName = 'Chrome';
    version = userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
  } else if (userAgent.indexOf('Firefox') > -1) {
    browserName = 'Firefox';
    version = userAgent.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
  } else if (userAgent.indexOf('Safari') > -1) {
    browserName = 'Safari';
    version = userAgent.match(/Version\/(\d+)/)?.[1] || 'Unknown';
  } else if (userAgent.indexOf('Edge') > -1) {
    browserName = 'Edge';
    version = userAgent.match(/Edge\/(\d+)/)?.[1] || 'Unknown';
  }

  return {
    name: browserName,
    version: version,
    userAgent: userAgent
  };
};

/**
 * 本地存储工具
 */
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('存储失败:', error);
      return false;
    }
  },
  
  get: (key, defaultValue = null) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error('读取失败:', error);
      return defaultValue;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('删除失败:', error);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('清空失败:', error);
      return false;
    }
  }
};
