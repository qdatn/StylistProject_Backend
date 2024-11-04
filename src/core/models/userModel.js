import mongoose, { Schema } from "mongoose";

// Define the User Schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    // dateCreated: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { timestamps: true }
);

// Create and export the model based on the schema
const User = mongoose.model("User", userSchema);

export default User;
