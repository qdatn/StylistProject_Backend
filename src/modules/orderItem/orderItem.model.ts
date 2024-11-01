import mongoose, { Schema } from "mongoose";

// Define the orderItem Schema
const orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
  quantity: { type: Number, required: true },
  note: { type: String },
});

// Create the model based on the schema
const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export default OrderItem;
