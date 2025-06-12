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

export const askGeminiAboutRecommendation = async (
  userInfo: any,
  products: any[]
): Promise<string> => {
  try {
    // const prompt = `
    //   I am a personalized fashion recommendation system. Please suggest the most suitable products for the user based on their body shape, height, weight, and style preferences.
    //   User information:
    //   ${JSON.stringify(userInfo, null, 2)}

    //   Product list:
    //   ${JSON.stringify(products, null, 2)}

    //   Respond only in English. Recommend a maximum of 3 suitable products and briefly explain the reasons for your choices.
    // `;

     const prompt = `
I am a personalized fashion recommendation system. Please suggest the most suitable products for the user based on their body shape, height, weight, and style preferences.
User information:
${JSON.stringify(userInfo, null, 2)}

Product list:
${JSON.stringify(products, null, 2)}

Respond only in English. Recommend a maximum of 3 suitable products and briefly explain the reasons for your choices.
Format the response as a JSON array with each product containing these fields: name, description, productId, images.
`;

    const response = await axios.post<GeminiResponse>(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
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
      "No response received from Gemini.";

    return answer;
  } catch (error: any) {
    console.error("Gemini API error:", error?.response?.data || error.message);
    throw new Error("Gemini API request failed");
  }
};
