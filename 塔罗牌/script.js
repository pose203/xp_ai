// 塔罗牌数据库
const tarotCards = {
    majorArcana: [
        { name: '愚者', suit: '🃏', meaning: '新的开始、冒险精神、纯真', reversed: '鲁莽、缺乏方向、幼稚' },
        { name: '魔术师', suit: '🎩', meaning: '创造力、技能、意志力', reversed: '操控、欺骗、缺乏专注' },
        { name: '女祭司', suit: '🌙', meaning: '直觉、神秘、内在智慧', reversed: '缺乏直觉、秘密、表面知识' },
        { name: '皇后', suit: '👑', meaning: '丰饶、母性、创造力', reversed: '依赖、空虚、缺乏成长' },
        { name: '皇帝', suit: '⚔️', meaning: '权威、结构、控制', reversed: '专制、缺乏纪律、不成熟' },
        { name: '教皇', suit: '📿', meaning: '传统、精神指导、学习', reversed: '反叛、新方法、个人信仰' },
        { name: '恋人', suit: '💕', meaning: '爱情、和谐、选择', reversed: '不和谐、错误选择、失衡' },
        { name: '战车', suit: '🏆', meaning: '胜利、决心、控制', reversed: '缺乏控制、失败、缺乏方向' },
        { name: '力量', suit: '🦁', meaning: '内在力量、勇气、耐心', reversed: '软弱、自我怀疑、缺乏能量' },
        { name: '隐者', suit: '🕯️', meaning: '内省、寻求真理、指导', reversed: '孤立、迷失、拒绝帮助' },
        { name: '命运之轮', suit: '☸️', meaning: '命运、变化、循环', reversed: '厄运、缺乏控制、破坏性循环' },
        { name: '正义', suit: '⚖️', meaning: '公正、真理、法律', reversed: '不公、谎言、缺乏责任' },
        { name: '倒吊人', suit: '🙃', meaning: '牺牲、新视角、等待', reversed: '拖延、抗拒、无意义牺牲' },
        { name: '死神', suit: '💀', meaning: '转变、结束、重生', reversed: '抗拒变化、停滞、恐惧' },
        { name: '节制', suit: '🍷', meaning: '平衡、耐心、中庸', reversed: '不平衡、过度、缺乏耐心' },
        { name: '恶魔', suit: '😈', meaning: '束缚、诱惑、唯物主义', reversed: '释放、启蒙、重获自由' },
        { name: '塔', suit: '🗼', meaning: '突然变化、启示、破坏', reversed: '避免灾难、恐惧变化、延迟启示' },
        { name: '星星', suit: '⭐', meaning: '希望、灵感、指引', reversed: '绝望、缺乏信心、断开连接' },
        { name: '月亮', suit: '🌙', meaning: '幻觉、恐惧、潜意识', reversed: '释放恐惧、内在直觉、克服幻觉' },
        { name: '太阳', suit: '☀️', meaning: '快乐、成功、活力', reversed: '过度乐观、缺乏成功、低能量' },
        { name: '审判', suit: '📯', meaning: '重生、内在呼唤、宽恕', reversed: '严厉判断、自我怀疑、缺乏宽恕' },
        { name: '世界', suit: '🌍', meaning: '完成、成就、旅程结束', reversed: '缺乏完成、寻求外在认可、停滞' }
    ],
    minorArcana: {
        cups: [
            { name: '圣杯一', suit: '🏆', meaning: '新的爱情、情感满足、创造力', reversed: '情感封闭、失望、创造力受阻' },
            { name: '圣杯二', suit: '💑', meaning: '伙伴关系、统一、相互吸引', reversed: '不平衡关系、紧张、缺乏和谐' },
            { name: '圣杯三', suit: '🎉', meaning: '友谊、社区、庆祝', reversed: '过度放纵、八卦、孤立' },
            { name: '圣杯四', suit: '😔', meaning: '冥想、重新评估、无聊', reversed: '动机、新机会、重新参与' },
            { name: '圣杯五', suit: '😢', meaning: '失望、悲伤、失落', reversed: '接受、前进、宽恕' }
        ],
        wands: [
            { name: '权杖一', suit: '🔥', meaning: '灵感、新项目、成长', reversed: '缺乏方向、延迟、缺乏动力' },
            { name: '权杖二', suit: '🗺️', meaning: '规划、决策、个人力量', reversed: '缺乏规划、恐惧未知、缺乏控制' },
            { name: '权杖三', suit: '👁️', meaning: '远见、领导力、扩张', reversed: '缺乏远见、延迟、缺乏进展' },
            { name: '权杖四', suit: '🏠', meaning: '庆祝、和谐、稳定', reversed: '缺乏支持、不稳定、过渡' },
            { name: '权杖五', suit: '⚔️', meaning: '竞争、冲突、分歧', reversed: '避免冲突、内在冲突、紧张释放' }
        ],
        swords: [
            { name: '宝剑一', suit: '⚔️', meaning: '新想法、心理清晰、突破', reversed: '混乱思维、缺乏清晰、创造力受阻' },
            { name: '宝剑二', suit: '🤔', meaning: '困难决策、权衡、僵局', reversed: '决策、权衡结束、清晰' },
            { name: '宝剑三', suit: '💔', meaning: '心碎、悲伤、痛苦', reversed: '恢复、宽恕、前进' },
            { name: '宝剑四', suit: '🧘', meaning: '休息、冥想、恢复', reversed: '不安、缺乏休息、精疲力竭' },
            { name: '宝剑五', suit: '😤', meaning: '冲突、失败、不和谐', reversed: '和解、前进、学习' }
        ],
        pentacles: [
            { name: '金币一', suit: '💰', meaning: '新机会、表现、繁荣', reversed: '失去机会、缺乏规划、贫穷心态' },
            { name: '金币二', suit: '⚖️', meaning: '平衡、适应性、时间管理', reversed: '失衡、过度承诺、混乱' },
            { name: '金币三', suit: '🔨', meaning: '团队合作、学习、实施', reversed: '缺乏团队合作、技能不足、缺乏承诺' },
            { name: '金币四', suit: '🏦', meaning: '安全、控制、保守', reversed: '贪婪、物质主义、财务不安全' },
            { name: '金币五', suit: '🚪', meaning: '财务损失、贫困、孤立', reversed: '财务恢复、精神贫困、寻求帮助' }
        ]
    }
};

// 全局变量
let selectedQuestionType = '';
let selectedSpread = '';
let drawnCards = [];
let currentReading = '';

// 音乐相关变量
let audioContext;
let oscillator;
let gainNode;
let isWebAudioPlaying = false;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    initializeMusic();
});

function setupEventListeners() {
    // 问题类型选择
    document.querySelectorAll('.question-type').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.question-type').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedQuestionType = this.dataset.type;
        });
    });

    // 牌阵选择
    document.querySelectorAll('.spread-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.spread-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            selectedSpread = this.dataset.spread;
        });
    });
}

// 音乐初始化和控制
function initializeMusic() {
    const musicToggle = document.getElementById('musicToggle');
    const volumeControl = document.getElementById('volumeControl');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    // 设置初始音量
    backgroundMusic.volume = 0.3;
    
    // 音乐切换按钮
    musicToggle.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    });
    
    // 音量控制
    volumeControl.addEventListener('input', function() {
        const volume = this.value / 100;
        backgroundMusic.volume = volume;
        if (gainNode) {
            gainNode.gain.setValueAtTime(volume * 0.1, audioContext.currentTime);
        }
    });
    
    // 如果音频文件加载失败，使用Web Audio API生成柔和音调
    backgroundMusic.addEventListener('error', function() {
        console.log('音频文件加载失败，使用Web Audio API生成音乐');
        initWebAudio();
    });
    
    // 尝试自动播放（需要用户交互后才能播放）
    document.addEventListener('click', function() {
        if (backgroundMusic.paused && !isWebAudioPlaying) {
            playMusic();
        }
    }, { once: true });
}

function playMusic() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    backgroundMusic.play().then(() => {
        musicToggle.classList.add('playing');
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    }).catch(() => {
        // 如果HTML5音频播放失败，使用Web Audio API
        if (!isWebAudioPlaying) {
            playWebAudio();
        }
    });
}

