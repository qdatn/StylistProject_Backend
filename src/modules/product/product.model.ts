import mongoose, { Schema } from "mongoose";

// Define the Product schema
const productSchema = new Schema(
  {
    product_name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, default: "No description provided" },
    brand: { type: String, default: "No brand provided" },
    stock_quantity: { type: Number, required: true, default: 0 },
    min_quantity: { type: Number, required: true, default: 0 },
    sold_quantity: { type: Number, default: 0 },
    categories: {
      type: Schema.Types.ObjectId,
      required: true,
      // ref: "Category",
    },
    stock_update_date: { type: Date, default: new Date() },
    status: { type: Boolean, default: true },
    image: { type: String, defaut: "" },
    attributes: {
      type: Schema.Types.ObjectId,
      required: true,
      // ref: "Attribute",
    },
  },
  { timestamps: true }
);

// Create and export the model based on the schema
const Product = mongoose.model("Product", productSchema);

export default Product;
