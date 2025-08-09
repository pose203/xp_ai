import axios from 'axios';
import { API_CONFIG } from '@/constants/api';

// 获取 Pexels API 配置
const pexelsConfig = API_CONFIG.PEXELS;

// 创建 Pexels API 请求实例
const pexelsAPI = axios.create({
  baseURL: pexelsConfig.BASE_URL,
  headers: {
    'Authorization': pexelsConfig.API_KEY,
    'Content-Type': 'application/json'
  }
});

// 分类对应的搜索关键词映射
const categoryKeywords = {
  'recommend': ['photography', 'creative', 'artistic', 'beautiful', 'aesthetic', 'visual', 'composition'],
  'photography': ['photography', 'camera', 'lens', 'creative photography', 'artistic photo', 'professional photo', 'studio'],
  'landscape': ['landscape', 'nature', 'mountain', 'sunset', 'sunrise', 'valley', 'scenic', 'horizon'],
  'portrait': ['portrait', 'people', 'face', 'model', 'headshot', 'person', 'human', 'expression'],
  'food': ['food', 'cooking', 'restaurant', 'meal', 'delicious', 'cuisine', 'chef', 'ingredients'],
  'pets': ['pets', 'cat', 'dog', 'animal', 'cute animals', 'puppy', 'kitten', 'wildlife'],
  'art': ['art', 'painting', 'sculpture', 'creative', 'design', 'artwork', 'artistic', 'gallery'],
  'lifestyle': ['lifestyle', 'home', 'coffee', 'lifestyle photography', 'daily life', 'cozy', 'indoor', 'relaxation']
};

// 备用通用关键词（用于推荐或随机获取）
const generalTopics = [
  'nature', 'landscape', 'city', 'architecture', 'food', 'travel', 
  'ocean', 'mountain', 'forest', 'flowers', 'animals', 'art',
  'technology', 'coffee', 'sunset', 'beach', 'snow', 'garden',
  'street', 'vintage', 'minimal', 'abstract', 'colorful', 'photography'
];

// 根据主题生成相关的中文标题
const generateTopicTitle = (topic, photographer, category = null) => {
  // 分类对应的中文标题
  const categoryTitles = {
    'recommend': ['精选作品', '推荐佳作', '优质摄影', '精品图片', '美图推荐'],
    'photography': ['摄影作品', '镜头语言', '光影艺术', '摄影美学', '创意摄影'],
    'landscape': ['风景如画', '壮丽山河', '美丽风光', '诗意山水', '自然景观'],
    'portrait': ['人像摄影', '肖像艺术', '人物写真', '表情捕捉', '人文摄影'],
    'food': ['美食摄影', '舌尖记忆', '料理艺术', '美味瞬间', '食物美学'],
    'pets': ['萌宠时光', '可爱瞬间', '动物摄影', '毛孩子', '宠物写真'],
    'art': ['艺术创作', '创意视界', '美的探索', '艺术瞬间', '设计美学'],
    'lifestyle': ['生活美学', '日常记录', '生活方式', '惬意时光', '居家美好']
  };
  
  // 主题关键词对应的标题（兼容旧逻辑）
  const topicTitles = {
    'nature': ['自然之美', '绿意盎然', '大自然的馈赠', '生机勃勃'],
    'landscape': ['风景如画', '壮丽山河', '美丽风光', '诗意山水'],
    'city': ['城市印象', '都市风情', '繁华都市', '城市光影'],
    'architecture': ['建筑之美', '设计美学', '空间艺术', '建筑摄影'],
    'food': ['美食时光', '舌尖记忆', '料理艺术', '美味瞬间'],
    'travel': ['旅行记录', '远方故事', '旅途印象', '行走天下'],
    'ocean': ['海洋之歌', '蓝色梦想', '海天一色', '波光粼粼'],
    'mountain': ['巍峨山峦', '高山仰止', '云雾缭绕', '山水相依'],
    'forest': ['森林秘境', '绿野仙踪', '林间漫步', '自然氧吧'],
    'flowers': ['花开时节', '芬芳世界', '花语心情', '绽放瞬间'],
    'animals': ['动物世界', '生灵之美', '自然精灵', '野生动物'],
    'art': ['艺术美学', '创意视界', '美的探索', '艺术瞬间'],
    'pets': ['萌宠时光', '可爱瞬间', '动物世界', '毛孩子'],
    'photography': ['摄影作品', '镜头语言', '光影艺术', '创意摄影'],
    'portrait': ['人像摄影', '肖像艺术', '人物写真', '表情捕捉'],
    'lifestyle': ['生活美学', '日常记录', '生活方式', '惬意时光'],
    'default': ['光影瞬间', '美好时刻', '视觉记录', '摄影作品']
  };
  
  // 优先使用分类标题，其次使用主题标题
  let titles;
  if (category && categoryTitles[category]) {
    titles = categoryTitles[category];
  } else {
    titles = topicTitles[topic] || topicTitles['default'];
  }
  
  return titles[Math.floor(Math.random() * titles.length)];
};

