"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askGeminiAboutRecommendation = exports.askGeminiAboutProduct = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GEMINI_API_URL = process.env.GEMINI_API_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const askGeminiAboutProduct = (question, product, user) => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = `
  You are a helpful assistant and a fashion expert assistant. Consider the following information:
  
  Product: "${product ? JSON.stringify(product) : "No product"}"
  User Information: ${user ? JSON.stringify(user) : "No info"}

  Answer the following question in a helpful, brief, correct, personalized manner, short, clear, and personalized answer in English and the answer for the question alway place at the end of answer:
  Question: "${question}"
  `;
    try {
        const response = yield axios_1.default.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, { contents: [{ parts: [{ text: prompt }] }] }, { headers: { "Content-Type": "application/json" } });
        return response.data.candidates[0].content.parts[0].text;
    }
    catch (error) {
        console.error("Gemini API error:", error);
        return "I'm sorry, I couldn't answer your question at the moment.";
    }
});
exports.askGeminiAboutProduct = askGeminiAboutProduct;
const askGeminiAboutRecommendation = (userInfo, products) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
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
        const response = yield axios_1.default.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }],
                },
            ],
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const answer = (_g = (_f = (_e = (_d = (_c = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.candidates) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.parts) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.text) !== null && _g !== void 0 ? _g : "No response received from Gemini.";
        return answer;
    }
    catch (error) {
        // console.error("Gemini API error:", error?.response?.data || error.message);
        // throw new Error("Gemini API request failed");
        console.error("Gemini API error:", error);
        return "I'm sorry, I couldn't answer your question at the moment.";
    }
});
exports.askGeminiAboutRecommendation = askGeminiAboutRecommendation;
//# sourceMappingURL=gemini.service.js.map