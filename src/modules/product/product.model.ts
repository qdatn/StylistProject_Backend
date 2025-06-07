import mongoose, { Schema } from "mongoose";
import Attribute from "@modules/attribute/attribute.model";

// Define the Product schema
const productSchema = new Schema(
  {
    product_name: { type: String, required: true },
    // price: { type: Number, required: true },
    // discounted_price: { type: Number },
    description: { type: String, default: "No description provided" },
    brand: { type: String, default: "No brand provided" },
    // stock_quantity: { type: Number, required: true, default: 0 },
    // min_quantity: { type: Number, required: true, default: 0 },
    // sold_quantity: { type: Number, default: 0 },
    categories: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Category",
      },
    ],
    status: { type: Boolean, default: true },
    images: { type: [String], default: [] },
    // attributes: [
    //   {
    //     key: { type: String },
    //     value: [{ type: String }],
    //   },
    // ],
    variants: [
      {
        attributes: [
          {
            key: { type: String, required: true },
            value: { type: String, required: true },
          },
        ],
        price: { type: Number, required: true },
        // discounted_price: { type: Number },
        stock_quantity: { type: Number, required: true, default: 0 },
        min_quantity: { type: Number, required: true, default: 0 },
        sold_quantity: { type: Number, default: 0 },
        stock_update_date: { type: Date, default: new Date() },
      },
    ],
  },
  { timestamps: true }
);

// Create and export the model based on the schema
const Product = mongoose.model("Product", productSchema);

export default Product;