function pauseMusic() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    backgroundMusic.pause();
    musicToggle.classList.remove('playing');
    musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    
    if (isWebAudioPlaying) {
        stopWebAudio();
    }
}

function initWebAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // 创建增益节点用于音量控制
        gainNode = audioContext.createGain();
        gainNode.connect(audioContext.destination);
        gainNode.gain.setValueAtTime(0.03, audioContext.currentTime); // 很低的音量
        
    } catch (error) {
        console.log('Web Audio API 不支持');
    }
}

function playWebAudio() {
    if (!audioContext) {
        initWebAudio();
    }
    
    if (audioContext && !isWebAudioPlaying) {
        // 创建多个振荡器产生和谐音调
        createAmbientSound();
        isWebAudioPlaying = true;
        
        const musicToggle = document.getElementById('musicToggle');
        musicToggle.classList.add('playing');
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

function stopWebAudio() {
    // 停止主要振荡器
    if (window.ambientOscillators) {
        window.ambientOscillators.forEach(osc => {
            try {
                osc.stop();
            } catch (e) {
                // 忽略已经停止的振荡器错误
            }
        });
        window.ambientOscillators = null;
    }
    
    if (oscillator) {
        try {
            oscillator.stop();
        } catch (e) {
            // 忽略已经停止的振荡器错误
        }
        oscillator = null;
    }
    
    isWebAudioPlaying = false;
    
    const musicToggle = document.getElementById('musicToggle');
    musicToggle.classList.remove('playing');
    musicToggle.innerHTML = '<i class="fas fa-music"></i>';
}

function createAmbientSound() {
    if (!audioContext) return;
    
    // 神秘深邃音调：基于古老神秘学和宇宙频率
    const baseFrequencies = [
        55.0,    // A1 - 深沉的根基音，象征大地能量
        82.41,   // E2 - 神圣几何频率，增强直觉
        110.0,   // A2 - 心轮共振频率
        136.1,   // C#3 - 地球年频率，连接宇宙
        174.0,   // 古老治疗频率，消除恐惧
        256.87,  // C4 - 根轮频率，稳定能量
        432.0    // A4 - 宇宙频率，和谐共振
    ];
    
    const oscillators = [];
    const gainNodes = [];
    
    // 创建主要音调层
    baseFrequencies.forEach((freq, index) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        // 使用不同波形增加音色丰富度
        const waveTypes = ['sine', 'triangle', 'sawtooth'];
        osc.type = index < 3 ? 'sine' : waveTypes[index % 3];
        osc.frequency.setValueAtTime(freq, audioContext.currentTime);
        
        // 动态音量包络，模拟神秘能量的起伏
        const baseVolume = index < 3 ? 0.08 : 0.04; // 低频更响，高频更轻
        gain.gain.setValueAtTime(0, audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(baseVolume / baseFrequencies.length, audioContext.currentTime + 6);
        gain.gain.exponentialRampToValueAtTime(baseVolume * 0.7 / baseFrequencies.length, audioContext.currentTime + 12);
        
        // 复杂的频率调制，模拟神秘能量波动
        const lfo1 = audioContext.createOscillator();
        const lfo1Gain = audioContext.createGain();
        lfo1.type = 'sine';
        lfo1.frequency.setValueAtTime(0.05 + index * 0.01, audioContext.currentTime); // 极慢调制
        lfo1Gain.gain.setValueAtTime(freq * 0.002, audioContext.currentTime); // 微妙调制深度
        
        const lfo2 = audioContext.createOscillator();
        const lfo2Gain = audioContext.createGain();
        lfo2.type = 'triangle';
        lfo2.frequency.setValueAtTime(0.03 + index * 0.005, audioContext.currentTime); // 更慢的第二层调制
        lfo2Gain.gain.setValueAtTime(freq * 0.001, audioContext.currentTime);
        
        lfo1.connect(lfo1Gain);
        lfo1Gain.connect(osc.frequency);
        lfo2.connect(lfo2Gain);
        lfo2Gain.connect(osc.frequency);
        
        // 多级滤波器链，创造深邃神秘的音色
        const lowpass = audioContext.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.setValueAtTime(400 + index * 80, audioContext.currentTime);
        lowpass.Q.setValueAtTime(3 + index * 0.5, audioContext.currentTime);
        
        const highpass = audioContext.createBiquadFilter();
        highpass.type = 'highpass';
        highpass.frequency.setValueAtTime(30 + index * 5, audioContext.currentTime);
        highpass.Q.setValueAtTime(1, audioContext.currentTime);
        
        // 添加混响效果增强神秘感
        const convolver = audioContext.createConvolver();
        createReverbImpulse(convolver, 3, 0.3); // 3秒混响，30%湿度
        
        const reverbGain = audioContext.createGain();
        reverbGain.gain.setValueAtTime(0.2, audioContext.currentTime);
        
        const dryGain = audioContext.createGain();
        dryGain.gain.setValueAtTime(0.8, audioContext.currentTime);
        
        // 音频路由：振荡器 -> 滤波器链 -> 分离干湿信号 -> 混合
        osc.connect(highpass);
        highpass.connect(lowpass);
        
        // 干信号路径
        lowpass.connect(dryGain);
        dryGain.connect(gain);
        
        // 湿信号路径（混响）
        lowpass.connect(convolver);
        convolver.connect(reverbGain);
        reverbGain.connect(gain);
        
        gain.connect(gainNode);
        
        osc.start();
        lfo1.start();
        lfo2.start();
        
        oscillators.push(osc);
        gainNodes.push(gain);
    });
    
    // 添加神秘的环境音效层
    createMysticalAmbience();
    
    // 保存主振荡器引用用于停止
    oscillator = oscillators[0];
    
    // 存储振荡器以便后续控制
    window.ambientOscillators = oscillators;
    window.ambientGainNodes = gainNodes;
}

// 创建混响脉冲响应
function createReverbImpulse(convolver, duration, decay) {
    const sampleRate = audioContext.sampleRate;
    const length = sampleRate * duration;
    const impulse = audioContext.createBuffer(2, length, sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
        const channelData = impulse.getChannelData(channel);
        for (let i = 0; i < length; i++) {
            const n = length - i;
            channelData[i] = (Math.random() * 2 - 1) * Math.pow(n / length, decay);
        }
    }
    
    convolver.buffer = impulse;
}

// 创建神秘环境音效
function createMysticalAmbience() {
    if (!audioContext) return;
    
    // 风声效果
    const windNoise = audioContext.createBufferSource();
    const windBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 10, audioContext.sampleRate);
    const windData = windBuffer.getChannelData(0);
    
    for (let i = 0; i < windData.length; i++) {
        windData[i] = (Math.random() * 2 - 1) * 0.1 * Math.sin(i * 0.001);
    }
    
    windNoise.buffer = windBuffer;
    windNoise.loop = true;
    
    const windFilter = audioContext.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(200, audioContext.currentTime);
    
    const windGain = audioContext.createGain();
    windGain.gain.setValueAtTime(0.02, audioContext.currentTime);
    
    windNoise.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(gainNode);
    
    windNoise.start();
    
    // 随机神秘音效（如钟声、水滴声）
    setTimeout(() => createRandomMysticalSounds(), Math.random() * 30000 + 15000);
}

// 创建随机神秘音效
function createRandomMysticalSounds() {
    if (!audioContext || !isWebAudioPlaying) return;
    
    const soundTypes = ['bell', 'drop', 'whisper'];
    const soundType = soundTypes[Math.floor(Math.random() * soundTypes.length)];
    
    switch (soundType) {
        case 'bell':
            createBellSound();
            break;
        case 'drop':
            createDropSound();
            break;
        case 'whisper':
            createWhisperSound();
            break;
    }
    
    // 递归调用，创建持续的随机音效
    setTimeout(() => createRandomMysticalSounds(), Math.random() * 60000 + 30000);
}

// 创建钟声效果
function createBellSound() {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, audioContext.currentTime); // 爱的频率
    
    gain.gain.setValueAtTime(0, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 3);
    
    osc.connect(gain);
    gain.connect(gainNode);
    
    osc.start();
    osc.stop(audioContext.currentTime + 3);
}

