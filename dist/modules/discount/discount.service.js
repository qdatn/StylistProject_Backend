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
const mongoose_1 = require("mongoose");
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
            const categoryIds = yield this.getCategoryIdsFromProductIds(productIds);
            const discounts = yield discount_model_1.default.find({
                $or: [
                    { type: "all" },
                    { type: "product", apply_items: { $in: productIds } },
                    {
                        type: "category",
                        apply_items: {
                            $in: categoryIds,
                        },
                    },
                ],
                start_date: { $lte: new Date() },
                end_date: { $gte: new Date() },
                status: true,
            });
            return discounts
                .filter((discount) => {
                // Check conditions for minimum value and max discount
                if ((discount.minimum_value && totalPrice < discount.minimum_value) ||
                    (discount.usage_limit && discount.used_count >= discount.usage_limit)) {
                    return false;
                }
                return true;
            })
                .sort((a, b) => b.value - a.value);
        });
    }
    getCategoryIdsFromProductIds(productIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_1.Product.find({ _id: { $in: productIds } }).select("categories");
            const categoryIds = products.flatMap((product) => product.categories);
            return [...new Set(categoryIds.map((id) => id.toString()))]; // Remove duplicates
        });
    }
    applyDiscount(code, cartItems, totalPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const discount = yield discount_model_1.default.findOne({ code, status: true });
            if (!discount) {
                throw new Error("Invalid or inactive discount code.");
            }
            const now = new Date();
            if (now < discount.start_date || now > discount.end_date) {
                throw new Error("This discount code is not valid at this time.");
            }
            if (discount.minimum_value && totalPrice < discount.minimum_value) {
                throw new Error(`Minimum order value is ${discount.minimum_value}.`);
            }
            if (discount.usage_limit && discount.used_count >= discount.usage_limit) {
                throw new Error("This discount has reached its usage limit.");
            }
            // Load product data
            const productIds = cartItems.map((item) => new mongoose_1.Types.ObjectId(item.productId));
            const products = yield product_1.Product.find({ _id: { $in: productIds } });
            let applicableAmount = 0;
            for (const item of cartItems) {
                const product = products.find((p) => p._id.toString() === item.productId);
                if (!product || !product.variants)
                    continue;
                // Find matching variant by attributes
                const matchedVariant = product.variants.find((variant) => item.attribute.every((attr) => variant.attributes.some((vAttr) => vAttr.key === attr.key && vAttr.value === attr.value)));
                if (!matchedVariant)
                    continue;
                const itemTotal = matchedVariant.price * item.quantity;
                if (discount.type === "all") {
                    applicableAmount += itemTotal;
                }
                else if (discount.type === "product" &&
                    discount.apply_items.some((id) => id.toString() === product._id.toString())) {
                    applicableAmount += itemTotal;
                }
                else if (discount.type === "category" &&
                    ((_a = product.categories) === null || _a === void 0 ? void 0 : _a.some((catId) => discount.apply_items.some((id) => id.toString() === catId.toString())))) {
                    applicableAmount += itemTotal;
                }
            }
            if (applicableAmount === 0) {
                throw new Error("No items in the cart are eligible for this discount.");
            }
            // Calculate discount amount (percentage)
            const rawDiscountAmount = (discount.value / 100) * applicableAmount;
            const discountAmount = Math.min(rawDiscountAmount, discount.max_discount || Infinity);
            // Update used count
            discount.used_count += 1;
            yield discount.save();
            return {
                discountAmount,
                finalPrice: totalPrice - discountAmount,
                // appliedOnAmount: applicableAmount,
            };
        });
    }
}
exports.default = new DiscountService();
//# sourceMappingURL=discount.service.js.map