import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema(
  {
    userId: { type: String, required: true },
    type: {
      type: String,
      enum: ['general', 'user', 'system', 'event', 'alert', 'custom'],
      default: 'general',
      index: true,
    },
    title: { type: String, require: true },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
      index: true,
    },
    content: { type: String, required: true },
    status: {
      type: String,
      enum: ['unread', 'read', 'archived'],
      default: 'unread',
      index: true,
    },

    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
