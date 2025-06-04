// utils/geminiApi.ts

import axios from "axios";

const GEMINI_API_URL = process.env.GEMINI_API_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const getGeminiRecommendation = async (prompt: string) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const textResponse = response.data.candidates[0].content.parts[0].text;

    // Lấy JSON từ response của Gemini
    const jsonStart = textResponse.indexOf("[");
    const jsonEnd = textResponse.lastIndexOf("]");
    const jsonString = textResponse.substring(jsonStart, jsonEnd + 1);

    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Gemini API error:", error);
    return [];
  }
};
