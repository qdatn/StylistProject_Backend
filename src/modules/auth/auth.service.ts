// services/authService.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "./auth.repository";
import UserInfoRepository from "@modules/userInfo/userInfo.repository";
import AuthDto from "./dtos/auth.dto";
import RegisterDto from "./dtos/register.dto";
import { CartRepository } from "@modules/cart";
import { generateOTP } from "@core/utils";

import generateJwt from "@core/utils/generateJwt";
import { OTP } from "@modules/auth";
import nodemailer from "nodemailer";

class AuthService {
  async register(userData: RegisterDto) {
    const { name, email, password, role } = userData;

    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserRepository.createUser({
      email,
      password: hashedPassword,
      role,
    });

    // Tạo UserInfo cho User mới với user_id là _id của User
    const userinfo = await UserInfoRepository.create({
      user: user._id,
      name: name || "No Name Provided", // Tên có thể lấy từ userData hoặc mặc định
    });

    // Tạo UserInfo cho User mới với user_id là _id của User
    const cart = await CartRepository.createCart({
      user: user._id,
      products: [],
    });
    // return userRepository.createUser({ email, password: hashedPassword, role });
    return { user, userinfo, cart };
    // return { user, userinfo };
  }

  async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid email or password");

    const token = generateJwt(user);
    return { user, token };
  }

  async updateUser(id: string, updateData: AuthDto) {
    // Kiểm tra nếu `updateData` có chứa `password` thì hash nó trước khi lưu
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return await UserRepository.updateUser(id, updateData);
  }

  async deleteUser(id: string) {
    return await UserRepository.deleteUser(id);
  }

  async sendVerificationEmail(email: string) {
    const otp = generateOTP();
    const verificationUrl = `
    Hello,

    Thank you for registering an account at [ Stylist ]. To complete your registration, please click the link below to verify your email address.

    Verification link: ${process.env.BASE_URL}/auth/verify?otp=${otp}

    OTP code: ${otp}

    Note: This link/OTP will expire in 5 minutes.

    If you did not request this registration, please ignore this email.

    Best regards,
    The [ Stylist ] Support Team
    `;

    // Lưu OTP và thời gian hết hạn vào cơ sở dữ liệu
    await OTP.create({
      email,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 phút
    });

    // Gửi email chứa đường dẫn xác minh
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER, // SendGrid SMTP uses 'apikey' as the username
        pass: process.env.SMTP_PASS, // Replace with your SendGrid API key
      },
    });
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Email Verification for [ Stylist ] registrations",
      text: `${verificationUrl}`,
    });
  }

  async verifyOTP(email: string, otp: string) {
    // Kiểm tra OTP và userId trong cơ sở dữ liệu
    const otpRecord = await OTP.findOne({
      otp: otp,
      isUsed: false,
    });

    if (!otpRecord) {
      return {
        success: false,
        message: "Invalid OTP or OTP has already been used.",
      };
    } else {
      // Kiểm tra thời gian hết hạn của OTP
      if (otpRecord && otpRecord.expiresAt.getTime() < Date.now()) {
        await OTP.deleteOne({ email: email, otp: otp });
        return { success: false, message: "OTP has expired." };
      } else {
        // Đánh dấu OTP là đã sử dụng và xác minh thành công
        await OTP.updateOne({ email: email, otp: otp }, { isUsed: true });
        return { success: true, message: "OTP verified successfully." };
      }
    }
  }

  async checkEmail(email: string) {
    const existingUser = await UserRepository.findByEmail(email);
    return !!existingUser;
  }

  async updatePasswordByEmail(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cập nhật mật khẩu
    const updatedUser = await UserRepository.updateUserByEmail(
      email,
      hashedPassword
    );
    return !!updatedUser; // Trả về true nếu cập nhật thành công
  }

  async findUserbyEmail(email: string) {
    const user = await UserRepository.findByEmail(email);
    // if (!user) {
    //   return "User not found";
    // }
    return user;
  }
}

export default new AuthService();
