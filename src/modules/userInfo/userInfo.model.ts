import mongoose, { Schema } from "mongoose";

// Define the UserInfo schema
const userInfoSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    phone_number: { type: String, default: "No provided" },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },
    birthday: { type: Date, default: new Date() },
    body_shape: { type: String, default: "No provided" }, // Optional, e.g., 'Slim', 'Athletic', 'Curvy', etc.
    height: { type: Number, default: 0 }, // Height in centimeters
    weight: { type: Number, default: 0 }, // Weight in kilograms
    style_preferences: { type: [String] }, // Array of style preferences
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Create the model based on the schema
const UserInfo = mongoose.model("UserInfo", userInfoSchema);

export default UserInfo;