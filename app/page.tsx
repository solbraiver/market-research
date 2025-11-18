'use client'

import React, { useState, useCallback } from 'react'
import { Step } from '@/types'
import { generatePlan, generateFullReport } from '@/services/geminiService'
import StepIndicator from '@/components/StepIndicator'
import Step1ThemeSettings from '@/components/Step1ThemeSettings'
import Step2ResearchPlan from '@/components/Step2ResearchPlan'
import Step3AndBeyondDisplay from '@/components/Step3AndBeyondDisplay'
import Loader from '@/components/Loader'

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>(Step.ThemeSetting)
  const [targetMarket, setTargetMarket] = useState<string>('')
  const [offerCategory, setOfferCategory] = useState<string>('')
  const [researchPlan, setResearchPlan] = useState<string>('')
  const [finalReport, setFinalReport] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleStartAnalysis = useCallback(async (market: string, category: string) => {
    if (!market || !category) {
      setError('ターゲット市場と調査対象のオファーを入力してください。')
      return
    }
    setIsLoading(true)
    setError(null)
    setTargetMarket(market)
    setOfferCategory(category)

    try {
      const plan = await generatePlan(market, category)
      setResearchPlan(plan)
      setCurrentStep(Step.PlanApproval)
    } catch (err) {
      setError('リサーチ計画の生成中にエラーが発生しました。もう一度お試しください。')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleApprovePlan = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const report = await generateFullReport(targetMarket, offerCategory, researchPlan)
      setFinalReport(report)
      setCurrentStep(Step.Report)
    } catch (err) {
      setError('最終レポートの生成中にエラーが発生しました。もう一度お試しください。')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [targetMarket, offerCategory, researchPlan])

  const handleRevise = () => {
    setCurrentStep(Step.ThemeSetting)
  }

  const handleStartOver = () => {
    setCurrentStep(Step.ThemeSetting)
    setTargetMarket('')
    setOfferCategory('')
    setResearchPlan('')
    setFinalReport('')
    setError(null)
    setIsLoading(false)
  }

  const renderCurrentStep = () => {
    if (isLoading) {
      let loadingText = '処理中...'
      if (currentStep === Step.ThemeSetting) loadingText = 'リサーチ計画を生成しています...'
      if (currentStep === Step.PlanApproval)
        loadingText = 'Webリサーチを実行し、レポートを生成しています... これには数分かかる場合があります。'
      return <Loader text={loadingText} />
    }

    switch (currentStep) {
      case Step.ThemeSetting:
        return (
          <Step1ThemeSettings
            onStart={handleStartAnalysis}
            initialMarket={targetMarket}
            initialCategory={offerCategory}
          />
        )
      case Step.PlanApproval:
        return <Step2ResearchPlan plan={researchPlan} onApprove={handleApprovePlan} onRevise={handleRevise} />
      case Step.Report:
        return <Step3AndBeyondDisplay report={finalReport} onStartOver={handleStartOver} />
      default:
        return (
          <Step1ThemeSettings
            onStart={handleStartAnalysis}
            initialMarket={targetMarket}
            initialCategory={offerCategory}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-500">
            市場調査アナリストAI
          </h1>
          <p className="text-gray-400 mt-2">AIがWebリサーチを行い、市場のインサイトを抽出します。</p>
        </header>

        <main className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-700">
          <StepIndicator currentStep={currentStep} />
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}
          <div className="mt-6">{renderCurrentStep()}</div>
        </main>
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Market Research Analyst AI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
