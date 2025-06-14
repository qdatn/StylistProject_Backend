import { ProductDto, ProductService } from "@modules/product"; // Cập nhật đường dẫn tới mô hình Product
import { OrderItemDTO } from "@modules/orderItem";
import { OrderDTO } from "@modules/order";
const reduceProductStock = async function (this: OrderItemDTO, next: Function) {
  try {
    const product = await ProductService.getProductById(this.product);
    if (!product) {
      throw new Error("Product not found");
    }

    // Tìm biến thể đúng dựa trên attributes từ OrderItem
    const matchedVariant: any = product.variants.find((variant: any) => {
      return (
        variant.attributes.length === this.attributes.length &&
        variant.attributes.every((attr: any) =>
          this.attributes.some(
            (orderAttr: any) =>
              orderAttr.key === attr.key && orderAttr.value === attr.value
          )
        )
      );
    });

    // Kiểm tra tồn kho
    if (matchedVariant.stock_quantity < this.quantity) {
      throw new Error("Out of stock for the selected variant");
    }

    // Cập nhật tồn kho và số lượng đã bán
    matchedVariant.stock_quantity -= this.quantity;
    matchedVariant.sold_quantity += this.quantity;
    matchedVariant.stock_update_date = new Date();

    await product.save();

    next();
  } catch (error: any) {
    next(error);
  }
};

export default reduceProductStock;
