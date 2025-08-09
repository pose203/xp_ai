import Mock from 'mockjs';

// 分类相关的数据 - 更新为图片分享应用的分类
const categoryData = {
  recommend: {
    titles: ['精选作品', '推荐佳作', '优质摄影', '精品图片', '美图推荐', '编辑精选'],
    authors: ['优质创作者', '推荐摄影师', '精选作者', '热门创作者', '内容创作者', '优秀摄影师'],
    categories: ['推荐', '精选', '优质', '热门', '创作', '摄影'],
    isVideo: false
  },
  photography: {
    titles: ['摄影作品', '镜头语言', '光影艺术', '摄影美学', '创意摄影', '专业摄影'],
    authors: ['专业摄影师', '摄影爱好者', '器材党', '光影大师', '创意摄影师', '摄影达人'],
    categories: ['摄影', '镜头', '光影', '创意', '器材', '技巧'],
    isVideo: false
  },
  landscape: {
    titles: ['风景如画', '壮丽山河', '美丽风光', '诗意山水', '自然景观', '户外摄影'],
    authors: ['风光摄影师', '旅行摄影师', '自然爱好者', '户外达人', '风景画家', '地理摄影师'],
    categories: ['风景', '自然', '山水', '户外', '旅行', '地理'],
    isVideo: false
  },
  portrait: {
    titles: ['人像摄影', '肖像艺术', '人物写真', '表情捕捉', '人文摄影', '时尚摄影'],
    authors: ['人像摄影师', '写真摄影师', '时尚摄影师', '肖像画家', '人文摄影师', '婚纱摄影师'],
    categories: ['人像', '肖像', '写真', '人文', '时尚', '表情'],
    isVideo: false
  },
  food: {
    titles: ['美食摄影', '舌尖记忆', '料理艺术', '美味瞬间', '食物美学', '餐桌摄影'],
    authors: ['美食摄影师', '料理达人', '美食博主', '餐厅摄影师', '烘焙师', '美食家'],
    categories: ['美食', '料理', '烘焙', '餐厅', '食物', '美味'],
    isVideo: false
  },
  pets: {
    titles: ['萌宠时光', '可爱瞬间', '动物摄影', '毛孩子', '宠物写真', '动物世界'],
    authors: ['宠物摄影师', '动物爱好者', '铲屎官', '宠物博主', '动物摄影师', '宠物达人'],
    categories: ['宠物', '动物', '萌宠', '可爱', '毛孩子', '写真'],
    isVideo: false
  },
  art: {
    titles: ['艺术创作', '创意视界', '美的探索', '艺术瞬间', '设计美学', '创意作品'],
    authors: ['艺术家', '设计师', '创意工作者', '视觉设计师', '艺术爱好者', '创作者'],
    categories: ['艺术', '设计', '创意', '美学', '视觉', '作品'],
    isVideo: false
  },
  lifestyle: {
    titles: ['生活美学', '日常记录', '生活方式', '惬意时光', '居家美好', '生活摄影'],
    authors: ['生活博主', '生活摄影师', '居家达人', '生活美学家', '日常记录者', '生活家'],
    categories: ['生活', '日常', '居家', '美学', '记录', '方式'],
    isVideo: false
  }
};

// 分类特定的 Pexels 图片 ID 列表 - 更新为图片分享应用的分类
const categoryImageIds = {
  recommend: [
    // 精选推荐 - 高质量摄影作品
    142497, 1366919, 247899, 210186, 3137077, 3408744, 167699, 15286,
    2668314, 3244513, 2356345, 1287145, 1591447, 257840, 1770809, 1239291
  ],
  photography: [
    // 专业摄影作品 - 相机、镜头、摄影器材相关
    436413, 274937, 1040881, 1366919, 247899, 210186, 3137077, 3408744,
    167699, 15286, 2668314, 1674752, 2379004, 1845534, 428321, 1130626
  ],
  landscape: [
    // 风景摄影 - 自然风光、山水景观
    3568520, 1674752, 2379004, 1845534, 428321, 1130626, 1300402, 2589653,
    1036622, 1065084, 3137688, 1779487, 2962135, 3369102, 1654698, 3593865
  ],
  portrait: [
    // 人像摄影 - 人物肖像相关
    762020, 1043471, 1674752, 1040881, 2379004, 1845534, 428321, 1130626,
    1300402, 2589653, 1036622, 1065084, 1239291, 142497, 247899, 210186
  ],
  food: [
    // 美食摄影 - 食物、餐厅、烹饪相关
    1109543, 2693208, 3568520, 1955134, 2693212, 3408744, 1709003, 2106037,
    3137688, 1779487, 2962135, 3369102, 2693213, 1654698, 3593865, 2906142
  ],
  pets: [
    // 宠物摄影 - 动物、宠物相关
    1843267, 1100946, 1876279, 3355788, 2693215, 1407322, 3137077, 1674752,
    2379004, 1845534, 428321, 1130626, 1300402, 2589653, 1036622, 1065084
  ],
  art: [
    // 艺术创作 - 艺术作品、设计相关
    2693208, 3137688, 1779487, 2962135, 3369102, 1654698, 3593865, 2906142,
    1109543, 1955134, 2693212, 1709003, 2106037, 2693213, 3408744, 3568520
  ],
  lifestyle: [
    // 生活方式 - 日常生活、居家相关
    1552108, 2291004, 416978, 28080, 1552242, 863988, 1229356, 2834897,
    3764011, 3621104, 1435721, 3573382, 2589653, 1036622, 1065084, 3568520
  ]
};

