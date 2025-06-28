// 塔罗牌数据
export const TAROT_CARDS = {
  major: [
    { id: 0, name: '愚者', nameEn: 'The Fool', element: '风', meaning: '新开始、冒险、纯真、自发性', reverseMeaning: '鲁莽、缺乏计划、愚蠢行为' },
    { id: 1, name: '魔术师', nameEn: 'The Magician', element: '火', meaning: '意志力、技能、专注、表现', reverseMeaning: '操控、欺骗、缺乏技能' },
    { id: 2, name: '女祭司', nameEn: 'The High Priestess', element: '水', meaning: '直觉、潜意识、神秘、智慧', reverseMeaning: '缺乏直觉、秘密、忽视内在声音' },
    { id: 3, name: '皇后', nameEn: 'The Empress', element: '土', meaning: '母性、创造力、丰饶、自然', reverseMeaning: '创造力阻塞、依赖、空虚' },
    { id: 4, name: '皇帝', nameEn: 'The Emperor', element: '火', meaning: '权威、结构、控制、父性', reverseMeaning: '独裁、缺乏纪律、不负责任' },
    { id: 5, name: '教皇', nameEn: 'The Hierophant', element: '土', meaning: '传统、精神指导、教育、信仰', reverseMeaning: '反叛、非传统、自由思考' },
    { id: 6, name: '恋人', nameEn: 'The Lovers', element: '风', meaning: '爱情、选择、和谐、伙伴关系', reverseMeaning: '分离、错误选择、不和谐' },
    { id: 7, name: '战车', nameEn: 'The Chariot', element: '水', meaning: '意志力、胜利、控制、决心', reverseMeaning: '缺乏控制、失败、缺乏方向' },
    { id: 8, name: '力量', nameEn: 'Strength', element: '火', meaning: '内在力量、勇气、耐心、控制', reverseMeaning: '软弱、自我怀疑、缺乏勇气' },
    { id: 9, name: '隐者', nameEn: 'The Hermit', element: '土', meaning: '内省、寻找真理、指导、孤独', reverseMeaning: '孤立、拒绝帮助、迷失方向' },
    { id: 10, name: '命运之轮', nameEn: 'Wheel of Fortune', element: '火', meaning: '命运、变化、循环、机会', reverseMeaning: '厄运、缺乏控制、负面循环' },
    { id: 11, name: '正义', nameEn: 'Justice', element: '风', meaning: '公正、真理、法律、平衡', reverseMeaning: '不公正、不诚实、不负责任' },
    { id: 12, name: '倒吊人', nameEn: 'The Hanged Man', element: '水', meaning: '牺牲、放下、等待、新视角', reverseMeaning: '拖延、抗拒、无谓牺牲' }
  ],
  minor: {
    wands: [
      { id: 'w1', name: '权杖王牌', meaning: '新创意、灵感、成长机会', reverseMeaning: '缺乏方向、创意阻塞' },
      { id: 'w2', name: '权杖二', meaning: '计划、决策、个人力量', reverseMeaning: '缺乏计划、害怕冒险' },
      { id: 'w3', name: '权杖三', meaning: '扩展、远见、领导力', reverseMeaning: '缺乏远见、延迟' }
    ],
    cups: [
      { id: 'c1', name: '圣杯王牌', meaning: '新爱情、情感满足、灵性', reverseMeaning: '情绪阻塞、心灵空虚' },
      { id: 'c2', name: '圣杯二', meaning: '伙伴关系、爱情、和谐', reverseMeaning: '关系不平衡、分离' },
      { id: 'c3', name: '圣杯三', meaning: '友谊、庆祝、团体和谐', reverseMeaning: '社交问题、过度放纵' }
    ],
    swords: [
      { id: 's1', name: '宝剑王牌', meaning: '新想法、清晰思维、突破', reverseMeaning: '混乱、误解、缺乏清晰' },
      { id: 's2', name: '宝剑二', meaning: '艰难选择、平衡、僵局', reverseMeaning: '优柔寡断、信息不足' },
      { id: 's3', name: '宝剑三', meaning: '心碎、悲伤、背叛', reverseMeaning: '从痛苦中恢复、宽恕' }
    ],
    pentacles: [
      { id: 'p1', name: '钱币王牌', meaning: '新机会、物质显现、繁荣', reverseMeaning: '错失机会、缺乏计划' },
      { id: 'p2', name: '钱币二', meaning: '平衡、优先级、多任务', reverseMeaning: '失去平衡、过度承诺' },
      { id: 'p3', name: '钱币三', meaning: '团队合作、技能、工作', reverseMeaning: '缺乏团队合作、低质量工作' }
    ]
  }
};

// 牌阵配置
export const SPREADS = {
  single: { name: '单张指引牌', cards: 1, positions: ['当前指引'] },
  three: { name: '过去现在未来', cards: 3, positions: ['过去', '现在', '未来'] },
  celtic: { name: '凯尔特十字', cards: 10, positions: ['现状', '挑战', '远因', '近因', '可能结果', '近期', '你的方法', '外在影响', '希望恐惧', '最终结果'] },
  relationship: { name: '关系解读', cards: 5, positions: ['你的感受', '对方感受', '关系现状', '挑战', '发展方向'] }
}; 