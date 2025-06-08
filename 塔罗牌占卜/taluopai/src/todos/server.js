// server.js - 塔罗牌AI助手后端服务器
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // 假设前端文件放在public目录

// 塔罗牌数据库
const tarotCards = [
    {
        id: 0,
        name: '愚者',
        nameEn: 'The Fool',
        suit: '大阿卡那',
        keywords: ['新开始', '冒险', '纯真', '自发性'],
        upright: {
            meaning: '新的开始，冒险精神，纯真，自由',
            description: '愚者代表着新的开始和无限的可能性。这是一张充满希望和冒险精神的牌，暗示着您即将踏上一段新的人生旅程。'
        },
        reversed: {
            meaning: '鲁莽，缺乏计划，愚蠢的决定',
            description: '逆位的愚者警告您不要过于冲动，需要更多的思考和计划。'
        }
    },
    {
        id: 1,
        name: '魔术师',
        nameEn: 'The Magician',
        suit: '大阿卡那',
        keywords: ['意志力', '创造力', '技能', '专注'],
        upright: {
            meaning: '意志力，创造力，技能，沟通',
            description: '魔术师代表着您拥有实现目标所需的所有工具和能力。这张牌鼓励您运用自己的技能和意志力来创造想要的结果。'
        },
        reversed: {
            meaning: '滥用权力，缺乏专注，潜能未发挥',
            description: '逆位的魔术师提醒您要正确使用自己的能力，避免操控他人。'
        }
    },
    {
        id: 2,
        name: '女祭司',
        nameEn: 'The High Priestess',
        suit: '大阿卡那',
        keywords: ['直觉', '潜意识', '神秘', '内在智慧'],
        upright: {
            meaning: '直觉，内在智慧，神秘知识，潜意识',
            description: '女祭司代表着内在的智慧和直觉。她提醒您要相信自己的内在声音，答案往往就在您的心中。'
        },
        reversed: {
            meaning: '忽视直觉，秘密被揭露，内在混乱',
            description: '逆位的女祭司表示您可能忽视了自己的直觉，需要重新连接内在智慧。'
        }
    },
    {
        id: 3,
        name: '皇后',
        nameEn: 'The Empress',
        suit: '大阿卡那',
        keywords: ['丰饶', '母性', '创造', '自然'],
        upright: {
            meaning: '丰饶，母性，创造力，自然',
            description: '皇后代表着丰饶和创造力。她象征着生命力的旺盛和创造新事物的能力。'
        },
        reversed: {
            meaning: '过度依赖，创造力受阻，缺乏自我关怀',
            description: '逆位的皇后提醒您要平衡给予和接受，不要忽视自己的需求。'
        }
    },
    {
        id: 4,
        name: '皇帝',
        nameEn: 'The Emperor',
        suit: '大阿卡那',
        keywords: ['权威', '结构', '控制', '领导力'],
        upright: {
            meaning: '权威，结构，控制，稳定',
            description: '皇帝代表着权威和控制。他提醒您要建立秩序和结构，以实现长期的稳定。'
        },
        reversed: {
            meaning: '专制，过度控制，缺乏纪律',
            description: '逆位的皇帝警告您避免过度控制，要学会适当的灵活性。'
        }
    },
    {
        id: 5,
        name: '教皇',
        nameEn: 'The Hierophant',
        suit: '大阿卡那',
        keywords: ['传统', '精神导师', '学习', '道德'],
        upright: {
            meaning: '传统，精神指导，学习，道德价值',
            description: '教皇代表着传统智慧和精神指导。他鼓励您从传统和经验中学习。'
        },
        reversed: {
            meaning: '反叛传统，独立思考，非正统方法',
            description: '逆位的教皇表示您可能需要挑战传统，寻找自己的道路。'
        }
    },
    {
        id: 6,
        name: '恋人',
        nameEn: 'The Lovers',
        suit: '大阿卡那',
        keywords: ['爱情', '关系', '选择', '和谐'],
        upright: {
            meaning: '爱情，关系，选择，和谐',
            description: '恋人代表着爱情和重要的关系。这张牌也暗示着您面临重要的选择。'
        },
        reversed: {
            meaning: '关系问题，错误选择，价值观冲突',
            description: '逆位的恋人表示关系中可能存在问题，需要重新评估价值观。'
        }
    },
    {
        id: 7,
        name: '战车',
        nameEn: 'The Chariot',
        suit: '大阿卡那',
        keywords: ['胜利', '意志力', '控制', '决心'],
        upright: {
            meaning: '胜利，意志力，控制，决心',
            description: '战车代表着通过意志力和决心获得胜利。这张牌鼓励您保持专注和控制。'
        },
        reversed: {
            meaning: '缺乏控制，方向迷失，攻击性',
            description: '逆位的战车表示您可能失去了控制，需要重新找到方向。'
        }
    },
    {
        id: 8,
        name: '力量',
        nameEn: 'Strength',
        suit: '大阿卡那',
        keywords: ['内在力量', '勇气', '耐心', '温柔'],
        upright: {
            meaning: '内在力量，勇气，耐心，温柔的力量',
            description: '力量代表着内在的勇气和温柔的力量。真正的力量来自于内心的平静和控制。'
        },
        reversed: {
            meaning: '缺乏信心，自我怀疑，滥用权力',
            description: '逆位的力量表示您可能缺乏信心，需要重新找回内在的力量。'
        }
    },
    {
        id: 9,
        name: '隐士',
        nameEn: 'The Hermit',
        suit: '大阿卡那',
        keywords: ['内省', '指导', '孤独', '智慧'],
        upright: {
            meaning: '内省，寻求指导，孤独，内在智慧',
            description: '隐士代表着通过内省和孤独来寻找智慧。这是一个自我发现的时期。'
        },
        reversed: {
            meaning: '孤立，拒绝帮助，迷失',
            description: '逆位的隐士表示过度孤立，可能需要寻求他人的帮助和指导。'
        }
    }
];

