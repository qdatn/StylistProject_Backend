import { increaseProductStock, reduceProductStock } from "@core/middlewares";
import { orderItemSchema } from "@modules/orderItem/orderItem.model";
import mongoose, { Schema } from "mongoose";
// Define the Order schema
const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    order_items: {
      type: [orderItemSchema],
      default: [],
    },
    status: { type: String, required: true }, // E.g., 'Pending', 'Shipped', 'Delivered'
    discount: { type: Number, default: 0 },
    total_price: { type: Number, required: true, default: 0 },
    method: { type: String, required: true },
    receive_date: { type: Date, default: "" },
  },
  { timestamps: true }
);

// Middleware giảm số lượng sản phẩm khi lưu OrderItem
orderSchema.pre("save", reduceProductStock);
orderSchema.post("findOneAndUpdate", increaseProductStock);

// Create the model based on the schema
const Order = mongoose.model("Order", orderSchema);

export default Order;
