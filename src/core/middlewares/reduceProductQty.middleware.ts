// orderItemMiddleware.ts
import { ProductService } from "@modules/product"; // Cập nhật đường dẫn tới mô hình Product
import { IOrderItem } from "@modules/orderItem";
const reduceProductStock = async function (this: IOrderItem, next: Function) {
  try {
    const product = await ProductService.getProductById(this.product);

    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
    }

    // Kiểm tra nếu số lượng đặt hàng lớn hơn số lượng tồn kho
    if (product.stock_quantity < this.quantity) {
      throw new Error("Số lượng đặt hàng vượt quá tồn kho");
    }

    // Giảm số lượng sản phẩm
    product.stock_quantity -= this.quantity;
    await product.save();

    next();
  } catch (error: any) {
    next(error);
  }
};

export default reduceProductStock;
