import { reduceProductStock, increaseProductStock } from "@core/middlewares";
import { Product } from "@modules/product";
import mongoose, { Schema } from "mongoose";

// Define the orderItem Schema
export const orderItemSchema = new Schema({
  order: { type: Schema.Types.ObjectId, required: true, ref: "Order" },
  product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
  quantity: { type: Number, required: true },
  attributes: [
    {
      key: { type: String },
      value: { type: String },
    },
  ],
  note: { type: String },
});

// Middleware giảm số lượng sản phẩm khi lưu OrderItem
orderItemSchema.pre("save", reduceProductStock);
orderItemSchema.post("findOneAndDelete", increaseProductStock);

// Create the model based on the schema
const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export default OrderItem;
