// 塔罗牌数据
const tarotCards = [
    {
        id: 1,
        name: "愚者",
        position: "正位",
        image: "https://ai-public.mastergo.com/ai/img_res/f755c8fd223c36eab4b3095c9fa04e90.jpg",
        description: "新的开始",
        interpretation: {
            meaning: "这张牌象征着新的开始和无限可能。当前您正处于人生的转折点，内心充满对未知的期待与憧憬。",
            advice: [
                "保持开放和好奇的心态",
                "不要害怕犯错，每个经历都是成长",
                "相信自己的直觉，大胆尝试新事物",
                "放下过去的包袱，轻装上阵"
            ],
            keywords: ["新开始", "冒险", "纯真", "自发性"]
        }
    },
    {
        id: 2,
        name: "魔术师",
        position: "正位",
        image: "https://ai-public.mastergo.com/ai/img_res/e6c355756570e71889e2fb6293778008.jpg",
        description: "创造力",
        interpretation: {
            meaning: "魔术师代表着创造力和意志力的完美结合。您拥有将想法转化为现实的能力，现在是采取行动的最佳时机。",
            advice: [
                "充分利用自己的技能和资源",
                "制定明确的目标和计划",
                "保持专注和决心",
                "相信自己的能力和潜力"
            ],
            keywords: ["创造力", "意志力", "技能", "资源"]
        }
    },
    {
        id: 3,
        name: "女祭司",
        position: "正位",
        image: "https://ai-public.mastergo.com/ai/img_res/88d6c7581e4c58ea0f6cabdb6b11f4fb.jpg",
        description: "直觉智慧",
        interpretation: {
            meaning: "女祭司象征着内在智慧和直觉的力量。她提醒您要倾听内心的声音，相信自己的直觉判断。",
            advice: [
                "静下心来倾听内在的声音",
                "相信自己的第一直觉",
                "通过冥想或反思获得答案",
                "注意梦境和潜意识的信息"
            ],
            keywords: ["直觉", "内在智慧", "神秘", "潜意识"]
        }
    },
    {
        id: 4,
        name: "女皇",
        position: "正位",
        image: "https://ai-public.mastergo.com/ai/img_res/7c46f40261617112636e514cc47ee089.jpg",
        description: "丰盛富足",
        interpretation: {
            meaning: "女皇代表着丰盛、创造力和母性的能量。这是一个收获的时期，您的努力将会得到丰厚的回报。",
            advice: [
                "享受生活中的美好事物",
                "培养创造性的兴趣爱好",
                "关注自己和他人的需求",
                "保持感恩的心态"
            ],
            keywords: ["丰盛", "创造", "母性", "关怀"]
        }
    },
    {
        id: 5,
        name: "皇帝",
        position: "正位",
        image: "https://ai-public.mastergo.com/ai/img_res/43a2428c49cf18517b9e666b81acf5dc.jpg",
        description: "权力掌控",
        interpretation: {
            meaning: "皇帝象征着权威、秩序和控制力。您需要建立稳固的基础，并以坚定的意志来实现目标。",
            advice: [
                "建立清晰的规则和界限",
                "承担起领导责任",
                "保持纪律和自控力",
                "用理性思考指导行动"
            ],
            keywords: ["权威", "秩序", "控制", "稳定"]
        }
    },
    {
        id: 6,
        name: "教皇",
        position: "正位",
        image: "https://ai-public.mastergo.com/ai/img_res/902fef5557f31e8330034ed5112be12d.jpg",
        description: "精神指导",
        interpretation: {
            meaning: "教皇代表着传统智慧和精神指导。寻求导师的建议或回归传统价值观可能对您有所帮助。",
            advice: [
                "寻求智者的指导和建议",
                "学习传统知识和智慧",
                "参与精神或宗教活动",
                "遵循道德和伦理准则"
            ],
            keywords: ["传统", "指导", "智慧", "精神"]
        }
    },
    {
        id: 7,
        name: "恋人",
        position: "正位",
        image: "https://ai-public.mastergo.com/ai/img_res/50da82aeb3469a2a5068ce710330700c.jpg",
        description: "爱情选择",
        interpretation: {
            meaning: "恋人牌象征着爱情、选择和和谐。这是关于重要决定的时刻，需要遵循内心的声音。",
            advice: [
                "倾听内心的真实感受",
                "在重要选择时保持诚实",
                "珍惜身边的关系",
                "寻求内心的和谐统一"
            ],
            keywords: ["爱情", "选择", "和谐", "结合"]
        }
    },
    {
        id: 8,
        name: "战车",
        position: "正位",
        image: "https://ai-public.mastergo.com/ai/img_res/87c3b699ce1f33e298f03c5fa02b0afa.jpg",
        description: "胜利前进",
        interpretation: {
            meaning: "战车代表着胜利、决心和前进的力量。通过坚定的意志和正确的方向，您将克服所有障碍。",
            advice: [
                "保持坚定的决心和意志",
                "明确目标并坚持前进",
                "平衡不同的力量和需求",
                "相信自己能够获得胜利"
            ],
            keywords: ["胜利", "决心", "控制", "前进"]
        }
    }
];

// 全局变量
let selectedCard = null;
let soundEnabled = true;
let gameHistory = JSON.parse(localStorage.getItem('tarotHistory') || '[]');

// DOM元素
const cardGrid = document.getElementById('cardGrid');
const resultSection = document.getElementById('resultSection');
const selectedCardImage = document.getElementById('selectedCardImage');
const interpretationContent = document.getElementById('interpretationContent');
const historyContainer = document.getElementById('historyContainer');
const soundToggle = document.getElementById('soundToggle');
const soundToast = document.getElementById('soundToast');
const soundStatus = document.getElementById('soundStatus');
const shareModal = document.getElementById('shareModal');

// 音效对象 (使用简单的音频生成)
const sounds = {
    cardFlip: createSound(800, 0.1, 'sine'),
    success: createSound(600, 0.3, 'square'),
    shuffle: createSound(400, 0.2, 'sawtooth')
};

// 创建音效函数
function createSound(frequency, duration, type = 'sine') {
    return {
        play: function() {
            if (!soundEnabled) return;
            
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = type;
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        }
    };
}

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadHistory();
    setupEventListeners();
});

// 初始化应用
function initializeApp() {
    renderCards();
    updateSoundToggle();
}

// 渲染卡牌
function renderCards() {
    cardGrid.innerHTML = '';
    
    // 随机选择5张卡牌显示
    const shuffledCards = [...tarotCards].sort(() => Math.random() - 0.5).slice(0, 5);
    
    shuffledCards.forEach((card, index) => {
        const cardElement = createCardElement(card, index);
        cardGrid.appendChild(cardElement);
    });
}

// 创建卡牌元素
function createCardElement(card, index) {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container relative h-[400px] cursor-pointer group';
    cardContainer.innerHTML = `
        <div class="card w-full h-full" data-card-id="${card.id}">
            <div class="card-front">
                <div class="card-content">
                    <img src="${card.image}" alt="${card.name}" class="card-image">
                    <div class="card-title">${card.name}${card.position}</div>
                    <div class="card-description">${card.description}</div>
                </div>
            </div>
            <div class="card-back"></div>
        </div>
    `;
    
    // 添加点击事件
    cardContainer.addEventListener('click', () => selectCard(card, cardContainer));
    
    // 添加悬停效果
    cardContainer.addEventListener('mouseenter', () => {
        if (!selectedCard) {
            cardContainer.querySelector('.card').style.transform = 'translateY(-10px) scale(1.05)';
        }
    });
    
    cardContainer.addEventListener('mouseleave', () => {
        if (!selectedCard || selectedCard.id !== card.id) {
            cardContainer.querySelector('.card').style.transform = '';
        }
    });
    
    return cardContainer;
}

// 选择卡牌
function selectCard(card, cardElement) {
    console.log('Card selected:', card.name);
    if (selectedCard) return;

    selectedCard = card;
    sounds.cardFlip.play();

    const cardDiv = cardElement.querySelector('.card');
    cardDiv.classList.add('flipped', 'selected');

    setTimeout(() => {
        console.log('Showing result for:', card.name);
        showResult(card);
        sounds.success.play();
    }, 600);

    // Disable other cards
    document.querySelectorAll('.card-container').forEach(container => {
        if (container !== cardElement) {
            container.style.opacity = '0.5';
            container.style.pointerEvents = 'none';
        }
    });
}