// 牌阵配置
const spreads = {
    single: {
        name: '单张牌',
        positions: ['当前状况/建议']
    },
    three: {
        name: '三张牌',
        positions: ['过去', '现在', '未来']
    },
    celtic: {
        name: '凯尔特十字',
        positions: [
            '当前状况',
            '挑战/障碍',
            '遥远的过去/根源',
            '最近的过去',
            '可能的未来',
            '近期未来',
            '你的方法',
            '外界影响',
            '希望与恐惧',
            '最终结果'
        ]
    }
};

// 工具函数：随机抽取塔罗牌
function drawRandomCards(count) {
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(card => ({
        ...card,
        reversed: Math.random() < 0.2 // 20%概率为逆位
    }));
}

// 工具函数：生成AI解读
function generateInterpretation(cards, question, spreadType) {
    const spread = spreads[spreadType];
    let interpretation = `针对您的问题"${question}"，塔罗牌为您揭示了以下指引：\n\n`;

    cards.forEach((card, index) => {
        const position = spread.positions[index] || `第${index + 1}张牌`;
        const cardMeaning = card.reversed ? card.reversed : card.upright;
        
        interpretation += `**${position} - ${card.name}${card.reversed ? '(逆位)' : ''}**\n`;
        interpretation += `${cardMeaning.description}\n\n`;
    });

    // 添加整体解读
    interpretation += `**整体解读：**\n`;
    interpretation += generateOverallGuidance(cards, question, spreadType);

    return interpretation;
}

// 生成整体指导
function generateOverallGuidance(cards, question, spreadType) {
    // 这里可以集成更复杂的AI模型来生成更个性化的解读
    // 目前使用基于规则的简单逻辑
    
    const themes = cards.map(card => card.keywords).flat();
    const commonThemes = [...new Set(themes)];
    
    let guidance = '';
    
    if (commonThemes.includes('新开始')) {
        guidance += '现在是开始新事物的好时机。';
    }
    
    if (commonThemes.includes('直觉')) {
        guidance += '相信您的直觉，它会为您指引正确的方向。';
    }
    
    if (commonThemes.includes('意志力')) {
        guidance += '您拥有实现目标所需的力量和能力。';
    }
    
    if (spreadType === 'three') {
        guidance += ' 过去的经验为您提供了智慧，现在是行动的时刻，未来充满了可能性。';
    }
    
    return guidance || '塔罗牌鼓励您保持开放的心态，相信生活会为您带来最好的安排。';
}

