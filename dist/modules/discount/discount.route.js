"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const discount_controller_1 = __importDefault(require("./discount.controller"));
class DiscountRoute {
    // Constructor
    constructor() {
        this.path = "/api/discount";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/`, discount_controller_1.default.getAllDiscounts);
        this.router.get(`${this.path}/:id`, discount_controller_1.default.getDiscountById);
        this.router.post(`${this.path}/`, discount_controller_1.default.createDiscount);
        this.router.post(`${this.path}/available-discounts`, discount_controller_1.default.getAvailableDiscounts);
        this.router.post(`${this.path}/apply-discount`, discount_controller_1.default.applyDiscount);
        this.router.put(`${this.path}/:id`, discount_controller_1.default.updateDiscount);
        this.router.delete(`${this.path}/:id`, discount_controller_1.default.deleteDiscount);
    }
}
exports.default = new DiscountRoute();
//# sourceMappingURL=discount.route.js.map