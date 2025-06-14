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
const category_model_1 = __importDefault(require("../category/category.model"));
const mongoose_1 = __importDefault(require("mongoose"));
class CategoryRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_model_1.default.find().sort({ createdAt: -1 });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_model_1.default.findOne({
                // search without casitive
                _id: id,
            }).sort({ createdAt: -1 });
        });
    }
    create(CategoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_model_1.default.create(CategoryData);
        });
    }
    createMany(categories) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_model_1.default.insertMany(categories);
        });
    }
    update(id, categoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_model_1.default.findOneAndUpdate({ _id: id }, categoryData, {
                new: true,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = new mongoose_1.default.Types.ObjectId(id);
            return yield category_model_1.default.deleteOne({ _id: _id });
        });
    }
}
exports.default = new CategoryRepository();
//# sourceMappingURL=category.repository.js.map