export const getRandomImages = async (page = 1, pageSize = 10, category = 'recommend') => {
  try {
    const images = [];
    const usedPhotoIds = new Set(); // 用于防止重复
    
    // 根据分类获取对应的关键词
    let keywordsToUse;
    if (category && categoryKeywords[category]) {
      keywordsToUse = categoryKeywords[category];
    } else {
      // 如果分类不存在，使用通用关键词
      keywordsToUse = generalTopics;
    }
    
    // 为了获得真正的随机效果，我们从不同主题获取图片
    let attempts = 0;
    const maxAttempts = pageSize * 3; // 最大尝试次数，防止无限循环
    
    while (images.length < pageSize && attempts < maxAttempts) {
      const randomTopic = keywordsToUse[Math.floor(Math.random() * keywordsToUse.length)];
      const randomPage = Math.floor(Math.random() * 5) + 1; // 随机选择前5页
      
      const response = await pexelsAPI.get('/search', {
        params: {
          query: randomTopic,
          page: randomPage,
          per_page: 15,
          orientation: 'all'
        }
      });
      
      if (response.data.photos && response.data.photos.length > 0) {
        const randomIndex = Math.floor(Math.random() * response.data.photos.length);
        const photo = response.data.photos[randomIndex];
        
        // 检查是否已经使用过这张图片
        if (!usedPhotoIds.has(photo.id)) {
          usedPhotoIds.add(photo.id);
          
          // 转换为我们的数据格式
          const imageData = {
            id: `pexels-${photo.id}`,
            url: photo.src.large,
            originalUrl: photo.url,
            width: photo.width,
            height: photo.height,
            title: generateTopicTitle(randomTopic, photo.photographer, category),
            topic: randomTopic,
            category: category, // 添加分类信息
            author: {
              id: `photographer-${photo.photographer.replace(/\s+/g, '-').toLowerCase()}`,
              name: photo.photographer,
              avatar: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000) + 100000}/pexels-photo-${Math.floor(Math.random() * 1000000) + 100000}.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop&crop=face`
            },
            alt: photo.alt || '精美摄影作品',
            avgColor: photo.avg_color
          };
          
          images.push(imageData);
        }
      }
      
      attempts++;
    }
    
    return {
      code: 0,
      message: 'Success',
      data: {
        list: images,
        page,
        pageSize,
        total: 1000, // Pexels 有大量图片，设置一个较大的总数
        hasMore: page < 100 // 允许翻页到100页
      }
    };
  } catch (error) {
    console.error('Pexels API Error:', error);
    // 如果 API 调用失败，返回错误信息
    return {
      code: -1,
      message: 'Failed to fetch images from Pexels',
      data: {
        list: [],
        page,
        pageSize,
        total: 0,
        hasMore: false
      },
      error: error.message
    };
  }
};


export const searchImages = async (query, page = 1, pageSize = 15) => {
  try {
    const response = await pexelsAPI.get('/search', {
      params: {
        query,
        page,
        per_page: pageSize,
        orientation: 'all'
      }
    });
    
    if (response.data.photos) {
      const images = response.data.photos.map(photo => ({
        id: `pexels-${photo.id}`,
        url: photo.src.large,
        originalUrl: photo.url,
        width: photo.width,
        height: photo.height,
        title: generateTopicTitle(query, photo.photographer),
        topic: query,
        author: {
          id: `photographer-${photo.photographer.replace(/\s+/g, '-').toLowerCase()}`,
          name: photo.photographer,
          avatar: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000) + 100000}/pexels-photo-${Math.floor(Math.random() * 1000000) + 100000}.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop&crop=face`
        },
        alt: photo.alt || '精美摄影作品',
        avgColor: photo.avg_color
      }));
      
      return {
        code: 0,
        message: 'Success',
        data: {
          list: images,
          page,
          pageSize,
          total: response.data.total_results,
          hasMore: page * pageSize < response.data.total_results
        }
      };
    }
    
    return {
      code: 0,
      message: 'No images found',
      data: {
        list: [],
        page,
        pageSize,
        total: 0,
        hasMore: false
      }
    };
  } catch (error) {
    console.error('Pexels Search API Error:', error);
    return {
      code: -1,
      message: 'Failed to search images',
      data: {
        list: [],
        page,
        pageSize,
        total: 0,
        hasMore: false
      },
      error: error.message
    };
  }
};


