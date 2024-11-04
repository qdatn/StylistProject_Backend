// orderItemMiddleware.ts
import { ProductService } from "@modules/product"; // Cập nhật đường dẫn tới mô hình Product
import { IOrderItem } from "@modules/orderItem";

const increaseProductStock = async function (doc: IOrderItem) {
  try {
    // Tìm sản phẩm bằng ID từ order item
    const product = await ProductService.getProductById(doc.product);

    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
    }

    // Tăng số lượng sản phẩm
    product.stock_quantity += doc.quantity;
    await product.save();

    // Không cần gọi next() ở đây
  } catch (error: any) {
    // Ném lỗi để xử lý bên ngoài nếu cần thiết
    throw new Error(error.message);
  }
};

export default increaseProductStock;
