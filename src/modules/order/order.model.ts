import mongoose, { Schema } from "mongoose";

// Define the Order schema
const orderSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    order_items: [
      { type: Schema.Types.ObjectId, required: true, ref: "OrderItem" },
    ],
    status: { type: String, required: true }, // E.g., 'Pending', 'Shipped', 'Delivered'
    discount: { type: Number, default: 0 },
    total_price: { type: Number, required: true },
    method: { type: String, required: true },
    receive_date: { type: Date, default: "" },
  },
  { timestamps: true }
);

// Create the model based on the schema
const Order = mongoose.model("Order", orderSchema);

export default Order;
