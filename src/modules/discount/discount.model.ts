import mongoose, { Schema, Document } from "mongoose";

// Discount Schema
const discountSchema = new Schema(
  {
    code: { type: String, required: true },
    type: { type: String, required: true },
    value: { type: Number, required: true },
    minimum_value: { type: Number },
    max_discount: { type: Number },
    apply_items: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    usage_limit: { type: Number, default: 1, min: 1 },
    used_count: { type: Number, default: 0, min: 0 },
    status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Discount = mongoose.model("Discount", discountSchema);

export default Discount;
