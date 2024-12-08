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
const product_model_1 = __importDefault(require("../product/product.model"));
const mongoose_1 = __importDefault(require("mongoose"));
class ProductRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.default.find().populate("categories").populate("attributes");
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.default.findOne({ _id: id })
                .populate("categories")
                .populate("attributes");
        });
    }
    create(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.default.create(productData);
        });
    }
    createMany(products) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.default.insertMany(products);
        });
    }
    update(id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = new mongoose_1.default.Types.ObjectId(id);
            return yield product_model_1.default.findOneAndUpdate({ _id: _id }, productData, {
                new: true,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = new mongoose_1.default.Types.ObjectId(id);
            return yield product_model_1.default.deleteOne({ _id: _id });
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return product_model_1.default.find({ product_name: { $regex: name, $options: "i" } });
        });
    }
    findByFilter(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return product_model_1.default.find(query);
        });
    }
}
exports.default = new ProductRepository();
//# sourceMappingURL=product.repository.js.map