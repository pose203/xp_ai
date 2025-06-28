import React, { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import SpreadSelection from './SpreadSelection';
import DrawingScreen from './DrawingScreen';
import CardsDisplay from './CardsDisplay';
import Interpretation from './Interpretation';
import { drawCards } from '../utils/tarotUtils';
import { SPREADS } from '../data/tarotData';

const TarotAgent = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [question, setQuestion] = useState('');
  const [selectedSpread, setSelectedSpread] = useState(null);
  const [drawnCards, setDrawnCards] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleSpreadSelect = (spread) => {
    setSelectedSpread(spread);
    setCurrentStep('drawing');
    setTimeout(() => {
      const cards = drawCards(SPREADS[spread].cards);
      setDrawnCards(cards);
      setIsDrawing(false);
      setCurrentStep('display');
    }, 2000);
    setIsDrawing(true);
  };

  const handleStartOver = () => {
    setCurrentStep('welcome');
    setQuestion('');
    setSelectedSpread(null);
    setDrawnCards([]);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <WelcomeScreen
            question={question}
            setQuestion={setQuestion}
            onContinue={() => setCurrentStep('spreads')}
          />
        );
      case 'spreads':
        return (
          <SpreadSelection
            onSelect={handleSpreadSelect}
            onBack={() => setCurrentStep('welcome')}
          />
        );
      case 'drawing':
        return <DrawingScreen />;
      case 'display':
        return (
          <div>
            <CardsDisplay
              cards={drawnCards}
              spread={SPREADS[selectedSpread]}
            />
            <Interpretation
              cards={drawnCards}
              spread={SPREADS[selectedSpread]}
              question={question}
              onStartOver={handleStartOver}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-tarot-gradient text-white p-4">
      <div className="max-w-4xl mx-auto">
        {renderStep()}
      </div>
    </div>
  );
};

export default TarotAgent; 