// 显示占卜结果
function showResult(card) {
    const selectedCardImage = document.getElementById('selectedCardImage');
    const interpretationContent = document.getElementById('interpretationContent');
    const resultSection = document.getElementById('resultSection');

    if (!selectedCardImage || !interpretationContent || !resultSection) {
        console.error('Required DOM elements not found!');
        return;
    }

    selectedCardImage.src = card.image;
    selectedCardImage.alt = card.name;

    interpretationContent.innerHTML = `
        <p class="text-gray-700 typing-animation">${card.interpretation.meaning}</p>
        <p class="text-gray-700">建议：</p>
        <ul class="list-disc list-inside text-gray-700 space-y-2">
            ${card.interpretation.advice.map(advice => `<li>${advice}</li>`).join('')}
        </ul>
    `;

    resultSection.classList.remove('hidden');
    resultSection.scrollIntoView({ behavior: 'smooth' });

    // Start typing effect
    startTypingEffect();
}

// 打字机效果
function startTypingEffect() {
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        typingElement.style.width = '0';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                typingElement.style.width = 'auto';
                i++;
                setTimeout(typeWriter, 50);
            } else {
                typingElement.classList.remove('typing-animation');
            }
        };
        
        setTimeout(typeWriter, 500);
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 重新洗牌按钮
    document.getElementById('shuffleBtn').addEventListener('click', shuffleCards);
    
    // 重新开始按钮
    document.getElementById('resetBtn').addEventListener('click', resetGame);
    
    // 再次占卜按钮
    document.getElementById('againBtn').addEventListener('click', resetGame);
    
    // 分享按钮
    document.getElementById('shareBtn').addEventListener('click', showShareModal);
    
    // 保存记录按钮
    document.getElementById('saveBtn').addEventListener('click', saveResult);
    
    // 音效切换按钮
    soundToggle.addEventListener('click', toggleSound);
    
    // 关闭分享弹窗
    document.getElementById('closeShareModal').addEventListener('click', hideShareModal);
    
    // 点击弹窗外部关闭
    shareModal.addEventListener('click', function(e) {
        if (e.target === shareModal) {
            hideShareModal();
        }
    });
    
    // 清空历史记录
    document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
}

// 洗牌功能
function shuffleCards() {
    if (selectedCard) return;
    
    sounds.shuffle.play();
    
    // 添加洗牌动画
    document.querySelectorAll('.card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('shuffle-animation');
            setTimeout(() => {
                card.classList.remove('shuffle-animation');
            }, 600);
        }, index * 100);
    });
    
    // 重新渲染卡牌
    setTimeout(() => {
        renderCards();
    }, 800);
}

