import { GoogleGenAI } from '@google/genai'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  const { targetMarket, offerCategory } = await request.json()

  if (!targetMarket || !offerCategory) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const ai = new GoogleGenAI({ apiKey })

  const prompt = `
あなたは専門の市場調査アナリストです。
以下のテーマ設定に基づき、詳細なリサーチ計画を提示してください。

【テーマ設定】
・対象ターゲット市場： ${targetMarket}
・調査対象のオファー／カテゴリ： ${offerCategory}

【出力項目】
1. 調査対象の定義・範囲（例：SNS＋レビューサイト＋業界レポート）
2. 検索キーワード案（ポジティブ・ネガティブ両方の感情や疑問を含むキーワードを複数提案。「〜 評判」「〜 感想」「〜 失敗」「〜 がわからない」「〜 が怖い」など）
3. 情報収集先・期間（例：直近12ヶ月／国内外の主要な情報源）

上記3項目を明確に分けて、箇条書きで分かりやすく記述してください。
`

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    })
    return NextResponse.json({ text: response.text })
  } catch (error) {
    console.error('Error generating research plan:', error)
    return NextResponse.json({ error: 'Failed to generate research plan' }, { status: 500 })
  }
}
