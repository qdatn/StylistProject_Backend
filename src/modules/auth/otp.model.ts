import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      ref: "User",
      localField: "emai", // Trường trong model Post
      foreignField: "email", // Trường trong model User mà Post sẽ tham chiếu
    },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    isUsed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
