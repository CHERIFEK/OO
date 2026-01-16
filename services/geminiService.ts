import { GoogleGenAI } from "@google/genai";
import { Feedback } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateActionPlan = async (feedbacks: Feedback[]): Promise<string[]> => {
  if (feedbacks.length === 0) {
    return ["Collect more feedback to generate an insightful plan."];
  }

  const feedbackText = feedbacks
    .map(f => `- (Mood: ${f.rating}/5) ${f.text}`)
    .join("\n");

  const prompt = `
    You are an expert HR consultant specializing in team culture.
    Analyze the following anonymous employee feedback and produce a concise, actionable 3-point plan for management to improve the team's mood and culture.
    
    Feedback received:
    ${feedbackText}
    
    Format the output as a simple JSON array of strings, e.g., ["Point 1", "Point 2", "Point 3"].
    Keep the points friendly, constructive, and specific to the feedback provided.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) return ["Could not generate a plan at this time."];

    const parsed = JSON.parse(text);
    if (Array.isArray(parsed) && parsed.every(i => typeof i === 'string')) {
      return parsed;
    }
    
    // Fallback if structure is slightly off but contains text
    return [text];
  } catch (error) {
    console.error("Error generating action plan:", error);
    return [
      "Ensure API key is valid.",
      "Try again with more detailed feedback.",
      "Check internet connection."
    ];
  }
};