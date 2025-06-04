import { ProductDto, ProductService } from "@modules/product"; // Cập nhật đường dẫn tới mô hình Product
import { OrderItemDTO } from "@modules/orderItem";
import { OrderDTO } from "@modules/order";
const reduceProductStock = async function (this: OrderItemDTO, next: Function) {
  try {
    const product = await ProductService.getProductById(this.product);
    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
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
      throw new Error("Số lượng đặt hàng vượt quá tồn kho");
    }

    // Cập nhật tồn kho và số lượng đã bán
    matchedVariant.stock_quantity -= this.quantity;
    matchedVariant.sold_quantity += this.quantity;
    matchedVariant.stock_update_date = new Date();

    await product.save();

    // if (!matchedVariant) {
    //   throw new Error("Không tìm thấy biến thể sản phẩm phù hợp");
    // }

    // // Kiểm tra nếu số lượng đặt hàng lớn hơn số lượng tồn kho
    // if (product.stock_quantity < this.quantity) {
    //   throw new Error("Số lượng đặt hàng vượt quá tồn kho");
    // }

    // // Giảm số lượng sản phẩm trong kho
    // product.stock_quantity -= this.quantity;
    // await product.save(); // Lưu thay đổi số lượng vào cơ sở dữ liệu
    // // })
    // // );
    // // }
    next();
  } catch (error: any) {
    next(error);
  }
};

export default reduceProductStock;
