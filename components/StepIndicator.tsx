
import React from 'react';
import { Step } from '../types';

interface StepIndicatorProps {
  currentStep: Step;
}

const steps = [
  { id: Step.ThemeSetting, name: 'テーマ設定' },
  { id: Step.PlanApproval, name: 'リサーチ計画' },
  { id: Step.Report, name: '最終レポート' },
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
            {currentStep > step.id ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-purple-600" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center bg-purple-600 rounded-full hover:bg-purple-700">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                  </svg>
                  <span className="absolute -bottom-7 w-max text-center text-xs text-gray-300">{step.name}</span>
                </div>
              </>
            ) : currentStep === step.id ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-700" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center bg-gray-800 border-2 border-purple-600 rounded-full">
                  <span className="h-2.5 w-2.5 bg-purple-600 rounded-full" aria-hidden="true" />
                   <span className="absolute -bottom-7 w-max text-center text-xs font-semibold text-purple-400">{step.name}</span>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-700" />
                </div>
                <div className="group relative flex h-8 w-8 items-center justify-center bg-gray-800 border-2 border-gray-600 rounded-full hover:border-gray-500">
                  <span className="h-2.5 w-2.5 bg-transparent rounded-full" aria-hidden="true" />
                   <span className="absolute -bottom-7 w-max text-center text-xs text-gray-500">{step.name}</span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepIndicator;
