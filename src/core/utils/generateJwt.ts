import LoginDto from "@modules/auth/dtos/login.dto";
import e from "express";
import jwt, { SignOptions } from "jsonwebtoken";

export default function generateJwt(user: LoginDto, expiredTime?: string): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const options: SignOptions = { expiresIn: expiredTime || "3h" }; // Default to 3 hour if no expiredTime is provided

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}
