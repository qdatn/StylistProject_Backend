import mongoose, { Schema } from "mongoose";

// Define the Cart schema
const cartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

// Create the model based on the schema
const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
