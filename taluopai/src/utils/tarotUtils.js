import { TAROT_CARDS } from '../data/tarotData';

// 获取所有卡牌
export const getAllCards = () => {
  const majorArcana = TAROT_CARDS.major;
  const minorArcana = Object.values(TAROT_CARDS.minor).flat();
  return [...majorArcana, ...minorArcana];
};

// 随机洗牌
export const shuffleCards = (cards) => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 抽取指定数量的卡牌
export const drawCards = (count) => {
  const allCards = getAllCards();
  const shuffled = shuffleCards(allCards);
  return shuffled.slice(0, count).map(card => ({
    ...card,
    isReversed: Math.random() > 0.5
  }));
};

// 获取卡牌解释
export const getCardInterpretation = (card) => {
  if (card.isReversed) {
    return {
      position: '逆位',
      meaning: card.reverseMeaning
    };
  }
  return {
    position: '正位',
    meaning: card.meaning
  };
};

// 获取卡牌图标
export const getCardIcon = (card) => {
  if (!card) return '🎴';
  
  const icons = {
    wands: '🔥',
    cups: '💧',
    swords: '💨',
    pentacles: '🌍'
  };

  // 判断是主牌还是副牌
  if (card.element) {
    // 主牌
    const elementIcons = {
      '火': '🔥',
      '水': '💧',
      '风': '💨',
      '土': '🌍'
    };
    return elementIcons[card.element] || '🎴';
  } else {
    // 副牌
    const suit = Object.keys(TAROT_CARDS.minor).find(suit => 
      TAROT_CARDS.minor[suit].some(c => c.id === card.id)
    );
    return icons[suit] || '🎴';
  }
}; 