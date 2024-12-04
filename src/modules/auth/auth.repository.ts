// repositories/userRepository.js
import User from "./user.model";
import AuthDto from "./dtos/auth.dto";
// import IAuth from "./auth.interface";

class UserRepository {
  async findByEmail(email: string) {
    return User.findOne({ email });
  }

  async createUser(userData: AuthDto) {
    const user = new User(userData);
    return user.save();
  }

  async updateUser(id: string, updateData: AuthDto) {
    return await User.findByIdAndUpdate({ _id: id }, updateData, {
      new: true,
    });
  }

  async updateUserByEmail(email: string, password: string) {
    return await User.findOneAndUpdate(
      { email: email },
      { password: password },
      {
        new: true,
      }
    );
  }

  async deleteUser(id: string) {
    return await User.deleteOne({ _id: id });
  }
}

export default new UserRepository();
