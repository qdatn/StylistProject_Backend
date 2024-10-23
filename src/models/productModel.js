import mongoose, { Schema } from "mongoose";
import { categorySchema as Category } from "../models/categoryModel.js";
import { attributeSchema as Attribute } from "../models/attributeModel.js";

// Define the Product schema
const productSchema = new Schema(
  {
    product_id: { type: Schema.Types.ObjectId, auto: true },
    product_name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    brand: { type: String },
    stock_quantity: { type: Number, required: true },
    min_quantity: { type: Number, required: true },
    sold_quantity: { type: Number, default: 0 },
    categories: [Category],
    stock_update_date: { type: Date },
    status: { type: Boolean, default: true },
    image: { type: String },
    attribute: [Attribute],
    /* comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }], */
  },
  { timestamps: true }
);

// Create and export the model based on the schema
const Product = mongoose.model("Product", productSchema);

export default Product;
