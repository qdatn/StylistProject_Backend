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
// orderItemMiddleware.ts
const product_1 = require("../../modules/product"); // Cập nhật đường dẫn tới mô hình Product
const reduceProductStock = function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Duyệt qua từng order item trong order_items
            // if (Array.isArray(this.product)) {
            // await Promise.all(
            // this.order_items.map(async (order_item: any) => {
            const product = yield product_1.ProductService.getProductById(this.product);
            if (!product) {
                throw new Error("Sản phẩm không tồn tại");
            }
            // Kiểm tra nếu số lượng đặt hàng lớn hơn số lượng tồn kho
            if (product.stock_quantity < this.quantity) {
                throw new Error("Số lượng đặt hàng vượt quá tồn kho");
            }
            // Giảm số lượng sản phẩm trong kho
            product.stock_quantity -= this.quantity;
            yield product.save(); // Lưu thay đổi số lượng vào cơ sở dữ liệu
            // })
            // );
            // }
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = reduceProductStock;
//# sourceMappingURL=reduceProductQty.middleware.js.map