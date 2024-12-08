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
const increaseProductStock = function (order_item
// next: NextFunction
) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Duyệt qua từng order item trong order_items
            // if (Array.isArray(order.order_items)) {
            // if (order.status === "On Cancel") {
            // await Promise.all(
            // orderitem.order_items.map(async (order_item: any) => {
            const product = yield product_1.ProductService.getProductById(order_item.product);
            if (!product) {
                throw new Error("Sản phẩm không tồn tại");
            }
            // Tăng số lượng sản phẩm
            product.stock_quantity += order_item.quantity;
            yield product.save();
            // })
            // );
            // }
            // }
            // next();
        }
        catch (error) {
            // Ném lỗi để xử lý bên ngoài nếu cần thiết
            throw new Error(error.message);
        }
    });
};
exports.default = increaseProductStock;
//# sourceMappingURL=increaseProductQty.middleware.js.map