import React from 'react';
import { getCardInterpretation } from '../utils/tarotUtils';

const Interpretation = ({ cards, spread, question, onStartOver }) => {
  return (
    <div className="card max-w-4xl mx-auto">
      <h2 className="section-title">塔罗牌解读</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-purple-300 mb-2">你的问题</h3>
        <p className="text-gray-400">{question}</p>
      </div>

      <div className="space-y-6">
        {cards.map((card, index) => {
          const { position, meaning } = getCardInterpretation(card);
          return (
            <div key={index} className="border-t border-purple-500/30 pt-6 first:border-0 first:pt-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-purple-300">
                    {spread.positions[index]}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {card.name} ({card.nameEn}) - {position}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-300">{meaning}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-purple-500/30">
        <button onClick={onStartOver} className="btn-primary w-full">
          重新开始
        </button>
      </div>
    </div>
  );
};

export default Interpretation; 