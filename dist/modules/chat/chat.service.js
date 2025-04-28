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
const chat_model_1 = __importDefault(require("./chat.model"));
class ChatService {
    /**
     * Lưu tin nhắn vào database
     */
    saveMessage(sender, receiver, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = new chat_model_1.default({ sender, receiver, content });
            return yield message.save();
        });
    }
    /**
     * Lấy tất cả tin nhắn giữa 2 người dùng
     */
    getMessagesBetweenUsers(user1, user2) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_model_1.default.find({
                $or: [
                    { sender: user1, receiver: user2 },
                    { sender: user2, receiver: user1 },
                ],
            }).sort({ timestamp: 1 });
        });
    }
    /**
     * Lấy tin nhắn theo ID
     */
    getMessageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_model_1.default.findById(id);
        });
    }
    /**
     * Lấy tất cả tin nhắn của một người dùng
     */
    getMessagesByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_model_1.default.find({
                $or: [{ sender: userId }, { receiver: userId }],
            }).sort({ timestamp: -1 });
        });
    }
    /**
     * Xóa tin nhắn theo ID
     */
    deleteMessage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield chat_model_1.default.findByIdAndDelete(id);
            return !!deleted;
        });
    }
}
exports.default = new ChatService();
//# sourceMappingURL=chat.service.js.map