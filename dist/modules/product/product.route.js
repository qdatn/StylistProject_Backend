"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../product/product.controller"));
const uploadImg_middleware_1 = __importDefault(require("../../core/middlewares/uploadImg.middleware"));
class ProductRoute {
    // Constructor
    constructor() {
        this.path = "/api/product";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/search/query`, product_controller_1.default.getFilteredProducts);
        this.router.get(`${this.path}/`, product_controller_1.default.getAllProducts);
        // this.router.get(
        //   `${this.path}/search/query`,
        //   ProductController.searchProducts
        // );
        this.router.get(`${this.path}/:id`, product_controller_1.default.getProductById);
        this.router.post(`${this.path}/`, uploadImg_middleware_1.default.single("image"), product_controller_1.default.createProduct);
        this.router.post(`${this.path}/insertMany`, product_controller_1.default.createManyProducts);
        this.router.put(`${this.path}/:id`, product_controller_1.default.updateProduct);
        this.router.delete(`${this.path}/:id`, product_controller_1.default.deleteProduct);
        this.router.post(`${this.path}/upload`, uploadImg_middleware_1.default.single("image"), product_controller_1.default.uploadImage);
    }
}
exports.default = new ProductRoute();
//# sourceMappingURL=product.route.js.map