import React from 'react';

const ScoreBars = ({ 
  scores = {
    Love: 56,
    Wealth: 89,
    Career: 93,
    Study: 75
  } 
}) => {
  const colors = {
    Love: '#FF6B9D',
    Wealth: '#FFB347',
    Career: '#9B9BFF',
    Study: '#4ECDC4'
  };

  const maxHeight = 120;

  return (
    <div className="score-bars">
      {Object.entries(scores).map(([category, score]) => (
        <div key={category} className="score-bar-item">
          <div 
            className="score-bar" 
            style={{
              height: `${(score / 100) * maxHeight}px`,
              backgroundColor: colors[category],
              width: '24px',
              borderRadius: '12px',
              position: 'relative'
            }}
          />
          <div className="score-value" style={{ color: colors[category] }}>
            {score}
          </div>
          <div className="score-label" style={{ color: colors[category] }}>
            {category}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScoreBars;