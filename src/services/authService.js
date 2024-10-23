// services/authService.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepo.js";

class AuthService {
  async register(userData) {
    const { email, password, role } = userData;

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(password, 10);
    return userRepository.createUser({ email, password: hashedPassword, role });
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
}

export default new AuthService();
