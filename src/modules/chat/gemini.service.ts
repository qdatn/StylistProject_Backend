import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_URL = process.env.GEMINI_API_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text: string }[];
    };
  }[];
}

export const askGeminiAboutProduct = async (
  prompt: string,
  context?: any
): Promise<string> => {
  try {
    const response = await axios.post<GeminiResponse>(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${prompt}\n\nProduct information:\n${JSON.stringify(context, null, 2)}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const answer =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "No response from Gemini";

    return answer;
  } catch (error: any) {
    console.error("Gemini API error:", error?.response?.data || error.message);
    throw new Error("Gemini API request failed");
  }
};
