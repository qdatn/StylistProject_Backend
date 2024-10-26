// services/authService.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepo.js";
import userInfoRepository from "../repositories/userInfoRepo.js";

class AuthService {
  async register(userData) {
    const { name, email, password, role } = userData;

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.createUser({
      email,
      password: hashedPassword,
      role,
    });

    // Tạo UserInfo cho User mới với user_id là _id của User
    const userinfo = await userInfoRepository.create({
      user_id: user._id,
      name: name || "No Name Provided", // Tên có thể lấy từ userData hoặc mặc định
    });
    // return userRepository.createUser({ email, password: hashedPassword, role });
    return { user, userinfo };
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid email or password");

    const token = this.generateJwt(user);
    return { user, token };
  }

  generateJwt(user) {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );
  }

  async updateUser(id, updateData) {
    // Kiểm tra nếu `updateData` có chứa `password` thì hash nó trước khi lưu
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return await userRepository.updateUser(id, updateData);
  }

  async deleteUser(id) {
    return await userRepository.deleteUser(id);
  }
}

export default new AuthService();
