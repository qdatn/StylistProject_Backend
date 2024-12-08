"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = __importDefault(require("../category/category.controller"));
class CategoryRoute {
    // Constructor
    constructor() {
        this.path = "/api/category";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/`, category_controller_1.default.getAllCategories); // Lấy tất cả category
        this.router.get(`${this.path}/:id`, category_controller_1.default.getCategoryById); // Lấy category theo ID
        this.router.post(`${this.path}/`, category_controller_1.default.createCategory); // Tạo category mới
        this.router.post(`${this.path}/insertMany`, category_controller_1.default.createManyCategories); // Tạo nhiều category
        this.router.put(`${this.path}/:id`, category_controller_1.default.updateCategory); // Cập nhật category theo ID
        this.router.delete(`${this.path}/:id`, category_controller_1.default.deleteCategory); // Xóa category theo ID
    }
}
exports.default = new CategoryRoute();
//# sourceMappingURL=category.route.js.map