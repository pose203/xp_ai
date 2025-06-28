import React, { useState, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import SpreadSelection from './components/SpreadSelection';
import DrawingScreen from './components/DrawingScreen';
import TarotCard from './components/TarotCard';

// 塔罗牌数据
const TAROT_CARDS = {
  major: [
    { id: 0, name: '愚者', nameEn: 'The Fool', element: '风', meaning: '新开始、冒险、纯真、自发性', reverseMeaning: '鲁莽、缺乏计划、愚蠢行为' },
    { id: 1, name: '魔术师', nameEn: 'The Magician', element: '火', meaning: '意志力、技能、专注、表现', reverseMeaning: '操控、欺骗、缺乏技能' },
    // ... 其他主牌数据
  ],
  minor: {
    wands: [
      { id: 'w1', name: '权杖王牌', meaning: '新创意、灵感、成长机会', reverseMeaning: '缺乏方向、创意阻塞' },
      // ... 其他小牌数据
    ],
    cups: [
      { id: 'c1', name: '圣杯王牌', meaning: '新爱情、情感满足、灵性', reverseMeaning: '情绪阻塞、心灵空虚' },
      // ... 其他小牌数据
    ],
    swords: [
      { id: 's1', name: '宝剑王牌', meaning: '新想法、清晰思维、突破', reverseMeaning: '混乱、误解、缺乏清晰' },
      // ... 其他小牌数据
    ],
    pentacles: [
      { id: 'p1', name: '钱币王牌', meaning: '新机会、物质显现、繁荣', reverseMeaning: '错失机会、缺乏计划' },
      // ... 其他小牌数据
    ]
  }
};

// 牌阵配置
const SPREADS = {
  single: { name: '单张指引牌', cards: 1, positions: ['当前指引'] },
  three: { name: '过去现在未来', cards: 3, positions: ['过去', '现在', '未来'] },
  celtic: { name: '凯尔特十字', cards: 10, positions: ['现状', '挑战', '远因', '近因', '可能结果', '近期', '你的方法', '外在影响', '希望恐惧', '最终结果'] },
  relationship: { name: '关系解读', cards: 5, positions: ['你的感受', '对方感受', '关系现状', '挑战', '发展方向'] }
};

const App = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [question, setQuestion] = useState('');
  const [selectedSpread, setSelectedSpread] = useState(null);
  const [drawnCards, setDrawnCards] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleQuestionChange = useCallback((e) => {
    setQuestion(e.target.value);
  }, []);

  const handleStartReading = useCallback(() => {
    setIsDrawing(true);
    setTimeout(() => {
      const allCards = [
        ...TAROT_CARDS.major,
        ...Object.values(TAROT_CARDS.minor).flat()
      ];
      
      const shuffled = [...allCards]
        .sort(() => Math.random() - 0.5)
        .slice(0, selectedSpread.cards)
        .map((card, index) => ({
          ...card,
          reversed: Math.random() < 0.3,
          position: selectedSpread.positions[index]
        }));

      setDrawnCards(shuffled);
      setIsDrawing(false);
      setCurrentStep('reading');
    }, 3000);
  }, [selectedSpread]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {currentStep === 'welcome' && (
          <WelcomeScreen
            question={question}
            onQuestionChange={handleQuestionChange}
            onStart={() => setCurrentStep('spreads')}
          />
        )}

        {currentStep === 'spreads' && (
          <SpreadSelection
            spreads={SPREADS}
            selectedSpread={selectedSpread}
            onSelectSpread={setSelectedSpread}
            onStartReading={handleStartReading}
          />
        )}

        {isDrawing && <DrawingScreen />}

        {currentStep === 'reading' && !isDrawing && (
          <div className="space-y-12">
            {/* Reading Header */}
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                塔罗牌解读
              </h2>
              <div className="max-w-2xl mx-auto">
                <p className="text-purple-200 font-medium">你的问题：</p>
                <p className="text-gray-300 mt-2">{question}</p>
              </div>
              <p className="text-purple-300">
                牌阵：{selectedSpread.name}
              </p>
            </div>

            {/* Cards Display */}
            <div className={`grid gap-8 ${
              drawnCards.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' :
              drawnCards.length <= 3 ? 'md:grid-cols-3' :
              'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
            }`}>
              {drawnCards.map((card, index) => (
                <TarotCard key={index} card={card} />
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-center space-x-6">
              <button
                onClick={() => {
                  setCurrentStep('welcome');
                  setQuestion('');
                  setSelectedSpread(null);
                  setDrawnCards([]);
                }}
                className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-xl transition-all"
              >
                重新占卜
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App; 