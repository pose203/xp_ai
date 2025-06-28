import React from 'react';
import { Shuffle, Sparkles } from 'lucide-react';

const DrawingScreen = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-16 px-4">
      {/* Animated Card Drawing */}
      <div className="relative">
        {/* Background Glow */}
        <div className="absolute inset-0 animate-pulse">
          <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 blur-3xl"></div>
        </div>

        {/* Card Animation */}
        <div className="relative">
          {/* Spinning Circles */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="w-40 h-40 mx-auto rounded-full border-2 border-purple-400/30"></div>
          </div>
          <div className="absolute inset-0 animate-spin-reverse-slower">
            <div className="w-48 h-48 mx-auto rounded-full border-2 border-blue-400/20"></div>
          </div>

          {/* Center Card */}
          <div className="relative w-32 h-48 mx-auto bg-gradient-to-br from-purple-900 to-blue-900 rounded-xl border-2 border-purple-500/50 shadow-xl transform hover:scale-105 transition-transform">
            <div className="absolute inset-0 flex items-center justify-center">
              <Shuffle className="w-12 h-12 text-purple-400 animate-bounce" />
            </div>
            
            {/* Floating Sparkles */}
            <div className="absolute -top-4 -right-4 animate-float">
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
            <div className="absolute -bottom-4 -left-4 animate-float-delay">
              <Sparkles className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent animate-pulse">
          正在洗牌...
        </h2>
        <p className="text-xl text-gray-300 max-w-lg mx-auto leading-relaxed">
          请保持内心平静，让宇宙的能量指引你找到最适合的答案
        </p>
      </div>

      {/* Energy Flow Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-flow-down"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-flow-up"></div>
      </div>
    </div>
  );
};

export default DrawingScreen; 