// 通用图片ID作为后备
const defaultImageIds = [
  3568520, 142497, 1366919, 247899, 210186, 3137077, 3408744, 167699,
  15286, 2668314, 3244513, 2356345, 1287145, 1591447, 257840, 1770809,
  1239291, 762020, 1043471, 1674752, 1040881, 2379004, 1845534, 428321
];

// 生成随机的图片数据
const generateImageData = (index, category = 'recommend') => {
  const width = 375;
  const height = Mock.Random.integer(180, 300); // 瀑布流友好的高度范围

  // 根据分类选择对应的图片ID列表
  const imageIds = categoryImageIds[category] || defaultImageIds;
  const imageId = imageIds[index % imageIds.length];
  const imageUrl = `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg?auto=compress&cs=tinysrgb&w=${width}&h=${height}&fit=crop`;

  // 根据分类获取相应的数据
  const categoryInfo = categoryData[category] || categoryData['recommend'];
  const title = categoryInfo.titles[Mock.Random.integer(0, categoryInfo.titles.length - 1)];
  const author = categoryInfo.authors[Mock.Random.integer(0, categoryInfo.authors.length - 1)];
  const categoryName = categoryInfo.categories[Mock.Random.integer(0, categoryInfo.categories.length - 1)];

  return {
    id: `image-${category}-${index}`,
    url: imageUrl,
    height: height,
    title: title,
    author: author,
    category: categoryName,
    viewCount: Mock.Random.integer(1000, 50000),
    likeCount: Mock.Random.integer(100, 5000),
    duration: categoryInfo.isVideo ? Mock.Random.integer(30, 300) : null, // 视频时长（秒）
    isVideo: categoryInfo.isVideo,
    createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')
  };
};

// 模拟不同分类的图片数据
const generateCategoryImages = (category, page = 1, pageSize = 10) => {
  const startIndex = (page - 1) * pageSize;
  const images = [];
  
  // 确保每页至少有足够的内容来填满布局
  const minItems = Math.max(pageSize, 8); // 至少8个项目
  
  for (let i = 0; i < minItems; i++) {
    images.push(generateImageData(startIndex + i, category));
  }
  
  return images;
};

export default [
  {
    url: '/api/images',
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 10, category = 'recommend' } = query;
      const pageNum = parseInt(page);
      const size = parseInt(pageSize);
      
      // 模拟数据获取延迟
      const delay = Mock.Random.integer(200, 800);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          const images = generateCategoryImages(category, pageNum, size);
          const hasMore = pageNum < 5; // 模拟有5页数据
          
          resolve({
            code: 0,
            message: 'Success',
            data: {
              list: images,
              hasMore: hasMore,
              total: hasMore ? 50 : pageNum * size,
              page: pageNum,
              pageSize: size
            }
          });
        }, delay);
      });
    },
  },
  {
    url: '/api/image/detail',
    method: 'get',
    response: ({ query }) => {
      const { id } = query;
      
      // 从ID中解析出分类和索引
      const [, category, index] = id.split('-');
      const imageData = generateImageData(parseInt(index), category);

      // 生成详细信息
      const detailData = {
        ...imageData,
        content: '这是一个精彩的内容，展现了独特的创意和专业的制作水准。无论是视觉效果还是内容质量都值得称赞。',
        tags: categoryData[category]?.categories || ['精选', '推荐'],
        likes: Mock.Random.integer(500, 15000),
        views: Mock.Random.integer(5000, 100000),
        comments: Mock.mock({
          'list|5-10': [{
            id: '@guid',
            user: '@cname',
            avatar: () => {
              const avatarIds = [91227, 697509, 1239291, 762020, 1043471];
              const randomId = avatarIds[Mock.Random.integer(0, avatarIds.length - 1)];
              return `https://images.pexels.com/photos/${randomId}/pexels-photo-${randomId}.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop&crop=face`;
            },
            text: '@cparagraph(1, 2)',
            time: '@datetime("yyyy-MM-dd HH:mm")'
          }]
        }).list
      };
      
      return {
        code: 0,
        message: 'Success',
        data: detailData
      };
    },
  }
];