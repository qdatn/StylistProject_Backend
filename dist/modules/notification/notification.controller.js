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
const middlewares_1 = require("../../core/middlewares");
const _1 = require(".");
class NotificationController {
    createNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = yield _1.NotificationService.createNotification(req.body);
                res.status(201).json(notification);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // async getUserNotifications(req: Request, res: Response) {
    //   const result = await notificationService.getUserNotifications(
    //     req.user.id,
    //     req.query,
    //     Number(req.query.page),
    //     Number(req.query.limit)
    //   );
    //   res.json(result);
    // }
    getNotificationDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = yield _1.NotificationService.getNotificationById(req.params.id);
                if (!notification) {
                    res.status(404).json({ message: "Notification not found" });
                }
                else {
                    res.status(200).json(notification);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    // async markAsRead(req: Request, res: Response) {
    //   const notification = await NotificationService.markAsRead(
    //     req.params.id,
    //     req.user.id
    //   );
    //   res.json(notification);
    // }
    updateNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedNotification = yield _1.NotificationService.updateNotification(req.params.id, req.body);
            res.json(updatedNotification);
        });
    }
    deleteNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield _1.NotificationService.deleteNotification(req.params.id);
            res.json({ message: "Notification deleted successfully" });
        });
    }
    getAllNotifications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifications = yield _1.NotificationService.getAllNotifications();
                yield (0, middlewares_1.pagination)(req, res, notifications, next);
                res.status(200).json(res.locals.pagination);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getUserNotifications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const notifications = yield _1.NotificationService.getUserNotifications(userId);
                res.status(200).json({
                    data: notifications,
                });
            }
            catch (err) {
                next({
                    success: false,
                    message: "Failed to fetch notifications",
                    error: err.message,
                });
            }
        });
    }
}
exports.default = new NotificationController();
//# sourceMappingURL=notification.controller.js.map