// 重置游戏
function resetGame() {
    selectedCard = null;
    resultSection.classList.add('hidden');
    
    // 重置卡牌状态
    document.querySelectorAll('.card-container').forEach(container => {
        container.style.opacity = '';
        container.style.pointerEvents = '';
        const card = container.querySelector('.card');
        card.classList.remove('flipped', 'selected');
        card.style.transform = '';
    });
    
    // 重新渲染卡牌
    renderCards();
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 显示分享弹窗
function showShareModal() {
    shareModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// 隐藏分享弹窗
function hideShareModal() {
    shareModal.classList.add('hidden');
    document.body.style.overflow = '';
}

// 保存结果到历史记录
function saveResult() {
    if (!selectedCard) return;
    
    const result = {
        id: Date.now(),
        card: selectedCard,
        date: new Date().toLocaleDateString('zh-CN'),
        timestamp: Date.now()
    };
    
    gameHistory.unshift(result);
    
    // 限制历史记录数量
    if (gameHistory.length > 20) {
        gameHistory = gameHistory.slice(0, 20);
    }
    
    localStorage.setItem('tarotHistory', JSON.stringify(gameHistory));
    loadHistory();
    
    // 显示保存成功提示
    showToast('占卜结果已保存到历史记录');
}

// 加载历史记录
function loadHistory() {
    if (gameHistory.length === 0) {
        historyContainer.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <i class="fas fa-history text-4xl mb-4"></i>
                <p>暂无占卜记录</p>
            </div>
        `;
        return;
    }
    
    historyContainer.innerHTML = gameHistory.map(record => `
        <div class="history-item flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <img src="${record.card.image}" class="w-20 h-20 rounded shadow object-cover" alt="${record.card.name}">
            <div class="flex-1">
                <div class="flex items-center justify-between">
                    <h4 class="font-semibold text-gray-800">${record.card.name}${record.card.position}</h4>
                    <span class="text-sm text-gray-500">${record.date}</span>
                </div>
                <p class="text-gray-600 text-sm mt-1">${record.card.interpretation.meaning.substring(0, 80)}...</p>
                <div class="flex flex-wrap gap-1 mt-2">
                    ${record.card.interpretation.keywords.slice(0, 3).map(keyword => 
                        `<span class="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs">${keyword}</span>`
                    ).join('')}
                </div>
            </div>
            <button onclick="deleteHistoryItem(${record.id})" class="text-red-400 hover:text-red-600 p-2">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// 删除历史记录项
function deleteHistoryItem(id) {
    gameHistory = gameHistory.filter(record => record.id !== id);
    localStorage.setItem('tarotHistory', JSON.stringify(gameHistory));
    loadHistory();
    showToast('记录已删除');
}

// 清空历史记录
function clearHistory() {
    if (confirm('确定要清空所有历史记录吗？')) {
        gameHistory = [];
        localStorage.removeItem('tarotHistory');
        loadHistory();
        showToast('历史记录已清空');
    }
}

// 切换音效
function toggleSound() {
    soundEnabled = !soundEnabled;
    updateSoundToggle();
    showSoundToast();
}

// 更新音效按钮状态
function updateSoundToggle() {
    const icon = soundToggle.querySelector('i');
    if (soundEnabled) {
        icon.className = 'fas fa-volume-up w-5 h-5 flex items-center justify-center';
        soundToggle.classList.remove('text-gray-400');
        soundToggle.classList.add('text-gray-600');
    } else {
        icon.className = 'fas fa-volume-mute w-5 h-5 flex items-center justify-center';
        soundToggle.classList.remove('text-gray-600');
        soundToggle.classList.add('text-gray-400');
    }
}

// 显示音效状态提示
function showSoundToast() {
    soundStatus.textContent = soundEnabled ? '音效已开启' : '音效已关闭';
    soundToast.classList.remove('translate-x-full');
    
    setTimeout(() => {
        soundToast.classList.add('translate-x-full');
    }, 2000);
}

// 显示提示信息
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed top-20 right-4 bg-white rounded-lg shadow-lg p-4 z-50 border-l-4 ${
        type === 'success' ? 'border-green-500' : 'border-red-500'
    } transform translate-x-full transition-transform duration-300`;
    
    toast.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas ${type === 'success' ? 'fa-check-circle text-green-500' : 'fa-exclamation-circle text-red-500'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'Escape':
            if (!shareModal.classList.contains('hidden')) {
                hideShareModal();
            }
            break;
        case 'r':
        case 'R':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                resetGame();
            }
            break;
        case 's':
        case 'S':
            if ((e.ctrlKey || e.metaKey) && selectedCard) {
                e.preventDefault();
                saveResult();
            }
            break;
    }
});

// 响应式处理
function handleResize() {
    const width = window.innerWidth;
    const cardGrid = document.getElementById('cardGrid');
    
    if (width <= 480) {
        cardGrid.className = 'grid grid-cols-1 gap-6 mb-12 justify-items-center';
    } else if (width <= 768) {
        cardGrid.className = 'grid grid-cols-2 gap-6 mb-12';
    } else if (width <= 1024) {
        cardGrid.className = 'grid grid-cols-3 gap-6 mb-12';
    } else {
        cardGrid.className = 'grid grid-cols-5 gap-6 mb-12';
    }
}

window.addEventListener('resize', handleResize);

// 页面可见性API - 当用户切换标签页时暂停动画
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时的处理
        document.querySelectorAll('.card').forEach(card => {
            card.style.animationPlayState = 'paused';
        });
    } else {
        // 页面显示时的处理
        document.querySelectorAll('.card').forEach(card => {
            card.style.animationPlayState = 'running';
        });
    }
});

// 预加载图片
function preloadImages() {
    tarotCards.forEach(card => {
        const img = new Image();
        img.src = card.image;
    });
}

// 在页面加载完成后预加载图片
window.addEventListener('load', preloadImages);