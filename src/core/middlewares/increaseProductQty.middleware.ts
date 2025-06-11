import { ProductService } from "@modules/product"; // Cập nhật đường dẫn tới mô hình Product
import { IOrderItem, OrderItemDTO } from "@modules/orderItem";
import { OrderDTO } from "@modules/order";
import { NextFunction } from "express";

const increaseProductStock = async function (
  order_item: OrderItemDTO
  // next: NextFunction
) {
  try {
    const product = await ProductService.getProductById(order_item.product);
    if (!product) {
      throw new Error("Product not found");
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
      throw new Error("Cannot find matching variant for the order item");
    }

    // Cập nhật số lượng tồn kho và số lượng đã bán
    matchedVariant.stock_quantity += order_item.quantity;
    matchedVariant.sold_quantity -= order_item.quantity;
    if (matchedVariant.sold_quantity < 0) matchedVariant.sold_quantity = 0;
    matchedVariant.stock_update_date = new Date();

    await product.save(); // Lưu thay đổi

  } catch (error: any) {
    // Ném lỗi để xử lý bên ngoài nếu cần thiết
    throw new Error(error.message);
  }
};

export default increaseProductStock;