// 创建水滴声效果
function createDropSound() {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
    
    gain.gain.setValueAtTime(0, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(gainNode);
    
    osc.start();
    osc.stop(audioContext.currentTime + 0.3);
}

// 创建低语声效果
function createWhisperSound() {
    const noise = audioContext.createBufferSource();
    const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.1;
    }
    
    noise.buffer = buffer;
    
    const filter = audioContext.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, audioContext.currentTime);
    filter.Q.setValueAtTime(10, audioContext.currentTime);
    
    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.03, audioContext.currentTime + 0.5);
    gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1.5);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(gainNode);
    
    noise.start();
    noise.stop(audioContext.currentTime + 2);
}

// 开始解读
function startReading() {
    document.getElementById('welcomeSection').style.display = 'none';
    document.getElementById('questionSection').style.display = 'block';
}

// 抽取塔罗牌
function drawCards() {
    const question = document.getElementById('userQuestion').value.trim();
    
    if (!question) {
        alert('请先输入您的问题');
        return;
    }
    
    if (!selectedSpread) {
        alert('请选择一个牌阵');
        return;
    }
    
    document.getElementById('questionSection').style.display = 'none';
    document.getElementById('readingSection').style.display = 'block';
    document.getElementById('shuffling').style.display = 'block';
    document.getElementById('cardsDisplay').style.display = 'none';
    
    // 模拟洗牌过程
    setTimeout(() => {
        performReading(question);
    }, 3000);
}

// 执行解读
function performReading(question) {
    drawnCards = [];
    const cardCount = getCardCount(selectedSpread);
    
    // 随机抽取卡牌
    for (let i = 0; i < cardCount; i++) {
        const card = getRandomCard();
        const isReversed = Math.random() < 0.3; // 30%概率逆位
        drawnCards.push({ ...card, reversed: isReversed, position: getPositionName(selectedSpread, i) });
    }
    
    // 显示卡牌和解读
    displayCards();
    generateReading(question);
    
    document.getElementById('shuffling').style.display = 'none';
    document.getElementById('cardsDisplay').style.display = 'block';
}

// 获取牌阵卡牌数量
function getCardCount(spread) {
    switch (spread) {
        case 'three-card': return 3;
        case 'celtic-cross': return 5; // 简化版凯尔特十字
        case 'relationship': return 2;
        default: return 3;
    }
}

// 获取位置名称
function getPositionName(spread, index) {
    const positions = {
        'three-card': ['过去', '现在', '未来'],
        'celtic-cross': ['现状', '挑战', '过去', '未来', '建议'],
        'relationship': ['你的状态', '对方的状态']
    };
    return positions[spread][index] || `位置${index + 1}`;
}

// 随机获取卡牌
function getRandomCard() {
    const allCards = [];
    
    // 添加大阿卡纳
    allCards.push(...tarotCards.majorArcana);
    
    // 添加小阿卡纳
    Object.values(tarotCards.minorArcana).forEach(suit => {
        allCards.push(...suit);
    });
    
    return allCards[Math.floor(Math.random() * allCards.length)];
}

// 显示卡牌
function displayCards() {
    const container = document.getElementById('drawnCards');
    container.innerHTML = '';
    
    drawnCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = `tarot-card ${card.reversed ? 'reversed' : ''}`;
        cardElement.innerHTML = `
            <div class="card-name">${card.name}</div>
            <div class="card-suit">${card.suit}</div>
            <div class="card-position">${card.position}</div>
            ${card.reversed ? '<div style="font-size: 0.8rem; color: #ff6b6b;">逆位</div>' : ''}
        `;
        
        cardElement.addEventListener('click', () => showCardDetail(card));
        container.appendChild(cardElement);
    });
}

// 生成解读
function generateReading(question) {
    const interpretationElement = document.getElementById('interpretation');
    let interpretation = `<h3>🔮 针对您的问题："${question}"</h3>`;
    
    // 根据问题类型调整解读风格
    const readingStyle = getReadingStyle(selectedQuestionType);
    interpretation += `<div class="reading-intro"><p>${readingStyle.intro}</p></div>`;
    
    // 添加牌阵概述
    interpretation += generateSpreadOverview();
    
    // 逐张详细解读
    interpretation += `<div class="cards-analysis">`;
    drawnCards.forEach((card, index) => {
        interpretation += generateDetailedCardInterpretation(card, index, question);
    });
    interpretation += `</div>`;
    
    // 卡牌间的关系分析
    if (drawnCards.length > 1) {
        interpretation += generateCardRelationshipAnalysis();
    }
    
    // 能量流动分析
    interpretation += generateEnergyAnalysis();
    
    // 时间线分析（如果适用）
    if (selectedSpread === 'three-card') {
        interpretation += generateTimelineAnalysis();
    }
    
    // 具体行动建议
    interpretation += generateActionPlan(question);
    
    // 注意事项和提醒
    interpretation += generateCautions();
    
    // 综合解读 - 整合所有牌的信息
    interpretation += generateComprehensiveReading(question);
    
    interpretationElement.innerHTML = interpretation;
    currentReading = interpretation;
}

// 生成卡牌关系分析
function generateCardRelationshipAnalysis() {
    return `
        <div class="card-relationships">
            <h4>🔗 卡牌关系分析</h4>
            <p>${analyzeCardRelationships()}</p>
        </div>
    `;
}

// 生成能量分析
function generateEnergyAnalysis() {
    return `
        <div class="energy-analysis">
            <h4>⚡ 能量流动分析</h4>
            <p>${analyzeEnergyFlow()}</p>
        </div>
    `;
}

// 生成时间线分析
function generateTimelineAnalysis() {
    if (drawnCards.length !== 3) return '';
    
    const [past, present, future] = drawnCards;
    
    return `
        <div class="timeline-analysis">
            <h4>⏰ 时间线分析</h4>
            <div class="timeline-content">
                <div class="timeline-item">
                    <h5>🕰️ 过去的根源</h5>
                    <p><strong>${past.name}</strong> 揭示了当前情况的根本原因。${getTimelineInterpretation(past, 'past')}</p>
                </div>
                
                <div class="timeline-item">
                    <h5>⏳ 现在的状态</h5>
                    <p><strong>${present.name}</strong> 反映了您当前的处境和需要面对的核心问题。${getTimelineInterpretation(present, 'present')}</p>
                </div>
                
                <div class="timeline-item">
                    <h5>🔮 未来的趋势</h5>
                    <p><strong>${future.name}</strong> 指向了事情的发展方向和可能的结果。${getTimelineInterpretation(future, 'future')}</p>
                </div>
                
                <div class="timeline-synthesis">
                    <h5>🌟 时间线综合</h5>
                    <p>${generateTimelineSynthesis(drawnCards)}</p>
                </div>
            </div>
        </div>
    `;
}

// 获取时间线解读
function getTimelineInterpretation(card, timeframe) {
    const interpretations = {
        'past': {
            '愚者': '您曾经的天真和冒险精神为现在的情况奠定了基础。',
            '魔术师': '过去您展现的创造力和行动力影响着当前的发展。',
            '女祭司': '过去的直觉选择和内在智慧指引着现在的道路。',
            '皇后': '过去的滋养和创造性努力正在开花结果。',
            '皇帝': '过去建立的结构和秩序为现在提供了稳固的基础。'
        },
        'present': {
            '愚者': '现在是一个新的开始，需要您保持开放和勇敢的心态。',
            '魔术师': '您现在拥有实现目标所需的所有工具和能力。',
            '女祭司': '当前需要您更多地倾听内在的声音和直觉。',
            '皇后': '现在是滋养和创造的时期，专注于培育重要的事物。',
            '皇帝': '当前需要更多的结构、纪律和明确的目标。'
        },
        'future': {
            '愚者': '未来将带来新的机会和冒险，保持开放的心态。',
            '魔术师': '您将有机会实现重要的目标和愿望。',
            '女祭司': '未来的答案将通过直觉和内在智慧显现。',
            '皇后': '未来将是丰收和创造性成果的时期。',
            '皇帝': '未来将建立更稳固的基础和更清晰的方向。'
        }
    };
    
    const timeInterpretations = interpretations[timeframe] || {};
    return timeInterpretations[card.name] || `这张牌在${timeframe === 'past' ? '过去' : timeframe === 'present' ? '现在' : '未来'}的位置上提供了重要的洞察。`;
}

