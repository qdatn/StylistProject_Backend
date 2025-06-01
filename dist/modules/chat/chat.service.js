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
const product_1 = require("../product");
const chat_model_1 = __importDefault(require("./chat.model"));
const gemini_service_1 = require("./gemini.service");
class ChatService {
    saveMessage(sender, receiver, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = new chat_model_1.default({ sender, receiver, content });
            return yield message.save();
        });
    }
    getMessagesBetweenUsers(user1Id, user2Id) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupId = [user1Id, user2Id].sort().join("_");
            const messages = yield chat_model_1.default.find({ groupId }).sort({ timestamp: 1 });
            return messages;
        });
    }
    getMessageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_model_1.default.findById(id);
        });
    }
    getMessagesByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_model_1.default.find({
                $or: [{ sender: userId }, { receiver: userId }],
            }).sort({ timestamp: -1 });
        });
    }
    deleteMessage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield chat_model_1.default.findByIdAndDelete(id);
            return !!deleted;
        });
    }
    generateProductAnswer(productId, question) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_1.ProductService.getProductById(productId);
            console.log("productId received:", product);
            console.log("Checking in DB for ID:", product === null || product === void 0 ? void 0 : product._id);
            if (!product) {
                throw new Error("Product not found");
            }
            const answer = yield (0, gemini_service_1.askGeminiAboutProduct)(question, product);
            return answer;
        });
    }
}
exports.default = new ChatService();
//# sourceMappingURL=chat.service.js.map