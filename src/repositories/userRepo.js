// repositories/userRepository.js
import User from "../models/userModel.js";

class UserRepository {
  async findByEmail(email) {
    return User.findOne({ email });
  }

  async createUser(userData) {
    const user = new User(userData);
    return user.save();
  }
}

export default new UserRepository();
