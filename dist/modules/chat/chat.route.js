"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = __importDefault(require("./chat.controller"));
class ChatRoute {
    constructor() {
        this.path = "/api/chat";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/messages`, chat_controller_1.default.getMessages);
        this.router.post(`${this.path}/send`, chat_controller_1.default.sendMessage);
        this.router.get(`${this.path}/:id`, chat_controller_1.default.getMessageById);
        this.router.get(`${this.path}/user/:id`, chat_controller_1.default.getMessagesByUserId);
        this.router.delete(`${this.path}/:id`, chat_controller_1.default.deleteMessage);
    }
}
exports.default = new ChatRoute();
//# sourceMappingURL=chat.route.js.map