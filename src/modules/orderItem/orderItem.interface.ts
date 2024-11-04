// models/OrderItem.ts
import { Document } from "mongoose";

export default interface IOrderItem extends Document {
  order: string; // Hoặc Schema.Types.ObjectId nếu cần
  product: string; // Hoặc Schema.Types.ObjectId nếu cần
  quantity: number;
  note?: string; // Thuộc tính này là tùy chọn
}
