import React from 'react';
import { Moon, Sparkles } from 'lucide-react';

const WelcomeScreen = ({ question, onQuestionChange, onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-[#1a1333] to-[#2d1b4d]">
      {/* Logo and Title */}
      <div className="text-center space-y-8 mb-12">
        <div className="relative">
          <Moon className="w-20 h-20 mx-auto text-[#c8b6ff]" />
        </div>
        <h1 className="text-4xl font-bold text-[#c8b6ff]">
          神秘塔罗解读
        </h1>
      </div>

      {/* Welcome Message */}
      <div className="max-w-2xl text-center mb-16">
        <p className="text-lg text-[#c8b6ff]/90 leading-relaxed">
          欢迎来到神秘的塔罗世界。在这里，古老的智慧将为你指引方向，
          揭示内心深处的答案。让塔罗牌成为你人生路上的明灯。
        </p>
      </div>

      {/* Question Input */}
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-4">
          <p className="text-[#c8b6ff] text-center">
            请输入你想咨询的问题
          </p>
          <textarea
            value={question}
            onChange={onQuestionChange}
            placeholder="例如：我在感情上应该如何选择？我的事业发展会如何？"
            className="w-full h-32 px-6 py-4 bg-[#2a1940]/50 border border-[#c8b6ff]/30 rounded-lg text-white placeholder-[#c8b6ff]/50 focus:border-[#c8b6ff]/60 focus:ring-2 focus:ring-[#c8b6ff]/20 focus:outline-none transition-all resize-none text-lg"
            spellCheck={false}
          />
        </div>

        <button
          onClick={onStart}
          disabled={!question.trim()}
          className="w-full py-4 bg-[#6d28d9] hover:bg-[#7c3aed] disabled:bg-[#4c1d95] text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <span>开始占卜</span>
          <Sparkles className="w-5 h-5" />
        </button>
      </div>

      {/* Background Gradient Effect */}
      <div className="fixed inset-0 -z-10 bg-gradient-radial from-[#2d1b4d] to-[#1a1333] opacity-50"></div>
    </div>
  );
};

export default WelcomeScreen; 