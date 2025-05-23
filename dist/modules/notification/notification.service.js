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
const notification_model_1 = __importDefault(require("./notification.model"));
class NotificationService {
    createNotification(userId, messageId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield notification_model_1.default.create({ userId, messageId, content });
        });
    }
    getNotificationsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield notification_model_1.default.find({ userId }).sort({ createdAt: -1 });
        });
    }
    markAsRead(notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield notification_model_1.default.findByIdAndUpdate(notificationId, { read: true }, { new: true });
        });
    }
    deleteNotification(notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield notification_model_1.default.findByIdAndDelete(notificationId);
        });
    }
}
exports.default = new NotificationService();
//# sourceMappingURL=notification.service.js.map