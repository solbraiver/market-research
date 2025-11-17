
import React, { useState } from 'react';
import AnalyzeIcon from './icons/AnalyzeIcon';

interface Step1ThemeSettingsProps {
  onStart: (market: string, category: string) => void;
  initialMarket: string;
  initialCategory: string;
}

const Step1ThemeSettings: React.FC<Step1ThemeSettingsProps> = ({ onStart, initialMarket, initialCategory }) => {
  const [market, setMarket] = useState(initialMarket);
  const [category, setCategory] = useState(initialCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(market, category);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-center text-gray-200 mb-2">STEP 1: テーマ設定</h2>
      <p className="text-center text-gray-400 mb-6">分析したい市場とカテゴリを入力してください。</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="target-market" className="block text-sm font-medium text-gray-300 mb-2">
            対象ターゲット市場
          </label>
          <input
            type="text"
            id="target-market"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            placeholder="例：30代の働く女性"
            className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            required
          />
        </div>
        <div>
          <label htmlFor="offer-category" className="block text-sm font-medium text-gray-300 mb-2">
            調査対象のオファー／カテゴリ
          </label>
          <input
            type="text"
            id="offer-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="例：オンラインフィットネスサービス"
            className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            required
          />
        </div>
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
          >
            <AnalyzeIcon />
            リサーチ計画を生成
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1ThemeSettings;
