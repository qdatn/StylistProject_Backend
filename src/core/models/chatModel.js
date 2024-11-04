import mongoose, { Schema } from "mongoose";
import MessageItem from "../models/messageItemModel.js";

// Define the Chat schema
const chatSchema = new Schema(
  {
    chat_id: { type: Schema.Types.ObjectId, auto: true },
    sender_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    receiver_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    message_items: [MessageItem], // Array of MessageItem sub-documents
    create_date: { type: Date, default: Date.now },
  },
  { timestamp: true }
);

// Create the model based on the schema
const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
