import mongoose, { Schema } from "mongoose";
import OrderItem from "../models/orderItemModel.js";

// Define the Order schema
const orderSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    order_items: [OrderItem], // Array of OrderItem sub-documents
    status: { type: String, required: true }, // E.g., 'Pending', 'Shipped', 'Delivered'
    discount: { type: Number, default: 0 }, // Discount percentage or amount
    total_price: { type: Number, required: true },
    method: { type: String, required: true }, // E.g., 'Credit Card', 'PayPal'
    receive_date: { type: Date }, // Estimated or actual delivery date
  },
  { timestamps: true }
);

// Create the model based on the schema
const Order = mongoose.model("Order", orderSchema);

export default Order;
