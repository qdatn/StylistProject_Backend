import LoginDto from "@modules/auth/dtos/login.dto";
import jwt, { SignOptions } from "jsonwebtoken";

export default function generateJwt(user: LoginDto): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const options: SignOptions = { expiresIn: "3h" };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}
