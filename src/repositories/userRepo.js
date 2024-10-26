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

  async updateUser(id, updateData) {
    return await User.findByIdAndUpdate({ _id: id }, updateData, {
      new: true,
    });
  }

  async deleteUser(id) {
    return await User.deleteOne({ _id: id });
  }
}

export default new UserRepository();
