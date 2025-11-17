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

  const { targetMarket, offerCategory } = req.body;

  if (!targetMarket || !offerCategory) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return res.status(200).json({ text });
  } catch (error) {
    console.error("Error generating research plan:", error);
    return res.status(500).json({ error: "Failed to generate research plan" });
  }
}