// 生成时间线综合分析
function generateTimelineSynthesis(cards) {
    const [past, present, future] = cards;
    
    // 分析能量流动
    const energyFlow = analyzeEnergyProgression(cards);
    
    return `从${past.name}到${present.name}再到${future.name}，我们可以看到一个清晰的发展轨迹。${energyFlow} 这个时间线显示了您的成长过程和未来的可能性，建议您${getTimelineAdvice(cards)}。`;
}

// 分析能量发展
function analyzeEnergyProgression(cards) {
    const energyTypes = {
        '愚者': 'potential', '魔术师': 'active', '女祭司': 'receptive',
        '皇后': 'creative', '皇帝': 'structured', '教皇': 'traditional',
        '恋人': 'choice', '战车': 'determined', '力量': 'inner',
        '隐者': 'introspective'
    };
    
    const progression = cards.map(card => energyTypes[card.name] || 'neutral');
    
    if (progression.includes('potential') && progression.includes('active')) {
        return '能量从潜在状态向积极行动转化';
    } else if (progression.includes('receptive') && progression.includes('creative')) {
        return '能量从接受性向创造性发展';
    } else if (progression.includes('structured') && progression.includes('choice')) {
        return '能量从结构化向选择性演进';
    }
    
    return '能量呈现出独特的发展模式';
}

// 获取时间线建议
function getTimelineAdvice(cards) {
    const [past, present, future] = cards;
    
    if (past.name === '愚者' && future.name === '魔术师') {
        return '将过去的纯真转化为现在的行动力';
    } else if (present.name === '女祭司' && future.name === '皇后') {
        return '相信直觉并将其转化为创造性的成果';
    } else if (past.name === '皇帝' && future.name === '恋人') {
        return '在稳固的基础上做出重要的选择';
    }
    
    return '整合过去的经验，把握现在的机会，创造理想的未来';
}

// 生成行动计划
function generateActionPlan(question) {
    const actions = drawnCards.map(card => getCardActionAdvice(card)).filter(action => action);
    
    let plan = `
        <div class="action-plan">
            <h4>📋 行动计划</h4>
            <div class="action-steps">
                <h5>📝 具体行动步骤</h5>
                <ol>
    `;
    
    actions.forEach((action, index) => {
        plan += `<li>${action}</li>`;
    });
    
    plan += `
                </ol>
            </div>
            
            <div class="timing-advice">
                <h5>⏰ 时机建议</h5>
                <p>${getTimingAdvice(drawnCards)}</p>
            </div>
            
            <div class="priority-focus">
                <h5>🎯 优先关注</h5>
                <p>${getPriorityFocus(drawnCards, question)}</p>
            </div>
        </div>
    `;
    
    return plan;
}

// 获取卡牌行动建议
function getCardActionAdvice(card) {
    const actionAdvices = {
        '愚者': '踏出第一步，不要过度计划，相信过程',
        '魔术师': '整合所有资源，制定明确的行动计划',
        '女祭司': '花时间冥想和内省，倾听内在的指引',
        '皇后': '滋养重要的关系和项目，创造美好的环境',
        '皇帝': '建立清晰的目标和时间表，加强自律',
        '教皇': '寻求导师或专业指导，学习相关知识',
        '恋人': '仔细权衡选项，确保决定符合价值观',
        '战车': '保持专注，克服障碍，坚持到底',
        '力量': '用耐心和温柔处理困难，培养内在力量',
        '隐者': '独处反思，寻求内在答案，避免外界干扰'
    };
    
    return actionAdvices[card.name];
}

// 获取时机建议
function getTimingAdvice(cards) {
    const hasUrgentCards = cards.some(card => ['战车', '魔术师', '愚者'].includes(card.name));
    const hasPatientCards = cards.some(card => ['女祭司', '隐者', '力量'].includes(card.name));
    
    if (hasUrgentCards && !hasPatientCards) {
        return '现在是行动的时候，不要再犹豫。抓住当前的机会，迅速采取行动。';
    } else if (hasPatientCards && !hasUrgentCards) {
        return '耐心是关键。现在需要更多的准备和内在工作，不要急于求成。';
    } else {
        return '平衡行动与耐心。在适当的时候采取行动，在需要时保持等待。';
    }
}

// 获取优先关注点
function getPriorityFocus(cards, question) {
    const focusAreas = {
        'love': '情感连接、沟通质量、个人成长',
        'career': '技能发展、人际网络、目标规划',
        'personal': '内在平衡、自我认知、精神成长',
        'general': '整体平衡、关键决策、长远规划'
    };
    
    const questionFocus = focusAreas[selectedQuestionType] || focusAreas['general'];
    const cardFocus = getCardsFocus(cards);
    
    return `基于您的问题类型，建议优先关注：${questionFocus}。结合卡牌指引，特别需要注意：${cardFocus}。`;
}

// 获取卡牌焦点
function getCardsFocus(cards) {
    const focuses = [];
    
    if (cards.some(card => ['女祭司', '隐者'].includes(card.name))) {
        focuses.push('内在智慧的培养');
    }
    if (cards.some(card => ['魔术师', '战车'].includes(card.name))) {
        focuses.push('行动力的提升');
    }
    if (cards.some(card => ['皇后', '恋人'].includes(card.name))) {
        focuses.push('关系的和谐');
    }
    if (cards.some(card => ['皇帝', '教皇'].includes(card.name))) {
        focuses.push('结构的建立');
    }
    
    return focuses.length > 0 ? focuses.join('、') : '整体平衡的维护';
}

// 生成注意事项
function generateCautions() {
    const cautions = [];
    
    drawnCards.forEach(card => {
        const caution = getCardCaution(card);
        if (caution) cautions.push(caution);
    });
    
    let cautionText = `
        <div class="cautions">
            <h4>⚠️ 注意事项</h4>
            <div class="caution-list">
                <ul>
    `;
    
    cautions.forEach(caution => {
        cautionText += `<li>${caution}</li>`;
    });
    
    cautionText += `
                </ul>
            </div>
            
            <div class="general-caution">
                <p><strong>总体提醒：</strong>${getGeneralCaution(drawnCards)}</p>
            </div>
        </div>
    `;
    
    return cautionText;
}

// 获取卡牌注意事项
function getCardCaution(card) {
    const cautions = {
        '愚者': '避免过度冲动，在重要决定前稍作思考',
        '魔术师': '确保目标现实可行，避免过度自信',
        '女祭司': '不要过度依赖直觉，也要考虑实际情况',
        '皇后': '避免过度付出而忽略自己的需求',
        '皇帝': '不要过于严格或控制，保持灵活性',
        '教皇': '避免盲从传统，保持独立思考',
        '恋人': '不要因为害怕选择而拖延决定',
        '战车': '避免过度强硬，注意方式方法',
        '力量': '不要压抑情感，学会适当表达',
        '隐者': '避免过度孤立，保持必要的社交'
    };
    
    return cautions[card.name];
}

// 获取总体注意事项
function getGeneralCaution(cards) {
    const hasReversed = cards.some(card => card.reversed);
    const majorArcanaCount = cards.filter(card => tarotCards.majorArcana.some(major => major.name === card.name)).length;
    
    if (hasReversed) {
        return '注意到有逆位卡牌出现，这提醒您需要更加谨慎地处理相关问题，可能需要重新审视某些方面。';
    } else if (majorArcanaCount === cards.length) {
        return '全部为大阿卡纳牌，表明这是人生中的重要时期，您的决定将产生深远影响。';
    } else {
        return '保持平衡的心态，既要积极行动，也要保持耐心和智慧。';
    }
}

// 获取解读风格
function getReadingStyle(questionType) {
    const styles = {
        general: {
            intro: '塔罗牌为您揭示了当前情况的深层含义，通过古老的智慧符号，我们将一层层解开您内心的疑问，找到前进的方向。'
        },
        love: {
            intro: '在爱情的神圣殿堂中，塔罗牌如同月光下的明镜，映照出情感世界的真实面貌。让我们深入探索您心中的爱情密码。'
        },
        career: {
            intro: '事业如同一场精心策划的棋局，每一步都关乎全局。塔罗牌将为您揭示隐藏的机遇、潜在的挑战，以及通往成功的最佳路径。'
        },
        personal: {
            intro: '个人成长是一场内在的炼金术，塔罗牌将帮助您认识真实的自我，发现内在的宝藏，并指引您走向更高的人生境界。'
        }
    };
    return styles[questionType] || styles.general;
}

