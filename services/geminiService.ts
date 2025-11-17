
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generatePlan = async (targetMarket: string, offerCategory: string): Promise<string> => {
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
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating research plan:", error);
        throw new Error("Failed to generate research plan from API.");
    }
};

const generateFullReport = async (targetMarket: string, offerCategory: string, researchPlan: string): Promise<string> => {
    const prompt = `
あなたは専門の市場調査アナリスト兼コンセプトデザイナーです。
以下の指示に沿って、Web検索／ブラウジング機能を活用した調査と分析を厳密に実行し、最終レポートをMarkdown形式で出力してください。

【調査テーマ】
・対象ターゲット市場： ${targetMarket}
・調査対象のオファー／カテゴリ： ${offerCategory}

【承認済みリサーチ計画】
${researchPlan}

---
【実行指示】

### STEP 3：Web検索実行
* 上記リサーチ計画に基づき、Web検索を **必ず** 実行してください。
* 統計データ、顧客のSNS投稿、レビューサイトの書き込み、業界ニュースなど、実在する一次情報・二次情報を幅広く収集してください。
* 収集したすべての情報には、必ず出典元のURLを明記してください。

### STEP 4：インサイト抽出
* 収集した情報をもとに、以下の項目を整理してください。各項目ごとに出典を明記することが必須です。
    – **顕在課題Top5**: ユーザーが明確に「問題だ」と認識していること。
    – **主要な発言・口調のパターン**: ターゲット層がどのような言葉遣いや表現で語っているか。
    – **潜在動機・誤解・避けたい失敗**: 発言の裏にある本当の動機、勘違いしていること、最も恐れている失敗。
    – **“隠れた欲求”／行動変化のトリガー**: 口には出さないが、心の底で望んでいることや、購入・利用の決め手となるきっかけ。

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
## 参考出典一覧

---
【制約条件】
– 内部知識のみで完結させず、**必ずWeb検索データを活用**してください。
– **出典URLを省略せず必ず明記**してください。
– 推測・仮説部分は「**【仮説】**」と明記してください。
– 誇張・断定表現を避け、「〜と推察される」「〜の可能性が高い」といった慎重な言い回しを用いてください。
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro', // Use a more powerful model for complex research and analysis
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });
        return response.text;
    } catch (error) {
        console.error("Error generating full report:", error);
        throw new Error("Failed to generate full report from API.");
    }
};

export { generatePlan, generateFullReport };
