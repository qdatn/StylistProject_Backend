"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = __importDefault(require("./notification.controller"));
class NotificationRoute {
    // Constructor
    constructor() {
        this.path = "/api/notification";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/`, notification_controller_1.default.getAllNotifications);
        this.router.get(`${this.path}/user/:userId`, notification_controller_1.default.getUserNotifications);
        this.router.post(`${this.path}/`, notification_controller_1.default.createNotification);
        this.router.put(`${this.path}/:id`, notification_controller_1.default.updateNotification);
        this.router.delete(`${this.path}/:id`, notification_controller_1.default.deleteNotification);
    }
}
exports.default = new NotificationRoute();
//# sourceMappingURL=notification.route.js.map