// 生成牌阵概述
function generateSpreadOverview() {
    const overviews = {
        'three-card': `
            <div class="spread-overview">
                <h4>📊 三张牌牌阵解析</h4>
                <p>这个经典的三张牌牌阵代表了时间的流动：过去的根源、现在的状态、未来的趋势。它揭示了事件的发展脉络，帮助您理解问题的来龙去脉。</p>
            </div>
        `,
        'celtic-cross': `
            <div class="spread-overview">
                <h4>📊 凯尔特十字牌阵解析</h4>
                <p>凯尔特十字是塔罗中最具洞察力的牌阵之一。它从多个维度审视您的问题：核心状况、面临挑战、过去影响、未来可能，以及最重要的指导建议。</p>
            </div>
        `,
        'relationship': `
            <div class="spread-overview">
                <h4>📊 关系牌阵解析</h4>
                <p>这个牌阵专门用于探索人际关系的动态。通过对比双方的状态和感受，揭示关系中的和谐与冲突，为改善关系提供智慧指引。</p>
            </div>
        `
    };
    return overviews[selectedSpread] || overviews['three-card'];
}

// 获取原始卡牌数据
function getOriginalCardData(cardName) {
    // 在大阿卡纳中查找
    let card = tarotCards.majorArcana.find(c => c.name === cardName);
    if (card) return card;
    
    // 在小阿卡纳中查找
    for (const suit in tarotCards.minorArcana) {
        card = tarotCards.minorArcana[suit].find(c => c.name === cardName);
        if (card) return card;
    }
    
    // 如果找不到，返回默认值
    return { meaning: '未知含义', reversed: '未知逆位含义' };
}

// 生成详细卡牌解读
function generateDetailedCardInterpretation(card, index, question) {
    // 获取原始卡牌数据
    const originalCard = getOriginalCardData(card.name);
    const meaning = card.reversed ? originalCard.reversed : originalCard.meaning;
    const symbolism = getCardSymbolism(card);
    const contextualMeaning = getContextualMeaning(card, selectedQuestionType);
    const positionalSignificance = generatePositionalInterpretation(card, selectedSpread, index);
    
    return `
        <div class="card-interpretation">
            <h4>🃏 ${card.position} - ${card.name}${card.reversed ? ' (逆位)' : ''}</h4>
            
            <div class="card-meaning">
                <h5>💫 核心含义</h5>
                <p><strong>${meaning}</strong></p>
            </div>
            
            <div class="card-symbolism">
                <h5>🔍 象征意义</h5>
                <p>${symbolism}</p>
            </div>
            
            <div class="contextual-meaning">
                <h5>🎯 在您问题中的意义</h5>
                <p>${contextualMeaning}</p>
            </div>
            
            <div class="positional-meaning">
                <h5>📍 位置解读</h5>
                <p>${positionalSignificance}</p>
            </div>
            
            <div class="practical-advice">
                <h5>💡 实用建议</h5>
                <p>${generateCardAdvice(card, question)}</p>
            </div>
        </div>
    `;
}

// 获取卡牌象征意义
function getCardSymbolism(card) {
    const symbolisms = {
        '愚者': '愚者代表纯真的开始和无限的可能性。他站在悬崖边，象征着信念的跳跃和对未知的勇敢探索。',
        '魔术师': '魔术师掌握四大元素的力量，代表将想法转化为现实的能力。他是意志力和创造力的完美结合。',
        '女祭司': '女祭司坐在智慧的门槛上，代表直觉、潜意识和内在知识。她提醒我们倾听内心的声音。',
        '皇后': '皇后象征着丰饶的大地母亲，代表创造力、滋养和自然的力量。她是生命力和美的化身。',
        '皇帝': '皇帝代表秩序、权威和稳定的结构。他是理性思维和领导力的象征。',
        '教皇': '教皇是精神导师和传统智慧的守护者，代表学习、指导和精神成长。',
        '恋人': '恋人牌象征着选择、和谐和深层的连接。它代表爱情，也代表人生重要的抉择时刻。',
        '战车': '战车代表意志力的胜利和方向的明确。它象征着通过决心和控制力获得成功。',
        '力量': '力量牌展现的不是蛮力，而是内在的勇气和温柔的坚持。它代表驯服内心野兽的智慧。',
        '隐者': '隐者手持明灯，代表内省、寻求真理和精神指引。他象征着通过独处获得智慧。'
    };
    
    return symbolisms[card.name] || `${card.name}承载着深刻的象征意义，代表着人生旅程中的重要课题和成长机会。`;
}

// 获取情境化含义
function getContextualMeaning(card, questionType) {
    const contexts = {
        'love': {
            '愚者': '在爱情中，愚者鼓励您以开放的心态迎接新的感情机会，不要被过去的经历束缚。',
            '魔术师': '您拥有吸引理想伴侣的所有条件，关键是要相信自己的魅力并积极行动。',
            '女祭司': '倾听您的直觉，它会告诉您这段感情的真实状况。有些事情需要时间来揭示。',
            '恋人': '这是一个关于选择的时刻，您需要在不同的感情选项中做出决定。'
        },
        'career': {
            '愚者': '这是开始新事业或项目的绝佳时机，不要害怕踏出第一步。',
            '魔术师': '您具备了成功所需的所有技能和资源，现在需要的是行动力。',
            '皇帝': '建立稳固的基础和清晰的目标对您的事业发展至关重要。',
            '战车': '通过坚定的意志和明确的方向，您将在事业上取得重大突破。'
        },
        'personal': {
            '愚者': '这是个人成长的新阶段，准备好迎接内在的转变和新的自我发现。',
            '隐者': '现在是深入内省的时候，通过独处和反思来寻找人生的答案。',
            '力量': '您正在学习如何平衡内在的不同力量，这是成熟和智慧的表现。',
            '女祭司': '相信您的直觉和内在智慧，它们是您最可靠的指南。'
        }
    };
    
    const typeContexts = contexts[questionType] || contexts['general'] || {};
    return typeContexts[card.name] || `在您当前的情况下，${card.name}提醒您关注${card.meaning.split('、')[0]}的重要性。`;
}

// 生成卡牌建议
function generateCardAdvice(card, question) {
    const advices = {
        '愚者': '保持初学者的心态，勇敢地踏出第一步。相信过程，即使道路不明确。',
        '魔术师': '现在是将想法付诸行动的时候。集中您的意志力，运用所有可用的资源。',
        '女祭司': '静下心来倾听内在的声音。答案可能不会立即显现，需要耐心等待。',
        '皇后': '滋养您的创意项目和人际关系。现在是播种和培育的时候。',
        '皇帝': '建立清晰的结构和目标。用理性和纪律来指导您的行动。',
        '教皇': '寻求导师的指导或学习传统的智慧。不要害怕寻求帮助。',
        '恋人': '仔细考虑您的选择，确保它们与您的价值观一致。',
        '战车': '保持专注和决心。克服障碍需要坚定的意志力。',
        '力量': '用温柔而坚定的方式处理挑战。内在的力量比外在的力量更重要。',
        '隐者': '花时间独处和反思。寻求内在的指引而不是外在的认可。'
    };
    
    return advices[card.name] || `根据${card.name}的指引，建议您在处理相关问题时保持开放和积极的态度。`;
}

