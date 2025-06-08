// tarotDatabase.js - 完整的塔罗牌数据库
const majorArcana = [
    {
        id: 0,
        name: '愚者',
        nameEn: 'The Fool',
        suit: '大阿卡那',
        number: 0,
        element: '风',
        planet: '天王星',
        keywords: ['新开始', '冒险', '纯真', '自发性', '无限可能'],
        upright: {
            meaning: '新的开始，冒险精神，纯真，自由，无限可能',
            description: '愚者代表着新的开始和无限的可能性。这是一张充满希望和冒险精神的牌，暗示着您即将踏上一段新的人生旅程。愚者鼓励您保持开放的心态，勇敢地面对未知。',
            love: '新恋情的开始，纯真的爱情，冒险的约会',
            career: '新工作机会，创业，改变职业方向',
            health: '新的健康计划，恢复活力，注意安全'
        },
        reversed: {
            meaning: '鲁莽，缺乏计划，愚蠢的决定，恐惧',
            description: '逆位的愚者警告您不要过于冲动，需要更多的思考和计划。可能存在过度天真或缺乏经验的问题。',
            love: '不成熟的关系，缺乏承诺，冲动的决定',
            career: '缺乏计划的职业选择，不现实的期望',
            health: '忽视健康警告，鲁莽的行为'
        }
    },
    {
        id: 1,
        name: '魔术师',
        nameEn: 'The Magician',
        suit: '大阿卡那',
        number: 1,
        element: '风',
        planet: '水星',
        keywords: ['意志力', '创造力', '技能', '专注', '沟通'],
        upright: {
            meaning: '意志力，创造力，技能，沟通，专注',
            description: '魔术师代表着您拥有实现目标所需的所有工具和能力。这张牌鼓励您运用自己的技能和意志力来创造想要的结果。魔术师提醒您，成功需要专注和行动。',
            love: '主动追求，有魅力，善于沟通',
            career: '展现才能，领导能力，创新项目',
            health: '意志力强，快速恢复，积极治疗'
        },
        reversed: {
            meaning: '滥用权力，缺乏专注，潜能未发挥，操控',
            description: '逆位的魔术师提醒您要正确使用自己的能力，避免操控他人。可能存在缺乏专注或滥用才能的问题。',
            love: '操控性关系，缺乏真诚，玩弄感情',
            career: '滥用职权，缺乏专注，未发挥潜能',
            health: '忽视健康，缺乏自律，依赖性'
        }
    },
    {
        id: 2,
        name: '女祭司',
        nameEn: 'The High Priestess',
        suit: '大阿卡那',
        number: 2,
        element: '水',
        planet: '月亮',
        keywords: ['直觉', '潜意识', '神秘', '内在智慧', '月亮'],
        upright: {
            meaning: '直觉，内在智慧，神秘知识，潜意识，被动',
            description: '女祭司代表着内在的智慧和直觉。她提醒您要相信自己的内在声音，答案往往就在您的心中。女祭司鼓励您通过冥想和内省来获得洞察。',
            love: '精神连接，直觉的爱情，神秘的吸引',
            career: '依靠直觉，幕后工作，咨询顾问',
            health: '关注心理健康，冥想疗法，女性健康'
        },
        reversed: {
            meaning: '忽视直觉，秘密被揭露，内在混乱，缺乏洞察',
            description: '逆位的女祭司表示您可能忽视了自己的直觉，需要重新连接内在智慧。可能存在内心混乱或秘密即将被揭露。',
            love: '缺乏深度，表面关系，隐瞒秘密',
            career: '缺乏洞察力，错误判断，信息不足',
            health: '忽视身体信号，情绪压抑，激素失调'
        }
    },
    // 继续添加其他大阿卡那牌...
];

