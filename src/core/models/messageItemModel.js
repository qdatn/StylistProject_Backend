import mongoose, { Schema } from "mongoose";

// Define the MessageItem schema
const messageItemSchema = new Schema(
  {
    message_id: { type: Schema.Types.ObjectId, auto: true },
    sender_id: { type: Schema.Types.ObjectId, required: true, ref: "User" }, // Reference to User model
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
  },
  { timestamps: true }
);

// Create the model based on the schema
const MessageItem = mongoose.model("MessageItem", messageItemSchema);

export default MessageItem;
