"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = __importDefault(require("./payment.controller"));
class PaymentRoute {
    // Constructor
    constructor() {
        this.path = "/api/payment";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/momo/refund`, payment_controller_1.default.refundPayment);
        this.router.post(`${this.path}/momo/refund/status`, payment_controller_1.default.queryRefundStatus);
        this.router.post(`${this.path}/momo`, payment_controller_1.default.createPayment);
        this.router.post(`${this.path}/vnpay`, payment_controller_1.default.createVnpayPayment);
    }
}
exports.default = new PaymentRoute();
//# sourceMappingURL=payment.route.js.map