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

    // Tìm đúng biến thể dựa trên attributes
    const matchedVariant: any = product.variants.find((variant: any) => {
      return (
        variant.attributes.length === order_item.attributes.length &&
        variant.attributes.every((attr: any) =>
          order_item.attributes.some(
            (orderAttr: any) =>
              orderAttr.key === attr.key && orderAttr.value === attr.value
          )
        )
      );
    });

    if (!matchedVariant) {
      throw new Error("Không tìm thấy biến thể sản phẩm phù hợp");
    }

    // Cập nhật số lượng tồn kho và số lượng đã bán
    matchedVariant.stock_quantity += order_item.quantity;
    matchedVariant.sold_quantity -= order_item.quantity;
    if (matchedVariant.sold_quantity < 0) matchedVariant.sold_quantity = 0;
    matchedVariant.stock_update_date = new Date();

    await product.save(); // Lưu thay đổi

    // Tăng số lượng sản phẩm
    // product.stock_quantity += order_item.quantity;
    // await product.save();
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
