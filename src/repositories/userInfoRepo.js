// repositories/userInfoRepository.js
import UserInfo from "../models/userInfoModel.js";

class UserInfoRepository {
  async findAll() {
    return await UserInfo.find().populate("_id"); // Populate user_id from User model
  }

  async findById(id) {
    return await UserInfo.findOne({ user_id: id }).populate("_id");
  }

  async create(userInfoData) {
    return await UserInfo.create(userInfoData);
  }

  async update(id, userInfoData) {
    return await UserInfo.findOneAndUpdate({ user_id: id }, userInfoData, {
      new: true,
    }).populate("_id");
  }

  async delete(id) {
    return await UserInfo.deleteOne({ user_id: id });
  }
}

export default new UserInfoRepository();
