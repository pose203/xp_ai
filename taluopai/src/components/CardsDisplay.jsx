import React from 'react';
import TarotCard from './TarotCard';

const CardsDisplay = ({ cards, spread }) => {
  const getLayoutClass = () => {
    switch (spread.cards) {
      case 1:
        return 'justify-center';
      case 3:
        return 'justify-between';
      case 5:
        return 'grid-cols-3';
      case 10:
        return 'grid-cols-4';
      default:
        return 'flex-wrap justify-center';
    }
  };

  return (
    <div className="mb-12">
      <div className={`
        ${spread.cards <= 3 ? 'flex' : 'grid'}
        ${getLayoutClass()}
        gap-16 items-center
        max-w-6xl mx-auto p-8
      `}>
        {cards.map((card, index) => (
          <TarotCard
            key={index}
            card={card}
            position={spread.positions[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsDisplay; 