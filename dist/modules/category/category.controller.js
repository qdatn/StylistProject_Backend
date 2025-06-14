"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// controllers/categoryController.js
const middlewares_1 = require("../../core/middlewares");
const category_service_1 = __importDefault(require("../category/category.service"));
class CategoryController {
    getAllCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield category_service_1.default.getAllCategories();
                yield (0, middlewares_1.pagination)(req, res, categories, next);
                res.status(200).json(res.locals.pagination);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getCategoryById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_service_1.default.getCategoryById(req.params.id);
                if (!category) {
                    res.status(404).json({ message: "Category not found" });
                }
                res.status(200).json(category);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_service_1.default.createCategory(req.body);
                res.status(201).json(category);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createManyCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = req.body; // Dữ liệu sản phẩm gửi từ client
                const newCategories = yield category_service_1.default.createManyCategories(categories);
                res.status(201).json({
                    message: "Categories added successfully",
                    data: newCategories,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCategory = yield category_service_1.default.updateCategory(req.params.id, req.body);
                if (!updatedCategory) {
                    res.status(404).json({ message: "Category not found" });
                }
                res.status(200).json(updatedCategory);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCategory = yield category_service_1.default.deleteCategory(req.params.id);
                if (!deletedCategory) {
                    res.status(404).json({ message: "Category not found" });
                }
                res.status(200).json({ message: "Category deleted" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new CategoryController();
//# sourceMappingURL=category.controller.js.map