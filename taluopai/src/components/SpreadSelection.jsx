import React from 'react';
import { Shuffle, Layout } from 'lucide-react';

const SpreadSelection = ({ spreads, selectedSpread, onSelectSpread, onStartReading }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-12 px-4">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
          选择塔罗牌阵
        </h2>
        <p className="text-xl text-gray-300">
          每种牌阵都有其独特的解读方式，选择最适合你问题的牌阵
        </p>
      </div>

      {/* Spreads Grid */}
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        {Object.entries(spreads).map(([key, spread]) => (
          <div
            key={key}
            onClick={() => onSelectSpread(spread)}
            className={`group relative overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-102 cursor-pointer
              ${selectedSpread?.name === spread.name
                ? 'ring-2 ring-purple-400 bg-purple-900/30'
                : 'bg-gray-800/30 hover:bg-gray-800/50'
              }`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
              <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
            </div>

            {/* Content */}
            <div className="relative p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {spread.name}
                </h3>
                <Layout className="w-6 h-6 text-purple-400" />
              </div>

              {/* Card Count Visualization */}
              <div className="flex items-center space-x-2">
                {[...Array(spread.cards)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 group-hover:scale-y-150
                      ${selectedSpread?.name === spread.name
                        ? 'bg-purple-400 w-8'
                        : 'bg-gray-600 w-6 group-hover:bg-purple-500/50'
                      }`}
                  ></div>
                ))}
              </div>

              {/* Positions */}
              <div className="space-y-3">
                <p className="text-purple-300 font-medium">牌位解析</p>
                <div className="flex flex-wrap gap-2">
                  {spread.positions.map((position, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full text-sm"
                    >
                      {position}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      {selectedSpread && (
        <button
          onClick={onStartReading}
          className="px-12 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-102 text-lg group"
        >
          开始抽牌
          <Shuffle className="inline w-6 h-6 ml-2 group-hover:animate-spin" />
        </button>
      )}

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </div>
  );
};

export default SpreadSelection; 