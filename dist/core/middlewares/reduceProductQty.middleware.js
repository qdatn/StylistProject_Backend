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
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../modules/product"); // Cập nhật đường dẫn tới mô hình Product
const reduceProductStock = function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield product_1.ProductService.getProductById(this.product);
            if (!product) {
                throw new Error("Product not found");
            }
            // Tìm biến thể đúng dựa trên attributes từ OrderItem
            const matchedVariant = product.variants.find((variant) => {
                return (variant.attributes.length === this.attributes.length &&
                    variant.attributes.every((attr) => this.attributes.some((orderAttr) => orderAttr.key === attr.key && orderAttr.value === attr.value)));
            });
            // Kiểm tra tồn kho
            if (matchedVariant.stock_quantity < this.quantity) {
                throw new Error("Out of stock for the selected variant");
            }
            // Cập nhật tồn kho và số lượng đã bán
            matchedVariant.stock_quantity -= this.quantity;
            matchedVariant.sold_quantity += this.quantity;
            matchedVariant.stock_update_date = new Date();
            yield product.save();
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = reduceProductStock;
//# sourceMappingURL=reduceProductQty.middleware.js.map