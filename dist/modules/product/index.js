"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDto = exports.ProductRoute = exports.ProductController = exports.ProductService = exports.ProductRepository = exports.Product = void 0;
const product_model_1 = __importDefault(require("../product/product.model"));
exports.Product = product_model_1.default;
const product_repository_1 = __importDefault(require("../product/product.repository"));
exports.ProductRepository = product_repository_1.default;
const product_service_1 = __importDefault(require("../product/product.service"));
exports.ProductService = product_service_1.default;
const product_controller_1 = __importDefault(require("../product/product.controller"));
exports.ProductController = product_controller_1.default;
const product_route_1 = __importDefault(require("../product/product.route"));
exports.ProductRoute = product_route_1.default;
const product_dto_1 = __importDefault(require("./dtos/product.dto"));
exports.ProductDto = product_dto_1.default;
//# sourceMappingURL=index.js.map