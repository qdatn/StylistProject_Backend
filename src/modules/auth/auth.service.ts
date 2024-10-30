// services/authService.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "./auth.repository";
import UserInfoRepository from "@modules/userInfo/userInfo.repository";
import AuthDto from "./dtos/auth.dto";
import RegisterDto from "./dtos/register.dto";

import generateJwt from "@core/data/utils/generateJwt";
import { Request, Response, NextFunction } from "express";

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
    //     const cart = await cartRepository.createCart({
    //       user: user._id,
    //     });
    //     // return userRepository.createUser({ email, password: hashedPassword, role });
    // return { user, userinfo, cart };
    return { user, userinfo };
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
}

export default new AuthService();