// 生成位置解读
function generatePositionalInterpretation(card, spread, index) {
    const interpretations = {
        'three-card': [
            `这张牌反映了过去的经历如何影响着您当前的状况。${card.name}提醒您要从过往中汲取智慧。`,
            `当前的情况需要您关注${card.name}所代表的能量。这是您现在最需要理解和运用的力量。`,
            `未来的发展趋势指向${card.name}的能量。准备好迎接这种变化，并积极应对。`
        ],
        'celtic-cross': [
            `这是您当前情况的核心，${card.name}代表了您现在面临的主要主题。`,
            `这张牌显示了您需要克服的挑战或阻碍，${card.name}提醒您要有所准备。`,
            `过去的影响仍在发挥作用，${card.name}帮助您理解历史如何塑造现在。`,
            `这是可能的未来发展，${card.name}为您指明了前进的方向。`,
            `最重要的建议来自${card.name}，这是您应该采取的行动或态度。`
        ],
        'relationship': [
            `这张牌反映了您在这段关系中的状态和感受，${card.name}揭示了您的内心世界。`,
            `这代表了对方的状态和感受，${card.name}帮助您理解对方的视角。`
        ]
    };
    
    return interpretations[spread][index] || `${card.name}在这个位置为您带来重要的启示。`;
}

// 生成整体建议
function generateOverallAdvice() {
    const advices = [
        '记住，塔罗牌是一面镜子，反映的是您内在的智慧。相信自己的直觉，它会指引您走向正确的道路。',
        '这次解读提醒您要保持开放的心态，接受变化带来的机遇。每一个挑战都是成长的机会。',
        '塔罗牌的智慧告诉我们，您拥有解决问题的所有资源。关键是要相信自己，勇敢地采取行动。',
        '这些卡牌的组合显示了一个完整的故事。将这些信息整合起来，您会发现答案就在您的心中。',
        '请记住，未来不是固定的。您的选择和行动会影响最终的结果。用这次解读作为指引，创造您想要的未来。'
    ];
    
    return advices[Math.floor(Math.random() * advices.length)];
}

// 显示卡牌详情
function showCardDetail(card) {
    const originalCard = getOriginalCardData(card.name);
    const meaning = card.reversed ? originalCard.reversed : originalCard.meaning;
    alert(`${card.name}${card.reversed ? ' (逆位)' : ''}\n\n含义：${meaning}\n\n在您的解读中，这张牌代表：${card.position}`);
}

// 获取详细解读
function getDetailedReading() {
    const detailedInterpretation = `
        <h3>深度解读</h3>
        <p>让我为您提供更深入的洞察...</p>
        <h4>卡牌之间的关系</h4>
        <p>${analyzeCardRelationships()}</p>
        <h4>能量流动</h4>
        <p>${analyzeEnergyFlow()}</p>
        <h4>行动建议</h4>
        <p>${generateActionAdvice()}</p>
    `;
    
    document.getElementById('interpretation').innerHTML = currentReading + detailedInterpretation;
}

// 分析卡牌关系
function analyzeCardRelationships() {
    if (drawnCards.length < 2) return '单张卡牌的解读已经很完整了。';
    
    const relationships = [
        '这些卡牌之间形成了一个和谐的能量流，相互支持和增强。',
        '卡牌之间存在一些张力，这提醒您需要在不同的力量之间找到平衡。',
        '这些卡牌讲述了一个转变的故事，从挑战走向解决方案。',
        '卡牌的组合显示了内在与外在世界的对话，需要您整合这些不同的视角。'
    ];
    
    return relationships[Math.floor(Math.random() * relationships.length)];
}

// 分析能量流动
function analyzeEnergyFlow() {
    const energies = [
        '当前的能量流动是积极向上的，支持您的目标实现。',
        '能量流动中有一些阻塞，需要您主动清理和调整。',
        '能量正在发生转换，这是一个重要的转折点。',
        '多种能量在您周围汇聚，创造了丰富的可能性。'
    ];
    
    return energies[Math.floor(Math.random() * energies.length)];
}

// 生成行动建议
function generateActionAdvice() {
    const actions = [
        '建议您在接下来的几天里多关注内心的声音，通过冥想或安静的思考来获得更多洞察。',
        '现在是采取行动的好时机，不要犹豫，相信您的判断并勇敢前进。',
        '建议您寻求他人的建议和支持，集体的智慧会帮助您看到更多可能性。',
        '这是一个需要耐心的时期，让事情自然发展，同时保持开放和准备的状态。',
        '关注您的直觉和梦境，它们可能会为您带来重要的信息和指引。'
    ];
    
    return actions[Math.floor(Math.random() * actions.length)];
}

