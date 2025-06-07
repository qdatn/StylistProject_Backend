"use strict";
// utils/geminiApi.ts
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
exports.getGeminiRecommendation = void 0;
const axios_1 = __importDefault(require("axios"));
const GEMINI_API_URL = process.env.GEMINI_API_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const getGeminiRecommendation = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            contents: [{ parts: [{ text: prompt }] }],
        });
        const textResponse = response.data.candidates[0].content.parts[0].text;
        // Lấy JSON từ response của Gemini
        const jsonStart = textResponse.indexOf("[");
        const jsonEnd = textResponse.lastIndexOf("]");
        const jsonString = textResponse.substring(jsonStart, jsonEnd + 1);
        return JSON.parse(jsonString);
    }
    catch (error) {
        console.error("Gemini API error:", error);
        return [];
    }
});
exports.getGeminiRecommendation = getGeminiRecommendation;
//# sourceMappingURL=geminiApi.js.map