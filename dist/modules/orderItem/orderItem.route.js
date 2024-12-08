"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderItem_controller_1 = __importDefault(require("./orderItem.controller"));
class OrderItemRoute {
    // Constructor
    constructor() {
        this.path = "/api/orderitem";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/`, 
        // reduceProductQtyMiddleware,
        orderItem_controller_1.default.createOrderItem);
        this.router.get(`${this.path}/`, orderItem_controller_1.default.getAllOrderItems);
        this.router.get(`${this.path}/:id`, orderItem_controller_1.default.getOrderItemById);
        this.router.get(`${this.path}/order/:order`, orderItem_controller_1.default.getOrderItemByOrderId);
        this.router.put(`${this.path}/:id`, orderItem_controller_1.default.updateOrderItem);
        this.router.delete(`${this.path}/:id`, orderItem_controller_1.default.deleteOrderItem);
    }
}
exports.default = new OrderItemRoute();
//# sourceMappingURL=orderItem.route.js.map