const minorArcana = {
    wands: [
        {
            id: 22,
            name: '权杖一',
            nameEn: 'Ace of Wands',
            suit: '权杖',
            number: 1,
            element: '火',
            keywords: ['新开始', '创造力', '灵感', '潜能'],
            upright: {
                meaning: '新的开始，创造力，灵感，潜能',
                description: '权杖一代表新的创意项目或热情的开始。这是一个充满可能性的时刻。',
                love: '新恋情，激情，吸引力',
                career: '新项目，创业机会，创意工作',
                health: '活力充沛，新的健身计划'
            },
            reversed: {
                meaning: '缺乏方向，创意受阻，延迟',
                description: '可能面临创意障碍或缺乏明确方向的问题。',
                love: '关系缺乏激情，单方面的感情',
                career: '项目延迟，缺乏动力，创意枯竭',
                health: '缺乏活力，需要休息'
            }
        },
        // 可以继续添加更多权杖牌...
    ],
    cups: [
        {
            id: 36,
            name: '圣杯一',
            nameEn: 'Ace of Cups',
            suit: '圣杯',
            number: 1,
            element: '水',
            keywords: ['新感情', '爱情', '直觉', '精神觉醒'],
            upright: {
                meaning: '新的感情，爱情，直觉，精神觉醒',
                description: '圣杯一代表情感的新开始，可能是新的爱情或精神上的觉醒。',
                love: '新爱情，深刻连接，情感满足',
                career: '工作满足感，团队合作，创意职业',
                health: '情绪健康，心理平衡'
            },
            reversed: {
                meaning: '情感压抑，爱情失望，精神空虚',
                description: '可能面临情感上的困扰或失望。',
                love: '单恋，情感受伤，关系问题',
                career: '工作不满，缺乏激情，人际关系紧张',
                health: '情绪低落，需要情感支持'
            }
        },
        // 可以继续添加更多圣杯牌...
    ],
    swords: [
        {
            id: 50,
            name: '宝剑一',
            nameEn: 'Ace of Swords',
            suit: '宝剑',
            number: 1,
            element: '风',
            keywords: ['新想法', '突破', '清晰', '真相'],
            upright: {
                meaning: '新想法，突破，清晰思维，真相',
                description: '宝剑一代表思维的突破和新想法的诞生。真相即将显现。',
                love: '坦诚沟通，理性的爱情，澄清误会',
                career: '新计划，突破性想法，法律事务',
                health: '明确诊断，理性治疗方案'
            },
            reversed: {
                meaning: '思维混乱，缺乏清晰，延迟的真相',
                description: '可能面临思维不清或信息混乱的问题。',
                love: '沟通不良，误解，冲突',
                career: '计划不明确，决策困难，法律问题',
                health: '诊断不明，需要更多检查'
            }
        },
        // 可以继续添加更多宝剑牌...
    ],
    pentacles: [
        {
            id: 64,
            name: '星币一',
            nameEn: 'Ace of Pentacles',
            suit: '星币',
            number: 1,
            element: '土',
            keywords: ['新机会', '物质成功', '丰盛', '实现'],
            upright: {
                meaning: '新机会，物质成功，丰盛，实现',
                description: '星币一代表物质层面的新机会和成功的开始。',
                love: '稳定关系，物质安全，结婚计划',
                career: '新工作，加薪机会，投资回报',
                health: '身体健康，体力充沛'
            },
            reversed: {
                meaning: '错失机会，财务问题，缺乏实用性',
                description: '可能面临财务困难或错失重要机会。',
                love: '关系不稳定，经济压力影响感情',
                career: '工作不稳定，财务困难，投资失败',
                health: '身体疲劳，需要注意饮食'
            }
        },
        // 可以继续添加更多星币牌...
    ]
};

// 组合所有牌
const allCards = [
    ...majorArcana,
    ...minorArcana.wands,
    ...minorArcana.cups,
    ...minorArcana.swords,
    ...minorArcana.pentacles
];

// 牌阵定义
const spreadDefinitions = {
    single: {
        name: '单张牌占卜',
        description: '简单直接的答案和指导',
        positions: [
            { name: '当前状况/建议', description: '针对您问题的直接指导' }
        ]
    },
    three: {
        name: '时间流三张牌',
        description: '过去、现在、未来的时间线解读',
        positions: [
            { name: '过去', description: '影响当前状况的过去因素' },
            { name: '现在', description: '当前的状况和能量' },
            { name: '未来', description: '基于当前路径的可能发展' }
        ]
    },
    love: {
        name: '爱情三角',
        description: '专门针对感情问题的三张牌解读',
        positions: [
            { name: '您的感受', description: '您在这段关系中的真实感受' },
            { name: '对方的感受', description: '对方对这段关系的态度' },
            { name: '关系发展', description: '这段关系的发展趋势' }
        ]
    },
    career: {
        name: '事业发展',
        description: '针对职业和事业发展的指导',
        positions: [
            { name: '当前状况', description: '您目前的职业状态' },
            { name: '机会与挑战', description: '即将面临的机遇和挑战' },
            { name: '行动建议', description: '为达成目标应该采取的行动' }
        ]
    },
    celtic: {
        name: '凯尔特十字',
        description: '最经典的综合性牌阵，提供全面深入的洞察',
        positions: [
            { name: '当前状况', description: '您目前面临的核心问题' },
            { name: '挑战/障碍', description: '阻碍您的因素或需要面对的挑战' },
            { name: '遥远的过去', description: '问题的根源或深层影响' },
            { name: '最近的过去', description: '最近发生的相关事件' },
            { name: '可能的未来', description: '如果保持当前方向的可能结果' },
            { name: '近期未来', description: '即将发生的事情' },
            { name: '您的方法', description: '您处理问题的方式和态度' },
            { name: '外界影响', description: '周围环境和他人对您的影响' },
            { name: '希望与恐惧', description: '您内心深处的希望和担忧' },
            { name: '最终结果', description: '综合所有因素后的最可能结果' }
        ]
    }
};

// AI解读模板
const interpretationTemplates = {
    opening: [
        "塔罗牌为您揭示了深刻的洞察...",
        "牌灵想要告诉您的是...",
        "从塔罗的智慧中，我们可以看到...",
        "您的问题激发了以下牌面的指引..."
    ],
    connecting: [
        "这些牌面相互呼应，形成了一个完整的信息...",
        "牌与牌之间的联系显示...",
        "综合这些符号，我们可以理解...",
        "牌面的组合传达了一个重要信息..."
    ],
    advice: [
        "塔罗牌建议您...",
        "基于这些牌面，最好的行动方案是...",
        "为了获得最佳结果，您应该考虑...",
        "牌灵的指导是..."
    ]
};

module.exports = {
    majorArcana,
    minorArcana,
    allCards,
    spreadDefinitions,
    interpretationTemplates
};