export const getImageDetail = async (id) => {
  try {
    // 从ID中提取Pexels图片ID
    const pexelsId = id.toString().replace('pexels-', '');
    
    const response = await pexelsAPI.get(`/photos/${pexelsId}`);
    
    if (response.data) {
      const photo = response.data;
      
      // 生成一些模拟的详情数据
      const topics = ['摄影', '艺术', '美学', '视觉', '创作'];
      const comments = [
        '拍得真棒！构图很有感觉 ✨',
        '这张照片的光线处理得很好',
        '喜欢这种风格，收藏了！',
        '摄影技术很赞，点赞支持 👍',
        '构图很棒，色彩搭配也很和谐',
        '很有艺术感的一张照片',
        '分享得很棒，期待更多作品！'
      ];
      
      const detailData = {
        id: `pexels-${photo.id}`,
        url: photo.src.large,
        originalUrl: photo.url,
        width: photo.width,
        height: photo.height,
        title: generateTopicTitle('photography', photo.photographer, 'photography'),
        content: `这是一张由 ${photo.photographer} 拍摄的精美作品。${photo.alt || '这张照片展现了独特的艺术美感，无论是构图还是色彩运用都恰到好处。'}摄影师通过专业的技巧和独特的视角，捕捉到了这个美好的瞬间，为观者带来了视觉享受。`,
        author: {
          id: `photographer-${photo.photographer.replace(/\s+/g, '-').toLowerCase()}`,
          name: photo.photographer,
          avatar: (() => {
            const avatarIds = [91227, 697509, 1239291, 762020, 1043471, 1674752, 1040881, 2379004, 1845534, 428321, 1130626, 1300402, 2589653, 1036622, 1065084];
            const randomIndex = Math.floor(Math.random() * avatarIds.length);
            const avatarId = avatarIds[randomIndex];
            return `https://images.pexels.com/photos/${avatarId}/pexels-photo-${avatarId}.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop&crop=face`;
          })()
        },
        tags: topics.slice(0, Math.floor(Math.random() * 3) + 2),
        likes: Math.floor(Math.random() * 9000) + 1000,
        views: Math.floor(Math.random() * 40000) + 10000,
        comments: Array.from({ length: Math.floor(Math.random() * 4) + 3 }, () => ({
          id: `comment-${Math.random().toString(36).substr(2, 9)}`,
          user: `用户${Math.floor(Math.random() * 1000)}`,
          avatar: (() => {
            const avatarIds = [91227, 697509, 1239291, 762020, 1043471, 1674752, 1040881, 2379004, 1845534, 428321, 1130626, 1300402, 2589653, 1036622, 1065084];
            const randomIndex = Math.floor(Math.random() * avatarIds.length);
            const avatarId = avatarIds[randomIndex];
            return `https://images.pexels.com/photos/${avatarId}/pexels-photo-${avatarId}.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop&crop=face`;
          })(),
          text: comments[Math.floor(Math.random() * comments.length)],
          time: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16).replace('T', ' ')
        })),
        alt: photo.alt || '精美摄影作品',
        avgColor: photo.avg_color,
        photographer: photo.photographer,
        photographerUrl: photo.photographer_url
      };
      
      return {
        code: 0,
        message: 'Success',
        data: detailData
      };
    }
    
    return {
      code: 404,
      message: 'Image not found',
      data: null
    };
  } catch (error) {
    console.error('Pexels Detail API Error:', error);
    return {
      code: -1,
      message: 'Failed to get image detail',
      data: null,
      error: error.message
    };
  }
};