// API路由

// 首页
app.get('/', (req, res) => {
    res.send('塔罗牌AI助手 API 服务已启动');
});

// 获取所有塔罗牌信息
app.get('/api/cards', (req, res) => {
    res.json({
        success: true,
        data: tarotCards
    });
});

// 获取牌阵信息
app.get('/api/spreads', (req, res) => {
    res.json({
        success: true,
        data: spreads
    });
});

// 主要的塔罗占卜API
app.post('/api/reading', async (req, res) => {
    try {
        const { question, spreadType = 'single' } = req.body;
        
        // 验证输入
        if (!question || typeof question !== 'string') {
            return res.status(400).json({
                success: false,
                error: '请提供有效的问题'
            });
        }
        
        if (!spreads[spreadType]) {
            return res.status(400).json({
                success: false,
                error: '无效的牌阵类型'
            });
        }
        
        // 确定抽牌数量
        const cardCount = spreads[spreadType].positions.length;
        
        // 抽取塔罗牌
        const drawnCards = drawRandomCards(cardCount);
        
        // 生成解读
        const interpretation = generateInterpretation(drawnCards, question, spreadType);
        
        // 返回结果
        res.json({
            success: true,
            data: {
                question,
                spreadType,
                spreadName: spreads[spreadType].name,
                cards: drawnCards.map((card, index) => ({
                    position: spreads[spreadType].positions[index],
                    card: {
                        name: card.name,
                        nameEn: card.nameEn,
                        suit: card.suit,
                        reversed: card.reversed,
                        meaning: card.reversed ? card.reversed.meaning : card.upright.meaning,
                        description: card.reversed ? card.reversed.description : card.upright.description,
                        keywords: card.keywords
                    }
                })),
                interpretation,
                timestamp: new Date().toISOString()
            }
        });
        
    } catch (error) {
        console.error('占卜过程中发生错误:', error);
        res.status(500).json({
            success: false,
            error: '服务器内部错误，请稍后重试'
        });
    }
});

// 获取单张牌的详细信息
app.get('/api/card/:id', (req, res) => {
    const cardId = parseInt(req.params.id);
    const card = tarotCards.find(c => c.id === cardId);
    
    if (!card) {
        return res.status(404).json({
            success: false,
            error: '未找到指定的塔罗牌'
        });
    }
    
    res.json({
        success: true,
        data: card
    });
});

// 随机抽取指定数量的牌（不解读）
app.post('/api/draw', (req, res) => {
    try {
        const { count = 1 } = req.body;
        
        if (count < 1 || count > 10) {
            return res.status(400).json({
                success: false,
                error: '抽牌数量必须在1-10之间'
            });
        }
        
        const cards = drawRandomCards(count);
        
        res.json({
            success: true,
            data: {
                cards: cards.map(card => ({
                    name: card.name,
                    nameEn: card.nameEn,
                    reversed: card.reversed,
                    meaning: card.reversed ? card.reversed.meaning : card.upright.meaning
                })),
                timestamp: new Date().toISOString()
            }
        });
        
    } catch (error) {
        console.error('抽牌过程中发生错误:', error);
        res.status(500).json({
            success: false,
            error: '服务器内部错误'
        });
    }
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error('服务器错误:', err);
    res.status(500).json({
        success: false,
        error: '服务器内部错误'
    });
});

// 404处理
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'API接口不存在'
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`塔罗牌AI助手服务器已启动在端口 ${PORT}`);
    console.log(`访问地址: http://localhost:${PORT}`);
});

module.exports = app;