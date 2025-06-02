import { ProductService } from "@modules/product"; // Cập nhật đường dẫn tới mô hình Product
import { IOrderItem, OrderItemDTO } from "@modules/orderItem";
import { OrderDTO } from "@modules/order";
import { NextFunction } from "express";

const increaseProductStock = async function (
  order_item: OrderItemDTO
  // next: NextFunction
) {
  try {
    // Duyệt qua từng order item trong order_items
    // if (Array.isArray(order.order_items)) {
    // if (order.status === "On Cancel") {
    // await Promise.all(
    // orderitem.order_items.map(async (order_item: any) => {
    const product = await ProductService.getProductById(order_item.product);
    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
    }

    // Tăng số lượng sản phẩm
    product.stock_quantity += order_item.quantity;
    await product.save();
    // })
    // );
    // }
    // }
    // next();
  } catch (error: any) {
    // Ném lỗi để xử lý bên ngoài nếu cần thiết
    throw new Error(error.message);
  }
};

export default increaseProductStock;
