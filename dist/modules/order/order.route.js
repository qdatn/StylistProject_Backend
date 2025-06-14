"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = __importDefault(require("./order.controller"));
class OrderItemRoute {
    // Constructor
    constructor() {
        this.path = "/api/order";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/`, order_controller_1.default.createOrder);
        this.router.get(`${this.path}/`, order_controller_1.default.getAllOrders);
        this.router.get(`${this.path}/:id`, order_controller_1.default.getOrderById);
        this.router.get(`${this.path}/user/:userid`, order_controller_1.default.getOrderByUserId);
        this.router.put(`${this.path}/:id`, order_controller_1.default.updateOrder);
        this.router.delete(`${this.path}/:id`, order_controller_1.default.deleteOrder);
    }
}
exports.default = new OrderItemRoute();
//# sourceMappingURL=order.route.js.map