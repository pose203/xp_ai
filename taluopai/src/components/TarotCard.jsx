import React from 'react';
import { Sparkles, Heart, Swords, Coins, Star } from 'lucide-react';

const TarotCard = ({ card, isRevealed = true }) => {
  const getCardIcon = (card) => {
    if (card.id?.startsWith('w')) return <Sparkles className="w-12 h-12 text-amber-400" />;
    if (card.id?.startsWith('c')) return <Heart className="w-12 h-12 text-red-400" />;
    if (card.id?.startsWith('s')) return <Swords className="w-12 h-12 text-blue-400" />;
    if (card.id?.startsWith('p')) return <Coins className="w-12 h-12 text-green-400" />;
    return <Star className="w-12 h-12 text-purple-400" />;
  };

  return (
    <div className={`relative group perspective-1000 ${isRevealed ? '' : 'cursor-pointer'}`}>
      <div className={`relative transition-transform duration-700 transform-style-3d ${isRevealed ? 'rotate-y-180' : ''}`}>
        {/* Card Front (Back of the Tarot card) */}
        <div className="absolute inset-0 backface-hidden">
          <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl border-2 border-purple-500/30 p-8">
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="w-16 h-16 rounded-full border-2 border-purple-400/30"></div>
                </div>
                <Star className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Card Back (Front of the Tarot card) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-purple-500/30 p-6 transform transition-transform duration-300 hover:scale-105">
            <div className="text-center space-y-4">
              {/* Card Icon */}
              <div className="relative flex justify-center">
                <div className={`transition-transform duration-300 ${card.reversed ? 'rotate-180' : ''}`}>
                  {getCardIcon(card)}
                </div>
                {card.reversed && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">R</span>
                  </div>
                )}
              </div>

              {/* Card Title */}
              <div>
                <h3 className="font-bold text-white text-xl">{card.name}</h3>
                {card.nameEn && (
                  <p className="text-purple-300 text-sm mt-1">{card.nameEn}</p>
                )}
                {card.position && (
                  <p className="text-purple-200 text-sm mt-2 font-medium">{card.position}</p>
                )}
              </div>

              {/* Card Meaning */}
              <div className="text-sm">
                <p className="font-medium text-purple-200 mb-2">
                  {card.reversed ? '逆位含义：' : '正位含义：'}
                </p>
                <p className="text-gray-300">{card.reversed ? card.reverseMeaning : card.meaning}</p>
                {card.element && (
                  <div className="mt-3 inline-block px-3 py-1 bg-purple-500/20 rounded-full">
                    <p className="text-xs text-purple-300">元素：{card.element}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarotCard; 