
import React from 'react';

interface Step2ResearchPlanProps {
  plan: string;
  onApprove: () => void;
  onRevise: () => void;
}

const Step2ResearchPlan: React.FC<Step2ResearchPlanProps> = ({ plan, onApprove, onRevise }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-center text-gray-200 mb-2">STEP 2: リサーチ計画の提示</h2>
      <p className="text-center text-gray-400 mb-6">AIが生成した以下のリサーチ計画を確認してください。</p>
      
      <div className="bg-gray-900/70 border border-gray-700 rounded-lg p-6 my-6 prose prose-invert prose-sm sm:prose-base max-w-none prose-p:text-gray-300 prose-headings:text-gray-100 prose-strong:text-purple-400">
        <pre className="whitespace-pre-wrap font-sans bg-transparent p-0 text-gray-300">{plan}</pre>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
        <button
          onClick={onRevise}
          className="w-full sm:w-auto px-8 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-300"
        >
          テーマを修正する
        </button>
        <button
          onClick={onApprove}
          className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
        >
          承認してレポート生成
        </button>
      </div>
    </div>
  );
};

export default Step2ResearchPlan;
