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
class ChatController {
    /**
     * Gửi tin nhắn qua API REST (Không cần nếu dùng WebSocket)
     */
    sendMessage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sender, receiver, content } = req.body;
                if (!sender || !receiver || !content) {
                    res.status(400).json({ message: "Sender, receiver, and content are required" });
                    return;
                }
                const message = yield chat_service_1.default.saveMessage(sender, receiver, content);
                res.status(201).json(message);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    /**
     * Lấy tất cả tin nhắn giữa 2 người dùng
     */
    getMessages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user1, user2 } = req.query;
                if (!user1 || !user2) {
                    res.status(400).json({ message: "User1 and User2 are required" });
                    return;
                }
                const messages = yield chat_service_1.default.getMessagesBetweenUsers(user1, user2);
                res.status(200).json(messages);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    /**
     * Lấy tin nhắn theo ID
     */
    getMessageById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield chat_service_1.default.getMessageById(req.params.id);
                if (!message) {
                    res.status(404).json({ message: "Message not found" });
                    return;
                }
                res.status(200).json(message);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * Lấy tất cả tin nhắn của một người dùng
     */
    getMessagesByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield chat_service_1.default.getMessagesByUserId(req.params.id);
                res.status(200).json(messages);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * Xóa tin nhắn theo ID
     */
    deleteMessage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield chat_service_1.default.deleteMessage(req.params.id);
                if (!deleted) {
                    res.status(404).json({ message: "Message not found" });
                    return;
                }
                res.status(200).json({ message: "Message deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new ChatController();
//# sourceMappingURL=chat.controller.js.map