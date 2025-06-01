import mongoose, { Schema } from "mongoose";

// Define the UserInfo schema
const userInfoSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    avatar: {
      type: String,
      // required: true,
      default:
        "https://res.cloudinary.com/dpnzwc8ti/image/upload/v1730707028/deafaultavt_male_mzrhqq.jpg",
    },
    phone_number: { type: String, default: "No provided" },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },
    birthday: { type: Date, default: new Date() },
    body_shape: { type: String, default: "No provided" }, // Optional, e.g., 'Slim', 'Athletic', 'Curvy', etc.
    // height: { type: Number, default: 0 }, // Height in centimeters
    // weight: { type: Number, default: 0 }, // Weight in kilograms
    style_preference: {
      type: Schema.Types.ObjectId,
      ref: "StylePreference",
      required: false,
    }, // Array of style preferences
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Create the model based on the schema
const UserInfo = mongoose.model("UserInfo", userInfoSchema);

export default UserInfo;
