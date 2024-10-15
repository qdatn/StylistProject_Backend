import mongoose, { Schema } from "mongoose";

// Define the Comment Schema
const commentSchema = new Schema(
  {
    comment_id: { type: Schema.Types.ObjectId, auto: true },
    product_id: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
    review: { type: String },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
