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
const product_1 = require("../product");
const discount_model_1 = __importDefault(require("./discount.model"));
const discount_repository_1 = __importDefault(require("./discount.repository"));
class DiscountService {
    createDiscount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield discount_repository_1.default.create(data);
        });
    }
    getDiscountById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield discount_repository_1.default.findById(id);
        });
    }
    getAllDiscounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield discount_repository_1.default.findAll();
        });
    }
    updateDiscount(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield discount_repository_1.default.update(id, data);
        });
    }
    deleteDiscount(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield discount_repository_1.default.delete(id);
        });
    }
    getAvailableDiscounts(productIds, totalPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            const discounts = yield discount_model_1.default.find({
                $or: [
                    { type: "all" },
                    { type: "product", apply_items: { $in: productIds } },
                    {
                        type: "category",
                        apply_items: {
                            $in: yield this.getCategoryIdsFromProductIds(productIds),
                        },
                    },
                ],
                start_date: { $lte: new Date() },
                end_date: { $gte: new Date() },
                status: true,
            });
            return discounts.filter((discount) => {
                // Check conditions for minimum value and max discount
                if (discount.minimum_value && totalPrice < discount.minimum_value) {
                    return false;
                }
                return true;
            });
        });
    }
    getCategoryIdsFromProductIds(productIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_1.Product.find({ _id: { $in: productIds } }).select("categories");
            const categoryIds = products.flatMap((product) => product.categories);
            return [...new Set(categoryIds.map((id) => id.toString()))]; // Remove duplicates
        });
    }
}
exports.default = new DiscountService();
//# sourceMappingURL=discount.service.js.map