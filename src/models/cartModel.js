import mongoose, { Schema } from "mongoose";

// Define the Cart schema
const cartSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    product_id: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
  },
  { timestamps: true }
);

// Create the model based on the schema
const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