// 生成综合解读
function generateComprehensiveReading(question) {
    return `
        <div class="comprehensive-reading">
            <h4>🌟 深度综合解读</h4>
            <div class="comprehensive-content">
                <div class="reading-summary">
                    <h5>📋 解读总结</h5>
                    <div class="summary-content">
                        ${generateReadingSummary(question)}
                    </div>
                </div>
                
                <div class="overall-theme">
                    <h5>🎯 核心主题</h5>
                    <p>${getOverallTheme()}</p>
                </div>
                
                <div class="cards-interaction">
                    <h5>🔄 牌组互动分析</h5>
                    <p>${analyzeCardsInteraction()}</p>
                </div>
                
                <div class="energy-synthesis">
                    <h5>⚡ 整体能量状态</h5>
                    <p>${synthesizeOverallEnergy()}</p>
                </div>
                
                <div class="psychological-insights">
                    <h5>🧠 心理层面洞察</h5>
                    <p>${generatePsychologicalInsights()}</p>
                </div>
                
                <div class="practical-advice">
                    <h5>💡 实用建议</h5>
                    <div class="advice-list">
                        ${generatePracticalAdvice(question)}
                    </div>
                </div>
                
                <div class="final-guidance">
                    <h5>🧭 最终指引</h5>
                    <p>${provideFinalGuidance(question)}</p>
                </div>
                
                <div class="spiritual-message">
                    <h5>✨ 灵性讯息</h5>
                    <p>${getSpiritualMessage()}</p>
                </div>
                
                <div class="reading-conclusion">
                    <h5>🎯 解读结论</h5>
                    <div class="conclusion-content">
                        ${generateReadingConclusion(question)}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 获取整体主题
function getOverallTheme() {
    const majorArcanaCount = drawnCards.filter(card => 
        tarotCards.majorArcana.some(major => major.name === card.name)
    ).length;
    
    const reversedCount = drawnCards.filter(card => card.reversed).length;
    
    let theme = '';
    
    // 根据大牌数量判断主题深度
    if (majorArcanaCount >= drawnCards.length * 0.7) {
        theme += '这次解读涉及深层的人生课题和重要的生命转折。';
    } else if (majorArcanaCount > 0) {
        theme += '这次解读结合了日常事务和更深层的人生意义。';
    } else {
        theme += '这次解读主要关注具体的日常生活层面。';
    }
    
    // 根据逆位牌数量判断挑战程度
    if (reversedCount >= drawnCards.length * 0.5) {
        theme += '当前存在较多需要内省和调整的方面，这是成长的机会。';
    } else if (reversedCount > 0) {
        theme += '整体趋势积极，但仍有一些需要注意的细节。';
    } else {
        theme += '能量流动顺畅，是实现目标的有利时期。';
    }
    
    return theme;
}

// 分析牌组互动
function analyzeCardsInteraction() {
    if (drawnCards.length === 1) {
        return `${drawnCards[0].name}作为唯一的指引，为您的问题提供了明确而集中的答案。这张牌的能量将是您当前最需要关注的焦点。`;
    }
    
    let interaction = '';
    
    // 分析相邻牌的关系
    for (let i = 0; i < drawnCards.length - 1; i++) {
        const currentCard = drawnCards[i];
        const nextCard = drawnCards[i + 1];
        
        interaction += analyzeCardPairRelationship(currentCard, nextCard, i);
    }
    
    // 分析整体平衡
    const elements = analyzeElementalBalance();
    interaction += `从元素角度看，${elements}`;
    
    return interaction;
}

// 分析两张牌的关系
function analyzeCardPairRelationship(card1, card2, position) {
    const relationships = {
        'complementary': ['这两张牌形成了互补的能量，', '它们之间存在和谐的共振，', '这种组合创造了平衡的力量，'],
        'conflicting': ['这两张牌之间存在一定的张力，', '它们代表了需要平衡的对立面，', '这种对比揭示了内在的冲突，'],
        'progressive': ['这两张牌显示了发展的进程，', '它们描绘了从一种状态到另一种状态的转变，', '这种序列展现了成长的轨迹，']
    };
    
    // 简化的关系判断逻辑
    const relationshipType = Math.random() > 0.7 ? 'conflicting' : Math.random() > 0.5 ? 'progressive' : 'complementary';
    const descriptions = relationships[relationshipType];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    return `${description}${card1.name}与${card2.name}的结合为您的情况提供了重要洞察。`;
}

// 分析元素平衡
function analyzeElementalBalance() {
    const elements = { fire: 0, water: 0, air: 0, earth: 0 };
    
    drawnCards.forEach(card => {
        // 简化的元素分配逻辑
        if (card.name.includes('权杖') || ['魔术师', '力量', '太阳'].includes(card.name)) {
            elements.fire++;
        } else if (card.name.includes('圣杯') || ['女祭司', '月亮', '星星'].includes(card.name)) {
            elements.water++;
        } else if (card.name.includes('宝剑') || ['愚者', '正义', '审判'].includes(card.name)) {
            elements.air++;
        } else {
            elements.earth++;
        }
    });
    
    const dominant = Object.keys(elements).reduce((a, b) => elements[a] > elements[b] ? a : b);
    const elementMeanings = {
        fire: '火元素占主导，表明这是一个充满激情和行动力的时期',
        water: '水元素占主导，强调情感、直觉和精神层面的重要性',
        air: '风元素占主导，突出思考、沟通和新想法的价值',
        earth: '土元素占主导，关注实际、稳定和物质层面的建设'
    };
    
    return elementMeanings[dominant] + '。';
}

// 综合整体能量
function synthesizeOverallEnergy() {
    const positiveCards = drawnCards.filter(card => !card.reversed).length;
    const totalCards = drawnCards.length;
    const positiveRatio = positiveCards / totalCards;
    
    let energyDescription = '';
    
    if (positiveRatio >= 0.8) {
        energyDescription = '整体能量非常积极向上，这是实现目标和愿望的绝佳时机。宇宙的力量正在支持您的努力，保持信心并勇敢前进。';
    } else if (positiveRatio >= 0.6) {
        energyDescription = '整体能量趋向积极，虽然可能遇到一些小挑战，但总体方向是正面的。保持乐观的态度，困难只是暂时的。';
    } else if (positiveRatio >= 0.4) {
        energyDescription = '当前能量处于平衡状态，既有机遇也有挑战。这是一个需要谨慎思考和明智选择的时期，每个决定都很重要。';
    } else {
        energyDescription = '当前能量较为沉重，可能面临一些困难和阻碍。但请记住，这也是深度转化和成长的机会，困境中往往蕴含着突破的种子。';
    }
    
    return energyDescription;
}

// 提供最终指引
function provideFinalGuidance(question) {
    const questionTypes = {
        'love': '在爱情方面',
        'career': '在事业发展上',
        'health': '在健康问题上',
        'spiritual': '在精神成长上',
        'general': '在您关心的问题上'
    };
    
    const questionContext = questionTypes[selectedQuestionType] || '针对您的问题';
    
    const guidanceTemplates = [
        `${questionContext}，塔罗牌建议您相信内在的智慧，同时保持开放的心态接受新的可能性。`,
        `${questionContext}，关键在于找到平衡点，既要积极行动，也要有耐心等待合适的时机。`,
        `${questionContext}，重要的是保持真实的自我，不要为了迎合他人而失去自己的本质。`,
        `${questionContext}，建议您专注于当下，同时为未来做好准备，每一步都要走得踏实。`,
        `${questionContext}，信任生命的流动，有些事情需要时间来展现，急躁只会适得其反。`
    ];
    
    const baseGuidance = guidanceTemplates[Math.floor(Math.random() * guidanceTemplates.length)];
    
    // 根据牌组特点添加具体建议
    let specificAdvice = '';
    const majorArcanaCount = drawnCards.filter(card => 
        tarotCards.majorArcana.some(major => major.name === card.name)
    ).length;
    
    if (majorArcanaCount > 0) {
        specificAdvice += '这次解读涉及重要的人生课题，建议您认真对待并深入思考其中的含义。';
    }
    
    return baseGuidance + specificAdvice;
}

// 生成解读总结
function generateReadingSummary(question) {
    const cardNames = drawnCards.map(card => card.name + (card.reversed ? '(逆位)' : '')).join('、');
    const majorArcanaCount = drawnCards.filter(card => 
        tarotCards.majorArcana.some(major => major.name === card.name)
    ).length;
    const reversedCount = drawnCards.filter(card => card.reversed).length;
    
    let summary = `<div class="summary-overview">`;
    summary += `<p><strong>问题焦点：</strong>${question}</p>`;
    summary += `<p><strong>抽取卡牌：</strong>${cardNames}</p>`;
    summary += `<p><strong>牌阵类型：</strong>${getSpreadName(selectedSpread)}</p>`;
    
    // 分析卡牌构成
    let composition = '';
    if (majorArcanaCount > 0) {
        composition += `包含${majorArcanaCount}张大阿卡纳牌，表明涉及重要的人生课题；`;
    }
    if (reversedCount > 0) {
        composition += `有${reversedCount}张逆位牌，提示需要内省和调整的方面；`;
    }
    if (composition) {
        summary += `<p><strong>牌组特征：</strong>${composition}</p>`;
    }
    
    // 核心信息提取
    const coreMessage = extractCoreMessage();
    summary += `<p><strong>核心信息：</strong>${coreMessage}</p>`;
    
    summary += `</div>`;
    return summary;
}

// 提取核心信息
function extractCoreMessage() {
    const themes = [];
    
    drawnCards.forEach(card => {
        if (card.name === '愚者') themes.push('新的开始和冒险');
        else if (card.name === '魔术师') themes.push('创造力和行动力');
        else if (card.name === '女祭司') themes.push('直觉和内在智慧');
        else if (card.name === '皇后') themes.push('滋养和创造');
        else if (card.name === '皇帝') themes.push('权威和结构');
        else if (card.name === '教皇') themes.push('传统和指导');
        else if (card.name === '恋人') themes.push('选择和关系');
        else if (card.name === '战车') themes.push('意志力和前进');
        else if (card.name === '力量') themes.push('内在力量和勇气');
        else if (card.name === '隐者') themes.push('内省和寻找答案');
        else if (card.name === '命运之轮') themes.push('变化和机遇');
        else if (card.name === '正义') themes.push('平衡和公正');
        else if (card.name === '倒吊人') themes.push('牺牲和新视角');
        else if (card.name === '死神') themes.push('转变和重生');
        else if (card.name === '节制') themes.push('平衡和调和');
        else if (card.name === '恶魔') themes.push('束缚和诱惑');
        else if (card.name === '塔') themes.push('突然变化和觉醒');
        else if (card.name === '星星') themes.push('希望和指引');
        else if (card.name === '月亮') themes.push('幻象和潜意识');
        else if (card.name === '太阳') themes.push('成功和喜悦');
        else if (card.name === '审判') themes.push('觉醒和重新开始');
        else if (card.name === '世界') themes.push('完成和成就');
        else themes.push('日常生活的具体事务');
    });
    
    if (themes.length === 1) {
        return `这次解读的核心主题是${themes[0]}，为您的问题提供了明确的指引方向。`;
    } else {
        return `这次解读涉及${themes.slice(0, 2).join('、')}等多个主题，显示了情况的复杂性和多面性。`;
    }
}

// 获取牌阵名称
function getSpreadName(spread) {
    const names = {
        'three-card': '三张牌展开（过去·现在·未来）',
        'celtic-cross': '凯尔特十字',
        'relationship': '关系解读',
        'single-card': '单张牌解读'
    };
    return names[spread] || '自定义牌阵';
}

// 生成心理层面洞察
function generatePsychologicalInsights() {
    const reversedCards = drawnCards.filter(card => card.reversed);
    const majorCards = drawnCards.filter(card => 
        tarotCards.majorArcana.some(major => major.name === card.name)
    );
    
    let insights = '';
    
    // 分析内在状态
    if (reversedCards.length > drawnCards.length / 2) {
        insights += '您当前可能正在经历内在的冲突或自我怀疑，这是成长过程中的正常现象。建议您多关注内心的声音，通过自我反思来找到平衡点。';
    } else if (reversedCards.length > 0) {
        insights += '您在某些方面可能需要调整心态或改变方法，但整体的心理状态是积极的。保持开放的心态，接受必要的改变。';
    } else {
        insights += '您的心理状态相对稳定和积极，这为实现目标提供了良好的内在基础。继续保持这种正面的心态。';
    }
    
    // 分析成长阶段
    if (majorCards.length > 0) {
        insights += '从心理发展的角度看，您正处在一个重要的成长阶段，这些经历将对您的人格发展产生深远影响。';
    }
    
    // 添加具体的心理建议
    const psychologicalAdvice = [
        '建议您通过冥想或日记来增强自我觉察能力。',
        '考虑寻求专业的心理咨询或与信任的朋友交流。',
        '关注您的情绪模式，学会健康地表达和处理情感。',
        '培养自我同情心，对自己的不完美保持宽容。',
        '建立健康的边界，学会说"不"并保护自己的能量。'
    ];
    
    insights += psychologicalAdvice[Math.floor(Math.random() * psychologicalAdvice.length)];
    
    return insights;
}

// 生成实用建议
function generatePracticalAdvice(question) {
    const questionType = selectedQuestionType;
    let adviceList = [];
    
    // 根据问题类型生成针对性建议
    if (questionType === 'love') {
        adviceList = [
            '💕 在感情中保持真实的自我，不要为了迎合对方而改变本质',
            '🗣️ 加强沟通，诚实地表达您的感受和需求',
            '⏰ 给关系一些时间和空间来自然发展',
            '🌱 关注个人成长，一个完整的人才能建立健康的关系',
            '💝 学会爱自己，这是爱他人的基础'
        ];
    } else if (questionType === 'career') {
        adviceList = [
            '🎯 明确您的职业目标和价值观，确保工作与内心一致',
            '📚 持续学习新技能，保持竞争力',
            '🤝 建立良好的人际关系网络，机会往往来自人脉',
            '💼 考虑寻求导师的指导或专业建议',
            '⚖️ 在工作和生活之间找到平衡点'
        ];
    } else if (questionType === 'health') {
        adviceList = [
            '🏃‍♀️ 建立规律的运动习惯，身体健康是一切的基础',
            '🥗 注意饮食营养，选择对身体有益的食物',
            '😴 保证充足的睡眠，让身体得到充分休息',
            '🧘‍♀️ 学会管理压力，通过冥想或其他方式放松心情',
            '👨‍⚕️ 定期体检，预防胜于治疗'
        ];
    } else {
        adviceList = [
            '📝 制定清晰的行动计划，将目标分解为可执行的步骤',
            '🎯 专注于您能控制的事情，放下无法改变的部分',
            '🌟 保持积极的心态，相信自己有能力克服困难',
            '🤝 寻求支持，不要独自承担所有压力',
            '📈 从每次经历中学习，将挫折转化为成长的机会'
        ];
    }
    
    // 根据卡牌添加特定建议
    drawnCards.forEach(card => {
        if (card.name === '魔术师') {
            adviceList.push('🎭 发挥您的创造力和领导能力，主动创造机会');
        } else if (card.name === '女祭司') {
            adviceList.push('🔮 相信您的直觉，在安静中寻找答案');
        } else if (card.name === '隐者') {
            adviceList.push('🕯️ 花时间独处和反思，内在的智慧会指引您');
        } else if (card.name === '死神') {
            adviceList.push('🦋 拥抱变化，放下不再服务您的旧模式');
        }
    });
    
    // 随机选择3-5个建议
    const selectedAdvice = adviceList.sort(() => 0.5 - Math.random()).slice(0, Math.min(5, adviceList.length));
    
    return selectedAdvice.map(advice => `<div class="advice-item">${advice}</div>`).join('');
}

// 生成解读结论
function generateReadingConclusion(question) {
    const positiveRatio = drawnCards.filter(card => !card.reversed).length / drawnCards.length;
    const majorArcanaCount = drawnCards.filter(card => 
        tarotCards.majorArcana.some(major => major.name === card.name)
    ).length;
    
    let conclusion = '<div class="conclusion-summary">';
    
    // 总体趋势判断
    if (positiveRatio >= 0.7) {
        conclusion += '<p><strong>总体趋势：</strong>🌟 非常积极，您的问题有很大可能得到满意的解决。</p>';
    } else if (positiveRatio >= 0.5) {
        conclusion += '<p><strong>总体趋势：</strong>📈 基本积极，虽有挑战但前景乐观。</p>';
    } else {
        conclusion += '<p><strong>总体趋势：</strong>⚠️ 需要谨慎应对，但困难中蕴含转机。</p>';
    }
    
    // 重要性评估
    if (majorArcanaCount > 0) {
        conclusion += '<p><strong>重要程度：</strong>🎯 这个问题对您的人生发展具有重要意义，值得认真对待。</p>';
    } else {
        conclusion += '<p><strong>重要程度：</strong>📋 这是日常生活层面的问题，相对容易处理。</p>';
    }
    
    // 时间建议
    const timeAdvice = [
        '建议在接下来的1-3个月内密切关注相关发展',
        '这个问题可能需要较长时间来解决，保持耐心很重要',
        '近期就会有明显的进展，请做好准备迎接变化',
        '时机很重要，等待合适的机会再行动'
    ];
    conclusion += `<p><strong>时间建议：</strong>⏰ ${timeAdvice[Math.floor(Math.random() * timeAdvice.length)]}</p>`;
    
    // 最终提醒
    conclusion += '<p><strong>最终提醒：</strong>🙏 塔罗牌提供的是指引而非绝对预言，最终的选择权始终在您手中。相信自己的判断，勇敢地走向属于您的未来。</p>';
    
    conclusion += '</div>';
    return conclusion;
}

// 获取灵性讯息
function getSpiritualMessage() {
    const messages = [
        '宇宙正在为您安排最好的结果，即使过程可能不如预期，但最终的收获会超出您的想象。相信生命的智慧，一切都在完美的时机发生。',
        '您的灵魂正在经历重要的成长阶段，每一个挑战都是为了帮助您发现内在的力量。拥抱变化，它是您进化的催化剂。',
        '内在的声音比外在的噪音更值得倾听。在安静中寻找答案，在冥想中获得指引，您的直觉永远不会欺骗您。',
        '爱是宇宙最强大的力量，无论面对什么困难，都要保持心中的爱与慈悲。爱自己，爱他人，爱这个不完美但美丽的世界。',
        '您比自己想象的更强大，更智慧，更有能力。不要低估自己的潜力，勇敢地踏出舒适圈，去拥抱属于您的精彩人生。',
        '生命是一场美丽的旅程，不要太过执着于目的地，而忽略了沿途的风景。享受当下的每一个瞬间，它们都是珍贵的礼物。'
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
}

// 重新洗牌
function shuffleAgain() {
    const question = document.getElementById('userQuestion').value.trim();
    if (question) {
        document.getElementById('cardsDisplay').style.display = 'none';
        document.getElementById('shuffling').style.display = 'block';
        
        setTimeout(() => {
            performReading(question);
        }, 2000);
    }
}

// 新的解读
function newReading() {
    // 重置所有状态
    selectedQuestionType = '';
    selectedSpread = '';
    drawnCards = [];
    currentReading = '';
    
    // 清除选择状态
    document.querySelectorAll('.question-type').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.spread-option').forEach(option => option.classList.remove('selected'));
    
    // 清空输入
    document.getElementById('userQuestion').value = '';
    
    // 显示欢迎页面
    document.getElementById('readingSection').style.display = 'none';
    document.getElementById('questionSection').style.display = 'none';
    document.getElementById('welcomeSection').style.display = 'block';
}

// 添加一些交互效果
document.addEventListener('DOMContentLoaded', function() {
    // 为卡牌添加悬停效果
    document.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('tarot-card')) {
            e.target.style.transform = e.target.classList.contains('reversed') 
                ? 'rotate(180deg) translateY(-10px) scale(1.05)' 
                : 'translateY(-10px) scale(1.05)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.classList.contains('tarot-card')) {
            e.target.style.transform = e.target.classList.contains('reversed') 
                ? 'rotate(180deg)' 
                : 'none';
        }
    });
});