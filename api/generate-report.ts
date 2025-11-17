import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const { targetMarket, offerCategory, researchPlan } = req.body;

  if (!targetMarket || !offerCategory || !researchPlan) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `
あなたは専門の市場調査アナリスト兼コンセプトデザイナーです。
以下の指示に沿って、調査と分析を厳密に実行し、最終レポートをMarkdown形式で出力してください。

【調査テーマ】
・対象ターゲット市場： ${targetMarket}
・調査対象のオファー／カテゴリ： ${offerCategory}

【承認済みリサーチ計画】
${researchPlan}

---
【実行指示】

### STEP 3：情報収集
* 上記リサーチ計画に基づき、市場調査を実行してください。
* 統計データ、顧客の声、レビュー、業界トレンドなど、幅広い情報を収集・分析してください。

### STEP 4：インサイト抽出
* 収集した情報をもとに、以下の項目を整理してください。
    – **顕在課題Top5**: ユーザーが明確に「問題だ」と認識していること。
    – **主要な発言・口調のパターン**: ターゲット層がどのような言葉遣いや表現で語っているか。
    – **潜在動機・誤解・避けたい失敗**: 発言の裏にある本当の動機、勘違いしていること、最も恐れている失敗。
    – **"隠れた欲求"／行動変化のトリガー**: 口には出さないが、心の底で望んでいることや、購入・利用の決め手となるきっかけ。

### STEP 5：構造分析
* 以下の項目で表を作成し、情報を構造的に整理してください。
| 発言 | 感情（＋／−） | 潜在動機 | 誤解・前提 | 価値軸 |
| :--- | :--- | :--- | :--- | :--- |
* その上で、全体を俯瞰し、「時代構造」「心理曲線」「マーケティング示唆」の観点から300〜400文字で総合的な分析を記述してください。

### STEP 6：出力形式
* 以下の構成で、最終的なレポートをMarkdown形式で生成してください。

# タイトル：【${offerCategory}市場における${targetMarket}のインサイト分析】
## サマリー（100〜200文字）
## ホットな課題Top5（表形式）
## インサイト分析表（発言→動機→価値軸）
## 戦略的総合分析（300〜400文字）
## 推奨アクション

---
【制約条件】
– 推測・仮説部分は「**【仮説】**」と明記してください。
– 誇張・断定表現を避け、「〜と推察される」「〜の可能性が高い」といった慎重な言い回しを用いてください。
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return res.status(200).json({ text });
  } catch (error) {
    console.error("Error generating full report:", error);
    return res.status(500).json({ error: "Failed to generate full report" });
  }
}
