"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = __importDefault(require("./cart.controller"));
class CartRoute {
    // Constructor
    constructor() {
        this.path = "/api/cart";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/`, cart_controller_1.default.getAllCart);
        this.router.get(`${this.path}/:userid`, cart_controller_1.default.getCartByUserId);
        this.router.post(`${this.path}/`, cart_controller_1.default.createCart);
        this.router.put(`${this.path}/:userid`, cart_controller_1.default.updateCart);
        this.router.put(`${this.path}/addProduct/:userid`, cart_controller_1.default.addProduct);
        this.router.delete(`${this.path}/:userid`, cart_controller_1.default.deleteCart);
        this.router.put(`${this.path}/deleteProduct/:userid`, cart_controller_1.default.deleteProduct);
    }
}
exports.default = new CartRoute();
//# sourceMappingURL=cart.route.js.map