"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryDto = exports.CategoryRoute = exports.CategoryController = exports.CategoryService = exports.CategoryRepository = exports.Category = void 0;
const category_model_1 = __importDefault(require("./category.model"));
exports.Category = category_model_1.default;
const category_repository_1 = __importDefault(require("./category.repository"));
exports.CategoryRepository = category_repository_1.default;
const category_service_1 = __importDefault(require("./category.service"));
exports.CategoryService = category_service_1.default;
const category_controller_1 = __importDefault(require("./category.controller"));
exports.CategoryController = category_controller_1.default;
const category_route_1 = __importDefault(require("./category.route"));
exports.CategoryRoute = category_route_1.default;
// import ICategory from "./category.interface";
const category_dto_1 = __importDefault(require("./dtos/category.dto"));
exports.CategoryDto = category_dto_1.default;
//# sourceMappingURL=index.js.map