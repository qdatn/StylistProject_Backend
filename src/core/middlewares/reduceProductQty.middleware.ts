// orderItemMiddleware.ts
import { ProductDto, ProductService } from "@modules/product"; // Cập nhật đường dẫn tới mô hình Product
import { OrderItemDTO } from "@modules/orderItem";
import { OrderDTO } from "@modules/order";
const reduceProductStock = async function (this: OrderDTO, next: Function) {
  try {
    // Duyệt qua từng order item trong order_items
    if (Array.isArray(this.order_items)) {
      await Promise.all(
        this.order_items.map(async (order_item: any) => {
          const product = await ProductService.getProductById(
            order_item.product
          );
          if (!product) {
            throw new Error("Sản phẩm không tồn tại");
          }

          // Kiểm tra nếu số lượng đặt hàng lớn hơn số lượng tồn kho
          if (product.stock_quantity < order_item.quantity) {
            throw new Error("Số lượng đặt hàng vượt quá tồn kho");
          }

          // Giảm số lượng sản phẩm trong kho
          product.stock_quantity -= order_item.quantity;
          await product.save(); // Lưu thay đổi số lượng vào cơ sở dữ liệu
        })
      );
    }
    next();
  } catch (error: any) {
    next(error);
  }
};

export default reduceProductStock;
