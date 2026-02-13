
import { GoogleGenAI, Type } from "@google/genai";
import { InsightReport } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeSynchronyData = async (
  data: any,
  context: string
): Promise<InsightReport> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this neural synchronization data from a group interaction study.
    Context: ${context}
    Data: ${JSON.stringify(data)}
    
    Provide a scholarly assessment of group cohesion, identify potential social leaders (based on high centrality), and detect any outliers.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          cohesionScore: { type: Type.NUMBER },
          anomalies: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["summary", "cohesionScore", "anomalies", "recommendations"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw e;
  }
};
