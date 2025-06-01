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
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class NotificationService {
    createNotification(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return _1.NotificationRepository.create(data);
        });
    }
    getAllNotifications() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _1.NotificationRepository.findAll();
        });
    }
    // async getUserNotifications(
    //   userId: string,
    //   filters: any = {},
    //   page: number = 1,
    //   limit: number = 10
    // ) {
    //   const skip = (page - 1) * limit;
    // const [notifications, total] = await Promise.all([
    //   NotificationRepository.findByUserId(userId, filters, skip, limit),
    //   NotificationRepository.countDocuments({ userId, ...filters })
    // ]);
    // return {
    //   notifications,
    //   total,
    //   page,
    //   totalPages: Math.ceil(total / limit)
    // };
    // }
    // async markAsRead(notificationId: string, userId: string) {
    //   return NotificationRepository.updateById(notificationId, {
    //     status: 'read',
    //     readAt: new Date()
    //   });
    // }
    updateNotification(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _1.NotificationRepository.update(id, data);
        });
    }
    deleteNotification(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return _1.NotificationRepository.delete(id);
        });
    }
    getNotificationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return _1.NotificationRepository.findById(id);
        });
    }
    getUserNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // const objectId = new Types.ObjectId(userId);
            return yield _1.NotificationRepository.findNotificationsByUserId(userId);
        });
    }
}
exports.default = new NotificationService();
//# sourceMappingURL=notification.service.js.map