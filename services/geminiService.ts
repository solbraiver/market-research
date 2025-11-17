const generatePlan = async (targetMarket: string, offerCategory: string): Promise<string> => {
    try {
        const response = await fetch('/api/generate-plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ targetMarket, offerCategory }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to generate research plan');
        }

        const data = await response.json();
        return data.text;
    } catch (error) {
        console.error("Error generating research plan:", error);
        throw new Error("Failed to generate research plan from API.");
    }
};

const generateFullReport = async (targetMarket: string, offerCategory: string, researchPlan: string): Promise<string> => {
    try {
        const response = await fetch('/api/generate-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ targetMarket, offerCategory, researchPlan }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to generate full report');
        }

        const data = await response.json();
        return data.text;
    } catch (error) {
        console.error("Error generating full report:", error);
        throw new Error("Failed to generate full report from API.");
    }
};

export { generatePlan, generateFullReport };
