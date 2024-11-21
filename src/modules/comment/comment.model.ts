import mongoose, { Schema } from "mongoose";

// Define the Comment Schema
const commentSchema = new Schema(
  {
    // comment_id: { type: Schema.Types.ObjectId, auto: true },
    product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "UserInfo",
      // fields: "user",
      // localField: "user", // Trường trong model Post
      // foreignField: "user",
    }, // Trường trong model User mà Post sẽ tham chiếu },
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
    review: { type: String },
  },
  {
    timestamps: true,
  }
);

commentSchema.virtual("user_info", {
  ref: "UserInfo",
  localField: "user", // Trường trong Comment để liên kết
  foreignField: "user",
  justOne: true, // Only return one result
});

commentSchema.set("toJSON", { virtuals: true });
commentSchema.set("toObject", { virtuals: true });
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
