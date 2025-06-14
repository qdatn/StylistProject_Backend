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
const increaseProductStock = function (order_item
// next: NextFunction
) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield product_1.ProductService.getProductById(order_item.product);
            if (!product) {
                throw new Error("Product not found");
            }
            // Tìm đúng biến thể dựa trên attributes
            const matchedVariant = product.variants.find((variant) => {
                return (variant.attributes.length === order_item.attributes.length &&
                    variant.attributes.every((attr) => order_item.attributes.some((orderAttr) => orderAttr.key === attr.key && orderAttr.value === attr.value)));
            });
            if (!matchedVariant) {
                throw new Error("Cannot find matching variant for the order item");
            }
            // Cập nhật số lượng tồn kho và số lượng đã bán
            matchedVariant.stock_quantity += order_item.quantity;
            matchedVariant.sold_quantity -= order_item.quantity;
            if (matchedVariant.sold_quantity < 0)
                matchedVariant.sold_quantity = 0;
            matchedVariant.stock_update_date = new Date();
            yield product.save(); // Lưu thay đổi
        }
        catch (error) {
            // Ném lỗi để xử lý bên ngoài nếu cần thiết
            throw new Error(error.message);
        }
    });
};
exports.default = increaseProductStock;
//# sourceMappingURL=increaseProductQty.middleware.js.map