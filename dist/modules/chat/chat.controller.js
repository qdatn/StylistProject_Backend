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
const chat_service_1 = __importDefault(require("./chat.service"));
const userInfo_service_1 = __importDefault(require("../userInfo/userInfo.service"));
const product_service_1 = __importDefault(require("../product/product.service"));
const gemini_service_1 = require("./gemini.service");
const BASE_URL = process.env.BASE_URL;
class ChatController {
    getMessages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user1Id, user2Id } = req.query;
            try {
                const messages = yield chat_service_1.default.getMessagesBetweenUsers(user1Id, user2Id);
                // 👉 Tắt cache để luôn trả dữ liệu mới
                res.setHeader("Cache-Control", "no-store");
                res.setHeader("Pragma", "no-cache");
                res.setHeader("Expires", "0");
                res.status(200).json(messages);
            }
            catch (error) {
                console.error("Error fetching messages:", error);
                res.status(500).json({ message: "Failed to fetch messages." });
            }
        });
    }
    getProductAnswer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId, question } = req.body;
                // if (!productId || !question) {
                //   res.status(400).json({ message: "Missing productId or question" });
                //   return;
                // }
                const answer = yield chat_service_1.default.generateProductAnswer(productId, question);
                res.status(200).json({ answer });
            }
            catch (err) {
                console.error(err);
                if (res.headersSent)
                    return;
                res.status(500).json({ message: err.message || "Internal server error" });
            }
        });
    }
    getRecommendedProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = req.params.userId;
                // Lấy thông tin người dùng
                const userInfo = yield userInfo_service_1.default.getUserInfoById(userId);
                if (!userInfo) {
                    next({ message: "Không tìm thấy thông tin người dùng." });
                }
                // Lấy danh sách sản phẩm
                const products = yield product_service_1.default.getAllProductActive();
                // Gọi Gemini để nhận gợi ý
                const content = yield (0, gemini_service_1.askGeminiAboutRecommendation)(userInfo, products);
                // Parse JSON từ Gemini (giả sử Gemini trả đúng định dạng)
                let recommendedProducts = [];
                try {
                    // Bước 1: Tách phần JSON thực sự từ chuỗi có định dạng ```json ... ```
                    const jsonString = (_a = content.match(/```json\s*([\s\S]*?)\s*```/)) === null || _a === void 0 ? void 0 : _a[1];
                    if (!jsonString) {
                        throw new Error("Không tìm thấy nội dung JSON trong phản hồi.");
                    }
                    // Bước 2: Parse JSON
                    recommendedProducts = JSON.parse(jsonString);
                    // Bước 3: Thêm link vào từng sản phẩm
                    const productsWithLink = recommendedProducts.map((prod) => (Object.assign(Object.assign({}, prod), { link: `${BASE_URL}/product/${prod.productId}` })));
                    // Bước 4: Trả kết quả
                    res.json({ content: productsWithLink });
                }
                catch (err) {
                    console.warn("Failed to parse Gemini response as JSON:", err);
                    next({ message: "Can't process response from Gemini." });
                }
            }
            catch (error) {
                console.error("Recommendation error:", error.message);
                next({ message: "System error when recommend." });
            }
        });
    }
}
exports.default = new ChatController();
//# sourceMappingURL=chat.controller.js.map